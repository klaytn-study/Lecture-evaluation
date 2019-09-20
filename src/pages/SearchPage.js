import React, { Component } from 'react';
import SearchBar from 'components/SearchBar';
import UploadButton from 'components/UploadButton';
import { connect } from 'react-redux';
import { selectLecture } from '../actions';
import { bindActionCreators } from 'redux';

import '../pages/SearchPage.scss';



class SearchPage extends Component {
  render() {
    return (
      <div>
        <SearchBar items={this.props}/>
        <UploadButton/>
        <br/>
      </div>
    );
  }
}


function mapStateToProps({lectures}) {
  return {
    lectures
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({selectLecture}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
// export default SearchPage;