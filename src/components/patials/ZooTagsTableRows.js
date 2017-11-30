import React from 'react';
import Alert from './Alert';
import { browserHistory } from 'react-router';



class ZooTagsTableRows extends React.Component{
    onClick(delete_url){
        const { deleteItem, showAlert, activateButton } = this.props;
        deleteItem(delete_url)
            .then((response) => {
                activateButton();
                showAlert("Tag Removed Successfully", 'success');
                browserHistory.push('/manage-animals');
            }).catch((error) => {
            activateButton();
            showAlert(error.response.data.invalidToken, 'error');
        });
    }

    render(){
        const { zooTag, serverUrl } = this.props;
        const delete_url = serverUrl.serverUrl + 'deleteTag/' + localStorage.getItem('jwtToken') + '/' + zooTag.common_name + '/' + zooTag.zoo_name;
        return(
            <tr>
                <td>{zooTag.zoo_name}</td>
                <td>{zooTag.animal_count}</td>
                <td>
                    <a href="#/" title="delete" value={delete_url} onClick={this.onClick.bind(this, delete_url)}><i className="material-icons">delete</i></a>&nbsp;&nbsp;
                    {this.props.alert.showAlert ? <Alert {...this.props}/>: null}
                </td>
            </tr>
        );
    }
}

export default ZooTagsTableRows;
