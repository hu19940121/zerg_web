import React from 'react'
import PropTypes from 'prop-types'
import { Spin,List,Table,Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown,
  Menu, InputNumber, DatePicker, Modal, message, Badge, Divider ,Radio} from 'antd';
import moment from 'moment';
const RadioGroup = Radio.Group;
const Option = Select.Option;
const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;


const AddVcontracts = (props) => {
  const {visible, onCancel, onCreate, form,title ,okText,info,vcontractInfo,isadd} = props;
  const { getFieldDecorator } = form;
  const style={
    top:15,
  }
  const FormItemStyle={
    marginBottom:6
  }
  return (
    <Modal
      style={style}
      width ={560}
      visible={visible}
      title={title}
      okText={okText}
      onCancel={onCancel}
      onOk={onCreate}
    >
    <Row gutter={10}>
    {
      isadd &&(<Col xl={12} lg={24} md={24} sm={24} xs={24}>
          基础合约信息
          <Divider style={{marginTop:10}}></Divider>
          <FormItem label="合约编码" style={FormItemStyle}  hasFeedback  labelCol={{ span: 11, }} wrapperCol={{ span: 13}}>
              <Input  value={info.symbol}  disabled/>
          </FormItem>
          <FormItem label="交易所编码" style={FormItemStyle}  hasFeedback labelCol={{ span: 11, }} wrapperCol={{ span: 13}}>
              <Input value={info.local_symbol}  disabled/>
          </FormItem>
          <FormItem label="乘数" style={FormItemStyle} hasFeedback labelCol={{ span: 11, }} wrapperCol={{ span: 13}}>
              <Input  value={info.multiplier}  disabled/>
          </FormItem>
          <FormItem label="最小变动价位" style={FormItemStyle} hasFeedback labelCol={{ span: 11, }} wrapperCol={{ span: 13}}>
              <Input  value={info.min_tick}  disabled/>
          </FormItem>
          <FormItem label="交易模式" style={FormItemStyle} hasFeedback labelCol={{ span: 11, }} wrapperCol={{ span: 13}}>
              <Input  value={info.trade_mode}  disabled/>
          </FormItem>
          <FormItem label="中文名称" style={FormItemStyle}  hasFeedback labelCol={{ span: 11, }} wrapperCol={{ span: 13}}>
              <Input  value={info.cn_name}  disabled/>
          </FormItem>
          <FormItem label="交割日期" style={FormItemStyle}  hasFeedback labelCol={{ span: 11, }} wrapperCol={{ span: 13}}>
              <Input  value={info.expiry}  disabled/>
          </FormItem>
          <FormItem label="月份" style={FormItemStyle} hasFeedback labelCol={{ span: 11, }} wrapperCol={{ span: 13}}>
              <Input  value={info.contract_month}  disabled/>
          </FormItem>
      </Col>)
    }
      <Col xl={12} lg={24} md={24} sm={24} xs={24}>
        { isadd &&(
        <div>
          交易合约信息
          <Divider style={{marginTop:10}}></Divider>
          <FormItem style={{display:'none'}}>
             {getFieldDecorator('contract_id', {
               initialValue: info.id,
             })(
               <Input placeholder="请填写合约编码" />
             )}
           </FormItem>
         </div>)
        }
       <FormItem label="交易符号" style={FormItemStyle} hasFeedback labelCol={{ span: 9 }} wrapperCol={{ span:15}}>
          {getFieldDecorator('symbol', {
            rules: [{ required: true, message: '请输入合约编码!' }],
            initialValue: vcontractInfo && vcontractInfo.symbol,
          })(
            <Input placeholder="请填写合约编码" />
          )}
        </FormItem>
        <FormItem label="乘数" style={FormItemStyle} hasFeedback labelCol={{ span: 9 }} wrapperCol={{ span:15}}>
          {getFieldDecorator('multiplier', {
            rules: [{ required: true, message: '请输入乘数!' }],
            initialValue: vcontractInfo && vcontractInfo.multiplier,
          })(
            <InputNumber placeholder='正整数' step='1' min={0} />
          )}
        </FormItem>
        <FormItem label="交易模式" style={FormItemStyle} hasFeedback labelCol={{ span: 9 }} wrapperCol={{ span:15}}>
          {getFieldDecorator('trade_mode', {
            rules: [{ required: true, message: '请选择交易模式!' }],
            initialValue: vcontractInfo && vcontractInfo.trade_mode,
          })(
            <Select style={{width:120}} placeholder="交易模式">
              <Option value="bs">买卖</Option>
              <Option value="bsoc">开平买卖</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="中文名称" style={FormItemStyle} hasFeedback labelCol={{ span: 9 }} wrapperCol={{ span:15}}>
          {getFieldDecorator('cn_name', {
            rules: [{ required: true, message: '请输入中文名!' }],
            initialValue: vcontractInfo && vcontractInfo.cn_name,
          })(
            // <Input placeholder="浮点数" />
            <Input placeholder="请填写中文名" />
          )}
        </FormItem>
      </Col>
    </Row>
    </Modal>
  )
}

export default Form.create()(AddVcontracts)
