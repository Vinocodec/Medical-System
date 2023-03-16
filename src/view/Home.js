import React, {Component} from 'react';
import {Layout, Card} from 'element-react';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/grid';

class HomeScreen extends Component {
    user = {
        username: 'Wade',
        phone: '77700000000',
        avatar: '../img/avatar.PNG',
    };

    render() {
        return (
            <div>
                <Layout.Row gutter="20">
                    <Layout.Col span="12">
                        <Card className="box-card" style={{margin: '20px 30px'}}>
                            <div style={cardUserStyle}>
                                <img src={this.user.avatar} alt={''} style={cardImgStyle}/>
                                <div>
                                    <p style={{fontSize: '32px', marginBottom: '10px'}} >{this.user.username}</p>
                                </div>
                            </div>
                            <div>
                                <p style={{lineHeight:'28px',fontSize: '14px',color: '#999999'}}>Phone:<span style={{color:' #666666', marginLeft: '60px'}}>{this.user.phone}</span></p>
                            </div>
                        </Card>
                    </Layout.Col>


                    <Layout.Col span="12">
                        <Card className="box-card" style={{margin: '20px', marginLeft: "0px"}}>
                            <div id="main" style={{ width: 530, height: 275 }}>

                            </div>
                        </Card>
                    </Layout.Col>
                </Layout.Row>
                <Layout.Row gutter="20">
                    <Layout.Col span="24">
                        <div style={{margin: '20px 30px', marginRight: "20px"}}>
                        </div>
                    </Layout.Col>
                </Layout.Row>
            </div>
        );
    }


}

const cardImgStyle={
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    marginRight: '40px'
};

const cardUserStyle={
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '20px',
    marginBottom: '20px',
    borderBottom:' 1px solid #ccc'
};

export default HomeScreen;