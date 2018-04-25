import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal } from 'antd'
const FormItem = Form.Item


const AddTrading_systems = (props) => {
  const {visible, onCancel, onCreateOrSave, form,title ,okText} = props;
  const { getFieldDecorator } = form;
  return (
    <Modal
      visible={visible}
      title={title}
      okText={okText}
      onCancel={onCancel}
      onOk={onCreateOrSave}
    >
      <FormItem label="名称"  hasFeedback labelCol={{ span: 5 }} wrapperCol={{ span: 14}}> 
        {getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入名称 !' }],
        })(
          <Input placeholder="交易系统名称" />
        )}
      </FormItem>
      <FormItem label="公司" hasFeedback labelCol={{ span: 5 }} wrapperCol={{ span: 14}}>
        {getFieldDecorator('company',{
          rules:[{required:true,message:'请输入公司'}],
        })(<Input placeholder="交易系统公司名称"  />)}
      </FormItem>
      <FormItem label="IP地址"  hasFeedback labelCol={{ span: 5 }} wrapperCol={{ span: 14}}>
        {getFieldDecorator('ip_address',{
          rules:[
            {
              required: true,
              message:'请输入ip地址'
            }
          ]
        })(<Input placeholder="输入完整的ip地址,比如127.0.0.1 中间用.来分隔"  />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create()(AddTrading_systems)
