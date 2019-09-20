import React, { Component } from 'react';
import { connect } from 'react-redux';

import './LectureDetail.scss';
import { Table } from 'react-bootstrap'
import DetailLec from '../components/LectureDetail1'

import Data from '../components/data';

class LectureDetail extends Component {
  render() {
    if (!this.props.selected) {
      return <div> 강의를 선택하세요  </div>;
    }
    return (
      <div className='lectureDetail__list col'>
        <br></br>
        <div>{this.props.selected.title} {this.props.selected.professor}&nbsp;<h9>검색결과</h9></div>
        <br></br>
        <DetailLec
          lectitle={this.props.selected.title}
          lectpro={this.props.selected.professor}
        />
      </div>
    );
  }
}

function mapStateToProps({selected}) {
  return {
    selected: selected
  };
}

export default connect(mapStateToProps)(LectureDetail);