//Monitor.js


import React, { PureComponent } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Spin,List,Table,Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message, Badge, Divider ,Radio} from 'antd';

class Monitor extends PureComponent{

	constructor(props){
		super(props)
	}

	componentDidMount(){



	}

	render(){
		console.log(this.props)
		return (
			<PageHeaderLayout title="我的监控">
				<Card title='行情延时监控'>
					<iframe src="http://103.10.1.140:36901/d-solo/000000014/markettick-storage?panelId=73&orgId=1&from=1523155561129&to=1523241961129&var-cluster=bbc0&var-node=market_bucket%40mbucket.lk.com" width="800" height="300" frameborder="0">
					</iframe>
				</Card>
			</PageHeaderLayout>

			)


	}


}


export default Monitor;

