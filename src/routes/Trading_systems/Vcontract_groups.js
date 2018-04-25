//合约组管理
import React, { PureComponent } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Spin,List,Table,Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber,
 DatePicker, Modal, message, Badge, Divider ,Radio,Tooltip} from 'antd';
import { connect } from 'dva';
import Filter from '../Contract/Filter';
import currencies from '../../common/currencies.js';
import styles from './Vcontract_groups.less';
import AddVcontracts from 'components/Modal/AddVcontracts';
import AddVcontractsToGroup from 'components/Modal/AddVcontractsToGroup'
const confirm = Modal.confirm;



// ]
@Form.create()
@connect(({vcontract_groups,vcontracts_in_groups,loading,vloading,vcontracts})=>({
	vcontract_groups,
	vcontracts_in_groups,
	vcontracts,
	loading:loading.models.vcontract_groups,
	vloading:loading.models.vcontracts_in_groups,
}))


class Vcontract_groups extends PureComponent{

	constructor(props){
		super(props)
	}

	componentDidMount(){
		this.props.dispatch({
			type:'vcontract_groups/fetch'
		})

	}
	state={
		columns :[
			{
			  title: '合约组名称',
			  dataIndex: 'name',
			  // align:'center',
			  // fixed: 'left'
			}, {
			  title: '交易合约数量',
			  dataIndex: 'count',

			  // align:'center',
			  // fixed: 'left'
			},{
				title: '操作',
				key: 'action',
				// fixed: 'right',
				render: (text, record,index) => (
					<span>
						<Tooltip title='查看合约组内的信息'>
							<a ><Icon type="exception" style={{ fontSize: 16}} /></a>
						</Tooltip>
						<Divider type='vertical' />
						<a ><Icon type="edit"  style={{ fontSize: 16}} /></a>
					</span>
					),
			}
		],
		expandedRow:[],
		vcontracts_in_groups:[],
		vcontractInfo:{},
		vcontract_group_id:'',
		selectedRowKeys: [],
		keyword:'',
		v_contract_group_ids:'',
		v_contract_ids:''
	}

	//额外的展开行
	expandedRowRender=(text, record,index)=>{
		const {vcontracts_in_groups}=this.state;

		const {vloading}=this.props
		const columns =[
			{
			  title: '交易符号',
			  dataIndex: 'symbol',
			  fixed:'left',
			  className:styles.columns
			},{
			  title: '中文名称',
			  dataIndex: 'cn_name',
			  fixed:'left',
			  className:styles.columns

			},{
				title:'交易模式',
				dataIndex:'trade_mode',
				className:styles.columns,
				align:'center',
				render:(text,record,index)=>(text=="bs"?　'买卖':'开平买卖')
			},{
				title:'合约编码',
				dataIndex:'contract_symbol',
				className:styles.columns
				// render:(text, record,index)=>
				// 	text?<span>是</span>:<span>否</span>
			},{
				title:'交易所编码',
				dataIndex:'contract_local_symbol',
				className:styles.columns
				// render:(text, record,index)=>
				// 	text?<span>是</span>:<span>否</span>
			},{
			  title: '乘数',
			  dataIndex: 'multiplier',
			  className:styles.columns,

			  // fixed: 'left'
			},{
			  title: '最小变动价位',
			  dataIndex: 'contract_min_tick',
			  className:styles.columns,
			  align:'center'
			  // fixed: 'left'
			},{
				title:'月份',
				dataIndex:'contract_month',
				className:styles.columns,
			},{
				title:'交割日期',
				dataIndex:'contract_expiry',
				className:styles.columns,
			},{
				title:'品种',
				dataIndex:'product_symbol',
				className:styles.columns,

			},{
				title:'证券类型',
				dataIndex:'product_sec_type',
				className:styles.columns

			},{
				title:'交易所简称',
				dataIndex:'exchange_name',
				className:styles.columns

			},{
				title:'货币',
				className:styles.columns,
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
				className:styles.columns,
				title: '操作',
				key: 'action',
				fixed:'right',
				render: (text, record,index) => (
					<span>
						<Tooltip title="编辑">
							<a　onClick={this.editVcontracts.bind(this,text)}>
								<Icon type="edit"  style={{ fontSize: 16}} />
							</a>
						</Tooltip>
						<Divider type="vertical" />
						<Tooltip title="从合约组内删除">
							<a onClick={this.removeVcontractInGroup.bind(this,text)} style={{color:"red"}}><Icon style={{ fontSize: 16}} type="delete" /></a>
						</Tooltip>
					</span>
					),
			}
		]
		return(
			<Table
			loading={vloading}
			className={styles.background}
			rowKey='id'
			dataSource={vcontracts_in_groups}　
			columns={columns}
			size="small"
			scroll={{x:1100}}
			style={{width:900}}

			/>

			)
		// console.log(text);
		// this.props.dispatch({
		// 	type:'vcontracts_in_groups/fetch',
		// 	payload:text.id
		// })

	}
	//刷新数据
	refresh=()=>{
			this.setState({vcontracts_in_groups:this.props.vcontracts_in_groups.data.data})
	}

