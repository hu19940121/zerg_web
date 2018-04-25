import { queryTrade_sessions, removeTrade_sessions, addTrade_sessions,
 updateTrade_sessions,searchTrade_sessions,findTrade_sessions} from '../services/api';

export default {
  namespace: 'sessions_in_products',

  state: {
    data: {
      data:[]
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(findTrade_sessions, payload);
      console.log('ModelModelModel:',response);
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
      const response = yield call(addTrade_sessions, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeTrade_sessions, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateTrade_sessions, payload);
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
