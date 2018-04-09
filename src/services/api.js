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
export async function queryExchanges(params='') {

  return request(`/api/exchanges/${params}`);
}



//交易所管理api

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
  return request('/api/exchanges/search', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}


////


//合约品种管理api
export async function queryProducts(params='') {

  return request(`/api/products/${params}`);
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
  return request('/api/products/search', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}


////基础合约管理api
export async function queryContract(params='') {

  return request(`/api/contracts/${params}`);
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
  console.log('updateContract');
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
  return request('/api/contracts/search', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

//////////////////////
////交易合约管理api
export async function queryVcontracts(params='') {

  return request(`/api/vcontracts/${params}`);
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
  return request('/api/vcontracts/search', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
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

  return request(`/api/vcontract_groups/${params.id}`, {
    method: 'DELETE',
    body: {
      ...params,
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

export async function addVcontract_groups(params) {
  return request('/api/vcontract_groups', {
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
////////////////////////

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
