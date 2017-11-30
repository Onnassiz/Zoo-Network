import React from 'react';
import PageTitle from './layout/PageTitle';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import isEmpty from 'lodash/isEmpty';

import TextField from './patials/TextFieldGroup';
import ImageGifLoader from "./patials/ImageGifLoader";
import validateInput from './validations/animalValidate';
import Alert from './patials/Alert';

class AddNewAnimal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            common_name: '',
            animal_class: '',
            order: '',
            family: '',
            genus: '',
            species: '',
            description: '',
            token: localStorage.getItem('jwtToken'),
            errors: {}
        }
    }

    componentWillMount(){
        const { loginDetails } = this.props;
        if(!loginDetails.isLoggedIn){
            browserHistory.push('/dashboard');
        }
    }

    isValid(){
        const {errors, isValid} = validateInput(this.state);
        if(!isValid){
            this.setState({ errors });
        }
        return isValid;
    }

    //Handle input change event
    onChange(e){
        this.setState({ [e.target.name] : e.target.value });
    }

    handleSubmit(e){
        e.preventDefault();
        this.setState({errors: {} });
        if(this.isValid()){
            const { serverUrl, activateButton, showAlert, addAnimal } = this.props;
            const url = serverUrl.serverUrl + 'addAnimal';
            addAnimal(url, this.state)
                .then((response) => {
                    activateButton();
                    showAlert("New Animal Added", "success");
                    browserHistory.push('/manage-animals');
                }).catch((error) => {
                activateButton()
                const serverError = error.response.data;
                console.log(serverError)
                if(serverError.hasOwnProperty('invalidToken')){
                    showAlert(serverError.invalidToken, "error");
                }
                this.setState({errors: serverError});
            });
        }
    }

    render(){
        const { formState } = this.props;
        const validTextArea = isEmpty(this.state.errors.description) ? '': 'invalid';
        return(
            <div>
                {this.props.alert.showAlert ? <Alert {...this.props}/>: null}
                <PageTitle title="Add New Animal"/>
                <div className="container">
                    <Link to="/manage-animals" className="btn btn-primary">Back</Link>
                    <div>
                        <br/>
                        <h5 className="header">Add Animal</h5><hr/>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <TextField
                                label="Common Name"
                                value={this.state.common_name}
                                name="common_name"
                                type="text"
                                onChange={this.onChange.bind(this)}
                                data_error={ isEmpty(this.state.errors.common_name)? '' : this.state.errors.common_name}
                            />
                            <TextField
                                label="Class"
                                value={this.state.animal_class}
                                name="animal_class"
                                type="text"
                                onChange={this.onChange.bind(this)}
                                data_error={ isEmpty(this.state.errors.animal_class)? '' : this.state.errors.animal_class}
                            />
                            <TextField
                                label="Order"
                                value={this.state.order}
                                name="order"
                                type="text"
                                onChange={this.onChange.bind(this)}
                                data_error={ isEmpty(this.state.errors.order)? '' : this.state.errors.order}
                            />
                            <TextField
                                label="Family"
                                value={this.state.family}
                                name="family"
                                type="text"
                                onChange={this.onChange.bind(this)}
                                data_error={ isEmpty(this.state.errors.family)? '' : this.state.errors.family}
                            />
                            <TextField
                                label="Genus"
                                value={this.state.genus}
                                name="genus"
                                type="text"
                                onChange={this.onChange.bind(this)}
                                data_error={ isEmpty(this.state.errors.genus)? '' : this.state.errors.genus}
                            />
                            <TextField
                                label="Species"
                                value={this.state.species}
                                name="species"
                                type="text"
                                onChange={this.onChange.bind(this)}
                                data_error={ isEmpty(this.state.errors.species)? '' : this.state.errors.species}
                            />
                            <div className="row">
                                <div className="input-field col s4">
                                <textarea
                                    id="description"
                                    value={this.state.description}
                                    onChange={this.onChange.bind(this)}
                                    name="description"
                                    className={"materialize-textarea " +  validTextArea}
                                />
                                    <label
                                        htmlFor="description"
                                        data-error={"This is"}>Description
                                    </label>
                                </div>
                            </div>
                            <div className="row col s2">
                                <br/>
                                <div className="col s2">
                                    <input disabled={formState.isLoading} type="submit" value="Add Animal" className="btn"/>
                                </div>
                                <div className="col 2" hidden={!formState.isLoading}>
                                    <span className="modifyGif"><ImageGifLoader/></span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddNewAnimal;
