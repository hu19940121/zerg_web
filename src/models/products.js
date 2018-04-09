import { queryProducts, removeProducts, addProducts, updateProducts,searchProducts} from '../services/api';

export default {
  namespace: 'products',

  state: {
    data: {
      data:[]
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      console.log(payload)
      console.log('fetch products')
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

    *add({ payload, callback }, { call, put }) {
      const response = yield call(addProducts, payload);
       console.log('add products')
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      console.log('payload',payload );
      const response = yield call(removeProducts, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateProducts, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {

    save(state, action) {
      console.log('ssss')
      return {
        ...state,
        // data:typeof(action.payload)=="object"?action.payload:JSON.parse(action.payload),
        data:typeof(action.payload)=="object"?action.payload:JSON.parse(action.payload),
      };
    },
  },
};
