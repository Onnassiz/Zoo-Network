import React from 'react';
import ImageGifLoader from "./patials/ImageGifLoader";
import { browserHistory } from 'react-router';
import Alert from './patials/Alert';
import Dropzone from 'react-dropzone'
import { Link } from 'react-router';
import axios from 'axios';

import PageTitle from './layout/PageTitle';
import ImageMedia from './patials/ImageMedia'

class UploadAnimalImages extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            imageLinks: []
        }
    }

    componentDidMount(){
        const { loginDetails } = this.props;
        if(!loginDetails.isLoggedIn){
            browserHistory.push('/dashboard');
        }
        this.filterLinks();
    }


    handleDrop(files){
        const { saveZooImage, serverUrl, params, showAlert, deactivateButton, activateButton } = this.props;
        deactivateButton();
        const url = "https://api.cloudinary.com/v1_1/onnassiz/image/upload";
        const uploaders = files.map(file => {
            // Initial FormData
            const formData = new FormData();
            formData.append("file", file);
            formData.append("tags", `gist`);
            formData.append("upload_preset", "nbo5oyfm");
            formData.append("api_key", "258613626473737");
            formData.append("timestamp", (Date.now() / 1000) | 0);

            return axios.post(url, formData, {
                headers: { "X-Requested-With": "XMLHttpRequest" },
            }).then(response => {
                const data = response.data;
                const fileURL = data.secure_url // You should store this URL for future references in your app

                const fields = {
                    image_url: fileURL,
                    token: localStorage.getItem('jwtToken'),
                    common_name: params.common_name
                };
                const url = serverUrl.serverUrl + 'saveAnimalImage';

                saveZooImage(url, fields).then(() => {
                    activateButton();
                }).catch((error) => {
                    const serverError = error.response.data;
                    if(serverError.hasOwnProperty('invalidToken')){
                        showAlert(serverError.invalidToken, "error");
                    }
                });

            }).catch((error) => {
                console.log(error.response);
            })
        });

        // Once all the files are uploaded
        axios.all(uploaders).then(() => {
            const successMsg = "Image for " + params.common_name + " is successfully uploaded.";
            showAlert(successMsg, "success");
            browserHistory.push('/manage-animals');
        });
    }

    filterLinks(){
        const { animalImageLinks, params } = this.props;
        const allLinks = animalImageLinks.animalImageLinks;
        let thisAnimalLinks = [];
        allLinks.forEach((element) => {
            if(element.common_name === params.common_name){
                thisAnimalLinks.push({link: element.link});
            }
        });
        this.setState({ imageLinks: thisAnimalLinks });
    }

    handleDeleteAll(deleteAllUrl){
        const { deleteAllZooUrl, showAlert, activateButton, params } = this.props;
        deleteAllZooUrl(deleteAllUrl)
            .then((response) => {
                activateButton();
                const alertMessage = "Images for " +params.common_name+" have been deleted.";
                showAlert(alertMessage, 'success');
                browserHistory.push('/manage-animals');
            }).catch((error) => {
            activateButton()
            showAlert(error.response.data.invalidToken, 'error');
            console.log(error.response.data)
        })
    }

    render(){
        const dropZoneStyle = {
            width: 600,
            height: 300,
            margin: 'auto',
            padding: 20,
            border: 'dashed black 1px'
        };
        const common_name = this.props.params.common_name;
        const { serverUrl } = this.props;
        const deleteAllUrl = serverUrl.serverUrl + 'deleteAnimalImages/'+ common_name + "/" + localStorage.getItem("jwtToken");
        return(
            <div>
                <PageTitle title={"Upload Images for " + common_name} description="A maximum of 5 images per animal is allowed"/>
                <div className="container">
                    <div>
                        {this.props.alert.showAlert ? <Alert {...this.props}/>: null}
                        <Link to="/manage-animals" className="btn">Back</Link>&nbsp;
                        <button className="btn" value={deleteAllUrl} onClick={this.handleDeleteAll.bind(this, deleteAllUrl)}>Delete Images for this Animals</button>
                        <div className="col 2" hidden={!this.props.formState.isLoading}>
                            <span className="modifyGif"><ImageGifLoader/></span>
                        </div>
                        <hr/>
                    </div><br/>

                    <div className="row">
                        <div className="col-md-offset-1 col-md-10">
                            <Dropzone
                                onDrop={this.handleDrop.bind(this)}
                                multiple
                                accept="image/*"
                                style={dropZoneStyle}
                            >
                                <div style={{textAlign: 'center'}}>
                                    <h5>Drop Images Here</h5>
                                    <br/><br/><br/>
                                    <button className="btn">Upload Image</button>
                                </div>
                            </Dropzone>
                        </div>
                    </div>

                    <h5 className="header">Uploaded Images</h5>
                    {this.state.imageLinks.map((image, i) => <ImageMedia key={i} i={i} link={image.link}/>)}
                </div>
            </div>
        );
    }
}

export default UploadAnimalImages;
