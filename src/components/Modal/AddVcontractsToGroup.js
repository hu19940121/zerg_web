import React from 'react'
import PropTypes from 'prop-types'
import { Spin,List,Table,Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber,
 DatePicker, Modal, message, Badge, Divider ,Radio,Tooltip} from 'antd';
 import currencies from '../../common/currencies.js';
const FormItem = Form.Item;
const Option = Select.Option;



const AddVcontractsToGroup = (props) => {
  const {visible, onCancel, addToGroup, form,title ,vtableChange,
    okText,data,rowSelection,vcontract_groups,onChange,
    pagination} = props;
  const { getFieldDecorator } = form;
  const {selectedRowKeys} =rowSelection;
  const columns=[
    {
      title: '交易符号',
      dataIndex: 'symbol',

      fixed: 'left'
    },{
      title:'合约编码',
      dataIndex:'contract_symbol',
      // render:(text, record,index)=>
      //  text?<span>是</span>:<span>否</span>
    },{
      title:'交易所编码',
      dataIndex:'contract_local_symbol',
      // render:(text, record,index)=>
      //  text?<span>是</span>:<span>否</span>
    },{
      title: '中文名称',
      dataIndex: 'cn_name',

    },{
      title:'交易模式',
      dataIndex:'trade_mode',
    },{
      title:'合同月份',
      dataIndex:'contract_month',
    },{
      title:'品种',
      dataIndex:'product_symbol',

    },{
      title:'证券类型',
      dataIndex:'product_sec_type',

    },{
      title:'货币',
      dataIndex:'product_currency',
      render:(text,record,index)=>{
        var value=text;
        currencies.map((currency,index)=>{
          if (currency.en_name==text) {
            value=currency.cn_name
          }
        })
        return value;
      }

    },{
      title:'交易所简称',
      dataIndex:'exchange_name',

    },{
      title: '最小变动价位',
      dataIndex: 'contract_min_tick',
      // fixed: 'left'
    },{
      title:'交割日期',
      dataIndex:'contract_expiry',
    },{
      title: '乘数',
      dataIndex: 'multiplier',

      // fixed: 'left'
    }
  ]


  return (
    <Modal
      style={{ top: 20 }}
      visible={visible}
      title={title}
      okText={okText}
      onCancel={onCancel}
      onOk={addToGroup}
      width ={1000}
    >

      <FormItem>
        {getFieldDecorator('vcontract_groups', {
          rules: [{ required: true, message: '  请选择合约组!' }],
        })(
          <Select   style={{ width: 200 }}　 onChange={onChange}  >
            {
              vcontract_groups.map((item,index)=>{
                return(
                    <Option key={index} value={item.id}>{item.name}</Option>
                  )
              })
            }
          </Select>
        )}
        {
          selectedRowKeys.length>0 && (
           ` 已经选择了 ${selectedRowKeys.length }条`
            )
        }
      </FormItem>


      <Table
      columns={columns}
      size="small"
      dataSource={data}
      scroll={{x:1100}}
      rowSelection={rowSelection}
      rowKey='id'
      pagination={pagination}
      onChange={vtableChange}
       />

    </Modal>
  )
}

export default Form.create()(AddVcontractsToGroup)
