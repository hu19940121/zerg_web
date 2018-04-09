//合约品种
import React, { PureComponent } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Spin,List,Table,Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message, Badge, Divider ,Radio,Tooltip} from 'antd';
import { connect } from 'dva';
import Filter from './Filter';
import AddProducts from 'components/Modal/AddProducts';
import AddContracts from 'components/Modal/AddContracts';
import styles from './Products.less';
import { Link } from 'react-router-dom';


const confirm = Modal.confirm;


@connect(({ products,loading,exchanges,contracts}) => ({
  products,
  exchanges,
  contracts,
  loading:loading.models.products,
}))
@Form.create()


class Products extends PureComponent{

	constructor(props){
		super(props)
	}
	componentDidMount(){
		this.props.dispatch({
			type:'products/fetch',
			callback:()=>{
			}
		})
		this.props.dispatch({
			type:'exchanges/fetch',
		}).then(()=>{
			this.setState({
				exchanges:this.props.exchanges.data.data
			})
		})

	}
	state={
		columns :[
			{
			  title: '简称',
			  dataIndex: 'symbol',
			  // align:'center'
			  // fixed: 'left'
			}, {
			  title: '类别',
			  dataIndex: 'sec_type',
			  // align:'center'
			  // fixed: 'left'
			}, {
			  title: '货币',
			  dataIndex: 'currency',
			  // align:'center',

			},{
				title:'交易模式',
				dataIndex:'trade_mode',
				// align:'center',
				width:60
			},{
				title:'名称',
				dataIndex:'cn_name',
				// align:'center',
				className:styles.noWrap
			},{
				title:'交易所',
				dataIndex:'exchange_cn_name',
				// align:'center',
				width:140,
				className:styles.noWrap

			},{
				title: '操作',
				key: 'action',
				// fixed: 'right',
				width:'400',
				render: (text, record,index) => (
					<span>
						<Tooltip title="编辑交易时段">
							<a ><Icon  type="clock-circle-o" style={{ fontSize: 16}}/> </a>
						</Tooltip>
						<Divider type="vertical" />
						<Tooltip title="创建基础合约">
							<a onClick={this.showAddContractsModal.bind(this,text)}>
								<Icon type="contacts" style={{ fontSize: 16}}/>
							</a>
						</Tooltip>
						<Divider type="vertical" />
						<a onClick={this.showEditForm.bind(this,text)}><Icon type="edit"  style={{ fontSize: 16}} /></a>
						<Divider type="vertical" />
						<a onClick={this.removeProduct.bind(this,text)}style={{color:"red"}}><Icon style={{ fontSize: 16}} type="delete" /></a>
						<Divider type="vertical" />
					</span>
					),
			}
		],
		selectedRowKeys: [],
		exchanges:[], // 交易所数据
		info:{},
		contractInfo:{}

	}

	showEditForm=(text)=>{
		console.log(text)
		this.form.setFieldsValue({
		 	...text
		});

		this.setState({
			okText:'保存',
			modalVisible:true,
			isCreate:false,//改变form中编辑为新增
			formTitle:'编辑合约品种',
			currentEditId:text.id
		})

	}

	removeProduct=(text)=>{
		const{dispatch} =this.props;
		console.log(text)
		confirm({
			title:'是否删除？',
			onOk(){
				dispatch({
					type:'products/remove',
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
	// do not know
	saveFormRef=(form)=>{
		this.form=form;
	}

	saveContractsRef=(form)=>{
		this.form=form;
	}
	//显示增加合约品种对话框
	showAddModal=()=>{
		const form=this.form;
		// console.log(form)
		form.resetFields();
		this.setState({
			okText:'确定',
			modalVisible:true,
			isCreate:true,//改变form中编辑为新增
			formTitle:'新增合约品种',
		})
	}

	//显示创建基础合约对话框
	showAddContractsModal=(text)=>{
		const form=this.forms;
		// console.log(form)
		form.resetFields();
		this.setState({
			okText:'确定',
			ContractsModalVisible:true,
			isCreate:true,//改变form中编辑为新增
			formTitle:'新增基础合约',
			info:text
		})
	}


	//增加合约品种
	addProducts=()=>{
		this.form.validateFields((err,values)=>{
			if(err){return};
			console.log('Received values of form: ', values);
			let params={
				...values
			};
			this.props.dispatch({
				type:'products/add',
				payload:params,
				callback:()=>{
					console.log('add success')
					message.success('添加成功')
				}
			});
			this.form.resetFields();
			this.setState({ modalVisible: false });
		})
		console.log('add products')
	}

	//增加基础合约
	addContracts=()=>{
		this.forms.validateFields((err,values)=>{
			if(err){return};
			let params={
				...values,
				'expiry': values['expiry'].format('YYYYMMDD'),
				'contract_month': values['contract_month'].format('YYYYMM'),
			}
			console.log('Received values of form: ', params);
			this.props.dispatch({
				type:'contracts/add',
				payload:params
			}).then(()=>{
				message.success('添加成功',1,()=>{this.props.history.push('/contract/basecontract')})

			})
		})
	}
	//保存
	saveClick=()=>{
		console.log('save products')
		const {currentEditId} =this.state;
		this.form.validateFields((err,values)=>{
			if(err){return}
			let params={
				id:currentEditId,
				...values
			}
			this.props.dispatch({
				type:'products/update',
				payload:params
			}).then(()=>{
				this.setState({
					modalVisible:false
				})
				message.success('更新成功')
			})
			console.log('edit save values',values)

		})
	}
	//取消增加合约品种
	cancelAdd=()=>{
		this.setState({modalVisible:false});
	}
	cancelContractsAdd=()=>{
		this.setState({ContractsModalVisible:false});
	}
	onSelectChange = (selectedRowKeys) => {
	  console.log('selectedRowKeys changed: ', selectedRowKeys);
	  this.setState({ selectedRowKeys });
	}




	render(){

		console.log(this.props)
		const {selectedRowKeys ,columns,okText,isCreate,formTitle,
			modalVisible,exchanges,initValues,info,contractInfo,ContractsModalVisible,cancelContractsAdd,saveContractsRef} = this.state;
		const {loading}=this.props
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
		  };
		const pagination = {
		    defaultCurrent: 1,
		    pageSize: 10,
		    showSizeChanger: true,
		}
		const data=this.props.products.data.data
		return (
				<PageHeaderLayout title="合约品种管理">
					<Card>
						<div style={{ marginBottom: 16 }}>
						<div style={{marginBottom: 16}}>
							<Filter   />
							<Button type="primary" onClick={this.showAddModal}>
							新增合约品种
							</Button>
							<AddProducts
								visible={modalVisible}
								onCancel={this.cancelAdd}
								onCreateOrSave={isCreate?this.addProducts:this.saveClick}
								title={formTitle}
								okText={okText}
								ref={(form)=>this.form=form}
								exchanges={exchanges}
							 />
							 <AddContracts
							 	info={info}
							 	isadd={true}
							 	visible={ContractsModalVisible}
							 	onCancel={this.cancelContractsAdd}
							 	onCreate={this.addContracts}
							 	title={formTitle}
							 	okText={okText}
								ref={(form)=>this.forms=form}
							  />
							<Button style={{marginLeft:16}}type="primary">
							同步品种
							</Button>
						</div>
							<Table loading={loading} rowKey="id" rowSelection={rowSelection} pagination={pagination} style={{ whiteSpace:'nowrap'}} columns={columns} dataSource={data} />
						</div>
					</Card>
				</PageHeaderLayout>


			)


	}


}


export default Products;

