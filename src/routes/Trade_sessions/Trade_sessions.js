//Dashboard

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Spin,List,Table,Row, Col, Card, Form, Input, Select,
				 Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, 
				 message, Badge, Divider ,Radio,Calendar} from 'antd';
import React, { PureComponent } from 'react';
import Filter from '../Contract/Filter'
import moment from 'moment';
import AddTrade_sessions from 'components/Modal/AddTrade_sessions';
import { connect } from 'dva';
import Styles from './Trade_sessions.less'
const confirm = Modal.confirm;
@connect(({trade_sessions,loading})=>({
	trade_sessions,
	loading:loading.models.trade_sessions,
}))
class Trading_sessions extends PureComponent{

	constructor(props){
		super(props)
	}
	state={
		columns:[
			{
				title:'symbol',
				dataIndex:'symbol',
				width:120,
			},{
				title:'Mon',
				dataIndex:'mon',
				width:120,
				render:(text)=>this.formatTimeRnage(text)
			},{
				title:'Tue',
				dataIndex:'tue',
				width:120,
				render:(text)=>this.formatTimeRnage(text)
			},{
				title:'Wed',
				dataIndex:'wed',
				width:120,
				render:(text)=>this.formatTimeRnage(text)
			},{
				title:'Thu',
				dataIndex:'thu',
				width:120,
				render:(text)=>this.formatTimeRnage(text)
			},{
				title:'Fri',
				dataIndex:'fri',
				width:120,
				render:(text)=>this.formatTimeRnage(text)
			},{
				title:'Sat',
				dataIndex:'sat',
				width:120,
				render:(text)=>this.formatTimeRnage(text)
			},{
				title:'Sun',
				dataIndex:'sun',
				width:120,
				render:(text)=>this.formatTimeRnage(text)
			},{
			title: '操作',
			key: 'action',
			// className:Styles.columnStyle,
			
			width:110,
			render: (text, record,index) => (
				<span>
				<a onClick={this.edit.bind(this,text)}><Icon type="edit"  style={{ fontSize: 18 }} /></a>
				<Divider type="vertical" />
				<a onClick={this.remove.bind(this,text)} style={{color:"red"}}><Icon style={{ fontSize: 18 }} type="delete" /></a>
				</span>
				),
		}


		],
		keyword:'',
		sessions:{},
	}
	componentDidMount(){
			this.props.dispatch({
				type:'trade_sessions/fetch'
			})


	}

	//格式化显示的时间段　注：如果返回值存在数组
	formatTimeRnage=(text)=>{
		if (Array.isArray(text)) {
			return text[0]+'-'+text[1]
		}else{
			return text
		}
	}
	//编辑
	edit=(text)=>{
		console.log(text);
		this.setState({
			sessions:text,
			sessionsVisible:true,
			product_id:text.id
		})
	}
	//保存交易时段
	saveTrade_sessions=()=>{
		console.log('保存');
		const {product_id} =this.state;
		this.trade_sessions_form.validateFields((err,fields)=>{
			console.log(fields);
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

			console.log(params);
		})
	}

	cancelTrade_session=()=>{
		this.setState({
			sessionsVisible:false,
		})
	}


	//删除
	remove=(text)=>{
		console.log(text);
		const{dispatch} =this.props;
		confirm({
			title:'是否删除？',
			onOk(){
				dispatch({
					type:'trade_sessions/remove',
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
	//搜索
	handleSearch=()=>{

	}

	//重置
	FormReset=()=>{

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
			console.log(params);
			this.props.dispatch({
				type:'trade_sessions/fetch',
				payload:params
			})
		}else{
			const params={
				page:pagination.current,
				query:keyword
			}
			this.props.dispatch({
				type:'trade_sessions/search',
				payload:params
			})
		}
	}

	render(){
			const {columns,sessions,sessionsVisible}=this.state
			console.log(this.props);
			const data=this.props.trade_sessions.data.data
			const paginate=this.props.trade_sessions.data.paginate;
			const {loading}=this.props;
			const pagination = {
				current:paginate && paginate.current,
		    defaultCurrent: paginate &&  paginate.current,
		    pageSize: paginate &&  paginate.page_size,
		    total:paginate &&  paginate.total_count,
		    showSizeChanger: true,
		    onShowSizeChange:this.onShowSizeChange
			}
		return (
				<PageHeaderLayout title="交易时段">
					<Card title='已设置交易时段的合约品种'>
						<Filter
						handleSearch={this.handleSearch}
						formReset={this.FormReset}
						ref={(form)=>this.searchForm=form} />
						<Table
						loading={loading}
						pagination={pagination}　
						rowKey="id"
						dataSource={data}
						columns={columns}
						onChange={this.tableChange}

						 />


					</Card>
					 <AddTrade_sessions//编辑交易时段
					  sessions={sessions}
					 	visible={sessionsVisible}
					 	onCancel={this.cancelTrade_session}
					 	onCreate={this.saveTrade_sessions}
					 	title='编辑交易时段'
					 	okText='保存'
						ref={(form)=>this.trade_sessions_form=form}
					  />
				</PageHeaderLayout>

			)


	}


}


export default Trading_sessions;

