import React from 'react';
import { browserHistory } from 'react-router';


class ManageAnimalRdr extends React.Component{
    componentDidMount(){
        browserHistory.push('/manage-animals');
    }

    render(){
        return(
            <div>
                <h2>Redirecting...</h2>
            </div>
        );
    }
}

export default ManageAnimalRdr;
