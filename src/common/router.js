import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import pathToRegexp from 'path-to-regexp';
import { getMenuData } from './menu';

let routerDataCache;

const modelNotExisted = (app, model) => (
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  })
);

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach((model) => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return (props) => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () => models.filter(
      model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)
    ),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then((raw) => {
        const Component = raw.default || raw;
        return props => createElement(Component, {
          ...props,
          routerData: routerDataCache,
        });
      });
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach((item) => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

export const getRouterData = (app) => {
 const routerConfig = {
   '/': {
     component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
   },
   '/dashboard/monitor':{
     component:dynamicWrapper(app, [], () => import('../routes/Dashboard/Monitor'))

   },
   '/dashboard/workspace':{
     component:dynamicWrapper(app, [], () => import('../routes/Dashboard/Workspace'))

   },
   '/contract/basecontract':{
     component:dynamicWrapper(app, ['contracts'], () => import('../routes/Contract/Basecontract'))

   },
   '/contract/addBasecontract/:id':{
     component:dynamicWrapper(app, ['contracts'], () => import('../routes/Contract/AddBasecontract'))

   },
   '/contract/editBasecontract/:id':{
     component:dynamicWrapper(app, [], () => import('../routes/Contract/EditBasecontract'))

   },
   '/contract/addVcontract/:id':{
     component:dynamicWrapper(app, [], () => import('../routes/Contract/Vcontracts/addVcontract'))

   },
   '/contract/editVcontract/:id':{
     component:dynamicWrapper(app, [], () => import('../routes/Contract/Vcontracts/editVcontract'))

   },
   '/contract/exchanges':{
     component:dynamicWrapper(app, ['exchanges'], () => import('../routes/Contract/Exchanges'))

   },
   '/contract/products':{
     component:dynamicWrapper(app, ['products','exchanges'], () => import('../routes/Contract/Products'))

   },
   '/contract/vcontracts':{
     component:dynamicWrapper(app, ['vcontracts'], () => import('../routes/Contract/Vcontracts'))

   },
   '/trading_systems/trading_systems':{
     component:dynamicWrapper(app, ['trading_systems'], () => import('../routes/Trading_systems/Trading_systems'))

   },
   '/trading_systems/vcontract_groups':{
     component:dynamicWrapper(app, ['vcontract_groups'], () => import('../routes/Trading_systems/Vcontract_groups'))

   },
   // '/dashboard/analysis': {
   //   component: dynamicWrapper(app, ['chart'], () => import('../routes/Dashboard/Analysis')),
   // },
   // '/dashboard/monitor': {
   //   component: dynamicWrapper(app, ['monitor'], () => import('../routes/Dashboard/Monitor')),
   // },
   // '/dashboard/workplace': {
   //   component: dynamicWrapper(app, ['project', 'activities', 'chart'], () => import('../routes/Dashboard/Workplace')),
   //   // hideInBreadcrumb: true,
   //   // name: '工作台',
   //   // authority: 'admin',
   // },
   '/exception/403': {
     component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
   },
   '/exception/404': {
     component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
   },
   '/exception/500': {
     component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
   },
   '/exception/trigger': {
     component: dynamicWrapper(app, ['error'], () => import('../routes/Exception/triggerException')),
   },
   '/user': {
     component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
   },
   '/user/login': {
     component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
   },
   '/user/register': {
     component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
   },
   '/user/register-result': {
     component: dynamicWrapper(app, [], () => import('../routes/User/RegisterResult')),
   },
   // '/user/:id': {
   //   component: dynamicWrapper(app, [], () => import('../routes/User/SomeComponent')),
   // },
 };
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData = {};
  // The route matches the menu
  Object.keys(routerConfig).forEach((path) => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`));
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
      hideInBreadcrumb: router.hideInBreadcrumb || menuItem.hideInBreadcrumb,
    };
    routerData[path] = router;
  });
  return routerData;
};
