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

    *add({ payload, callback }, { call, put }) {
      console.log('add trading_systems');
      const response = yield call(addTrading_systems, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeTrading_systems, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateTrading_systems, payload);
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
