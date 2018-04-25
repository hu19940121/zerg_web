import { queryExchanges, removeExchanges, addExchanges, updateExchanges,searchExchanges} from '../services/api';

export default {
  namespace: 'exchanges',

  state: {
    data: {
      data:[],
      paginate:{
      }
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryExchanges, payload);
      if (response.status=='OK') {
        yield put({
          type: 'query',
          payload: response,
        });
      }else{
        yield put({
          type: 'requestError',
          payload: response,
        });
      }
    },

    *search({ payload }, { call, put }) {
      const response = yield call(searchExchanges, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *add({ payload, callback }, { call, put,select }) {
      const response = yield call(addExchanges, payload);
      const oldData = yield select(({ exchanges }) => exchanges.data) //查询出原来的list
      if (response.status=='OK') {
        oldData.data.unshift(response.data)
        yield put({
          type: 'save',
          payload: oldData,
        });
        if (callback) callback();
      }else{
        yield put({
          type: 'queryError',
          payload: response,
        });
      }
    },
    *remove({ payload, callback, }, { call, put,select }) {
      const response = yield call(removeExchanges, payload);
      const oldData = yield select(({ exchanges }) => exchanges.data)
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
    },
    *update({ payload, callback }, { call, put,select }) {
      const response = yield call(updateExchanges, payload);
      const oldData = yield select(({ exchanges }) => exchanges.data)
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
    query(state, action) {
      return {
        ...state,
        data:typeof(action.payload)=="object"?action.payload:JSON.parse(action.payload),
      };
    },
    save(state, action) {
      console.log('reducersstate');
      console.log(state);
      return {
        ...state,
        // data:typeof(action.payload)=="object"?action.payload:JSON.parse(action.payload),
      };
    },
    //返回错误处理
    requestError(state,action){
      return {
        ...state,
        data:typeof(action.payload)=="object"?action.payload:JSON.parse(action.payload),
      };
    }
  },
};
