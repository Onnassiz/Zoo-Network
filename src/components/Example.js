import React from 'react';
import Autosuggest from 'react-autosuggest';


class Example extends React.Component {
    constructor() {
        super();

        this.state = {
            value: '',
            suggestions: [],
            items: [],
            searchKeys: [],
        };
    }

    componentDidMount(){
        const { serverUrl, fetchContents } = this.props;
        const url = serverUrl.serverUrl + "getSearchKeys";
        fetchContents(url)
            .then((response) => {
                const searchKeys = response.data;
                let finalSearch = [];
                searchKeys.forEach((element) =>{
                    finalSearch.push({name: element});
                });
                this.setState({searchKeys: finalSearch});
            }).catch((error) => {
        });
    }

    getSuggestionValue(suggestion) {
        return suggestion.name;
    }

    renderSuggestion(suggestion) {
        return (
            <span>{suggestion.name}</span>
        );
    }

    getSuggestions(value) {
        const inputValue = value.trim().toLowerCase();
        let newKeys = [];
        this.state.searchKeys.forEach((element) => {
            if(element.name.toLowerCase().includes(inputValue)){
                newKeys.push(element);
            }
        })
        return newKeys;
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        const { value, suggestions } = this.state;

        const style = {
            color: 'white',
            paddingLeft: 20,
            border: 'solid #4db6ac 1px',
            background: '#4db6ac'
        };

        const inputProps = {
            value,
            onChange: this.onChange.bind(this),
            id: 'search',
            name: 'search',
            type: 'search',
            ref: 'search',
            autoFocus: true,
            style,
            disabled: this.props.disable,
        };

        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
                getSuggestionValue={this.getSuggestionValue.bind(this)}
                renderSuggestion={this.renderSuggestion.bind(this)}
                inputProps={inputProps}
            />
        );
    }
}

export default Example;
