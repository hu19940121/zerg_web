import { queryVcontract_groups, removeVcontract_groups,
  addVcontract_groups, updateVcontract_groups,searchVcontract_groups,
  addOneToGroups,batchToGroups,updateInVcontract_groups} from '../services/api';

export default {
  namespace: 'vcontracts_in_groups',

  state: {
    data: {
      data:[ ]
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      console.log('fetch');
      const response = yield call(queryVcontract_groups, payload);
      console.log('response',response);
      yield put({
        type: 'save',
        payload: response,
      });　
    },

    *search({ payload }, { call, put }) {
      const response = yield call(searchVcontract_groups, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *addOne({ payload, callback }, { call, put }) {
      const response = yield call(addOneToGroups, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *batchAdd({ payload, callback }, { call, put }) {
      console.log('batchAdd');
      const response = yield call(batchToGroups, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    // *add({ payload, callback }, { call, put }) {
    //   const response = yield call(addVcontract_groups, payload);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    //   if (callback) callback();
    // },
    *remove({ payload, callback }, { call, put,select }) {
      const oldData = yield select(({ vcontracts_in_groups }) => vcontracts_in_groups.data)
      const response = yield call(removeVcontract_groups, payload);
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
         yield put({
           type: 'save',
           payload: oldData,
         });
         if (callback) callback();
       }else{
         throw tempObj
       }
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateVcontract_groups, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *updateIn({ payload, callback }, { call, put,select }) {
      const oldData = yield select(({ vcontracts_in_groups }) => vcontracts_in_groups.data)
      const response = yield call(updateInVcontract_groups, payload);
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
