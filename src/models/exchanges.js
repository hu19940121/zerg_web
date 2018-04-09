import { queryExchanges, removeExchanges, addExchanges, updateExchanges,searchExchanges} from '../services/api';

export default {
  namespace: 'exchanges',

  state: {
    data: {
      data:[]
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryExchanges, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *search({ payload }, { call, put }) {
      const response = yield call(searchExchanges, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *add({ payload, callback }, { call, put }) {
      const response = yield call(addExchanges, payload);
       // console.log(response)
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeExchanges, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateExchanges, payload);
      yield put({
        type: 'save',
        payload: response,
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
