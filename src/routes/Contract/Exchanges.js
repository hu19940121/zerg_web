import React, { PureComponent } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Spin,List,Table,Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message, Badge, Divider ,Radio} from 'antd';
import { connect } from 'dva';
import AddExchanges from 'components/Modal/AddExchanges'

const FormItem = Form.Item;
const confirm = Modal.confirm;  //确认框
const Search = Input.Search; //搜索input

// 组件和model连接
@connect(({ exchanges,loading}) => ({
  exchanges,
  loading:loading.models.exchanges,
}))
@Form.create()


class Exchanges extends PureComponent{

	constructor(props){
		super(props)
	}
	componentDidMount() {
		//初始化数据
		this.props.dispatch({
			type:'exchanges/fetch'
		})
	}

	showModal=()=>{
		console.log(this.form)
		const form=this.form;
		form.resetFields();
		this.setState({
			okText:'确定',
			visible:true,
			isCreate:true,//改变form中编辑为新增
			formTitle:'新增交易所'
		})
	}

	//显示编辑对话框
	showEditModal=(text)=>{
		console.log(text)
		const form=this.form;
		form.setFieldsValue({
			...text
		})

		this.setState({
			okText:'保存',
			visible:true,
			isCreate:false,
			formTitle:'编辑交易所',
			currentEditId:text.id
		})
	}
	//取消新增交易所

	cancelAdd=()=>{
		this.setState({visible:false});
	}

	//新增交易所
	addExchange=()=>{
		const form = this.form;
		form.validateFields((err,values)=>{
			if(err){return};
			console.log('Received values of form: ', values);
			let params={
				...values
			};
			this.props.dispatch({
				type:'exchanges/add',
				payload:params,
				callback:()=>{
					console.log('add success')
					message.success('添加成功')
				}
			});
			form.resetFields();
			this.setState({ visible: false });
		})

	}
	//删除交易所
	removeExchange=(text)=>{
		const {dispatch}=this.props;
		console.log(text.id);
		confirm({
			title:'是否删除',
			onOk(){
				dispatch({
					type:'exchanges/remove',
					payload:{
						id:text.id
					},
					callback:()=>{
						message.success('删除成功')
					}
				})
			},
			onCancel(){
				console.log('Cancel')
			}
		})
		console.log(text.id)
	}
	// do not know
	saveFormRef=(form)=>{
		this.form=form;
	}
	//form 内的值清空
	FormReset=()=>{
		const {form}=this.props
		form.resetFields();
		this.props.dispatch({
			type:'exchanges/fetch'
		})
	}
	saveClick=()=>{
	  const form = this.form;
	  const {currentEditId}=this.state;
	  form.validateFields((err, values) => {
	    if (err) {return;}
	    const params={
	     	id:currentEditId,
	     	...values
	    }
	    console.log(values)
	    this.props.dispatch({
	      type: 'exchanges/update',
	      payload:params,
	      //成功后执行此函数
	      callback: () => {
	        console.log('add success')
	        message.success('更新成功');
	        this.setState({
	        	visible:false
	        })
	      },
	    });
	  });
	   console.log(currentEditId)
	}
	//选中触发的事件
	onSelectChange = (selectedRowKeys) => {
	  console.log('selectedRowKeys changed: ', selectedRowKeys);
	  this.setState({ selectedRowKeys });
	}

	//筛选表单
	renderSearchForm() {
	  const { getFieldDecorator } = this.props.form;
	  return (
	    <Form style={{marginBottom:"20px"}} onSubmit={this.handleSearch} layout="inline">
	      <Row  justify="end">
	        <Col md={6} sm={24}>
	          <FormItem label="">
	            {getFieldDecorator('name',{
	            	rules: [{ required: true, message: '请输入简称!' }]
	            })(
	              <Search placeholder="简称" />
	            )}
	          </FormItem>
	        </Col>
	        <Col md={12} sm={24}>
	          <span >
	            <Button type="primary" htmlType="submit">查询</Button>
	            <Button style={{ marginLeft: 8 }} onClick={this.FormReset}>重置</Button>
	          </span>
	        </Col>

	      </Row>
	    </Form>
	  );
	}

