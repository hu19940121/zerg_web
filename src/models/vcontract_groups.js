import { queryVcontract_groups, removeVcontract_groups, 
  addVcontract_groups, updateVcontract_groups,searchVcontract_groups} from '../services/api';

export default {
  namespace: 'vcontract_groups',

  state: {
    data: {
      data:[ ]
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      console.log('fetch');
      const response = yield call(queryVcontract_groups, payload);
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

    *add({ payload, callback }, { call, put ,select}) {
      const response = yield call(addVcontract_groups, payload);
      const oldData = yield select(({ vcontract_groups }) => vcontract_groups.data)
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
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeVcontract_groups, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateVcontract_groups, payload);
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
