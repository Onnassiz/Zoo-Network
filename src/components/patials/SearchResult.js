import React from 'react';

import ArchiveRow from './ArchiveRow';
import isEmpty from 'lodash/isEmpty';

class SearchResult extends React.Component{
    render(){
        const { animals } = this.props;
        const allResult = animals.animals
        return(
            <div>
                <h5 className="header">Search Results</h5>
                <ul className="collection with-header">
                    <li className="collection-header"><h5 className="header">{isEmpty(allResult) ? "No results found" : allResult.length + " result(s) found"}</h5></li>
                    { !isEmpty(allResult) ? allResult.map((animal, i) => <ArchiveRow {...this.props} animal={animal} key={i} zooAnimals={[]}/>): null}
                </ul>
            </div>
        );
    }
}
export default SearchResult;
