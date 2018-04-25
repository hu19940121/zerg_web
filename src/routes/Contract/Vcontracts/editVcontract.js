//新建交易合约

import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import React, { PureComponent } from 'react';
import { Spin,List,Table,Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown,
	Menu, InputNumber, DatePicker, Modal, message, Badge, Divider ,Radio} from 'antd';
import { connect } from 'dva';
import VcontractsForm from '../ContractForm/VcontractsForm';




@Form.create()
@connect(({ vcontracts,loading}) => ({
  vcontracts,
}))

class EditVcontract extends PureComponent{

	constructor(props){
		super(props)
	}
	componentDidMount(){
		console.log(this.props);
		const  vcontractId=this.props.match.params.id
		// let contractId=this.props.location.state.contractId;
		this.props.dispatch({
			type:'vcontracts/fetch',
			payload:vcontractId
		}).then(()=>{
			this.setState({
				vcontractInfo:this.props.vcontracts.data.data[0],
				vcontractId:vcontractId
			})
		})

	}

	state={
		vcontractInfo:{},
	}

	

	//保存
	saveClick=()=>{
		const {vcontractId}=this.state;
		this.form.validateFields((err,fieldsValue)=>{
			if (err) { return }
			const params={
				...fieldsValue,
				id:vcontractId
			}
		// this.props.dispatch({
		// 	type:'vcontracts/add',
		// 	payload:{
		// 		...values
		// 	}
		// }).then(()=>{
		// 	message.success('添加成功',1,()=>{this.props.history.push('/contract/vcontract')})

		// })
			console.log(params);

		})

	}





	saveFormRef=(form)=>{
		this.form=form;
	}


	render() {
		console.log(this.props);
		let {vcontractInfo} =this.state;
		return (
			<PageHeaderLayout title="编辑交易合约">
				<VcontractsForm
				vcontractInfo={vcontractInfo}
				isadd={false}
				handleSubmit={this.saveClick}
				ref={this.saveFormRef} buttonTitle='确定' />
			</PageHeaderLayout>
			)


	}


}


export default EditVcontract;


