import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal ,TimePicker,DatePicker,Row,Col} from 'antd'
import moment from 'moment';
const { RangePicker } = DatePicker;
const FormItem = Form.Item



const AddTrade_sessions = (props) => {
  const {visible, onCancel, onCreate, form,title ,okText,sessions} = props;
  const { getFieldDecorator } = form;

  //处理时间字段
  for (const key in sessions){
    if (sessions[key].length!==11) {
      continue;
    }
    const arr=sessions[key].split('-')
    sessions[key]=arr

  }
console.log(sessions);
  const FormItemStyle={
    marginBottom:6
  }
  const TimePickerStyle={
    width:'100%'
  }
  const isEmptyObject=(obj)=>(JSON.stringify(obj)=='{}') //判断对象是否为空
  const format='HH:mm'
  return (
    <Modal
      visible={visible}
      title={title}
      okText={okText}
      onCancel={onCancel}
      onOk={onCreate}
    >
      <FormItem style={FormItemStyle} label="星期一"   labelCol={{ span: 5 }} wrapperCol={{ span: 14}}>
        <Row>
          <Col span={11}>
          {
            getFieldDecorator('mon_startime',{initialValue:!isEmptyObject(sessions)?moment(sessions.mon[0], 'HH:mm'):moment('00:00', 'HH:mm:ss')})
            ( <TimePicker format={format} placeholder="开始时间" style={TimePickerStyle}/>)
          }
          </Col>
          <Col span={2} style={{display:'flex',justifyContent:'center'}}>-</Col>
          <Col span={11}>{getFieldDecorator('mon_endtime',{initialValue:!isEmptyObject(sessions)?moment(sessions.mon[1], 'HH:mm'):moment('00:00', 'HH:mm')})(<TimePicker format={format} placeholder="结束时间"　style={TimePickerStyle}/>)}</Col>
        </Row>
      </FormItem>

      <FormItem style={FormItemStyle}  label="星期二"   labelCol={{ span: 5 }} wrapperCol={{ span: 14}}>
        <Row>
          <Col span={11}>{getFieldDecorator('tue_startime',{initialValue:!isEmptyObject(sessions)?moment(sessions.tue[0], 'HH:mm'):moment('00:00', 'HH:mm')})( <TimePicker format={format}　placeholder="开始时间" style={TimePickerStyle} />)}</Col>
          <Col span={2} style={{display:'flex',justifyContent:'center'}}>-</Col>
          <Col span={11}>{getFieldDecorator('tue_endtime',{initialValue:!isEmptyObject(sessions)?moment(sessions.tue[1], 'HH:mm'):moment('00:00', 'HH:mm')})(<TimePicker format={format}　placeholder="结束时间" style={TimePickerStyle}/>)}</Col>
        </Row>
      </FormItem>

      <FormItem style={FormItemStyle}  label="星期三"   labelCol={{ span: 5 }} wrapperCol={{ span: 14}}>
        <Row>
          <Col span={11}>{getFieldDecorator('wed_startime',{initialValue:!isEmptyObject(sessions)?moment(sessions.wed[0], 'HH:mm'):moment('00:00', 'HH:mm')})( <TimePicker　format={format} placeholder="开始时间" style={TimePickerStyle}/>)}</Col>
          <Col span={2} style={{display:'flex',justifyContent:'center'}}>-</Col>
          <Col span={11}>{getFieldDecorator('wed_endtime',{initialValue:!isEmptyObject(sessions)?moment(sessions.wed[1], 'HH:mm'):moment('00:00', 'HH:mm')})(<TimePicker　format={format} placeholder="结束时间" style={TimePickerStyle}/>)}</Col>
        </Row>
      </FormItem>

      <FormItem style={FormItemStyle}  label="星期四"   labelCol={{ span: 5 }} wrapperCol={{ span: 14}}>
        <Row>
          <Col span={11}>{getFieldDecorator('thu_startime',{initialValue:!isEmptyObject(sessions)?moment(sessions.thu[0], 'HH:mm'):moment('00:00', 'HH:mm')})( <TimePicker format={format} placeholder="开始时间"　style={TimePickerStyle}/>)}</Col>
          <Col span={2} style={{display:'flex',justifyContent:'center'}}>-</Col>
          <Col span={11}>{getFieldDecorator('thu_endtime',{initialValue:!isEmptyObject(sessions)?moment(sessions.thu[1], 'HH:mm'):moment('00:00', 'HH:mm')})(<TimePicker 　format={format} placeholder="结束时间"　style={TimePickerStyle} />)}</Col>
        </Row>
      </FormItem>

      <FormItem style={FormItemStyle}  label="星期五"   labelCol={{ span: 5 }} wrapperCol={{ span: 14}}>
        <Row>
          <Col span={11}>{getFieldDecorator('fri_startime',{initialValue:!isEmptyObject(sessions)?moment(sessions.fri[0], 'HH:mm'):moment('00:00', 'HH:mm')})( <TimePicker　format={format} placeholder="开始时间" style={TimePickerStyle} />)}</Col>
          <Col span={2} style={{display:'flex',justifyContent:'center'}}>-</Col>
          <Col span={11}>{getFieldDecorator('fri_endtime',{initialValue:!isEmptyObject(sessions)?moment(sessions.fri[1], 'HH:mm'):moment('00:00', 'HH:mm')})(<TimePicker format={format} placeholder="结束时间"　style={TimePickerStyle}/>)}</Col>
        </Row>
      </FormItem>
      <FormItem style={FormItemStyle}  label="星期六"   labelCol={{ span: 5 }} wrapperCol={{ span: 14}}>
        <Row>
          <Col span={11}>{getFieldDecorator('sat_startime',{initialValue:!isEmptyObject(sessions)?moment(sessions.sat[0], 'HH:mm'):moment('00:00', 'HH:mm')})( <TimePicker　format={format} placeholder="开始时间" style={TimePickerStyle} />)}</Col>
          <Col span={2} style={{display:'flex',justifyContent:'center'}}>-</Col>
          <Col span={11}>{getFieldDecorator('sat_endtime',{initialValue:!isEmptyObject(sessions)?moment(sessions.sat[1], 'HH:mm'):moment('00:00', 'HH:mm')})(<TimePicker format={format} placeholder="结束时间"　style={TimePickerStyle}/>)}</Col>
        </Row>
      </FormItem>
      <FormItem style={FormItemStyle}  label="星期日"   labelCol={{ span: 5 }} wrapperCol={{ span: 14}}>
        <Row>
          <Col span={11}>{getFieldDecorator('sun_startime',{initialValue:!isEmptyObject(sessions)?moment(sessions.sun[0], 'HH:mm'):moment('00:00', 'HH:mm')})( <TimePicker format={format}　placeholder="开始时间" style={TimePickerStyle} />)}</Col>
          <Col span={2} style={{display:'flex',justifyContent:'center'}}>-</Col>
          <Col span={11}>{getFieldDecorator('sun_endtime',{initialValue:!isEmptyObject(sessions)?moment(sessions.sun[1], 'HH:mm'):moment('00:00', 'HH:mm')})(<TimePicker format={format} placeholder="结束时间"　style={TimePickerStyle}/>)}</Col>
        </Row>
      </FormItem>
    </Modal>
  )
}

export default Form.create()(AddTrade_sessions)
