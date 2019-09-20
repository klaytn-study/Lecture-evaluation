import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap'
import SearchInfo from './SearchInfo';
import { connect } from 'react-redux';
import { selectLecture } from '../actions';
import { bindActionCreators } from 'redux';
import './SearchBar.scss';

class SearchBar extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            search: '',
        };
    }

    onTextChanged = (e) => {
      this.setState({
        search: e.target.value,
      })
      console.log(this.state.search)
    }

    liOnclicked() {
      alert('clicked!');
    }

    render() {
      const { items } = this.props;
      let filteredLectures = items.lectures.filter((lecture) => {
            return lecture.title.indexOf(this.state.search) !== -1;
        }
      );
      return (
        <form className="search-bar__control">

          <div className="input-group mb-3">
            <input
              onChange={this.onTextChanged}
              type="text"
              className="form-control-search input-group"
              placeholder="교수이름, 교과목이름"
              value={this.state.search}
            />
            <div className="input-group-append">
              <button className="btn btn-secondary" type="button">
                <span>search</span>
              </button>
            </div>
            <ul>
              <li>
                {filteredLectures.map((lecture) => {
                  return <SearchInfo lecture={lecture}
                    onclick={this.liOnclicked}
                    key={lecture.campus, lecture.title, lecture.professor}/>
                })}
              </li>
            </ul>
          </div>
          <p/>    
        </form>
      )
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
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);