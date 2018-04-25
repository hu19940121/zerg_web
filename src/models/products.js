import { queryProducts, removeProducts, addProducts, updateProducts,searchProducts} from '../services/api';

export default {
  namespace: 'products',

  state: {
    data: {
      data:[],
      paginate:{
        current:1,
        page_size:10
      }
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryProducts, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *search({ payload }, { call, put }) {
      const response = yield call(searchProducts, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *add({ payload, callback }, { call, put ,select}) {
      const response = yield call(addProducts, payload);
      const oldData = yield select(({ products }) => products.data)
      // console.log(oldData);
      // console.log('add products')
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
      const oldData = yield select(({ products }) => products.data)
      const response = yield call(removeProducts, payload);
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
      const oldData = yield select(({ products }) => products.data)
      const response = yield call(updateProducts, payload);
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
        // data:typeof(action.payload)=="object"?action.payload:JSON.parse(action.payload),
        data:typeof(action.payload)=="object"?action.payload:JSON.parse(action.payload),
      };
    },
  },
};
