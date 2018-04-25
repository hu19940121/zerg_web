

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

const ContractForm=(props)=> {
	const {dispatch,history,info,form,isadd,contractInfo,handleSubmit,buttonTitle}=props;
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
							<Divider>品种信息</Divider>
							<Form style={isadd?{display: 'inline'}:{display: 'block'}} >
								<FormItem label="合约简称"  hasFeedback labelCol={{ span: 5, }} wrapperCol={{ span: 10}}>
								    <Input  value={info.symbol}  disabled/>
								</FormItem>
								<FormItem label="类别"  hasFeedback labelCol={{ span: 5, }} wrapperCol={{ span: 10}}>
								    <Input value={info.sec_type}  disabled/>
								</FormItem>
								<FormItem label="货币"  hasFeedback labelCol={{ span: 5, }} wrapperCol={{ span: 10}}>
								    <Input  value={info.currency}  disabled/>
								</FormItem>
								<FormItem label="交易模式"  hasFeedback labelCol={{ span: 5, }} wrapperCol={{ span: 10}}>
								    <Input  value={info.trade_mode}  disabled/>
								</FormItem>
								<FormItem label="合约名称"  hasFeedback labelCol={{ span: 5, }} wrapperCol={{ span: 10}}>
										<Input  value={info.cn_name}  disabled/>
								</FormItem>
								<FormItem label="交易所"  hasFeedback labelCol={{ span: 5, }} wrapperCol={{ span: 10}}>
								    <Input  value={info.exchange_cn_name}  disabled/>
								</FormItem>
							</Form>
							</div>
						)
						}
						<Divider>合约信息</Divider>


						<Form style={{margin: '0 auto'}} onSubmit={handleSubmit}>
							{ isadd &&(
								<FormItem style={{display:'none'}} label="合约品种id"   labelCol={{ span: 5 }} wrapperCol={{ span: 10}}>
								   {getFieldDecorator('product_id', {
								     rules: [{ required: true, message: '请输入合约编码!' }],
								     initialValue: info.id,
								   })(
								     <Input placeholder="请填写合约编码" />
								   )}
								 </FormItem>)
							 }
							<FormItem label="合约编码"  hasFeedback labelCol={{ span: 5 }} wrapperCol={{ span: 10}}>
							   {getFieldDecorator('symbol', {
							     rules: [{ required: true, message: '请输入合约编码!' }],
							     initialValue: contractInfo && contractInfo.symbol,
							   })(
							     <Input placeholder="请填写合约编码" />
							   )}
							 </FormItem>
							 <FormItem label="交易所中的编码"  hasFeedback labelCol={{ span: 5 }} wrapperCol={{ span: 10}}>
							   {getFieldDecorator('local_symbol', {
							     rules: [{ required: true, message: '请输入交易所中的编码!' }],
							     initialValue: contractInfo && contractInfo.local_symbol,
							   })(
							     <Input placeholder="请填写交易所中的编码" />
							   )}
							 </FormItem>
							 <FormItem label="乘数"  hasFeedback labelCol={{ span: 5 }} wrapperCol={{ span: 10}}>
							   {getFieldDecorator('multiplier', {
							     rules: [{ required: true, message: '请输入乘数!' }],
							     initialValue: contractInfo && contractInfo.multiplier,
							   })(
							     <InputNumber placeholder="正整数" min={0}/>
							   )}
							 </FormItem>
							 <FormItem label="最小变动价位"  hasFeedback labelCol={{ span: 5 }} wrapperCol={{ span: 10}}>
							   {getFieldDecorator('min_tick', {
							     rules: [{ required: true, message: '请输入最小变动价位!' }],
							     initialValue: contractInfo && contractInfo.min_tick,
							   })(
							     // <Input placeholder="浮点数" />
							     <InputNumber placeholder="浮点数" step="0.1" min={0} />
							   )}
							 </FormItem>
							 <FormItem label="交易模式"  hasFeedback labelCol={{ span: 5 }} wrapperCol={{ span: 10}}>
							   {getFieldDecorator('trade_mode', {
							     rules: [{ required: true, message: '请选择交易模式!' }],
							     initialValue: contractInfo && contractInfo.trade_mode,
							   })(
							     <Select placeholder="请选择交易模式">
							     	<Option value="bs">买卖</Option>
							     	<Option value="bsoc">开平买卖</Option>
							     </Select>
							   )}
							 </FormItem>
							 <FormItem label="主力合约"  hasFeedback labelCol={{ span: 5 }} wrapperCol={{ span: 10}}>
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
							 <FormItem label="中文名称"  hasFeedback labelCol={{ span: 5 }} wrapperCol={{ span: 10}}>
							   {getFieldDecorator('cn_name', {
							     rules: [{ required: true, message: '请输入中文名称!' }],
							     initialValue: contractInfo && contractInfo.cn_name,
							   })(
							     <Input placeholder="中文名称" />
							   )}
							 </FormItem>
							 <FormItem label="交割日期"  hasFeedback labelCol={{ span: 5 }} wrapperCol={{ span: 10}}>
							   {getFieldDecorator('expiry', {
							     rules: [{ required: true, message: '请选择交割日期!' }],
							     initialValue: contractInfo && moment(contractInfo.expiry, 'YYYYMMDD'),
							   })(
							      <DatePicker />
							   )}
							 </FormItem>
							 <FormItem label="合同月份"  hasFeedback labelCol={{ span: 5 }} wrapperCol={{ span: 10}}>
							   {getFieldDecorator('contract_month', {
							     rules: [{ required: true, message: '请选择合同月份!' }],
							     initialValue: contractInfo && moment(contractInfo.contract_month, 'YYYYMM'),
							   })(
							    	<MonthPicker placeholder="请选择月份" />
							   )}
							 </FormItem>
							 <FormItem {...tailFormItemLayout} >
							    <Button type="primary" htmlType="submit">{buttonTitle}</Button>
							 </FormItem>

						</Form>
				</Card>
			)




}


export default Form.create()(ContractForm);


