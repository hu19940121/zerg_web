//基础合约
import React, { PureComponent } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Spin,List,Table,Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message, Badge, Divider ,Radio,Tooltip} from 'antd';
import { connect } from 'dva';
import styles from './Products.less';
import { Link } from 'react-router-dom';
import AddContracts from 'components/Modal/AddContracts';
import AddVcontracts from 'components/Modal/AddVcontracts';
import Filter from './Filter';
import currencies from '../../common/currencies.js';


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
			  title: '交易所编码',
			  dataIndex: 'local_symbol',

			  fixed: 'left'
			}, {
			  title: '中文名称',
			  dataIndex: 'cn_name',

			},{
				title:'交易模式',
				dataIndex:'trade_mode',
				align:'center',
				render:(text,record,index)=>(text=="bs"?　'买卖':'开平买卖')
			},{
				title:'主力合约',
				dataIndex:'most_active',
				render:(text, record,index)=>
					text?<span>是</span>:<span>否</span>
			},{
				title:'合同月份',
				dataIndex:'contract_month',
			},{
				title:'品种',
				dataIndex:'product_symbol',

			},{
				title:'证券类型',
				dataIndex:'product_sec_type',

			},{
				title:'货币',
				dataIndex:'product_currency',
			  render:(text,record,index)=>{
			  	var value=text;
					currencies.map((currency,index)=>{
						if (currency.en_name==text) {
							value=currency.cn_name
						}
					})
					return value;
			  }

			},{
				title:'交易所简称',
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
		info:{},
		keyword:''
	}
	componentDidMount(){
		this.props.dispatch({
			type:'contracts/fetch'
		})
	}
	removeBasecontract=(text)=>{
		const {dispatch}=this.props;
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
		this.form.resetFields()
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
		const form =this.forms;
		form.validateFields((err,fieldsValues)=>{
			if (err) {return}
			this.props.dispatch({
				type:'vcontracts/add',
				payload:fieldsValues
			}).then(()=>{
				message.success('添加成功',1,()=>{this.props.history.push('/contract/vcontracts')})
			})

		})
	}

	//更改每页显示的条数触发
	onShowSizeChange=(current,size)=>{
		console.log(current,size);
	}

	//搜索
	handleSearch = () => {
		const {dispatch} = this.props;
	  this.searchForm.validateFields((err,fields)=>{
	  	if (err) {return}
	  	this.setState({
	  		keyword:fields.keyword
	  	})
	  	const params={
	  		query:fields.keyword
	  	}
	  	dispatch({
	  		type: 'contracts/search',
	  		payload:params
	  	}).then(()=>{
	  		if (this.props.contracts.data.status=='error') {
	  			const msg=this.props.contracts.data.msg
	  			this.error(msg)
	  		}
	  	})
	  })
	}

	//重置
	FormReset=()=>{
		this.searchForm.resetFields();
		this.setState({
			keyword:''
		})
		this.props.dispatch({
			type:'contracts/fetch',
			payload: {}
		})
	}

	error = (msg) => {
	  message.error(msg);
	}

	//table　onChange事件
	tableChange=(pagination, filtersArg, sorter)=>{
		
		const {keyword}=this.state;
		const params={
			page:pagination.current,
			query:keyword
		}
		// if (sorter.field) {
		//   params.sorter = `${sorter.field}_${sorter.order}`;
		// }
		if (keyword=='') {  //判断查询条件是否为空
			this.props.dispatch({
				type:'contracts/fetch',
				payload:params
			})
		}else{
			const params={
				page:pagination.current,
				query:keyword
			}
			this.props.dispatch({
				type:'contracts/search',
				payload:params
			})
		}
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
		const paginate=this.props.contracts.data.paginate;
		const pagination = {
		    current:paginate.current,
		    defaultCurrent: paginate.current,
		    pageSize: paginate.page_size,
		    total:paginate.total_count,
		    showSizeChanger: true,
		    onShowSizeChange:this.onShowSizeChange
		}
		const contractsData=this.props.contracts.data.data
		return (
				<div>
					<PageHeaderLayout title="基础合约管理">
						<Card>
							<div >
								<Row>
									<Col md={12} sm={24}>
										<Button type="primary">
										同步合约
										</Button>
									</Col>
									<Col md={12} sm={24} >
										<Filter
										handleSearch={this.handleSearch}
										formReset={this.FormReset}
										ref={(form)=>this.searchForm=form} />
									</Col>
								</Row>
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
							<Table loading={loading} rowKey='id'  pagination={pagination} columns={columns} 
							dataSource={contractsData} scroll={{ x: 1400 }} onChange={this.tableChange} />
						</Card>
					</PageHeaderLayout>


				</div>

			)


	}


}


export default Basecontract;

