//合约品种
import React, { PureComponent } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Spin,List,Table,Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message, Badge, Divider ,Radio,Tooltip} from 'antd';
import { connect } from 'dva';
import Filter from './Filter';
import AddProducts from 'components/Modal/AddProducts';
import AddContracts from 'components/Modal/AddContracts';
import AddTrade_sessions from 'components/Modal/AddTrade_sessions';
import styles from './Products.less';
import { Link } from 'react-router-dom';
import currencies from '../../common/currencies.js';

const confirm = Modal.confirm;


@connect(({ products,loading,exchanges,contracts,sessions_in_products}) => ({
  products,
  exchanges,
  contracts,
  sessions_in_products,
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
			if (this.props.exchanges.data.msg) {
				const msg=this.props.exchanges.data.msg
				this.error('exchanges '+msg)
			}else{
				this.setState({
					exchanges:this.props.exchanges.data.data
				})
			}
		})

	}
	state={
		columns :[
			{
			  title: '简称',
			  dataIndex: 'symbol',
			}, {
			  title: '类别',
			  dataIndex: 'sec_type',
			}, {
			  title: '货币',
			  dataIndex: 'currency',
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
				title:'交易模式',
				dataIndex:'trade_mode',
				width:60,
				render:(text,record,index)=>(text=="bs"?　'买卖':'开平买卖')
			},{
				title:'名称',
				dataIndex:'cn_name',
				className:styles.noWrap
			},{
				title:'交易所',
				dataIndex:'exchange_cn_name',
				width:140,
				className:styles.noWrap

			},{
				title: '操作',
				key: 'action',
				width:'400',
				render: (text, record,index) => (
					<span>
						<Tooltip title="编辑交易时段">
							<a onClick={this.showTrade_sessions.bind(this,text)}><Icon  type="clock-circle-o" style={{ fontSize: 16}}/> </a>
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
		contractInfo:{},
		keyword: '',
		sessions:{},
		isadd:true,

	}
	error = (msg) => {
	  message.error(msg);
	}
	showEditForm=(text)=>{
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
		this.setState({keyword:''})
		const form=this.form;
		form.resetFields();
		// this.searchForm.resetFields();
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
			let params={
				...values
			};
			this.props.dispatch({
				type:'products/add',
				payload:params,
				callback:()=>{
					message.success('添加成功')
				}
			});
			this.form.resetFields();
			this.setState({ modalVisible: false });
		})
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
		})
	}
	//取消增加合约品种
	cancelAdd=()=>{
		this.setState({modalVisible:false});
	}
	cancelContractsAdd=()=>{
		this.setState({ContractsModalVisible:false});
	}

	//显示新增或者编辑交易时段对话框
	showTrade_sessions=(text)=>{
		this.trade_sessions_form.resetFields()
		console.log('texttexttexttexttexttexttexttext',text);
		this.props.dispatch({
			type:'sessions_in_products/fetch',
			payload:text.id
		}).then(()=>{
			if (this.props.sessions_in_products.data.status=='NO') {
				const data=this.props.sessions_in_products.data.data
				this.setState({
					sessionsVisible:true,
					formTitle:'编辑交易时段',
					okText:'保存',
					product_id:data.id,
					sessions:data,
					isadd:false
				})
			}else{
				this.setState({
					sessionsVisible:true,
					formTitle:'新增交易时段',
					okText:'确定',
					product_id:text.id,
					sessions:{},
					isadd:true
				})
			}
		})
	}
	//新增交易时段
	addTrade_sessions=()=>{
		const {product_id}=this.state;
		this.trade_sessions_form.validateFields((err,fields)=>{
			const params={
				 mon:[`${fields['mon_startime'].format('HH:mm')}`,`${fields['mon_endtime'].format('HH:mm')}`],
				 tue:[`${fields['tue_startime'].format('HH:mm')}`,`${fields['tue_endtime'].format('HH:mm')}`],
				 wed:[`${fields['wed_startime'].format('HH:mm')}`,`${fields['wed_endtime'].format('HH:mm')}`],
				 thu:[`${fields['thu_startime'].format('HH:mm')}`,`${fields['thu_endtime'].format('HH:mm')}`],
				 fri:[`${fields['fri_startime'].format('HH:mm')}`,`${fields['fri_endtime'].format('HH:mm')}`],
				 sat:[`${fields['sat_startime'].format('HH:mm')}`,`${fields['sat_endtime'].format('HH:mm')}`],
				 sun:[`${fields['sun_startime'].format('HH:mm')}`,`${fields['sun_endtime'].format('HH:mm')}`],
				 product_id
			}
			this.props.dispatch({
				type:'trade_sessions/add',
				payload:params
			}).then(()=>{
				message.success('添加成功')
				this.setState({
					sessionsVisible:false,
				})
			})

			// console.log(params);
		})
			console.log('add');
	}
	//保存交易时段
	saveTrade_sessions=()=>{
		console.log('save');
		const {product_id}=this.state;
		this.trade_sessions_form.validateFields((err,fields)=>{
			const params={
				 mon:[`${fields['mon_startime'].format('HH:mm')}`,`${fields['mon_endtime'].format('HH:mm')}`],
				 tue:[`${fields['tue_startime'].format('HH:mm')}`,`${fields['tue_endtime'].format('HH:mm')}`],
				 wed:[`${fields['wed_startime'].format('HH:mm')}`,`${fields['wed_endtime'].format('HH:mm')}`],
				 thu:[`${fields['thu_startime'].format('HH:mm')}`,`${fields['thu_endtime'].format('HH:mm')}`],
				 fri:[`${fields['fri_startime'].format('HH:mm')}`,`${fields['fri_endtime'].format('HH:mm')}`],
				 sat:[`${fields['sat_startime'].format('HH:mm')}`,`${fields['sat_endtime'].format('HH:mm')}`],
				 sun:[`${fields['sun_startime'].format('HH:mm')}`,`${fields['sun_endtime'].format('HH:mm')}`],
				 product_id
			}
			this.props.dispatch({
				type:'trade_sessions/update',
				payload:params
			}).then(()=>{
				message.success('更新成功')
				this.setState({
					sessionsVisible:false,
				})
			})

			// console.log(params);
		})
	}
	//取消添加交易时段
	cancelTrade_session=()=>{
		this.setState({
			sessionsVisible:false,
		})
	}
	onSelectChange = (selectedRowKeys) => {
	  // console.log('selectedRowKeys changed: ', selectedRowKeys);
	  this.setState({ selectedRowKeys });
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
	  		type: 'products/search',
	  		payload:params
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
			type:'products/fetch',
			payload: {}
		})
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
				type:'products/fetch',
				payload:params
			})
		}else{
			const params={
				page:pagination.current,
				query:keyword
			}
			this.props.dispatch({
				type:'products/search',
				payload:params
			})
			
		}
	}
	//更改每页显示的条数触发
	onShowSizeChange=(current,size)=>{
		// console.log(current,size);
	}


	render(){

		// console.log(this.props)
		const {	selectedRowKeys ,columns,okText,isCreate,formTitle,
						modalVisible,exchanges,initValues,info,contractInfo,ContractsModalVisible,
						cancelContractsAdd,saveContractsRef,sessionsVisible,sessions,isadd} = this.state;
		const {loading}=this.props;
		//获取数据
		const data=this.props.products.data.data
		//获取分页信息
		const paginate=this.props.products.data.paginate;

		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
		  };
		const pagination = {
			current:paginate && paginate.current,
	    defaultCurrent: paginate &&  paginate.current,
	    pageSize: paginate &&  paginate.page_size,
	    total:paginate &&  paginate.total_count,
	    showSizeChanger: true,
	    onShowSizeChange:this.onShowSizeChange
		}
		// const pagination = {
		//     defaultCurrent: 1,
		//     pageSize:10,
		//     showSizeChanger: true,
		//     onChange:this.pageChange
		// }

		return (
				<PageHeaderLayout title="合约品种管理">
					<Card>
						<div style={{ marginBottom: 10 }}>
						<div >
							<Row>
								<Col md={12}>
									<Button type="primary" onClick={this.showAddModal}>
									新增合约品种
									</Button>
									<Button style={{marginLeft:16}}type="primary">
									同步品种
									</Button>
								</Col>
								<Col md={12}>
									<Filter handleSearch={this.handleSearch} formReset={this.FormReset}  ref={(form)=>this.searchForm=form} />
								</Col>
							</Row>
							<AddProducts
								visible={modalVisible}
								onCancel={this.cancelAdd}
								onCreateOrSave={isCreate?this.addProducts:this.saveClick}
								title={formTitle}
								okText={okText}
								ref={(form)=>this.form=form}
								exchanges={exchanges}
							 />
							 <AddContracts　　//新增基础合约
							 	info={info}
							 	isadd={true}
							 	visible={ContractsModalVisible}
							 	onCancel={this.cancelContractsAdd}
							 	onCreate={this.addContracts}
							 	title={formTitle}
							 	okText={okText}
								ref={(form)=>this.forms=form}
							  />
						   <AddTrade_sessions//新增交易时段
						    sessions={sessions}
						   	visible={sessionsVisible}
						   	onCancel={this.cancelTrade_session}
						   	onCreate={isadd?this.addTrade_sessions:this.saveTrade_sessions}
						   	title={formTitle}
						   	okText={okText}
						  	ref={(form)=>this.trade_sessions_form=form}
						    />

						</div>
							<Table loading={loading} rowKey="id" rowSelection={rowSelection} 
							pagination={pagination} style={{ whiteSpace:'nowrap'}} columns={columns} dataSource={data} onChange={this.tableChange}/>
						</div>
					</Card>
				</PageHeaderLayout>


			)


	}


}


export default Products;

