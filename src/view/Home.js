import React, {Component} from 'react';
import {Layout, Card} from 'element-react';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/grid';
import axios from "axios";
import {connect} from "react-redux";

class HomeScreen extends Component {
    checkLogin(){
        const _this = this;
        const { serverUrl } = _this.props;
        let token = global.tools.getLoginUser();
        if (global.tools.isEmpty(token)) {
            _this.props.history.push('/login');
            window.location.reload();
        }else{
            axios.post(serverUrl+ '/user/check_login',{token: token})
                .then(function (response) {
                    let resp = response.data;
                    if(resp.code === 0){
                        if (global.tools.isEmpty(resp.data.token)) {
                            _this.props.history.push('/login');
                            window.location.reload();
                            Message.error('Session expired, please log in again!');
                        }else{
                            _this.setState({user: resp.data}, ()=>{
                                _this.initPhoto();
                            });
                        }
                    }else{
                        _this.props.history.push('/login');
                        window.location.reload();
                        Message.error(resp.msg);
                    }
                }).catch(function (error) {
                Message.error('Unable to get user information, please log in again!');
                window.location.reload();
                _this.props.history.push('/login');
            })
        }
    }

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