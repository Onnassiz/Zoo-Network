import React from 'react';
import { Link } from 'react-router';
import Alert from './Alert';
import { browserHistory } from 'react-router';



class TableRow extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            showModal : false
        }
    }

    onClick(delete_url){
        const { deleteItem, showAlert, activateButton } = this.props;
        deleteItem(delete_url)
            .then((response) => {
                activateButton();
                showAlert("Record Deleted Successfully", 'success');
                browserHistory.push('/zoo-manage-sendBack');
            }).catch((error) => {
            showAlert(error.response.data.invalidToken, 'error');
        });
    }

    render(){
        const { zoo, serverUrl } = this.props;
        const address = zoo.house_number + " " +zoo.street + " " +zoo.county;
        const delete_url = serverUrl.serverUrl + 'deleteZoo/' + localStorage.getItem('jwtToken') + '/' + zoo.zoo_name;
        return(
            <tr>
                <td>{zoo.zoo_name}</td>
                <td>{zoo.website}</td>
                <td>{address}</td>
                <td>{zoo.postcode}</td>
                <td>
                    <a href="#/" title="delete" value={delete_url} onClick={this.onClick.bind(this, delete_url)}><i className="material-icons">delete</i></a>&nbsp;&nbsp;
                    <Link to={'/zoo-manage/image-upload/' + zoo.zoo_name} title="Upload Zoo Images"><i className="material-icons">file_upload</i></Link>
                    {this.props.alert.showAlert ? <Alert {...this.props}/>: null}
                </td>
            </tr>
        );
    }
}

export default TableRow;
