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
        <SearchBar/>
        <UploadButton/>
        <div className="row">
          <LectureList />
          <LectureDetail />
        </div>
      </div>
    );
  }
}

export default ListPage;
