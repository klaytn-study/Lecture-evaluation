import React from 'react';
import { connect } from 'react-redux';
import { selectLecture } from '../actions';
import { bindActionCreators } from 'redux';

class SearchInfo extends React.Component {
    render() {
        return (
            <li>
                {this.props.lecture.campus} {this.props.lecture.title} {this.props.lecture.professor}
            </li>
        );
        
    }
}

export default SearchInfo;