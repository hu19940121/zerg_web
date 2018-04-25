import { queryContract, removeContract, addContract, updateContract,searchContract} from '../services/api';

export default {
  namespace: 'contracts',

  state: {
    data: {
      data:[],
      paginate:{},
    },
  },

  effects: {
    *fetch({ payload }, { call, put,select }) {
      const response = yield call(queryContract, payload);
      // console.log(response);
      // const oldData = yield select(({ contracts }) => contracts) //查询出原来的list
      // console.log('oldData',oldData);
     
        yield put({
          type: 'save',
          payload: response,
        });
    },

    *search({ payload }, { call, put,select }) {
      const response = yield call(searchContract, payload);
      const oldData = yield select(({ contracts }) => contracts.data)
      console.log('oldData',oldData);
      console.log('responseresponse',response);
      if (response.status=='OK') {
        yield put({
          type: 'save',
          payload: response,
        });
      }else{
        oldData.status=response.status
        oldData.msg=response.msg
        oldData.data=[]
        yield put({
          type: 'requestError',
          payload: oldData,
        });
      }
    },

    *add({ payload, callback }, { call, put,select }) {
      const oldData = yield select(({ contracts }) => contracts.data)
      const response = yield call(addContract, payload);
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
      const oldData = yield select(({ contracts }) => contracts.data)
      const response = yield call(removeContract, payload);
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
    *update({ payload, callback }, { call, put ,select}) {
      const oldData = yield select(({ contracts }) => contracts.data)
      const response = yield call(updateContract, payload);
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
    //返回错误处理
    requestError(state,action){
      console.log(state);
      return {
        ...state,
        data:typeof(action.payload)=="object"?action.payload:JSON.parse(action.payload),
      };
    }
  },
};
