//新建基础合约

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import React, { PureComponent ,Component} from 'react';
import { Spin,List,Table,Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown,
	Menu, InputNumber, DatePicker, Modal, message, Badge, Divider ,Radio} from 'antd';
import { connect } from 'dva';
import ContractForm from './ContractForm';



@Form.create()
@connect(({ products,contracts,loading}) => ({
  contracts,
  loading:loading.models.products,
}))

class EditBasecontract extends Component{

	constructor(props){
		super(props)
	}
	componentDidMount(){
		// console.log(this.props.match.params.id);
		const  contractId=this.props.match.params.id;
		console.log(this.props);
		this.props.dispatch({
			type:'contracts/fetch',
			payload:contractId
		}).then(()=>{
			this.setState({
				contractInfo:this.props.contracts.data.data[0],
				contractId:contractId
			})
		})

	}


	state={
		productInfo:{},
		contractInfo:{}
	}
	saveFormRef=(form)=>{
		this.form=form;
	}

	//保存
	saveClick=()=>{
		console.log('save contracts')
		const {contractId} =this.state;

		this.form.validateFields((err,fieldsValue)=>{
			if(err){return}
			let params={
				id:contractId,
				...fieldsValue,
				'expiry': fieldsValue['expiry'].format('YYYYMMDD'),
				'contract_month': fieldsValue['contract_month'].format('YYYYMM'),
			}
			this.props.dispatch({
				type:'contracts/update',
				payload:params
			}).then(()=>{
				message.success('更新成功',1,()=>{this.props.history.push('/contract/basecontract')})
			})
			console.log('edit save values',params)

		})
	}
	render(){

		console.log(this.props);
		const {contractInfo}= this.state
		const {getFieldDecorator}=this.props.form;
		return (
			<PageHeaderLayout title="编辑基础合约">
				<ContractForm contractInfo={contractInfo} ref={this.saveFormRef}  buttonTitle='保存'  add={false} handleSubmit={this.saveClick}/>
			</PageHeaderLayout>
			)


	}


}


export default EditBasecontract;


