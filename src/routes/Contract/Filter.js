import React from 'react'
import PropTypes from 'prop-types'
import { Spin,List,Table,Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message, Badge, Divider ,Radio} from 'antd';
const FormItem = Form.Item
const Option = Select.Option;
const Search = Input.Search; //搜索input

const Filter = (props) => {
  const {handleSearch,form,formReset}= props;
  const { getFieldDecorator } = form;
  return (
    <Form layout="inline" onSubmit={handleSearch}>
	    <Row gutter={4} style={{display:'flex',justifyContent:'flex-end'}}>
	      <Col >
	       	<FormItem label="">
	       	  {getFieldDecorator('keyword',{
	       	  	rules: [{ required: true, message: '请输入关键字!' }]
	       	  })(
	       	    <Search placeholder="请输入关键字" />
	       	  )}
	       	</FormItem>
	      </Col>
	      <Col >
	        <div style={{ display: 'flex', alignItems:'center',ustifyContent: 'space-between', flexWrap: 'wrap' }}>
	          <div style={{marginTop:2}}>
	            <Button type="primary" style={{marginRight:10}} htmlType="submit" >查询</Button>
	            <Button style={{marginBottom:10}} onClick={formReset} >重置</Button>
	          </div>
	        </div>
	      </Col>
	    </Row>
    </Form>
  )
}

export default Form.create()(Filter)
