import React from 'react';
import { browserHistory } from 'react-router';


class ZooManageRdr extends React.Component{
    componentDidMount(){
        browserHistory.push('/zoo-manage');
    }

    render(){
        return(
            <div>
                <h2>Redirecting...</h2>
            </div>
        );
    }
}

export default ZooManageRdr;
