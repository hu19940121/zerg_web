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
					<Row>
						<Col >
							<iframe src="http://103.10.1.140:36901/d-solo/Ze8QPymik/public-dashboard?panelId=4&orgId=1&tab=metrics&refresh=1m&from=now-2h&theme=light" width="80%" height="350" frameBorder="0"></iframe>
						</Col>
					</Row>
				</Card>
			</PageHeaderLayout>

			)


	}


}


export default Monitor;

