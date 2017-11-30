import React from 'react';

import TextField from './../patials/TextFieldGroup';
import isEmpty from 'lodash/isEmpty';
import validateInput from './../validations/signInValidation';
import ImageGifLoader from "./../patials/ImageGifLoader";
import Alert from './../patials/Alert';
import jwt from 'jsonwebtoken';


class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    onChange(e){
        this.setState({ [e.target.name] : e.target.value });
    }

    isValid(){
        const {errors, isValid} = validateInput(this.state);
        if(!isValid){
            this.setState({ errors });
        }
        return isValid;
    }

    handleSubmit(e){
        e.preventDefault();
        this.setState({errors : {}})
        if(this.isValid()){
            const { login, activateButton, showAlert, serverUrl, setLoginDetails } = this.props;
            let fields = this.state;
            delete fields['errors'];
            const url = serverUrl.serverUrl + 'login';
            login(url, fields)
                .then((response) => {
                    activateButton();
                    const token = response.data.token;
                    localStorage.setItem('jwtToken', token);

                    const token_decode = jwt.decode(token);

                    const user = {
                        email: token_decode.email,
                        first_name: token_decode.first_name,
                        last_name: token_decode.last_name
                    }

                    setLoginDetails(user);
                    showAlert("You are now logged in to the Site Management", "success");
                }).catch((error) => {
                activateButton()
                this.setState({errors: error.response.data});
            });
        }
    }

    render(){
        const { formState } = this.props;
        return(
            <div>
                {this.props.alert.showAlert ? <Alert {...this.props}/>: null}
                <h5 className="header">Login to enable admin usage. (Use email: manager@gmail.com, password: Pass1234Ben for testing.)</h5>
                <div>
                    <form onSubmit={this.handleSubmit.bind(this)}>
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
                        <div className="row col s2">
                            <br/>
                            <div className="col s2">
                                <input disabled={formState.isLoading} type="submit" value="Login" className="btn"/>
                            </div>
                            <div className="col 2" hidden={!formState.isLoading}>
                                <span className="modifyGif"><ImageGifLoader/></span>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        );
    }
}

export default LoginForm;
