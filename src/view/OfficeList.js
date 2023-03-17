import React, {Component} from 'react';
import {Button, Table, Input, Message, Pagination, Dialog, Form} from "element-react";
import {connect} from "react-redux";
import axios from "axios";

class OfficeList extends Component {

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

    changePage(e){
        const _this = this;
        _this.state.pageData.currentPage = e;
        _this.getOfficeList();
    };

    getOfficeList(){
        const _this = this;
        const {serverUrl } = _this.props;
        let data = {
            searchContent: _this.state.form.searchContent,
            page: _this.state.pageData.currentPage
        };
        axios.post(serverUrl+ '/office/list',data)
            .then(function (response) {
                let list = response.data.data.list;
                let data = response.data.data;
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

    componentDidMount() {
        const _this = this;
        _this.checkLogin();
        const { changeName, changeActiveNum } = _this.props;
        changeName("Department Management / Department List");
        changeActiveNum("3-1");
        _this.getOfficeList();
    }

    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: false,
            title: "",
            form: {
                id: "",
                name: "",
                info: "",
                searchContent: ""
            },
            selectItem: {},
            pageData: {
                totalPage: 1,
                pageSize: 5,
                currentPage: 1
            },
            columns: [
                {
                    label: "ID",
                    prop: "id",
                    width: 150,
                    align: "center"
                },
                {
                    label: "Name",
                    prop: "name",
                    width: 300,
                    align: "center"
                },
                {
                    label: "Profile",
                    prop: "info",
                    align: "center"
                }

            ],
            data: []
        }
    }

    render() {
        const _this = this;
        return (
            <div key={_this.props.location.key}  style={{margin: '20px 30px'}}>
                <span className="wrapper">
                  <Button type="success" onClick={ () => _this.setState({ dialogVisible: true, title: "Post information", form: {..._this.state.form,id:""}}) }><i className="el-icon-plus"></i>Submit</Button>
                  <Button type="warning" onClick={_this.openEdit.bind(_this)}><i className="el-icon-edit"></i> Edit</Button>
                  <Button type="danger" onClick={_this.deleteOffice.bind(_this)}><i className="el-icon-delete"></i>Delete</Button>
                  <Input defaultValue={_this.state.form.searchContent} onChange={_this.changeInput.bind(_this, 'searchContent')} style={{width: '300px', marginLeft: '20px'}} placeholder="Type deparment name" />
                  <Button onClick={_this.search.bind(_this)} style={{marginLeft: "5px"}} type="primary" icon="search">Search</Button>
                </span>
                <Table
                    style={{width: '100%',marginTop: '30px'}}
                    columns={_this.state.columns}
                    data={_this.state.data}
                    border={true}
                    height={500}
                    highlightCurrentRow={true}
                    onCurrentChange={item=>{_this.saveItem(item)}}
                />
                <Pagination layout="prev, pager, next"  style={{marginTop:'20px'}} currentPage={_this.state.pageData.currentPage} pageSize={_this.state.pageData.pageSize} onCurrentChange={_this.changePage.bind(_this)} pageCount={_this.state.pageData.totalPage}/>
                <Dialog
                    title={_this.state.title}
                    visible={ _this.state.dialogVisible }
                    onCancel={ () => _this.setState({ dialogVisible: false }) }
                >
                    <Dialog.Body>
                        <Form model={_this.state.form}>
                            <Form.Item label="Name" labelWidth="120">
                                <Input value={_this.state.form.name} onChange={_this.changeInput.bind(_this, 'name')} style={{width: '400px'}}></Input>
                            </Form.Item>
                            <Form.Item label="Profile" labelWidth="120">
                                <Input type="textarea" value={_this.state.form.info} onChange={_this.changeInput.bind(_this, 'info')} autosize={{ minRows: 3}} style={{width: '400px'}} placeholder="Type department profile"/>
                            </Form.Item>
                        </Form>
                    </Dialog.Body>

                    <Dialog.Footer className="dialog-footer">
                        <Button onClick={ () => _this.setState({ dialogVisible: false }) }>Cancel</Button>
                        <Button type="primary" onClick={_this.saveOffice.bind(_this)}>Submit</Button>
                    </Dialog.Footer>
                </Dialog>
            </div>
        );
    }

    search(){
        const _this = this;
        _this.state.pageData.currentPage = 1;
        _this.getOfficeList();
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

    deleteOffice(){
        const _this = this;
        if(JSON.stringify(_this.state.selectItem) === '{}'){
            Message.warning('Please select one');
            return false;
        }
        const {serverUrl} = _this.props;
        let form = {
            ..._this.state.selectItem,
        };
        _this.state.form = form;
        axios.post(serverUrl+ '/office/delete', _this.state.form)
            .then(function (response) {
                let resp = response.data;
                if(resp.code === 0){
                    Message.success(resp.msg);
                    _this.getOfficeList();
                    _this.setState({selectItem: {}});
                }else{
                    Message.error(resp.msg);
                }
            }).catch(function (error) {
            Message.error('Network error, operation failed!');
        })
    }

    saveItem(item){
        const _this = this;
        _this.setState({selectItem: item});
    }


    saveOffice(){
        const _this = this;
        const {serverUrl } = _this.props;
        axios.post(serverUrl+ '/office/save',_this.state.form)
            .then(function (response) {
                let resp = response.data;
                if(resp.code === 0){
                    successOption.message = resp.msg;
                    Message.success(successOption);
                    _this.getOfficeList();
                    _this.setState({ dialogVisible: false, selectItem: {}});
                }else{
                    errorOption.message = resp.msg;
                    Message.error(errorOption);
                }
            }).catch(function (error) {
            errorOption.message = "Network error, operation failed!";
            Message.error(errorOption);
        })
    }

    openEdit(){
        const _this = this;
        if(JSON.stringify(_this.state.selectItem) === '{}'){
            Message.warning('Please select one');
            return false;
        }
        let form = {
            ..._this.state.selectItem
        };
        _this.setState({form: form}, () => {
            _this.setState({ dialogVisible: true, title: "Edit department info"});
        });
    }

}
const successOption = {
    type: "success",
    message: "",
    customClass: 'zZindex'
};

const errorOption = {
    type: "error",
    message: "",
    customClass: 'zZindex'
};

const mapStateToProps = state => ({
    menuName: state.menuName,
    serverUrl: state.serverUrl
});

const mapDispatchToProps = dispatch => ({
    changeName: name => dispatch({type:"changeName", name}),
    changeActiveNum: num => dispatch({type:"changeActiveNum", num})
});



export default connect(mapStateToProps, mapDispatchToProps)(OfficeList);
