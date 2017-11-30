import React from 'react';

import ZooPageTitle from './layout/ZooPageTitle';
import ImageCarousel from './patials/ImageCarousel';
import ZooAnimals from './patials/ZooAnimals';


class ZooDescription extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            zoo_name: props.params.zoo_name,
            thisZoo: {},
            imageLinks: [],
            zooAnimals: [],
            animalFiltered: []
        }
    }
    componentWillMount(){
        const { updateAnimalImageLinks, serverUrl, updateAnimals, fetchContents, updateZoos, fetchZooImageLinks, updateZooImageLinks } = this.props;
        const url = serverUrl.serverUrl + "fetchZoos";
        const animals_url = serverUrl.serverUrl + "fetchAllAnimals";
        const links_url = serverUrl.serverUrl + "fetchZooImageLinks";
        const animal_links_url = serverUrl.serverUrl + "fetchAnimalImageLinks";
        this.updateAnimalZoosAction();
        fetchZooImageLinks(animal_links_url)
            .then((response) => {
                updateAnimalImageLinks(response.data);
            }).catch((error) => {
        });
        fetchContents(url)
            .then((response) => {
                updateZoos(response.data);
                this.filterZoos();
                this.filterAnimals();
            }).catch((error) => {
        });
        fetchContents(animals_url)
            .then((response) => {
                updateAnimals(response.data);
                this.filterAnimals();
            }).catch((error) => {
        });
        fetchZooImageLinks(links_url)
            .then((response) => {
                updateZooImageLinks(response.data);
                this.filterLinks();
            }).catch((error) => {
        });
    }

    filterZoos(){
        const { zoos } = this.props;
        const allZoos = zoos.zoos;
        let thisZooState = {};
        allZoos.forEach((element) => {
            if(element.zoo_name === this.state.zoo_name){
                thisZooState = element;
            }
        });
        this.setState({ thisZoo: thisZooState });
    }

    filterLinks(){
        const { zooImageLinks } = this.props;
        const allLinks = zooImageLinks.zooImageLinks;
        let thisZooLinks = [];
        allLinks.forEach((element) => {
            if(element.zoo_name === this.state.zoo_name){
                thisZooLinks.push({original: element.link});
            }
        });
        this.setState({ imageLinks: thisZooLinks });
    }

    filterAnimals(){
        const { animals } = this.props;
        const allAnimals = animals.animals;
        const thisAnimals = this.state.zooAnimals;
        let filteredAnimals = [];
        thisAnimals.forEach((element) => {
            allAnimals.forEach((item) => {
                if(element.common_name === item.common_name){
                    filteredAnimals.push(item);
                }
            });
        });
        this.setState({ animalFiltered : filteredAnimals })
    }

    updateAnimalZoosAction(){
        const { fetchContents, serverUrl, updateanimalZoos } = this.props;
        const url = serverUrl.serverUrl + 'fetchZooAnimals/' + this.state.zoo_name;
        fetchContents(url)
            .then((response) => {
                updateanimalZoos(response.data);
                this.setState({ zooAnimals: this.props.animalZoos.animalZoos});
            }).catch((error) => {
        });
    }

    render(){
        return(
            <div>
                <ImageCarousel images={this.state.imageLinks}/>
                <ZooPageTitle title={this.state.zoo_name} zoo={this.state.thisZoo}/>
                <div className="container">
                    <ZooAnimals {...this.props} zooAnimals={this.state.zooAnimals} animalsInZoo={this.state.animalFiltered}/>
                </div>
            </div>
        );
    }
}
export default ZooDescription;
