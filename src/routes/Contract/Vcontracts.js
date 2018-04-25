//交易合约

//基础合约
import React, { PureComponent } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Spin,List,Table,Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber,
 DatePicker, Modal, message, Badge, Divider ,Radio,Tooltip} from 'antd';
import { connect } from 'dva';
import Filter from './Filter';
import { Link } from 'react-router-dom';
import AddVcontracts from 'components/Modal/AddVcontracts';
import currencies from '../../common/currencies.js';

const FormItem = Form.Item;
const confirm = Modal.confirm;
const Option = Select.Option;
const AddToGroupForm=Form.create()((props)=>{
	const {visible,form,okHandle,handleModalVisible,groups} =props;
	return (
		<Modal
			title="添加合约至合约组"
			visible={visible}
			onOk={okHandle}
			onCancel={handleModalVisible}
			>
				<FormItem
					labelCol={{span:5}}
					wrapperCol={{span:15}}
					label="请选择合约组:"
				>
				{form.getFieldDecorator('vcontract_groups_id', {
				  rules: [{ required: true, message: '请选择合约组' }],
				})(
				  <Select  style={{ width: 200 }} placeholder="请选择合约组">
				  		{
				  			groups.map((item,index)=>{
				  				return (
				  					<Option key={index} value={item.id}>{item.name}</Option>
				  					)
				  			})
				  		}
				  </Select>
				)}
				</FormItem>
		</Modal>


		)
})
@connect(({ loading,vcontracts,vcontract_groups}) => ({
  vcontract_groups,
  vcontracts,
  loading:loading.models.vcontracts,
}))


class Vcontracts extends PureComponent{

	constructor(props){
		super(props)
	}

	componentDidMount(){

		this.props.dispatch({
			type:'vcontracts/fetch'
		})

		this.props.dispatch({
			type:'vcontract_groups/fetch'
		})

	}


