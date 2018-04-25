//Dashboard

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Spin,List,Table,Row, Col, Card, Form, Input, Select,
				 Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, 
				 message, Badge, Divider ,Radio,Calendar} from 'antd';
import React, { PureComponent } from 'react';
import moment from 'moment';

class Trading_calendars extends PureComponent{

	constructor(props){
		super(props)
	}

	componentDidMount(){



	}
	onPanelChange=(value, mode) =>{
	  console.log(value, mode);
	}
	onSelect = (value) => {
		console.log(value.format('YYYY-MM-DD'));
	}
	disabledDate=(current)=> {
	  // Can not select days before today and today
	  // return current && current < moment().endOf('day');
	  // console.log(current);   
	}
	render(){
		console.log(this.props)
		return (

				<PageHeaderLayout title="交易日历">
					<Card title='交易日历'>
						<Calendar onSelect={this.onSelect}
						disabledDate={this.disabledDate}
						onPanelChange={this.onPanelChange} />
					</Card>
				</PageHeaderLayout>

			)


	}


}


export default Trading_calendars;

