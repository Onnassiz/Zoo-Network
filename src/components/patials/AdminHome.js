import React from 'react';

class AdminHome extends React.Component{
    render(){
        const { loginDetails } = this.props;
        return(
            <div>
                <h5 className="header">You are logged in as</h5> <hr/>
                <div className="row">
                    <br/>
                    <div className="col s2"><b>Email:</b></div>
                    <div className="col s2">{loginDetails.user.email}</div>
                </div>
                <div className="row">
                    <div className="col s2"><b>First Name:</b></div>
                    <div className="col s2">{loginDetails.user.first_name}</div>
                </div>
                <div className="row">
                    <div className="col s2"><b>Last Name:</b></div>
                    <div className="col s2">{loginDetails.user.last_name}</div>
                </div>
            </div>
        );
    }
}

export default AdminHome;
