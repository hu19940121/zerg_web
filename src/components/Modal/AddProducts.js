import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal,Select } from 'antd';
import currencies from '../../common/currencies.js';
const FormItem = Form.Item
const Option = Select.Option;


const AddProducts = (props) => {
  const {visible, onCancel, onCreateOrSave, form,title ,okText,exchanges,initValues} = props;
  const { getFieldDecorator } = form;
  // console.log(props)
  return (
    <Modal
      visible={visible}
      title={title}
      okText={okText}
      onCancel={onCancel}
      onOk={onCreateOrSave}
    >
      <FormItem label="简称"  hasFeedback labelCol={{ span: 5 }} wrapperCol={{ span: 14}}> 
        {getFieldDecorator('symbol', {
          rules: [{ required: true, message: '请输入简称!' }],
        })(
          <Input placeholder="请填写简称" />
        )}
      </FormItem>
      <FormItem label="类别"  hasFeedback labelCol={{ span: 5 }} wrapperCol={{ span: 14}}>
        {getFieldDecorator('sec_type',{

        })(

    	<Select placeholder="请选择证券类别" style={{ width: 150 }} >
    	  <Option value="FUT">期货</Option>
    	</Select>)
    	}
      </FormItem>
      <FormItem label="交易所"  hasFeedback labelCol={{ span: 5 }} wrapperCol={{ span: 14}}>
        {getFieldDecorator('exchange_id',{
        })(
        <Select placeholder="请选择交易所" allowClear={true}  style={{ width: 150 }}>
        	{
        		exchanges.length>0 && exchanges.map((item,index)=>{
        			return(
        					<Option  key={item.id} value={item.id}>{item.cn_name}</Option>
        				)
        		})
        	}
        </Select>
        )
    	}
      </FormItem>
      <FormItem label="货币" hasFeedback labelCol={{ span: 5 }} wrapperCol={{ span: 14}}>
        {getFieldDecorator('currency',{
        })(
        <Select placeholder="请选择货币" style={{ width: 150 }} >
          {
            currencies.map((currency,index)=>{
              return (
                <Option key={index} value={currency.en_name}>{currency.cn_name}</Option>
                )
            })
          }
        </Select>
        )
    	}
      </FormItem>
      <FormItem label="交易模式" hasFeedback labelCol={{ span: 5 }} wrapperCol={{ span: 14}}>
        {getFieldDecorator('trade_mode',{
        })(
        <Select placeholder="请选择交易模式" style={{ width: 150 }} >
          <Option value="bs">买卖</Option>
          <Option value="bsoc">开平买卖</Option>
        </Select>
        )
    	}
      </FormItem>
      <FormItem label="名称" hasFeedback labelCol={{ span: 5 }} wrapperCol={{ span: 14}}>
        {getFieldDecorator('cn_name',{
        })(<Input placeholder="请填写名称"   />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create()(AddProducts)
