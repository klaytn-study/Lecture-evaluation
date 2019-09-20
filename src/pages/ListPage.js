import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectLecture } from '../actions';
import { bindActionCreators } from 'redux';
import SearchBar from 'components/SearchBar';
import UploadButton from 'components/UploadButton';
import LectureList from 'components/LectureList';
import LectureDetail from 'components/LectureDetail';

import './ListPage.scss';


class ListPage extends Component {
  render() {
    return (
      <div className="listPage__div">
        <SearchBar items={this.props}/>
        <UploadButton/>
        <div className="row">
          <LectureList />
          <LectureDetail />
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
// export default ListPage;
