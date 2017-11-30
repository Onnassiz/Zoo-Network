import React from 'react';
import PageTitle from './layout/PageTitle';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import isEmpty from 'lodash/isEmpty';

import TextField from './patials/TextFieldGroup';
import ImageGifLoader from "./patials/ImageGifLoader";
import validateInput from './validations/zooValidation';
import Alert from './patials/Alert';

class AddNewZoo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            zoo_name: '',
            website: '',
            house_number: '',
            street: '',
            county: '',
            postcode: '',
            // history: '',
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
            const { serverUrl, addZoo, activateButton, showAlert } = this.props;
            const url = serverUrl.serverUrl + 'addZoo';
            addZoo(url, this.state)
                .then(() => {
                    activateButton();
                    showAlert("New Zoo Added", "success");
                    browserHistory.push('/zoo-manage');
                }).catch((error) => {
                activateButton()
                const serverError = error.response.data;
                if(serverError.hasOwnProperty('invalidToken')){
                    showAlert(serverError.invalidToken, "error");
                }
                this.setState({errors: serverError});
            });
        }
    }

    render(){
        const { formState } = this.props;
        return(
            <div>
                {this.props.alert.showAlert ? <Alert {...this.props}/>: null}
                <PageTitle title="Add New Zoo"/>
                <div className="container">
                    <Link to="/zoo-manage" className="btn btn-primary">Back</Link>
                    <div>
                        <br/>
                        <h5 className="header">Add Zoo</h5><hr/>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <TextField
                                label="Zoo Name"
                                value={this.state.zoo_name}
                                name="zoo_name"
                                type="text"
                                onChange={this.onChange.bind(this)}
                                data_error={ isEmpty(this.state.errors.zoo_name)? '' : this.state.errors.zoo_name}
                            />
                            <TextField
                                label="Website"
                                value={this.state.website}
                                name="website"
                                type="text"
                                onChange={this.onChange.bind(this)}
                                data_error={ isEmpty(this.state.errors.website)? '' : this.state.errors.website}
                            />
                            <TextField
                                label="House Number"
                                value={this.state.house_number}
                                name="house_number"
                                type="text"
                                onChange={this.onChange.bind(this)}
                                data_error={ isEmpty(this.state.errors.website)? '' : this.state.errors.website}
                            />
                            <TextField
                                label="Street"
                                value={this.state.street}
                                name="street"
                                type="text"
                                onChange={this.onChange.bind(this)}
                                data_error={ isEmpty(this.state.errors.street)? '' : this.state.errors.street}
                            />
                            <TextField
                                label="County"
                                value={this.state.county}
                                name="county"
                                type="text"
                                onChange={this.onChange.bind(this)}
                                data_error={ isEmpty(this.state.errors.county)? '' : this.state.errors.county}
                            />
                            <TextField
                                label="Post Code"
                                value={this.state.postcode}
                                name="postcode"
                                type="text"
                                onChange={this.onChange.bind(this)}
                                data_error={ isEmpty(this.state.errors.postcode)? '' : this.state.errors.postcode}
                            />
                            {/*<div className="row">*/}
                                {/*<div className="input-field col s4">*/}
                                {/*<textarea*/}
                                    {/*id="history"*/}
                                    {/*value={this.state.history}*/}
                                    {/*onChange={this.onChange.bind(this)}*/}
                                    {/*name="history"*/}
                                    {/*className={"materialize-textarea"}*/}
                                {/*/>*/}
                                    {/*<label*/}
                                        {/*htmlFor="history"*/}
                                        {/*data-error={"This is"}>History*/}
                                    {/*</label>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            <div className="row col s2">
                                <br/>
                                <div className="col s2">
                                    <input disabled={formState.isLoading} type="submit" value="Add Zoo" className="btn"/>
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

export default AddNewZoo;
