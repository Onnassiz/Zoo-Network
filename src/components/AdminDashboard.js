import React from 'react';

import PageTitle from './layout/PageTitle';
import LoginForm from './patials/LoginForm';
import AdminHome from './patials/AdminHome';
import Alert from './patials/Alert';



class AdminDashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: false
        };
    }

    componentWillMount(){
        const { loginDetails } = this.props;
        if(loginDetails.isLoggedIn){
            this.setState({ isLoggedIn: true });
        }
    }

    render(){
        console.log(this.state.isLoggedIn);
        return(
            <div>
                {this.props.alert.showAlert ? <Alert {...this.props}/>: null}
                <PageTitle title="Admin DashBoard" description="Manage Site Contents"/>
                <div className="container">
                    { (!this.state.isLoggedIn) ? <LoginForm {...this.props}/> : <AdminHome {...this.props}/> }
                </div>
            </div>
        );
    }
}

export default AdminDashboard;
