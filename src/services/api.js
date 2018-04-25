import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

//交易所管理api

export async function queryExchanges(params) {

  return request(`/api/exchanges?${stringify(params)}`);
}




export async function removeExchanges(params) {

  return request(`/api/exchanges/${params.id}`, {
    method: 'DELETE',
    body: {
      ...params,
    },
  });
}
export async function updateExchanges(params) {
  return request(`api/exchanges/${params.id}`, {
    method: 'PUT',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function addExchanges(params) {
  return request('/api/exchanges', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function searchExchanges(params) {
  return request(`/api/exchanges/search?${stringify(params)}`);
}


////


//合约品种管理api
// export async function queryProducts(params='') {

//   return request(`/api/products/${params}`);
// }

export async function queryProducts(params) {
  console.log(stringify(params));
  return request(`/api/products?${stringify(params)}`);
}


export async function removeProducts(params) {
   console.log('paramsparamsparamsparamsparams');
  console.log(params);
  return request(`/api/products/${params.id}`, {
    method: 'DELETE',
    body: {
      ...params,
    },
  });
}
export async function updateProducts(params) {
  return request(`api/products/${params.id}`, {
    method: 'PUT',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function addProducts(params) {
  return request('/api/products', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function searchProducts(params) {
  return request(`/api/products/search?${stringify(params)}`)
}


////基础合约管理api
export async function queryContract(params) {

  return request(`/api/contracts?${stringify(params)}`);
}



export async function removeContract(params) {

  return request(`/api/contracts/${params.id}`, {
    method: 'DELETE',
    body: {
      ...params,
    },
  });
}
export async function updateContract(params) {
  return request(`api/contracts/${params.id}`, {
    method: 'PUT',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function addContract(params) {
  return request('/api/contracts', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function searchContract(params) {
  return request(`/api/contracts/search?${stringify(params)}`)
}

//////////////////////
////交易合约管理api
export async function queryVcontracts(params) {

  return request(`/api/vcontracts?${stringify(params)}`);
}



export async function removeVcontracts(params) {

  return request(`/api/vcontracts/${params.id}`, {
    method: 'DELETE',
    body: {
      ...params,
    },
  });
}
export async function updateVcontracts(params) {
  return request(`api/vcontracts/${params.id}`, {
    method: 'PUT',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function addVcontracts(params) {
  return request('/api/vcontracts', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function searchVcontracts(params) {
  return request(`/api/vcontracts/search?${stringify(params)}`)
}

//////////////////////

////交易系统管理api
export async function queryTrading_systems(params='') {

  return request(`/api/trading_systems/${params}`);
}



export async function removeTrading_systems(params) {

  return request(`/api/trading_systems/${params.id}`, {
    method: 'DELETE',
    body: {
      ...params,
    },
  });
}
export async function updateTrading_systems(params) {
  return request(`api/trading_systems/${params.id}`, {
    method: 'PUT',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function addTrading_systems(params) {
  return request('/api/trading_systems', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function searchTrading_systems(params) {
  return request('/api/trading_systems/search', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

//////////////////////
////合约组管理api
export async function queryVcontract_groups(params='') {

  return request(`/api/vcontract_groups/${params}`);
}



export async function removeVcontract_groups(params) {

  return request(`/api/vcontract_groups/${params.v_contract_group_id}/vcontracts/${params.v_contract_id}`, {
    method: 'DELETE',
    // body: {
    //   ...params,
    // },
  });
}
　//更新合约组内的交易合约
export async function updateInVcontract_groups(params) {
  return request(`api/vcontracts/${params.id}`, {
    method: 'PUT',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateVcontract_groups(params) {
  return request(`api/vcontract_groups/${params.id}`, {
    method: 'PUT',
    body: {
      ...params,
      method: 'post',
    },
  });
}
//向合约组内添加一个交易合约
export async function addOneToGroups(params) {
  return request(`/api/vcontracts/${params.v_contract_id}/join/`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
//批量添加交易合约
export async function batchToGroups(params) {
  return request(`/api/vcontract_groups/${params.v_contract_group_id}/join/`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function addVcontract_groups(params) {
  return request('/api/vcontract_groups/join', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function searchVcontract_groups(params) {
  return request('/api/vcontract_groups/search', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
////////////////////////交易时段管理
export async function queryTrade_sessions(params) {

  return request(`/api/trade_sessions/?${stringify(params)}`);
}

export async function findTrade_sessions(params='') {

  return request(`/api/trade_sessions/${params}`);
}


export async function removeTrade_sessions(params) {

  return request(`/api/trade_sessions/${params.id}`, {
    method: 'DELETE',
    body: {
      ...params,
    },
  });
}
export async function updateTrade_sessions(params) {
  return request(`api/trade_sessions/${params.product_id}`, {
    method: 'PUT',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function addTrade_sessions(params) {
  return request(`/api/products/${params.product_id}/trade_sessions`, {
    method: 'POST',
    body: {
      ...params,
     
    },
  });
}


export async function searchTrade_sessions(params) {
  return request('/api/trade_sessions/search', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

//////////
export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
