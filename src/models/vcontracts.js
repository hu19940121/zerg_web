import { queryVcontracts, removeVcontracts, addVcontracts, updateVcontracts,searchVcontracts} from '../services/api';

export default {
  namespace: 'vcontracts',

  state: {
    data: {
      data:[]
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      console.log('fetch');
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

    *add({ payload, callback }, { call, put }) {
      const response = yield call(addVcontracts, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeVcontracts, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateVcontracts, payload);
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
