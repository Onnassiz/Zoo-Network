import React from 'react';
import { Link } from 'react-router';
import Alert from './Alert';
import { browserHistory } from 'react-router';



class AnimalsTableRow extends React.Component{
    onClick(delete_url){
        const { deleteItem, showAlert, activateButton } = this.props;
        deleteItem(delete_url)
            .then(() => {
                activateButton();
                showAlert("Record Deleted Successfully", 'success');
                browserHistory.push('/manage-animal-sendBack');
            }).catch((error) => {
            activateButton();
            showAlert(error.response.data.invalidToken, 'error');
        });
    }

    render(){
        const { animal, serverUrl } = this.props;
        const delete_url = serverUrl.serverUrl + 'deleteAnimal/' + localStorage.getItem('jwtToken') + '/' + animal.common_name;
        return(
            <tr>
                <td>{animal.common_name}</td>
                <td>{animal.animal_class}</td>
                <td>{animal.order}</td>
                <td>{animal.family}</td>
                <td>{animal.genus}</td>
                <td>{animal.species}</td>
                <td>
                    <a href="#/" title="delete" value={delete_url} onClick={this.onClick.bind(this, delete_url)}><i className="material-icons">delete</i></a>&nbsp;&nbsp;
                    <Link to={'/manage-animals/image-upload/' + animal.common_name} title="Upload Animal Images"><i className="material-icons">file_upload</i></Link>&nbsp;&nbsp;
                    <Link to={'/manage-animals/tag-zoos/' + animal.common_name} title="Tag Zoos"><i className="material-icons">local_offer</i></Link>
                    {this.props.alert.showAlert ? <Alert {...this.props}/>: null}
                </td>
            </tr>
        );
    }
}

export default AnimalsTableRow;
