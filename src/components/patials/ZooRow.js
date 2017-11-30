import React from 'react';
import { Link } from 'react-router';
import isEmpty from 'lodash/isEmpty';


class ZooRow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            animal_count: {}
        }
    }

    componentWillMount(){
        this.getCount();
    }

    getCount(){
        const {zoo, animal_zoos} = this.props;
        if(!isEmpty(animal_zoos)){
            let thisCount = {};
            animal_zoos.forEach((element) => {
                if(element.zoo_name === zoo.zoo_name){
                    thisCount = element;
                }
            });
            this.setState({ animal_count: thisCount });
        }
    }

    render(){
        const { zoo, animal_zoos } = this.props;
        let aCount = 0;
        if(!isEmpty(animal_zoos)){
            let thisCount = {};
            animal_zoos.forEach((element) => {
                if(element.zoo_name === zoo.zoo_name){
                    thisCount = element;
                }
            });
            aCount = thisCount.animal_count;
        }
        const address = zoo.house_number + " " +zoo.street + ", " +zoo.county;
        return(
            <li className="collection-item avatar">
                <Link to={"/zoos/" + zoo.zoo_name}><span className="title">{zoo.zoo_name}</span></Link>
                <p>
                    Address: {address}<br/>
                    Post Code: {zoo.postcode}<br/>
                    Distance: 5 miles away
                </p>
                <p>{ isEmpty(animal_zoos) ? <a href={zoo.website}>Zoo Website</a> : <b>Number in Zoo: { aCount }</b> }</p>
                <Link to={"/zoos/" + zoo.zoo_name} className="secondary-content" title="More Details"><i className="material-icons">info</i></Link>
            </li>
        );
    }
}

export default ZooRow;
