import React, { Component } from 'react';
import SearchBar from 'components/SearchBar';
import UploadButton from 'components/UploadButton';


import '../pages/SearchPage.scss';



class SearchPage extends Component {
  render() {
    return (
      <div>
        <SearchBar/>
        <UploadButton/>
      </div>
    );
  }
}

export default SearchPage;