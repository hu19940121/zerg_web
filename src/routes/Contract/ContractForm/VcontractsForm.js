

import React, { PureComponent } from 'react';
import { Spin,List,Table,Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown,
	Menu, InputNumber, DatePicker, Modal, message, Badge, Divider ,Radio} from 'antd';
import { connect } from 'dva';
import moment from 'moment';
const RadioGroup = Radio.Group;
const Option = Select.Option;
const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;

const VcontractsForm=(props)=> {
	const {info,form,isadd,vcontractInfo,handleSubmit,buttonTitle}=props;
		const tailFormItemLayout = {
		  wrapperCol: {
		    xs: {
		      span: 24,
		      offset: 0,
		    },
		    sm: {
		      span: 16,
		      offset: 8,
		    },
		  },
		};

		const {getFieldDecorator}=form;
		return (
				<Card>
						{
						isadd &&(
							<div>
							<Divider>基础合约信息</Divider>
							<Form style={isadd?{display: 'inline'}:{display: 'block'}} >
								<FormItem label="合约编码"  hasFeedback labelCol={{ span: 5, }} wrapperCol={{ span: 10}}>
								    <Input  value={info.symbol}  disabled/>
								</FormItem>
								<FormItem label="交易所中的编码"  hasFeedback labelCol={{ span: 5, }} wrapperCol={{ span: 10}}>
								    <Input value={info.local_symbol}  disabled/>
								</FormItem>
								<FormItem label="乘数"  hasFeedback labelCol={{ span: 5, }} wrapperCol={{ span: 10}}>
								    <Input  value={info.multiplier}  disabled/>
								</FormItem>
								<FormItem label="最小变动价位"  hasFeedback labelCol={{ span: 5, }} wrapperCol={{ span: 10}}>
								    <Input  value={info.min_tick}  disabled/>
								</FormItem>
								<FormItem label="交易模式"  hasFeedback labelCol={{ span: 5, }} wrapperCol={{ span: 10}}>
										<Input  value={info.trade_mode}  disabled/>
								</FormItem>
								<FormItem label="中文名称"  hasFeedback labelCol={{ span: 5, }} wrapperCol={{ span: 10}}>
								    <Input  value={info.cn_name}  disabled/>
								</FormItem>
								<FormItem label="交割日期"  hasFeedback labelCol={{ span: 5, }} wrapperCol={{ span: 10}}>
								    <Input  value={info.expiry}  disabled/>
								</FormItem>
								<FormItem label="月份"  hasFeedback labelCol={{ span: 5, }} wrapperCol={{ span: 10}}>
								    <Input  value={info.contract_month}  disabled/>
								</FormItem>
							</Form>
							</div>
						)
						}
						<Divider>交易合约信息</Divider>


						<Form style={{margin: '0 auto'}} onSubmit={handleSubmit}>
							{ isadd &&(
								<FormItem style={{display:'none'}} label="基础合约id"   labelCol={{ span: 5 }} wrapperCol={{ span: 10}}>
								   {getFieldDecorator('contract_id', {
								     initialValue: info.id,
								   })(
								     <Input placeholder="请填写基础合约id" />
								   )}
								 </FormItem>)
							 }
							<FormItem label="合约编码"  hasFeedback labelCol={{ span: 5 }} wrapperCol={{ span: 10}}>
							   {getFieldDecorator('symbol', {
							     rules: [{ required: true, message: '请输入合约编码!' }],
							     initialValue: vcontractInfo && vcontractInfo.symbol,
							   })(
							     <Input placeholder="请填写合约编码" />
							   )}
							 </FormItem>
							 <FormItem label="乘数"  hasFeedback labelCol={{ span: 5 }} wrapperCol={{ span: 10}}>
							   {getFieldDecorator('multiplier', {
							     rules: [{ required: true, message: '请输入乘数!' }],
							     initialValue: vcontractInfo && vcontractInfo.multiplier,
							   })(
							     <InputNumber placeholder='正整数' step='1' min={0} />
							   )}
							 </FormItem>
							 <FormItem label="交易模式"  hasFeedback labelCol={{ span: 5 }} wrapperCol={{ span: 10}}>
							   {getFieldDecorator('trade_mode', {
							     rules: [{ required: true, message: '请选择交易模式!' }],
							     initialValue: vcontractInfo && vcontractInfo.trade_mode,
							   })(
							     <Select placeholder="请选择交易模式">
							     	<Option value="bs">买卖</Option>
							     	<Option value="bsoc">开平买卖</Option>
							     </Select>
							   )}
							 </FormItem>
							 <FormItem label="中文名称"  hasFeedback labelCol={{ span: 5 }} wrapperCol={{ span: 10}}>
							   {getFieldDecorator('cn_name', {
							     rules: [{ required: true, message: '请输入中文名!' }],
							     initialValue: vcontractInfo && vcontractInfo.cn_name,
							   })(
							     // <Input placeholder="浮点数" />
							     <Input placeholder="请填写中文名" />
							   )}
							 </FormItem>
							 <FormItem {...tailFormItemLayout} >
							    <Button type="primary" htmlType="submit">{buttonTitle}</Button>
							 </FormItem>

						</Form>
				</Card>
			)




}


export default Form.create()(VcontractsForm);


