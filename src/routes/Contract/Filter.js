import React from 'react'
import PropTypes from 'prop-types'
import { Spin,List,Table,Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message, Badge, Divider ,Radio} from 'antd';
const FormItem = Form.Item
const Option = Select.Option;
const Search = Input.Search; //搜索input

const Filter = ({form}) => {

  const { getFieldDecorator } = form;
 	//搜索
 	const handleSearch = () => {
 	  let fields = form.getFieldsValue()
 	  console.log(fields)
 	  // fields = handleFields(fields)
 	  // onFilterChange(fields)
 	}

  return (
    <Form layout="inline" onSubmit={handleSearch}>
	    <Row gutter={4}>
	      <Col  xl={{ span: 4 }} md={{ span: 8 }}>
	       	<FormItem label="">
	       	  {getFieldDecorator('symbol',{
	       	  	rules: [{ required: true, message: '输入简称!' }]
	       	  })(
	       	    <Search placeholder="简称" />
	       	  )}
	       	</FormItem>
	      </Col>
	      <Col  xl={{ span: 5 }} md={{ span: 8 }} sm={{ span: 12 }}>
	        <FormItem label="">
	          {getFieldDecorator('sec_type',{
	          })(
	            <Search placeholder="证券类别" />
	          )}
	        </FormItem>
	      </Col>
	      <Col  xl={{ span: 10 }} md={{ span: 8 }} sm={{ span: 24 }}>
	        <div style={{ display: 'flex', alignItems:'center',ustifyContent: 'space-between', flexWrap: 'wrap' }}>
	          <div style={{marginTop:2}}>
	            <Button type="primary" style={{marginRight:10}} htmlType="submit" >查询</Button>
	            <Button style={{marginBottom:25}} >重置</Button>
	          </div>
	        </div>
	      </Col>
	    </Row>
    </Form>
  )
}

export default Form.create()(Filter)
