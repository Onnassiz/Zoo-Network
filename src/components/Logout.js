import React from 'react';
import { browserHistory } from 'react-router';


class Logout extends React.Component{
    componentWillMount(){
        const { unsetLoginDetails } = this.props;
        localStorage.removeItem("jwtToken");
        unsetLoginDetails();
        browserHistory.push('/dashboard');
    }

    render(){
        return(
            <h1 className="header">Logging out...</h1>
        );
    }
}

export default Logout;
