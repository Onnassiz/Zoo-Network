import React from 'react';

import PageTitle from './layout/PageTitle';
import isEmpty from 'lodash/isEmpty';

import ImageGifLoader from "./patials/ImageGifLoader";
import Example from './Example';
import SearchResult from './patials/SearchResult'


class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchResults: [],
            hasSearched: false
        }
    }

    componentWillMount(){
        const { serverUrl, fetchZooImageLinks, updateAnimalImageLinks } = this.props;
        const links_url = serverUrl.serverUrl + "fetchAnimalImageLinks";
        fetchZooImageLinks(links_url)
            .then((response) => {
                updateAnimalImageLinks(response.data);
            }).catch((error) => {
        });
    }

    handleSubmit(e){
        e.preventDefault();
        const search = document.getElementById('search').value;
        if(!isEmpty(search)){
            const { serverUrl, fetchContents, updateAnimals, activateButton} = this.props;
            const url = serverUrl.serverUrl + "searchAnimalByKey/" + search;
            fetchContents(url)
                .then((response) => {
                    activateButton();
                    updateAnimals(response.data);
                    this.setState({hasSearched: true});
                }).catch((error) => {
            });
        }
    }



    render(){
        const { formState } = this.props;
        return(
            <div>
                <PageTitle title="Search Zoo Network" description="You can search using any keys (Common name, Family, Species, etc.)"/>
                <div className="container">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="row">
                            <Example {...this.props} disabled={formState.isLoading}/>
                        </div>
                        <div className="row">
                            <div className="col 2" hidden={!formState.isLoading}>
                                <span className="modifyGif"><ImageGifLoader/></span>
                            </div>
                        </div>
                    </form>
                </div>


                <div className="container">
                    { this.state.hasSearched ? <SearchResult {...this.props}/> : null }
                </div>
            </div>
        );
    }
}

export default Search;
