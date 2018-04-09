import { queryContract, removeContract, addContract, updateContract,searchContract} from '../services/api';

export default {
  namespace: 'contracts',

  state: {
    data: {
      data:[]
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryContract, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *search({ payload }, { call, put }) {
      const response = yield call(searchContract, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *add({ payload, callback }, { call, put }) {
      const response = yield call(addContract, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeContract, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateContract, payload);
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