	state={
		columns :[
			{
			  title: '交易符号',
			  dataIndex: 'symbol',

			  fixed: 'left'
			},{
				title:'合约编码',
				dataIndex:'contract_symbol',
				// render:(text, record,index)=>
				// 	text?<span>是</span>:<span>否</span>
			},{
				title:'交易所编码',
				dataIndex:'contract_local_symbol',
				// render:(text, record,index)=>
				// 	text?<span>是</span>:<span>否</span>
			},{
			  title: '中文名称',
			  dataIndex: 'cn_name',

			},{
				title:'交易模式',
				dataIndex:'trade_mode',
				render:(text,record,index)=>(text=="bs"?　'买卖':'开平买卖')
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
			  title: '最小变动价位',
			  dataIndex: 'contract_min_tick',
			  // fixed: 'left'
			},{
				title:'交割日期',
				dataIndex:'contract_expiry',
			},{
			  title: '乘数',
			  dataIndex: 'multiplier',

			  // fixed: 'left'
			},{
				title: '操作',
				key: 'action',
				fixed: 'right',
				render: (text, record,index) => (
					<span>
						<Tooltip title="添加合约至合约组">
							<a onClick={this.showAddToGroup.bind(this,text)}>
								<Icon type="file-add"  style={{ fontSize: 16}} />
							</a>
						</Tooltip>
						<Divider type="vertical" />
						<Tooltip title="编辑">
							<a onClick={this.editVcontracts.bind(this,text)}>
								<Icon type="edit"  style={{ fontSize: 16}} />
							</a>
						</Tooltip>
						<Divider type="vertical" />
						<Tooltip title="删除">
							<a  onClick={this.removeVcontract.bind(this,text)} style={{color:"red"}}>
								<Icon style={{ fontSize: 16}} type="delete" />
							</a>
						</Tooltip>
					</span>
					),
			}
		],
		keyword:'',
		selectedRowKeys: [],
		v_contract_group_ids:[],
		v_contract_ids:[]
	}
	removeVcontract=(text)=>{
		const {dispatch}=this.props
		confirm({
			title:'是否删除？',
			onOk(){
				dispatch({
					type:'vcontracts/remove',
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
	//编辑交易合约
	editVcontracts=(text)=>{
		this.form.resetFields()

		this.setState({
			vcontractInfo:text,
			okText:'保存',
			modalVisible:true,
			formTitle:'编辑交易合约',
			currentEditId:text.id
		})
	}
	//保存
	saveClick=()=>{
		const form =this.form;
		form.validateFields((err,fieldsValue)=>{
			if (err) {return false}
			const params={
				id:this.state.currentEditId,
				...fieldsValue
			}

			this.props.dispatch({
				type:'vcontracts/update',
				payload:params
			}).then(()=>{
				this.setState({
					modalVisible:false
				})
				message.success('更新成功')
			})
		})

	}

	cancelVcontractsEdit=()=>{
		this.setState({
			modalVisible:false,
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
			type: 'vcontracts/search',
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
			type:'vcontracts/fetch',
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
				type:'vcontracts/fetch',
				payload:params
			})
		}else{
			const params={
				page:pagination.current,
				query:keyword
			}
			this.props.dispatch({
				type:'vcontracts/search',
				payload:params
			})
		}
	}
	//显示添加到交易合约弹窗
	showAddToGroup=(text)=>{

		const data=this.props.vcontract_groups.data.data;
		const {v_contract_ids,selectedRowKeys} =this.state;

		//默认选中第一个合约组
		this.Groupform.setFieldsValue({
			vcontract_groups_id:data[0].id
		})

		//判断是否多选
		if (selectedRowKeys.length>0) {
			this.setState({
				addToGroupmodalVisible:true,
				v_contract_ids
			})
		}else{
			const tempArr=[];
			tempArr.push(text.id)
			this.setState({
				addToGroupmodalVisible:true,
				v_contract_ids:tempArr
			})
		}

	}
	//添加一个交易合约到合约组
	addToGroup=()=>{
		const {v_contract_ids}=this.state;
		this.Groupform.validateFields((err,fields)=>{
			console.log(fields);
			//判断是否只有一个交易合约
			if (v_contract_ids.length>1) {
				const params={
					v_contract_ids,
					v_contract_group_id:fields.vcontract_groups_id
				}
				console.log(params);
				this.props.dispatch({
						type:'vcontracts_in_groups/batchAdd',
						payload:params
					}).then(()=>{
						message.success('添加成功')
						this.setState({
							addToGroupmodalVisible:false,
						})
					})
			}else{
				const params={
					v_contract_id:v_contract_ids,
					v_contract_group_id:fields.vcontract_groups_id
				}
				this.props.dispatch({
						type:'vcontracts_in_groups/addOne',
						payload:params
					}).then(()=>{
						message.success('添加成功')
						this.setState({
							addToGroupmodalVisible:false,
						})
					})
			}
		})
	}


	//取消添加交易到合约组
	handleModalVisible = () => {
	  this.setState({
	    addToGroupmodalVisible: false,
	  });
	}
	//选择交易合约
	onSelectChange = (selectedRowKeys) => {
	  console.log('selectedRowKeys changed: ', selectedRowKeys);
	  this.setState({
	   selectedRowKeys,
	   v_contract_ids:selectedRowKeys
	 });
	}
	handleMenuClick=()=>{
		
	}
	render(){

		const menu = (
		  <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
		    <Menu.Item key="remove">删除</Menu.Item>
		    <Menu.Item key="approval">批量审批</Menu.Item>
		  </Menu>
		);

		const paginate=this.props.vcontracts.data.paginate;

		const pagination = {
				current:paginate.current,
		    defaultCurrent: paginate.current,
		    pageSize: paginate.page_size,
		    total:paginate.total_count,
		    showSizeChanger: true,
		    onShowSizeChange:this.onShowSizeChange
		}
		const {columns,modalVisible,formTitle,okText,vcontractInfo,
			addToGroupmodalVisible,selectedRowKeys}=this.state;
		// console.log(this.props);
		const vcontractsData=this.props.vcontracts.data.data;
		const groups=this.props.vcontract_groups.data.data;
		const {loading}=this.props;
		const rowSelection = {
		      selectedRowKeys,
		      onChange: this.onSelectChange,
		    };
		return (
				<div>
					<PageHeaderLayout title="交易合约管理">
						<Card>
							<div>
								<Row>
									<Col >
										<Filter
										handleSearch={this.handleSearch}
										formReset={this.FormReset}
										ref={(form)=>this.searchForm=form} />
									</Col>
								</Row>
								{
								    selectedRowKeys.length>0 && (
								    <span >
								      <Button onClick={this.showAddToGroup}>批量添加到合约组</Button>
								      <Dropdown overlay={menu}>
								        <Button style={{marginLeft:10}}>
								          更多操作 <Icon type="down" />
								        </Button>
								      </Dropdown>
								    </span>
								  )
								}
							</div>
							<Table  rowKey='id' loading={loading}
							pagination={pagination}
							scroll={{ x: 1410}}
							columns={columns}
							dataSource={vcontractsData}
							onChange={this.tableChange}
							rowSelection={rowSelection}

							 />
							<AddVcontracts //编辑交易合约
								vcontractInfo={vcontractInfo}
							 	isadd={false}
							 	visible={modalVisible}
							 	onCancel={this.cancelVcontractsEdit}
							 	onCreate={this.saveClick}
							 	title={formTitle}
							 	okText={okText}
								ref={(form)=>this.form=form}
							  />
							<AddToGroupForm
								visible={addToGroupmodalVisible}
								okHandle={this.addToGroup}
								handleModalVisible={this.handleModalVisible}
								groups={groups}
								ref={(form)=>this.Groupform=form}
							/>
						</Card>
					</PageHeaderLayout>
				</div>

			)


	}


}


export default Vcontracts;

