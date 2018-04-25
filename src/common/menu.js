import { isUrl } from '../utils/utils';

const menuData = [


{
  name:'工作平台',
  icon:'dashboard',
  path:'dashboard',
  children:[{
    name:'我的监控',
    path:'monitor'
  },{
    name:'我的平台',
    path:'workspace'
  }]
},{
  name:'合约管理',
  icon:'form',
  path:'contract',
  children:[{
    name:'交易所',
    path:'exchanges'
  },{
    name:'合约品种',
    path:'products'
  },{
    name:'基础合约',
    path:'basecontract'
  },{
    name:'交易合约',
    path:'vcontracts'
  }]


},{
  name:'交易系统',
  icon:'hdd',
  path:'trading_systems',
  children:[{
    name:'交易系统',
    path:'trading_systems'
  },{
    name:'合约组管理',
    path:'vcontract_groups'
  }]
},{
  name:'交易日历',
  icon:'calendar',
  path:'trading_calendars',
},{
  name:'交易时段',
  icon:'clock-circle-o',
  path:'trade_sessions',
},

];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
