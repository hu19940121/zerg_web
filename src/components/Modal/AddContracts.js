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


const AddContracts = (props) => {
  const {visible, onCancel, onCreate, form,title ,okText,info,contractInfo,isadd} = props;
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
      isadd &&(<Col xl={10} lg={24} md={24} sm={24} xs={24}>
        合约信息
        <Divider style={{marginTop:10}}></Divider>
         <FormItem label="合约简称" style={FormItemStyle}  hasFeedback labelCol={{ span: 8,}} wrapperCol={{ span: 16}}>
            <Input  value={info.symbol}  disabled/>
         </FormItem>
         <FormItem label="类别"  style={FormItemStyle} hasFeedback labelCol={{ span: 8, }} wrapperCol={{ span: 16}}>
            <Input value={info.sec_type}  disabled/>
         </FormItem>
         <FormItem label="货币" style={FormItemStyle} hasFeedback labelCol={{ span: 8, }} wrapperCol={{ span: 16}}>
            <Input  value={info.currency}  disabled/>
         </FormItem>
         <FormItem label="交易模式" style={FormItemStyle} hasFeedback labelCol={{ span: 8, }} wrapperCol={{ span: 16}}>
            <Input  value={info.trade_mode}  disabled/>
         </FormItem>
         <FormItem label="合约名称" style={FormItemStyle} hasFeedback labelCol={{ span: 8, }} wrapperCol={{ span: 16}}>
            <Input  value={info.cn_name}  disabled/>
         </FormItem>
         <FormItem label="交易所" style={FormItemStyle} hasFeedback labelCol={{ span: 8, }} wrapperCol={{ span: 16}}>
            <Input  value={info.exchange_cn_name}  disabled/>
         </FormItem>
      </Col>)
    }
      <Col xl={14} lg={24} md={24} sm={24} xs={24}>
        { isadd &&(
        <div>
          基础合约信息
          <Divider style={{marginTop:10}} ></Divider>
          <FormItem style={{display:'none'}}>
             {getFieldDecorator('product_id', {
               initialValue: info.id,
             })(
               <Input placeholder="请填写合约编码" />
             )}
           </FormItem>
         </div>)
        }
        <FormItem label="合约编码" style={FormItemStyle} hasFeedback labelCol={{ span: 11 }} wrapperCol={{ span: 11}}>
           {getFieldDecorator('symbol', {
             rules: [{ required: true, message: '请输入合约编码!' }],
             initialValue: contractInfo && contractInfo.symbol,
           })(
             <Input placeholder="请填写合约编码" />
           )}
         </FormItem>
         <FormItem label="交易所编码" style={FormItemStyle}  hasFeedback labelCol={{ span: 11}} wrapperCol={{ span: 11}}>
           {getFieldDecorator('local_symbol', {
             rules: [{ required: true, message: '请输入交易所编码!' }],
             initialValue: contractInfo && contractInfo.local_symbol,
           })(
             <Input placeholder="交易所编码" />
           )}
         </FormItem>
         <FormItem label="乘数" style={FormItemStyle} hasFeedback labelCol={{ span: 11 }} wrapperCol={{ span: 11}}>
           {getFieldDecorator('multiplier', {
             rules: [{ required: true, message: '请输入乘数!' }],
             initialValue: contractInfo && contractInfo.multiplier,
           })(
             <InputNumber placeholder="正整数" min={0}/>
           )}
         </FormItem>
         <FormItem label="最小变动价位" style={FormItemStyle} hasFeedback labelCol={{ span: 11 }} wrapperCol={{ span: 11}}>
           {getFieldDecorator('min_tick', {
             rules: [{ required: true, message: '请输入最小变动价位!' }],
             initialValue: contractInfo && contractInfo.min_tick,
           })(
             // <Input placeholder="浮点数" />
             <InputNumber placeholder="浮点数" step="0.1" min={0} />
           )}
         </FormItem>
         <FormItem label="交易模式" style={FormItemStyle} hasFeedback labelCol={{ span: 11 }} wrapperCol={{ span: 11}}>
           {getFieldDecorator('trade_mode', {
             rules: [{ required: true, message: '请选择交易模式!' }],
             initialValue: contractInfo && contractInfo.trade_mode,
           })(
             <Select style={{width:120}}  placeholder="请选择交易模式">
              <Option value="bs">买卖</Option>
              <Option value="bsoc">开平买卖</Option>
             </Select>
           )}
         </FormItem>
         <FormItem label="主力合约" style={FormItemStyle} hasFeedback labelCol={{ span: 11 }} wrapperCol={{ span: 11}}>
           {getFieldDecorator('most_active', {
             rules: [{ required: true, message: '请选择是否主力合约!' }],
             initialValue: contractInfo && contractInfo.most_active,

           })(
             <RadioGroup>
               <Radio value={true}>是</Radio>
               <Radio value={false}>否</Radio>
              </RadioGroup>
           )}
         </FormItem>
         <FormItem label="中文名称" style={FormItemStyle} hasFeedback labelCol={{ span: 11 }} wrapperCol={{ span: 11}}>
           {getFieldDecorator('cn_name', {
             rules: [{ required: true, message: '请输入中文名称!' }],
             initialValue: contractInfo && contractInfo.cn_name,
           })(
             <Input placeholder="中文名称" />
           )}
         </FormItem>
         <FormItem label="交割日期" style={FormItemStyle} hasFeedback labelCol={{ span: 11 }} wrapperCol={{ span: 11}}>
           {getFieldDecorator('expiry', {
             rules: [{ required: true, message: '请选择交割日期!' }],
             initialValue: contractInfo && moment(contractInfo.expiry, 'YYYYMMDD'),
           })(
              <DatePicker />
           )}
         </FormItem>
         <FormItem label="合同月份" style={FormItemStyle} hasFeedback labelCol={{ span: 11 }} wrapperCol={{ span: 11}}>
           {getFieldDecorator('contract_month', {
             rules: [{ required: true, message: '请选择合同月份!' }],
             initialValue: contractInfo && moment(contractInfo.contract_month, 'YYYYMM'),
           })(
              <MonthPicker placeholder="请选择月份" />
           )}
         </FormItem>
      </Col>
    </Row>
    </Modal>
  )
}

export default Form.create()(AddContracts)
