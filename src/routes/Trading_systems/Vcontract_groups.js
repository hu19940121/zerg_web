//合约组管理
import React, { PureComponent } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Spin,List,Table,Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber,
 DatePicker, Modal, message, Badge, Divider ,Radio,Tooltip} from 'antd';
import { connect } from 'dva';
import Filter from '../Contract/Filter'


@connect(({vcontract_groups,loading})=>({
	vcontract_groups,
	loading:loading.models.vcontract_groups,
}))


class Vcontract_groups extends PureComponent{

	constructor(props){
		super(props)
	}

	componentDidMount(){
		console.log('sss');
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
	}

	render(){
		const pagination = {
		    defaultCurrent: 1,
		    pageSize: 10,
		    showSizeChanger: true,
		}
		const {loading}=this.props
		const {columns} =this.state;
		const data=this.props.vcontract_groups.data.data;
		console.log(this.props);
		return (

				<div>
					<PageHeaderLayout title='合约组管理'>
						<Card >
							<Button style={{marginBottom:14}} type='primary'>添加交易合约至合约组</Button>
							<Table  rowKey='id' loading={loading} columns={columns} pagination={pagination} dataSource={data} />
						</Card>
					</PageHeaderLayout>
				</div>

			)


	}


}


export default Vcontract_groups;
