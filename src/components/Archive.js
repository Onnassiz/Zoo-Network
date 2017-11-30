import React from 'react';

import PageTitle from './layout/PageTitle';
import AnimalClass from './patials/AnimalClass';


class Archive extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            classes: []
        }
    }

    componentWillMount(){
        const { serverUrl, fetchContents, updateAnimals, fetchZooImageLinks, updateAnimalImageLinks } = this.props;
        const url = serverUrl.serverUrl + "fetchAllAnimals";
        const links_url = serverUrl.serverUrl + "fetchAnimalLinks";
        fetchZooImageLinks(links_url)
            .then((response) => {
                updateAnimalImageLinks(response.data);
            }).catch((error) => {
        });
        fetchContents(url)
            .then((response) => {
                updateAnimals(response.data);
                this.filterClasses();
            }).catch((error) => {
        });
    }

    filterClasses(){
        const { animals } = this.props;
        const allAnimals = animals.animals;
        let thisClasses = [];
        let stateClasses = [];
        allAnimals.forEach((element) => {
            const item = element.animal_class;
            if(!thisClasses.includes(item)){
                thisClasses.push(item);
                stateClasses.push({"animal_class": item})
            }
        });
        this.setState({ classes: stateClasses });
    }

    render(){
        return(
            <div>
                <PageTitle title="Archive" description="Animals grouped according to classifications"/>
                <div className="container">
                    {this.state.classes.map((animal_class, i) => <AnimalClass {...this.props} key={i} animal_class={animal_class.animal_class}/>)}
                </div>
            </div>
        );
    }
}

export default Archive;
