import { queryTrade_sessions, removeTrade_sessions, addTrade_sessions,
 updateTrade_sessions,searchTrade_sessions} from '../services/api';

export default {
  namespace: 'trade_sessions',

  state: {
    data: {
      data:[]
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      console.log('fetch');
      const response = yield call(queryTrade_sessions, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *search({ payload }, { call, put }) {
      const response = yield call(searchTrade_sessions, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *add({ payload, callback }, { call, put,select }) {
      const oldData = yield select(({ trade_sessions }) => trade_sessions.data)
      console.log('oldDataoldDataoldData',oldData);
      console.log('add trading_systems');
      const response = yield call(addTrade_sessions, payload);
      if (response.status=='OK') {
         oldData.data.unshift(response.data)
         yield put({
           type: 'save',
           payload: oldData,
         });
         if (callback) callback();
       }else{
         throw response
       }
    },
    *remove({ payload, callback }, { call, put ,select}) {
      const response = yield call(removeTrade_sessions, payload);
      const oldData = yield select(({ trade_sessions }) => trade_sessions.data)
      const tempObj=typeof(response)=="object"?response:JSON.parse(response)
      if (tempObj.status=='OK') {
        var newArr =oldData.data.filter((item)=>{
            if (item.id==tempObj.data.id) {
              return false
            }else{
              return item
            }
        })
        oldData.data=newArr
        yield put({
          type: 'save',
          payload: oldData,
        });
        if (callback) callback();
      }else{
        throw tempObj
      }
      // yield put({
      //   type: 'save',
      //   payload: response,
      // });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put,select }) {
       console.log('进来了');
      const oldData = yield select(({ trade_sessions }) => trade_sessions.data)
      console.log(oldData);
      const response = yield call(updateTrade_sessions, payload);
      if (response.status=='OK') {
        for(let i=0;i<oldData.data.length;i++){
          if (oldData.data[i].id==response.data.id) {
            oldData.data[i]=response.data
          }
        }
        console.log('finallllllllllllllllllllllllllllll',oldData);
        yield put({
          type: 'save',
          payload: oldData,
        });
        if (callback) callback();
      }else{
        throw response
      }
      console.log(response);
      // yield put({
      //   type: 'save',
      //   payload: response,
      // });
      // if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data:typeof(action.payload)=="object"?action.payload:JSON.parse(action.payload),
      };
    },
  },
};
