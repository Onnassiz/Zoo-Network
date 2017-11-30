import React from 'react';
import { Link } from 'react-router';
import isEmpty from 'lodash/isEmpty';


class ArchiveRow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            imageLinks: [],
            animal_count: {}
        }
    }

    componentWillMount(){
        this.filterLinks();
        this.getCount();
    }

    filterLinks(){
        const { animalImageLinks, animal } = this.props;
        const allLinks = animalImageLinks.animalImageLinks;
        let thisAnimalLinks = [];
        allLinks.forEach((element) => {
            if(element.common_name === animal.common_name){
                thisAnimalLinks.push({link: element.link});
            }
        });
        this.setState({ imageLinks: thisAnimalLinks });
    }

    getCount(){
        const {zooAnimals, animal} = this.props;
        if(!isEmpty(zooAnimals)){
            let thisCount = {};
            zooAnimals.forEach((element) => {
                if(element.common_name === animal.common_name){
                    thisCount = element;
                }
            });
            this.setState({ animal_count: thisCount });
        }
    }


    render(){
        const { animal, zooAnimals } = this.props;
        return(
        <li className="collection-item avatar">
            <Link to={"/archive/" + animal.common_name}>
                <img alt={animal.common_name} src={ isEmpty(this.state.imageLinks) ? "null" : this.state.imageLinks[0].link} className="circle"/>
                <span className="title">{animal.common_name}</span>
                <p>Order: {animal.order}<br/>
                    Class: {animal.animal_class}<br/>
                    Family: {animal.family}<br/>
                    Species: {animal.species}<br/>
                    { !isEmpty(zooAnimals) ? <b>Number in Zoo: {this.state.animal_count.animal_count}</b> : null }
                </p>
                <p className="secondary-content" title="More Details"><i className="material-icons">info</i></p>
            </Link>
        </li>
        );
    }
}

export default ArchiveRow;
