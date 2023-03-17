import React, {Component} from 'react';
import {Button, Table, Input, Message, Pagination, Dialog, Form, Select, DatePicker} from "element-react";
import {connect} from "react-redux";
import axios from "axios";
import $ from 'jquery' ;

class DoctorList extends Component {
    getDoctorList(){
        const _this = this;
        const {serverUrl } = _this.props;
        let data = {
            searchContent: _this.state.form.searchContent,
            page: _this.state.pageData.currentPage
        };
        axios.post(serverUrl+ '/doctor/list',data)
            .then(function (response) {
                let list = response.data.data.list;
                let data = response.data.data;
                list.map((item) =>{
                        item.headPic = <img src={serverUrl + "/photo/view?filename=" + item.headPic} alt={item.headPic} style={{width:'90px',height: '70px',marginTop: '5px'}} />;
                        if(item.sex === 1){
                            item.sex = "Male";
                        }else if(item.sex === 2){
                            item.sex = "Female";
                        }else if(item.sex === 3){
                            item.sex = "Genderless";
                        }
                        if(item.position === "1"){
                            item.position = "Postion 1";
                        }else if(item.position === "2"){
                            item.position = "Postion 2";
                        }else if(item.position === "3"){
                            item.position = "Postion 3";
                        }else if(item.position === "4"){
                            item.position = "Postion 4";
                        }
                        return item;
                    }
                );
                let pageData = {
                    totalPage: data.totalPage,
                    pageSize: data.size,
                    currentPage: data.page
                };
                _this.setState({data: list, pageData: pageData})
            }).catch(function (error) {
            Message.error('Network error, operation failed!');
        })
    }



}