//新建交易合约

import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import React, { PureComponent } from 'react';
import { Spin,List,Table,Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown,
	Menu, InputNumber, DatePicker, Modal, message, Badge, Divider ,Radio} from 'antd';
import { connect } from 'dva';
import VcontractsForm from '../ContractForm/VcontractsForm';




@Form.create()
@connect(({ contracts,vcontracts,loading}) => ({
  contracts,
  vcontracts,
}))

class AddVcontract extends PureComponent{

	constructor(props){
		super(props)
	}
	componentDidMount(){
		console.log(this.props);
		const  contractId=this.props.match.params.id
		// let contractId=this.props.location.state.contractId;
		this.props.dispatch({
			type:'contracts/fetch',
			payload:contractId
		}).then(()=>{
			this.setState({
				contractInfo:this.props.contracts.data.data[0]
			})
		})

	}

	state={
		contractInfo:{},
	}


	//添加交易合约
	addVcontract=()=>{
		this.form.validateFields((err,fieldsValue)=>{
			if (err) { return }
		this.props.dispatch({
			type:'vcontracts/add',
			payload:{
				...fieldsValue
			}
		}).then(()=>{
			message.success('添加成功',1,()=>{this.props.history.push('/contract/vcontracts')})

		})
			console.log(fieldsValue);

		})
	}





	saveFormRef=(form)=>{
		this.form=form;
	}

	//新增基础合约

	render(){
		console.log(this.props);
		let {contractInfo} =this.state;
		return (
			<PageHeaderLayout title="新建交易合约">
				<VcontractsForm
				info={contractInfo}
				isadd={true}
				handleSubmit={this.addVcontract}
				ref={this.saveFormRef} buttonTitle='确定' />
			</PageHeaderLayout>
			)


	}


}


export default AddVcontract;


