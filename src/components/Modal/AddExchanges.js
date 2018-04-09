import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal } from 'antd'
const FormItem = Form.Item


const AddExchanges = (props) => {
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
      <FormItem label="简称"  hasFeedback labelCol={{ span: 5 }} wrapperCol={{ span: 14}}> 
        {getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入简称 !' }],
        })(
          <Input />
        )}
      </FormItem>
      <FormItem label="名称" hasFeedback labelCol={{ span: 5 }} wrapperCol={{ span: 14}}>
        {getFieldDecorator('cn_name')(<Input   />)}
      </FormItem>
      <FormItem label="时区"  hasFeedback labelCol={{ span: 5 }} wrapperCol={{ span: 14}}>
        {getFieldDecorator('timezone')(<Input   />)}
      </FormItem>
      <FormItem label="主页" hasFeedback labelCol={{ span: 5 }} wrapperCol={{ span: 14}}>
        {getFieldDecorator('home_page')(<Input   />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create()(AddExchanges)