	handleSearch=()=>{
		const { dispatch, form } = this.props;

		form.validateFields((err, fieldsValue) => {
		  if (err) return;
		  const params={
		  	name:fieldsValue.name,
		  	cn_name:'5',
		  }
		  dispatch({
		  	type: 'exchanges/search',
		  	payload:params
		  })
		  console.log(params)
		});


	}

	//设置state  初始化state在此处设置 原因未知
	state = {
		visible: false,
		columns: [
		{
		  title: '简称',
		  dataIndex: 'name', //对应列名
		  // sorter: (a, b) => a.name.length - b.name.length,
		  //charCodeAt   字母转asc码
		  sorter: (a, b) =>{
		  	let distance=(a.name.substring(0,1)).charCodeAt()-(b.name.substring(0,1)).charCodeAt();
		  	return distance;
		  },
		},
		{
			title: '名称',
			dataIndex: 'cn_name',
		},
		{
			title: '时区',
			dataIndex: 'timezone',
		},
		{
			title: '主页',
			dataIndex: 'home_page',
		},
		{
			title: '操作',
			key: 'action',
			render: (text, record,index) => (
				<span>
				<a onClick={this.showEditModal.bind(this,text)}><Icon type="edit"  style={{ fontSize: 18 }} /></a>
				<Divider type="vertical" />
				<a onClick={this.removeExchange.bind(this,text)}style={{color:"red"}}><Icon style={{ fontSize: 18 }} type="delete" /></a>
				<Divider type="vertical" />
				</span>
				),
		}],
	   selectedRowKeys: [], // Check here to configure the default column
	   isCreate:true,  //设置是否是新增记录方法
	};
	// start = () => {
	//   this.setState({ loading: true });
	//   // ajax request after empty completing
	//   setTimeout(() => {
	//     this.setState({
	//       selectedRowKeys: [],
	//       loading: false,
	//     });
	//   }, 1000);
	// }
	render(){
		// console.log(this.form)
		const {selectedRowKeys ,columns,okText} = this.state;
		const {loading}=this.props
		const rowSelection = {
		     selectedRowKeys,
		     onChange: this.onSelectChange,
		 };
		const hasSelected = selectedRowKeys.length > 0;

		const menu = (
		  <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
		    <Menu.Item key="remove">删除</Menu.Item>
		    <Menu.Item key="approval">批量审批</Menu.Item>
		  </Menu>
		);

		// let data =this.props.rule.data.list
		console.log(this.props)
		const data =this.props.exchanges.data.data
		console.log(this.props)
		//分页配置

		const pagination = {
		    defaultCurrent: 1,
		    pageSize: 10,
		    showSizeChanger: true,
		}


		console.log(this.props)
		return (
				<PageHeaderLayout title="交易所管理">
					<Card>
						<div style={{ marginBottom: 16 }}>
							{
								this.renderSearchForm()
							}
							<Button type="primary" onClick={this.showModal}>
							新增交易所
							</Button>
							{
							    hasSelected && (
							    <span style={{marginLeft:10}}>
							      <Button>批量操作</Button>
							      <Dropdown overlay={menu}>
							        <Button style={{marginLeft:10}}> 
							          更多操作 <Icon type="down" />
							        </Button>
							      </Dropdown>
							    </span>
							  )
							}
							<AddExchanges
								ref={this.saveFormRef}
								visible={this.state.visible}
								onCancel={this.cancelAdd}
								onCreateOrSave={this.state.isCreate?this.addExchange:this.saveClick}
								title={this.state.formTitle}
								okText={okText}
							 />
							<span style={{ marginLeft: 8 }}>
							{hasSelected ? `选中了 ${selectedRowKeys.length} 条数据` : ''}
							</span>
						</div>
						<Table rowKey='id' loading={loading} rowSelection={rowSelection} pagination={pagination} columns={columns} dataSource={data} />

					</Card>
				</PageHeaderLayout>
			)
	}

}


export default Exchanges