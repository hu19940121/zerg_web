import { queryVcontracts, removeVcontracts, addVcontracts, updateVcontracts,searchVcontracts} from '../services/api';

export default {
  namespace: 'vcontracts',

  state: {
    data: {
      data:[],
      paginate:{}
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryVcontracts, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *search({ payload }, { call, put }) {
      const response = yield call(searchVcontracts, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *add({ payload, callback }, { call, put,select }) {
      const oldData = yield select(({ vcontracts }) => vcontracts.data)
      console.log(oldData);
      const response = yield call(addVcontracts, payload);
      console.log(response);
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
    *remove({ payload, callback }, { call, put,select }) {
      const oldData = yield select(({ vcontracts }) => vcontracts.data)
      const response = yield call(removeVcontracts, payload);
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
    *update({ payload, callback }, { call, put,select }) {
      const oldData = yield select(({ vcontracts }) => vcontracts.data)
      const response = yield call(updateVcontracts, payload);
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
