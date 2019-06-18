import React from 'react';

import Autosuggest from 'react-autosuggest';

import axios from 'axios'

async function getRecords(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  const {data: records} = await axios.get('http://127.0.0.1:8080/');

  let filtered = inputLength === 0 ? [] : records.filter(record =>
    record.title.toLowerCase().slice(0, inputLength) === inputValue
  );

  console.log(filtered);

  return filtered;
}

// Teach Autosuggest how to calculate suggestions for any given input value.
async function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  let records = await getRecords(inputValue);
  console.log(records);
  return inputLength === 0 ? [] : records.filter(lang => {
      console.log(lang);
      return lang.title.toLowerCase().slice(0, inputLength) === inputValue
    }
  );
}

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.title;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.title}
  </div>
);

class SearchAutosuggest extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };

    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
  }

  onChange = (event, {newValue}) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  async onSuggestionsFetchRequested({value}) {
    const sug = await getSuggestions(value);

    this.setState({
      suggestions: sug
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const {value, suggestions} = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'what are you looking for?',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }

}

export default SearchAutosuggest;
