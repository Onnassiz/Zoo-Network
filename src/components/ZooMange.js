import React from 'react';
import PageTitle from './layout/PageTitle';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import isEmpty from 'lodash/isEmpty';

import Alert from './patials/Alert';
import ZooManageTable from './patials/ZooManageTable';

class ZooMange extends React.Component{
    componentDidMount(){
        const { loginDetails, serverUrl, fetchContents, updateZoos, fetchZooImageLinks, updateZooImageLinks } = this.props;
        if(!loginDetails.isLoggedIn){
            browserHistory.push('/dashboard');
        }
        const url = serverUrl.serverUrl + "fetchZoos";
        const links_url = serverUrl.serverUrl + "fetchZooImageLinks";
        fetchContents(url)
            .then((response) => {
            updateZoos(response.data);
            }).catch((error) => {
        });
        fetchZooImageLinks(links_url)
            .then((response) => {
            updateZooImageLinks(response.data);
            }).catch((error) => {
        });
    }

    render(){
        const { zoos } = this.props;
        return(
            <div>
                {this.props.alert.showAlert ? <Alert {...this.props}/>: null}
                <PageTitle title="Zoo Management"/>
                <div className="container">
                    <Link to="/zoo-manage/add" className="btn btn-primary">Add New Zoo</Link>
                    { !isEmpty(zoos.zoos) ? <ZooManageTable {...this.props} zoos={zoos.zoos}/> : null }
                </div>
            </div>
        );
    }
}

export default ZooMange;
