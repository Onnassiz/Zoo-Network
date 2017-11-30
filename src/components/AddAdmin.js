import React from 'react';

import PageTitle from './layout/PageTitle';
import TextField from './patials/TextFieldGroup';
import validateInput from './validations/signUpValidations';
import isEmpty from 'lodash/isEmpty';
import ImageGifLoader from "./patials/ImageGifLoader";
import { browserHistory } from 'react-router';

class AddAdmin extends React.Component{
    //Define Initial States
    constructor(props){
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: {}
        }
    }

    componentWillMount(){
        const { loginDetails } = this.props;
        if(!loginDetails.isLoggedIn){
            browserHistory.push('/dashboard');
        }
    }

    //Handle input change event
    onChange(e){
        this.setState({ [e.target.name] : e.target.value });
    }

    //validate client input
    isValid(){
        const {errors, isValid} = validateInput(this.state);
        if(!isValid){
            this.setState({ errors });
        }
        return isValid;
    }

    //Handle form submit
    handleSubmit(e){
        e.preventDefault();
        this.setState({errors : {}})
        if(this.isValid()){
            const { serverUrl, createNewAdmin, activateButton, showAlert } = this.props;
            let fields = this.state;
            delete fields['errors'];
            const url = serverUrl.serverUrl + "createAdminAccount"
            createNewAdmin(url, fields)
                .then((response) => {
                    activateButton();
                    showAlert("Admin successfully added. The recently added admin is advised to change his/her Password", "success")
                    browserHistory.push('/dashboard');
                }).catch((error) => {
                    activateButton();
                    this.setState({errors: error.response.data});
                });
        }
    }

    render(){
        const { formState } = this.props;
        return(
            <div>
                <PageTitle title="Add Admin"/>
                <div className="container">
                    <div className="row">
                        <h5 className="header">Add New Admin</h5><hr/>
                    </div>
                    <div>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <TextField
                                label="First Name"
                                value={this.state.first_name}
                                name="first_name"
                                type="text"
                                onChange={this.onChange.bind(this)}
                                data_error={ isEmpty(this.state.errors.first_name)? '' : this.state.errors.first_name}
                            />
                            <TextField
                                label="Surname"
                                value={this.state.last_name}
                                name="last_name"
                                type="text"
                                onChange={this.onChange.bind(this)}
                                data_error={ isEmpty(this.state.errors.last_name)? '' : this.state.errors.last_name}
                            />
                            <TextField
                                label="Email"
                                value={this.state.email}
                                name="email"
                                type="text"
                                onChange={this.onChange.bind(this)}
                                data_error={ isEmpty(this.state.errors.email)? '' : this.state.errors.email}
                            />
                            <TextField
                                label="Password"
                                value={this.state.password}
                                name="password"
                                type="password"
                                onChange={this.onChange.bind(this)}
                                data_error={ isEmpty(this.state.errors.password)? '' : this.state.errors.password}
                            />
                            <TextField
                                label="Password Confirmation"
                                value={this.state.password_confirmation}
                                name="password_confirmation"
                                type="password"
                                onChange={this.onChange.bind(this)}
                                data_error={ isEmpty(this.state.errors.password_confirmation)? '' : this.state.errors.password_confirmation}
                            />
                            <div className="row col s2">
                                <br/>
                                <div className="col s2">
                                    <input disabled={formState.isLoading} type="submit" value="Create Account" className="btn"/>
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
export default AddAdmin;
