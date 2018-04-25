//Workspace.js
import { Link } from 'dva/router';
import moment from 'moment';
import React, { PureComponent } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Spin,List,Table,Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message, Badge, Divider ,Radio,Avatar} from 'antd';
import styles from './Workplace.less';
import EditableLinkGroup from 'components/EditableLinkGroup';
import { Radar } from 'components/Charts';



//生成假数据
const links = [
  {
    title: '操作一',
    href: '',
  },
  {
    title: '操作二',
    href: '',
  },
  {
    title: '操作三',
    href: '',
  },
  {
    title: '操作四',
    href: '',
  },
  {
    title: '操作五',
    href: '',
  },
  {
    title: '操作六',
    href: '',
  },
];

let activitiesList=[];
let radarData=[
		{
				label:'引用',
				name:'个人',
				value:10,
		},
		{
				label:'引用',
				name:'个人',
				value:10,
		},
		{name: "个人", label: "产量", value: 4},
		{name: "个人", label: "贡献", value: 5},
		{name: "个人", label: "热度", value: 7},
		{name: "团队", label: "引用", value: 3},
		{name: "团队", label: "口碑", value: 9},
		{name: "团队", label: "产量", value: 6},
		{name: "团队", label: "贡献", value: 3}
];
for(let i=0;i<10;i++){
			let object={
			"id": "trend-1"+i,
			"updatedAt": "2018-04-04T05:28:45.689Z",
			"user": {
				"name": "曲丽丽"+i,
				"avatar": "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
			},
			"group": {
				"name": "高逼格设计天团"+i,
				"link": "http://github.com/"
			},
			"project": {
				"name": "六月迭代"+i,
				"link": "http://github.com/"
			},
			"template": "在 @{group} 新建项目 @{project}"
			}

			activitiesList.push(object);
}
//-end-//



class Workspace extends PureComponent{

	constructor(props){
		super(props)
	}

	componentDidMount(){



	}

	//动态列表的渲染
	renderActivities() {
	  return activitiesList.map((item) => {
	    const events = item.template.split(/@\{([^{}]*)\}/gi).map((key) => {
	      if (item[key]) {
	        return <a href={item[key].link} key={item[key].name}>{item[key].name}</a>;
	      }
	      return key;
	    });
	    return (
	      <List.Item key={item.id}>
	        <List.Item.Meta
	          avatar={<Avatar src={item.user.avatar} />}
	          title={
	            <span>
	              <a className={styles.username}>{item.user.name}</a>
	              &nbsp;
	              <span className={styles.event}>{events}</span>
	            </span>
	          }
	          description={
	            <span className={styles.datetime} title={item.updatedAt}>
	              {moment(item.updatedAt).fromNow()}
	            </span>
	          }
	        />
	      </List.Item>
	    );
	  });
	}



	render(){
		console.log(this.props)
		const pageHeaderContent = (
		  <div className={styles.pageHeaderContent}>
		    <div className={styles.avatar}>
		      <Avatar size="large" src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
		    </div>
		    <div className={styles.content}>
		      <div className={styles.contentTitle}>早安，曲丽丽，祝你开心每一天！</div>
		      <div>交互专家 | 某某某事业群－某某平台部－某某技术部－UED</div>
		    </div>
		  </div>
		);

		const extraContent = (
		  <div className={styles.extraContent}>
		    <div className={styles.statItem}>
		      <p>项目数</p>
		      <p>56</p>
		    </div>
		    <div className={styles.statItem}>
		      <p>团队内排名</p>
		      <p>8<span> / 24</span></p>
		    </div>
		    <div className={styles.statItem}>
		      <p>项目访问</p>
		      <p>2,223</p>
		    </div>
		  </div>
		);

		return (

				<div>
					<PageHeaderLayout  extraContent={extraContent} content={pageHeaderContent} title="工作平台">
						<Row gutter={24}>
						<Col xl={16} lg={24} md={24} sm={24} xs={24}>
							<Card
							  bodyStyle={{ padding: 0 }}
							  bordered={false}
							  className={styles.activeCard}
							  title="动态"
							>
							  <List  size="large">
							    <div className={styles.activitiesList}>
							      {this.renderActivities()}
							    </div>
							  </List>
							</Card>

						</Col>
						<Col xl={8} lg={24} md={24} sm={24} xs={24}>
						  <Card
						    style={{ marginBottom: 24 }}
						    title="快速开始 / 便捷导航"
						    bordered={false}
						    bodyStyle={{ padding: 0 }}
						  >
						    <EditableLinkGroup
						      onAdd={() => {}}
						      links={links}
						      linkElement={Link}
						    />
						  </Card>
						  <Card
						    style={{ marginBottom: 24 }}
						    bordered={false}
						    title="XX 指数"
						    loading={radarData.length === 0}
						  >
						    <div className={styles.chart}>
						      <Radar hasLegend height={343} data={radarData} />
						    </div>
						  </Card>
						</Col>
						</Row>
					</PageHeaderLayout>
				</div>

			)


	}


}


export default Workspace;
