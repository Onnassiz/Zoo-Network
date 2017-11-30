import React from 'react';
import PageTitle from './layout/PageTitle';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import isEmpty from 'lodash/isEmpty';

import Alert from './patials/Alert';
import AnimalRecordsTable from './patials/AnimalsRecordsTable';

class ManageAnimals extends React.Component{
    componentDidMount(){
        const { loginDetails, serverUrl, fetchContents, updateAnimals, fetchZooImageLinks, updateAnimalImageLinks } = this.props;
        if(!loginDetails.isLoggedIn){
            browserHistory.push('/dashboard');
        }
        const url = serverUrl.serverUrl + "fetchAllAnimals";
        const links_url = serverUrl.serverUrl + "fetchAnimalImageLinks";
        fetchContents(url)
            .then((response) => {
                updateAnimals(response.data);
            }).catch((error) => {
        });
        fetchZooImageLinks(links_url)
            .then((response) => {
                updateAnimalImageLinks(response.data);
            }).catch((error) => {
        });
    }

    render(){
        const { animals } = this.props;
        return(
            <div>
                {this.props.alert.showAlert ? <Alert {...this.props}/>: null}
                <PageTitle title="Animals Records"/>
                <div className="container">
                    <Link to="/manage-animals/add" className="btn btn-primary">Add New Animal</Link>
                    { !isEmpty(animals.animals) ? <AnimalRecordsTable {...this.props} animals={animals.animals}/> : null }
                </div>
            </div>
        );
    }
}

export default ManageAnimals;
