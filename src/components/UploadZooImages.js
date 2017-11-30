import React from 'react';
import ImageGifLoader from "./patials/ImageGifLoader";
import { browserHistory } from 'react-router';
import Alert from './patials/Alert';
import { Link } from 'react-router';
import axios  from 'axios';


import PageTitle from './layout/PageTitle';
import ImageMedia from './patials/ImageMedia';
import Dropzone from 'react-dropzone'


class UploadZooImages extends React.Component{
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
                    zoo_name: params.zoo_name
                };

                const url = serverUrl.serverUrl + 'saveZooImage';
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
            const successMsg = "Image for " + params.zoo_name + " is successfully uploaded.";
            showAlert(successMsg, "success");
            browserHistory.push('/zoo-manage');
        });
    }

    filterLinks(){
        const { zooImageLinks, params } = this.props;
        const allLinks = zooImageLinks.zooImageLinks;
        let thisZooLinks = [];
        allLinks.forEach((element) => {
            if(element.zoo_name === params.zoo_name){
                thisZooLinks.push({link: element.link});
            }
        });
        this.setState({ imageLinks: thisZooLinks });
    }

    handleDeleteAll(deleteAllUrl){
        const { deleteAllZooUrl, showAlert, activateButton, params } = this.props;
        deleteAllZooUrl(deleteAllUrl)
            .then((response) => {
            activateButton();
            const alertMessage = "Images for " +params.zoo_name+" have been deleted.";
            showAlert(alertMessage, 'success');
            browserHistory.push('/zoo-manage');
        }).catch((error) => {
            activateButton()
            showAlert(error.response.data.invalidToken, 'error');
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
        const zoo_name = this.props.params.zoo_name;
        const { serverUrl } = this.props;
        const deleteAllUrl = serverUrl.serverUrl + 'deleteZooImages/'+ zoo_name + "/" + localStorage.getItem("jwtToken");
        return(
            <div>
                <PageTitle title={"Upload Images for " + zoo_name} description="A maximum of 5 images can be uploaded for each Zoo"/>
                <div className="container">
                    <div>
                        {this.props.alert.showAlert ? <Alert {...this.props}/>: null}
                        <Link to="/zoo-manage" className="btn">Back</Link>&nbsp;
                        <button className="btn" value={deleteAllUrl} onClick={this.handleDeleteAll.bind(this, deleteAllUrl)}>Delete Images for this Zoo</button>
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

                    {this.state.imageLinks.map((image, i) => <ImageMedia key={i} i={i} link={image.link}/>)}
                </div>
            </div>
        );
    }
}

export default UploadZooImages;
