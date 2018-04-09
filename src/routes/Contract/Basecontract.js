//基础合约
import React, { PureComponent } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Spin,List,Table,Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message, Badge, Divider ,Radio,Tooltip} from 'antd';
import { connect } from 'dva';
import styles from './Products.less';
import { Link } from 'react-router-dom';
import AddContracts from 'components/Modal/AddContracts';
import AddVcontracts from 'components/Modal/AddVcontracts';

const FormItem = Form.Item;
const confirm = Modal.confirm;
@Form.create()
@connect(({ loading,contracts}) => ({
  contracts,
  loading:loading.models.contracts,
}))

class Basecontract extends PureComponent{

	constructor(props){
		super(props)
	}

	state={
		columns :[
			{
			  title: '合约编码',
			  dataIndex: 'symbol',

			  fixed: 'left'
			}, {
			  title: '交易所中的编码',
			  dataIndex: 'local_symbol',

			  fixed: 'left'
			}, {
			  title: '中文名称',
			  dataIndex: 'cn_name',

			},{
				title:'交易模式',
				dataIndex:'trade_mode',
				align:'center'
			},{
				title:'主力合约',
				dataIndex:'most_active',
				render:(text, record,index)=>
					text?<span>是</span>:<span>否</span>
			},{
				title:'合同月份',
				dataIndex:'contract_month',
			},{
				title:'品种标识',
				dataIndex:'product_symbol',

			},{
				title:'证券类型',
				dataIndex:'product_sec_type',

			},{
				title:'货币',
				dataIndex:'product_currency',

			},{
				title:'品种中文名',
				dataIndex:'product_cn_name',

			},{
				title:'交易所标识',
				dataIndex:'exchange_name',

			},{
				title:'最小变动价位',
				dataIndex:'min_tick',

			},{
				title:'交割日期',
				dataIndex:'expiry',

			},{
				title:'乘数',
				dataIndex:'multiplier',

			},{
				title: '操作',
				key: 'action',
				fixed: 'right',
				render: (text, record,index) => (
					<span>
						<Tooltip title="创建交易合约">
							<a onClick={this.showAddVcontractsModal.bind(this,text)}>
								<Icon type="contacts" style={{ fontSize: 16}}/>
							</a>
						</Tooltip>
						<Divider type="vertical" />
						<a onClick={this.editContracts.bind(this,text)} >
							<Icon type="edit"  style={{ fontSize: 16}} />
						</a>
						<Divider type="vertical" />
						<a onClick={this.removeBasecontract.bind(this,text)} style={{color:"red"}}><Icon style={{ fontSize: 16}} type="delete" /></a>
						<Divider type="vertical" />
					</span>
					),
			}
		],
		contractInfo:{},
		info:{}
	}
	componentDidMount(){
		console.log('dd');
		this.props.dispatch({
			type:'contracts/fetch'
		})
	}
	removeBasecontract=(text)=>{
		const {dispatch}=this.props;
		console.log(text);
		confirm({
			title:'是否删除？',
			onOk(){
				dispatch({
					type:'contracts/remove',
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


	//编辑基础合约
	editContracts=(text)=>{
		console.log(text);
		this.setState({
			contractInfo:text,
			okText:'保存',
			modalVisible:true,
			formTitle:'编辑基础合约',
			currentEditId:text.id
		})
	}
	//保存
	saveClick=()=>{
		this.form.validateFields((err,values)=>{
			if(err){return}
			let params={
				id:this.state.currentEditId,
				...values,
				'expiry': values['expiry'].format('YYYYMMDD'),
				'contract_month': values['contract_month'].format('YYYYMM'),
			}
			this.props.dispatch({
				type:'contracts/update',
				payload:params
			}).then(()=>{
				this.setState({
					modalVisible:false
				})
				message.success('更新成功')
			})
			console.log('edit save values',params)

		})
	}
	//取消编辑基础合约
	cancelEdit=()=>{
		this.setState({modalVisible:false});
	}
	//取消增加交易合约
	cancelVcontractsAdd=()=>{
		this.setState({VcontractsModalVisible:false});
	}

	//显示创建交易合约对话框
	showAddVcontractsModal=(text)=>{
		const form=this.forms;
		// console.log(form)
		form.resetFields();
		this.setState({
			okText:'确定',
			VcontractsModalVisible:true,
			formTitle:'新增交易合约',
			info:text
		})
	}

	//新增交易合约
	addvcontracts=()=>{
		console.log('add');
		const form =this.forms;
		form.validateFields((err,fieldsValues)=>{
			if (err) {return}
			console.log(fieldsValues);
			this.props.dispatch({
				type:'vcontracts/add',
				payload:fieldsValues
			}).then(()=>{
				message.success('添加成功',1,()=>{this.props.history.push('/contract/vcontracts')})
			})

		})
	}

	// goEdit=(text)=>{
	// 	this.props.history.push(`/contract/editBasecontract/${text.id}`)
	// }

	// goAdd=(text)=>{
	// 	this.props.history.push(`/contract/addVcontract/${text.id}`)
	// }

	render(){
		console.log(this.props)
		const {columns,okText,modalVisible,contractInfo,info,
			cancelVcontractsAdd,VcontractsModalVisible,formTitle}=this.state
		const {loading} =this.props;
		const pagination = {
		    defaultCurrent: 1,
		    pageSize: 10,
		    showSizeChanger: true,
		}
		const contractsData=this.props.contracts.data.data
		return (
				<div>
					<PageHeaderLayout title="基础合约管理">
						<Card>
							<div style={{marginBottom: 16}}>
								<Button type="primary">
								同步合约
								</Button>
							</div>
							<AddContracts  //编辑基础合约
							ref={(form)=>this.form=form}
							onCreate={this.saveClick}
							isadd={false}
							info={info}
							onCancel={this.cancelEdit}
							contractInfo={contractInfo}
							visible={modalVisible}
							okText={okText}
							title={formTitle}
							  />

						 <AddVcontracts //新增交易合约
						 	info={info}
						 	isadd={true}
						 	visible={VcontractsModalVisible}
						 	onCancel={this.cancelVcontractsAdd}
						 	onCreate={this.addvcontracts}
						 	title={formTitle}
						 	okText={okText}
							ref={(form)=>this.forms=form}
						  />
							<Table loading={loading} rowKey='id'  pagination={pagination} columns={columns} dataSource={contractsData} scroll={{ x: 1500 }} />
						</Card>
					</PageHeaderLayout>


				</div>

			)


	}


}


export default Basecontract;

