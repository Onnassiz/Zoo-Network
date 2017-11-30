import React from 'react';
import isEmpty from 'lodash/isEmpty';

import PageTitle from './layout/PageTitle';
import TextField from './patials/TextFieldGroup';
import ImageGifLoader from "./patials/ImageGifLoader";
import validateInput from './validations/zooTags';
import Alert from './patials/Alert';
import ZooTagsTableRows from './patials/ZooTagsTableRows';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';



class TagZoos extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            zoo_name: '',
            animal_count: '',
            common_name: props.params.common_name,
            zoos: [],
            animalZoos: [],
            errors: {}
        }
    }

    componentDidMount(){
        const { fetchContents, updateZoos, serverUrl } = this.props;
        const url = serverUrl.serverUrl + "fetchZoos";
        const { loginDetails } = this.props;
        if(!loginDetails.isLoggedIn){
            browserHistory.push('/dashboard');
        }
        fetchContents(url)
            .then((response) => {
                updateZoos(response.data);
                this.setState({ zoos: this.props.zoos.zoos });
            }).catch((error) => {
        });
        this.updateAnimalZoosAction();
    }


    //Handle input change event
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

    updateAnimalZoosAction(){
        const { fetchContents, serverUrl, updateanimalZoos } = this.props;
        const url = serverUrl.serverUrl + 'fetchAnimalZoos/' + this.state.common_name;
        fetchContents(url)
            .then((response) => {
                updateanimalZoos(response.data);
                this.setState({ animalZoos: this.props.animalZoos.animalZoos});
            }).catch((error) => {
        });
    }

    handleSubmit(e){
        e.preventDefault();
        if(this.isValid()){
            const { serverUrl, activateButton, showAlert, addAnimal } = this.props;
            const url = serverUrl.serverUrl + 'addAnimalZooTag';
            const fields = {
                common_name: this.state.common_name,
                zoo_name: this.state.zoo_name,
                token: localStorage.getItem('jwtToken'),
                animal_count: this.state.animal_count
            }
            addAnimal(url, fields)
                .then((response) => {
                    activateButton();
                    showAlert("Animal Tag Added", "success");
                    this.updateAnimalZoosAction();
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
        const common_name = this.props.params.common_name;
        return(
            <div>
                {this.props.alert.showAlert ? <Alert {...this.props}/>: null}
                <PageTitle title={"Tag Zoos to " + common_name} description="Add all the zoos where this animal can be found"/>
                <div className="container">
                    <Link to="/manage-animals" className="btn">Back</Link>&nbsp;
                    <h5>Tag Zoo</h5>
                    <hr/><br/><br/>
                    <div>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <div className="row">
                                <div className="col s4">
                                    <label>Select Zoo</label>
                                    <select name="zoo_name" className="browser-default" value={this.state.zoo_name} onChange={this.onChange.bind(this)}>
                                        <option value="" disabled>Choose your option</option>
                                        { this.state.zoos.map((zoo, i) => <option value={zoo.zoo_name} key={i}>{zoo.zoo_name}</option>)}
                                    </select>
                                </div>
                            </div>
                            <TextField
                                label={"Number of " + common_name + "s in Zoo"}
                                value={this.state.animal_count}
                                name="animal_count"
                                type="number"
                                onChange={this.onChange.bind(this)}
                                data_error={ isEmpty(this.state.errors.animal_count)? '' : this.state.errors.animal_count}
                            />
                            <div className="row col s4">
                                <br/>
                                <div className="col s2">
                                    <input disabled={formState.isLoading} type="submit" value="Tag Zoo" className="btn"/>
                                </div>
                                <div className="col 2" hidden={!formState.isLoading}>
                                    <span className="modifyGif"><ImageGifLoader/></span>
                                </div>
                            </div>
                        </form>
                    </div>
                    <h5>Current Tags</h5>
                    <table className="bordered highlight">
                        <thead>
                        <tr>
                            <th>Zoo Name</th>
                            <th>{"Number of " + common_name + "s in Zoo"}</th>
                            <th>Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        {this.state.animalZoos.map((zooTag, i) => <ZooTagsTableRows {...this.props} zooTag={zooTag} key={i}/>)}
                        </tbody>
                    </table>

                    <hr/>
                </div>
            </div>
        );
    }
}
export default TagZoos;
