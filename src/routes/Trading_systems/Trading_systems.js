//交易系统

import React, { PureComponent } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Spin,List,Table,Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber,
 DatePicker, Modal, message, Badge, Divider ,Radio,Tooltip} from 'antd';
import AddTrading_systems from 'components/Modal/AddTrading_systems'
import { connect } from 'dva';
import Filter from '../Contract/Filter'

const confirm = Modal.confirm;
@connect(({trading_systems,loading})=>({
	trading_systems,
	loading:loading.models.trading_systems,
}))

class Trading_systems extends PureComponent{

	constructor(props){
		super(props)
	}

	componentDidMount(){
		this.props.dispatch({
			type:'trading_systems/fetch'
		})

	}
	state={
		columns :[
			{
			  title: '名称',
			  dataIndex: 'name',
			  // fixed: 'left'
			}, {
			  title: '公司',
			  dataIndex: 'company',
			  // fixed: 'left'
			}, {
			  title: 'IP地址',
			  dataIndex: 'ip_address',
			},{
				title:'URL',
				dataIndex:'url'
			},{
				title: '操作',
				key: 'action',
				// fixed: 'right',
				render: (text, record,index) => (
					<span>
						<Tooltip title='查看相关合约组内的合约信息'>
							<a ><Icon type="exception" style={{ fontSize: 16}} /></a>
						</Tooltip>
						<Divider type="exception" />
						<a onClick={this.showEditModal.bind(this,text)}><Icon type="edit"  style={{ fontSize: 16}} /></a>
						<Divider type="vertical" />
						<a onClick={this.removeTra.bind(this,text)} style={{color:"red"}}><Icon style={{ fontSize: 16}} type="delete" /></a>
					</span>
					),
			}
		],
		isCreate:true
	}
	// do not know
	saveFormRef=(form)=>{
		this.form=form;
	}
	//新增交易系统
	addTrading_system=()=>{
		const form=this.form;
		form.validateFields((err,values)=>{
			if (err) {return}
			console.log('Received values of form: ', values);
			this.props.dispatch({
				type:'trading_systems/add',
				payload:values
			}).then(()=>{
				message.success('新增成功')
				this.form.resetFields();
				this.setState({ visible: false });
			})
		})

	}
	//显示新增对话框
	showModal=()=>{
		console.log(this.form)
		const form=this.form;
		form.resetFields();
		this.setState({
			okText:'确定',
			visible:true,
			isCreate:true,//改变form中编辑为新增
			formTitle:'创建交易系统'
		})
	}


	//显示编辑框
	showEditModal=(text)=>{
		this.setState({
			okText:'保存',
			visible:true,
			isCreate:false,//改变form中编辑为新增
			formTitle:'编辑交易系统',
			currentEditId:text.id
		})
		this.form.setFieldsValue({
			...text
		})
	}

	saveClick=()=>{
		console.log();
		const {currentEditId} =this.state;
		this.form.validateFields((err,values)=>{
			if(err){return}
			let params={
				id:currentEditId,
				...values
			}
			this.props.dispatch({
				type:'trading_systems/update',
				payload:params
			}).then(()=>{
				this.setState({
					visible:false
				})
				message.success('更新成功')
			})
			console.log('edit save values',values)

		})
	}
	//取消创建交易系统

	cancelAdd=()=>{
		this.setState({visible:false});
	}
	//删除交易系统
	removeTra=(text)=>{
		const{dispatch} =this.props;
		console.log(text)
		confirm({
			title:'是否删除？',
			onOk(){
				dispatch({
					type:'trading_systems/remove',
					payload:{
						id:text.id
					}
				}).then(()=>{
					message.success('删除成功')
				})
			},
			onCancel(){
				console.log('cancel');
			}

		})
	}
	render(){
		console.log(this.props);
		const pagination = {
		    defaultCurrent: 1,
		    pageSize: 10,
		    showSizeChanger: true,
		}
		const {columns,okText,formTitle,visible,isCreate} =this.state;
		const data=this.props.trading_systems.data.data
		const {loading}=this.props
		return (

				<div>
					<PageHeaderLayout title='交易系统管理'>
						<Card>
							<Filter />
							<Button type="primary" style={{marginBottom:14}} onClick={this.showModal}>
							创建交易系统
							</Button>
							<AddTrading_systems
								ref={this.saveFormRef}
								visible={visible}
								onCancel={this.cancelAdd}
								onCreateOrSave={this.state.isCreate?this.addTrading_system:this.saveClick}
								title={formTitle}
								okText={okText}
							 />
							<Table loading={loading} columns={columns} rowKey="id" pagination={pagination} dataSource={data} />
						</Card>

					</PageHeaderLayout>



				</div>

			)


	}


}


export default Trading_systems;

