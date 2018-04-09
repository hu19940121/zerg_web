//新建基础合约

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import React, { PureComponent } from 'react';
import { Spin,List,Table,Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown,
	Menu, InputNumber, DatePicker, Modal, message, Badge, Divider ,Radio} from 'antd';
import { connect } from 'dva';
import ContractForm from './ContractForm';




@Form.create()
@connect(({ products,contracts,loading}) => ({
  products,
  contracts,
  loading:loading.models.products,
}))

class AddBasecontract extends PureComponent{

	constructor(props){
		super(props)
	}
	componentDidMount(){
		console.log(this.props.match.params.id);
		let productId=this.props.match.params.id;


		this.props.dispatch({
			type:'products/fetch',
			payload:productId
		}).then(()=>{
			this.setState({
				productInfo:this.props.products.data.data[0]
			})
		})

	}


	//添加基础合约
	addContract=(e)=>{
		this.form.validateFields((err,fieldsValue)=>{
			if (err) { return }
			let values={
				...fieldsValue,
				'expiry': fieldsValue['expiry'].format('YYYYMMDD'),
				'contract_month': fieldsValue['contract_month'].format('YYYYMM'),
			}
		this.props.dispatch({
			type:'contracts/add',
			payload:{
				...values
			}
		}).then(()=>{
			message.success('添加成功',1,()=>{this.props.history.push('/contract/basecontract')})

		})
			console.log(values);

		})
	}

	state={
		productInfo:{},
	}


	saveFormRef=(form)=>{
		this.form=form;
	}

	//新增基础合约

	render(){
		const tailFormItemLayout = {
		  wrapperCol: {
		    xs: {
		      span: 24,
		      offset: 0,
		    },
		    sm: {
		      span: 16,
		      offset: 8,
		    },
		  },
		};
		console.log(this.props);
		let {productInfo} =this.state;
		const {getFieldDecorator}=this.props.form;
		return (
			<PageHeaderLayout title="新建基础合约">
				<ContractForm info={productInfo} isadd={true} handleSubmit={this.addContract} ref={this.saveFormRef} buttonTitle='确定' />
			</PageHeaderLayout>
			)


	}


}


export default AddBasecontract;