	//编辑交易合约
	editVcontracts=(text)=>{
		this.form.resetFields()
		// console.log(text);
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
			console.log(params);
			this.props.dispatch({
				type:'vcontracts_in_groups/updateIn',
				payload:params
			}).then(()=>{
				this.setState({
					modalVisible:false
				})
				this.refresh()
				message.success('更新成功')
			})
		})

	}
	//取消编辑
	cancelVcontractsEdit=()=>{
		this.setState({
			modalVisible:false,
			addToGroupVisible:false
		})
	}
	//删除合约组内交易合约
	removeVcontractInGroup=(text)=>{
		var that=this;
		const {vcontract_group_id}=this.state
		const {dispatch}=this.props
		confirm({
			title:'是否在合约组内移除此合约',
			onOk(){
				const params={
					v_contract_id:text.id,
					v_contract_group_id:vcontract_group_id
				}
				// console.log('移除合约组内的合约传的参数',params);
				dispatch({
					type:'vcontracts_in_groups/remove',
					payload:params

				}).then(()=>{
					message.success('删除成功')
					that.refresh()
				})
			},
			onCancel(){
			}
		})



	}
	//点击展开图标时触发
	onExpand=(expanded, record)=>{
		// console.log(expanded,record);
		this.setState({vcontract_group_id:record.id})
		this.props.dispatch({
			type:'vcontracts_in_groups/fetch',
			payload:record.id
		}).then(()=>{
			this.setState({vcontracts_in_groups:this.props.vcontracts_in_groups.data.data})
		})
	}

	// 展开的行变化时触发
	onExpandedRowsChange=(expandedRows)=>{
		var expandedRow=[];
		if(expandedRows.length !== 0){
		  expandedRow.push(expandedRows[expandedRows.length-1]);
		}
		// console.log(expandedRow);
		this.setState({expandedRow})
	}

	//添加交易合约至合约组
	// addToGroup=()=>{
	// 	console.log('addToGroup');
	// 	const {v_contract_ids,v_contract_group_ids} =this.state;

	// 	// console.log(v_contract_ids,v_contract_group_ids);
	// 	if (v_contract_ids ==''|| v_contract_group_ids=='') {
	// 		console.log(v_contract_ids,v_contract_group_ids);
	// 		return false
	// 	}
	// 	const params={
	// 		v_contract_ids,
	// 		v_contract_group_ids
	// 	}
	// 	this.props.dispatch({
	// 		type:'vcontracts_in_groups/add',
	// 		payload:params
	// 	}).then(()=>{
	// 		message.success('添加成功')
	// 		this.setState({addToGroupVisible:false})
	// 	})
	// 	console.log(params);
	// }

	// showAddToGroup=()=>{

	// 	const data=this.props.vcontract_groups.data.data;
	// 	const tempArr=[data[0].id];　//定义临时数组　用来
	// 	// tempArr.push()
	// 	this.setState({
	// 		selectedRowKeys: [],
	// 		v_contract_group_ids:tempArr
	// 	})
	// 	this.forml.setFieldsValue({
	// 		vcontract_groups:data.length>0 ? data[0].id:''
	// 	})

	// 	//请求全部基础合约　显示在要选择的ｍｏｄａｌ中
	// 	this.props.dispatch({
	// 		type:'vcontracts/fetch',
	// 	}).then(()=>{
	// 		this.setState({
	// 			vcontractsData:this.props.vcontracts.data.data,
	// 		})

	// 	})
	// 	this.setState({
	// 		addToGroupVisible:true,
	// 		okText:'确定',
	// 		formTitle:'添加交易合约至合约组'
	// 	})
	// }
	//选择交易合约
	// onSelectChange = (selectedRowKeys) => {
	//   console.log('selectedRowKeys changed: ', selectedRowKeys);
	//   this.setState({
	//    selectedRowKeys,
	//    v_contract_ids:selectedRowKeys
	//  });
	// }

	//选择合约组

	// onSelectGroupChange=(value)=>{

	// 	const v_contract_group_ids=[]
	// 	v_contract_group_ids.push(value)
	// 	console.log(v_contract_group_ids);
	// 	// console.log(v_contract_group_ids);
	// 	this.setState({
	// 		v_contract_group_ids
	// 	})

	// }
	//table　onChange事件
	vtableChange=(pagination, filtersArg, sorter)=>{
		// console.log(sorter,pagination);
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
			}).then(()=>{
				this.setState({
					vcontractsData:this.props.vcontracts.data.data
				})
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

	render(){
		const vpaginate=this.props.vcontracts.data.paginate;

		const vpagination = {
				current:vpaginate.current,
		    defaultCurrent: vpaginate.current,
		    pageSize: vpaginate.page_size,
		    total:vpaginate.total_count,
		    showSizeChanger: true,
		    // onShowSizeChange:this.onShowSizeChange
		}

		const pagination = {
		    defaultCurrent: 1,
		    pageSize: 10,
		    showSizeChanger: true,
		}
		const {loading}=this.props
		const {columns,expandedRow,vcontractInfo,modalVisible,
					formTitle,okText,addToGroupVisible,vcontractsData,
					selectedRowKeys,defaultSelectValue} =this.state;
		const data=this.props.vcontract_groups.data.data;
		console.log(this.props);
		const rowSelection = {
		      selectedRowKeys,
		      onChange: this.onSelectChange,
		    };
		return (

				<div>
					<PageHeaderLayout title='合约组管理'>
						<Card >
							<Table
							 expandedRowRender={this.expandedRowRender}
							 rowKey='id'
							 loading={loading}
							 columns={columns}
							 pagination={pagination}
							 dataSource={data}
							 onExpand={this.onExpand}
							 onExpandedRowsChange={this.onExpandedRowsChange}
							 expandedRowKeys={expandedRow}


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
						</Card>
					</PageHeaderLayout>
				</div>

			)


	}


}


export default Vcontract_groups;
