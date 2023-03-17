import React, {Component} from 'react';
import {Card, Form, Input, Button, Radio, Message} from "element-react";
import axios from "axios";
import {connect} from "react-redux";
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                username: "",
                password: "",
                rePassword: "",
                phone: "",
                roleId: "1"
            },
            title: "ebb&flo Registion System",
            rePasswordVisible: false,
            phoneVisible: false,
            buttonText: "Login",
            type: "login",
            navigateText: "Sign up"
        }
    }
    render() {
        const _this = this;
        let rePasswordItem = null;
        if(_this.state.rePasswordVisible){
            rePasswordItem = (
                <Form.Item label="Confirm Password" labelWidth="80">
                    <Input type={"password"} onChange={_this.changeInput.bind(_this, 'rePassword')} value={_this.state.form.rePassword}  style={{width: '250px'}} placeholder="Please confirm password"/>
                </Form.Item>
            );
        }
        let phoneItem = null;
        if(_this.state.phoneVisible){
            phoneItem = (
                <Form.Item label="Phone Number" labelWidth="80">
                    <Input value={_this.state.form.phone} onChange={_this.changeInput.bind(_this, 'phone')} style={{width: '250px'}} placeholder="Please enter phone number"/>
                </Form.Item>
            );
        }
        let roleItem = null;
        if(_this.state.type === "login"){
            roleItem = (
                <span style={{marginLeft: "80px"}}>
                    <Radio value="1" checked={_this.state.form.roleId === "1"} onChange={_this.onChange.bind(_this)}>Customer</Radio>
                    <Radio value="2" checked={_this.state.form.roleId === "2"} onChange={_this.onChange.bind(_this)}>Doctor</Radio>
                    <Radio value="3" checked={_this.state.form.roleId === "3"} onChange={_this.onChange.bind(_this)}>Admin</Radio>
                </span>
            );
        }
        return (
            <div style={loginStyle}>
                <Card className="box-card" style={cardLoginStyle}>
                    <h3 style={{textAlign: "center"}}>{_this.state.title}</h3>
                    <Form model={_this.state.form} style={{position:"absolute"}}>
                        <Form.Item label="Username" labelWidth="80">
                            <Input value={_this.state.form.username} onChange={_this.changeInput.bind(_this, 'username')}  style={{width: '250px'}} placeholder="Please enter username"/>
                        </Form.Item>
                        <Form.Item label="Password" labelWidth="80">
                            <Input type={"password"} value={_this.state.form.password} onChange={_this.changeInput.bind(_this, 'password')}  style={{width: '250px'}} placeholder="Please enter password"/>
                        </Form.Item>
                        {roleItem}
                        {rePasswordItem}
                        {phoneItem}
                        <span style={{textAlign:"center",display:"block", marginTop:"20px"}}><Button style={{width:"360px"}} type="light" onClick={_this.submitForm.bind(_this)}>{_this.state.buttonText}</Button></span>
                        <div style={{fontSize:"12px",textAlign:"center",marginTop:"10px"}}><span style={{cursor: "pointer"}} onClick={_this.changePage.bind(_this)}>{_this.state.navigateText}</span></div>
                    </Form>

                </Card>
            </div>
        );
    }

    changeInput(type, e){
        const _this = this;
        let target= Object.assign({}, _this.state.form, {
            [type]: e
        });
        _this.setState({
            form: target
        })
    }

    onChange(e){
        const _this = this;
        let form = {
            ..._this.state.form,
            roleId: e
        };
        _this.setState({form: form});
    }


    submitForm(){
        const _this = this;
        const { serverUrl } = _this.props;
        if(_this.state.type === "login"){
            axios.post(serverUrl+ '/user/login', _this.state.form)
                .then(function (response) {
                    let resp = response.data;
                    if(resp.code === 0){
                        global.tools.setLoginUser(resp.data.token);
                        Message.success(resp.msg);
                        _this.props.history.push('/');
                    }else{
                        Message.error(resp.msg);
                    }
                }).catch(function (error) {
                Message.error('Network error, log in failed!');
            })
        }else if(_this.state.type === "register"){
            axios.post(serverUrl+ '/user/register', _this.state.form)
                .then(function (response) {
                    let resp = response.data;
                    if(resp.code === 0){
                        Message.success(resp.msg);
                    }else{
                        Message.error(resp.msg);
                    }
                }).catch(function (error) {
                Message.error('Network error, sign up failed!');
            })
        }
    }

    changePage(){
        const _this = this;
        if(_this.state.type === "login"){
            _this.setState({title:"ebb&flo Registion System", phoneVisible:true, rePasswordVisible:true,
                buttonText: "Sign Up", navigateText: "Log In", type: "register"
            });
            cardLoginStyle.height = "420px";
        }else if(_this.state.type === "register"){
            _this.setState({title:"ebb&flo Registion System", phoneVisible:false, rePasswordVisible:false,
                buttonText: "Log In", navigateText: "Sign Up", type: "login"
            });
            cardLoginStyle.height = "315px";
        }
    }
}

const cardLoginStyle = {
    width: "400px",
    height: "330px",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    background:" rgba(150,105,105, 0.4)"
};

const loginStyle = {
    background:" rgb(253, 250, 246)",
    backgroundPosition: "center",
    width: "100%",
    height:"100%",
    backgroundSize: "cover",
    position: "fixed",
    borderWidth: "3px"
};

const mapStateToProps = state => ({
    menuName: state.menuName,
    serverUrl: state.serverUrl
});

const mapDispatchToProps = dispatch => ({
    changeName: name => dispatch({type:"changeName", name}),
    changeActiveNum: num => dispatch({type:"changeActiveNum", num})
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);