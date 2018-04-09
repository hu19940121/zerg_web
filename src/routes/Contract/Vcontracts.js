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



const confirm = Modal.confirm;

@connect(({ loading,vcontracts}) => ({
  vcontracts,
  loading:loading.models.vcontracts,
}))


class Vcontracts extends PureComponent{

	constructor(props){
		super(props)
	}

	componentDidMount(){
		console.log('ee');
		this.props.dispatch({
			type:'vcontracts/fetch'
		})

	}


	state={
		columns :[
			{
			  title: '交易符号',
			  dataIndex: 'symbol',

			  fixed: 'left'
			},{
			  title: '中文名称',
			  dataIndex: 'cn_name',

			},{
				title:'交易模式',
				dataIndex:'trade_mode',
				align:'center'
			},{
				title:'合约编码',
				dataIndex:'contract_symbol',
				// render:(text, record,index)=>
				// 	text?<span>是</span>:<span>否</span>
			},{
				title:'交易所中的编码',
				dataIndex:'contract_local_symbol',
				// render:(text, record,index)=>
				// 	text?<span>是</span>:<span>否</span>
			},{
			  title: '乘数',
			  dataIndex: 'multiplier',

			  // fixed: 'left'
			},{
			  title: '最小变动价位',
			  dataIndex: 'contract_min_tick',
			  align:'center'
			  // fixed: 'left'
			},{
				title:'月份',
				dataIndex:'contract_month',
			},{
				title:'交割日期',
				dataIndex:'contract_expiry',
			},{
				title:'品种简称',
				dataIndex:'product_symbol',

			},{
				title:'证券类型',
				dataIndex:'product_sec_type',

			},{
				title:'交易所简称',
				dataIndex:'exchange_name',

			},{
				title:'货币',
				dataIndex:'product_currency',

			},{
				title:'品种中文名',
				dataIndex:'product_cn_name',

			},{
				title: '操作',
				key: 'action',
				fixed: 'right',
				render: (text, record,index) => (
					<span>
						<a onClick={this.editVcontracts.bind(this,text)}>
							<Icon type="edit"  style={{ fontSize: 16}} />
						</a>
						<Divider type="vertical" />
						<a  onClick={this.removeVcontract.bind(this,text)} style={{color:"red"}}><Icon style={{ fontSize: 16}} type="delete" /></a>
					</span>
					),
			}
		],
	}
	removeVcontract=(text)=>{
		console.log(text.id);
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
		console.log(text);
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
	onChange=(page,pagesize)=>{
		console.log(page,pagesize);
	}
	render(){
		const pagination = {
		    defaultCurrent: 1,
		    pageSize: 10,
		    showSizeChanger: true,
		    onChange:this.onChange
		}
		const {columns,modalVisible,formTitle,okText,vcontractInfo}=this.state;
		console.log(this.props);
		const vcontractsData=this.props.vcontracts.data.data;
		const {loading}=this.props;
		return (

				<div>
					<PageHeaderLayout title="交易合约管理">
						<Card>
							<div style={{marginBottom: 8}}>
								<Filter />
							</div>
							<Table  rowKey='id' loading={loading} pagination={pagination} scroll={{ x: 1500 }} columns={columns} dataSource={vcontractsData}  />
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


export default Vcontracts;

