import { queryTrading_systems, removeTrading_systems, addTrading_systems, updateTrading_systems,searchTrading_systems} from '../services/api';

export default {
  namespace: 'trading_systems',

  state: {
    data: {
      data:[]
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      console.log('fetch');
      const response = yield call(queryTrading_systems, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *search({ payload }, { call, put }) {
      const response = yield call(searchTrading_systems, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *add({ payload, callback }, { call, put,select }) {
      const oldData = yield select(({ trading_systems }) => trading_systems.data)
      const response = yield call(addTrading_systems, payload);
       if (response.status=='OK') {
         oldData.data.unshift(response.data)
         yield put({
           type: 'save',
           payload: oldData,
         });
         if (callback) callback();
       }else{
         console.log(response);
       }
    },
    *remove({ payload, callback }, { call, put ,select}) {
      const oldData = yield select(({ trading_systems }) => trading_systems.data)
      const response = yield call(removeTrading_systems, payload);
      const tempObj=typeof(response)=="object"?response:JSON.parse(response)
      if(tempObj.status=='OK') {
         var newArr =oldData.data.filter((item)=>{
             if (item.id==tempObj.data.id) {
               return false
             }else{
               return item
             }
         })
         oldData.data=newArr
         console.log(oldData);
         yield put({
           type: 'save',
           payload: oldData,
         });
         if (callback) callback();
       }else{
         throw tempObj
      }
    },
    *update({ payload, callback }, { call, put ,select }) {
      const oldData = yield select(({ trading_systems }) => trading_systems.data)
      const response = yield call(updateTrading_systems, payload);
      console.log(response);
      if (response.status=='OK') {
        for(let i=0;i<oldData.data.length;i++){
          if (oldData.data[i].id==response.data.id) {
            oldData.data[i]=response.data
          }
        }
        yield put({
          type: 'save',
          payload: oldData,
        });
        if (callback) callback();
      }else{
        throw response
      }
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
