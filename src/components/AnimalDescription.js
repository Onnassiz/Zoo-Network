import React from 'react';

import AnimalPageTitle from './layout/AnimalPageTitle';
import ImageCarousel from './patials/ImageCarousel';
import ZooRow from './patials/ZooRow';



class AnimalDescription extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            common_name : props.params.common_name,
            thisAnimal: {},
            imageLinks: [],
            zoos:[],
            animalZoos: [],
        }
    }

    componentDidMount(){
        const { updateZoos, updateZooImageLinks, serverUrl, fetchContents, updateAnimals, fetchZooImageLinks, updateAnimalImageLinks } = this.props;
        const url = serverUrl.serverUrl + "fetchAllAnimals";
        const links_url = serverUrl.serverUrl + "fetchAnimalImageLinks";
        fetchContents(url)
            .then((response) => {
                updateAnimals(response.data);
                this.filterAnimal();
            }).catch((error) => {
        });
        fetchZooImageLinks(links_url)
            .then((response) => {
                updateAnimalImageLinks(response.data);
                this.filterLinks();
            }).catch((error) => {
        });
        const zoos_url = serverUrl.serverUrl + "fetchZoos";
        const zoos_links_url = serverUrl.serverUrl + "fetchZooImageLinks";
        fetchContents(zoos_url)
            .then((response) => {
                updateZoos(response.data);
                this.updateZooState();
                this.updateAnimalZoosAction();
            }).catch((error) => {
        });
        fetchZooImageLinks(zoos_links_url)
            .then((response) => {
                updateZooImageLinks(response.data);
            }).catch((error) => {
        });
    }

    updateZooState(){
        const { zoos } = this.props;
        this.setState({ zoos: zoos.zoos });
    }

    filterAnimal(){
        const { animals } = this.props;
        const allAnimals = animals.animals;
        let thisAnimalState = {};
        allAnimals.forEach((element) => {
            if(element.common_name === this.state.common_name){
                thisAnimalState = element;
            }
        });
        this.setState({ thisAnimal: thisAnimalState });
    }

    updateAnimalZoosAction(){
        const { fetchContents, serverUrl, updateanimalZoos } = this.props;
        const url = serverUrl.serverUrl + 'fetchAnimalZoos/' + this.state.common_name;
        fetchContents(url)
            .then((response) => {
                updateanimalZoos(response.data);
                this.setState({ animalZoos: this.props.animalZoos.animalZoos});
                this.getAnimalZoosDetails();
            }).catch((error) => {
        });
    }

    filterLinks(){
        const { animalImageLinks } = this.props;
        const allLinks = animalImageLinks.animalImageLinks;
        let thisAnimalLinks = [];
        allLinks.forEach((element) => {
            if(element.common_name === this.state.common_name){
                thisAnimalLinks.push({original: element.link});
            }
        });
        this.setState({ imageLinks: thisAnimalLinks });
    }

    getAnimalZoosDetails(){
        const zoos = this.state.zoos;
        const animalZoos = this.state.animalZoos;
        let finalZoos = [];
        zoos.forEach((element) =>{
            animalZoos.forEach((item) =>{
                if(item.zoo_name === element.zoo_name){
                    finalZoos.push(element);
                }
            })
        });
        this.setState({zoos: finalZoos});
    }

    render(){
        return(
            <div>
                <ImageCarousel images={this.state.imageLinks}/>
                <AnimalPageTitle title={this.state.common_name} no_margin="no_margin" description={this.state.thisAnimal.description}/>
                <div className="container">
                    <h4 className="header">Zoos</h4>
                    <ul className="collection with-header">
                        <li className="collection-header"><h5 className="header">{this.state.common_name} can be found in the following zoos</h5></li>
                        {this.state.zoos.map((zoo, i) => <ZooRow {...this.props} key={i} i={i} zoo={zoo} animal_zoos={this.state.animalZoos}/>)}
                    </ul>
                    <h4 className="header">More Details</h4><hr/>
                    <h5 className="header title">Class</h5>
                    <div>{this.state.thisAnimal.animal_class}</div>
                    <h5 className="header title">Family</h5>
                    <div>{this.state.thisAnimal.family}</div>
                    <h5 className="header title">Order</h5>
                    <div>{this.state.thisAnimal.order}</div>
                    <h5 className="header title">Genus</h5>
                    <div>{this.state.thisAnimal.genus}</div>
                    <h5 className="header title">Species</h5>
                    <div>{this.state.thisAnimal.species}</div>
                </div>
            </div>
        );
    }
}

export default AnimalDescription;
