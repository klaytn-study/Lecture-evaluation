import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap'

import { connect } from 'react-redux';
import { selectLecture } from '../actions';
import { bindActionCreators } from 'redux';
import './SearchBar.scss';

class SearchBar extends React.Component {
  // suggestions: 자동완성(아래에 뜨는거)
  // text: 검색창에 보여지는 값
  // search: 실제로 넘어가는 값
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      text: '',
      search: [],
    };
  }

    // 검색창에 사용자가 검색어를 치면
    //text에 실시간으로 검색어를 반영
    //suggestions에 검색어(강의명)가 들어간 강좌들을 넣음
    onTextChanged = (e) => {
      const { items } = this.props;
      // const value = e.target.value;
      let suggestions = [];
      // this.setState({ text: e.target.value })
      const val = e.target.value
      const filteredLectures = items.lectures.filter((lecture) => {
        return lecture.title.indexOf(val) !== -1;
      });
      if (val.length > 0) {
        suggestions = filteredLectures.map((lecture) => lecture)
      }
      this.setState({suggestions: suggestions, text: val})
       
      // this.setState(() => ({ suggestions }));

    }

    //자동완성의 항목이 선택되면
    //text는 캠퍼스, 강의명, 교수명을 표시
    //search에 선택한 항목의 값을 저장
    //자동완성 배열 초기화
    suggestionSelcted (value) {
        this.setState(() => ({
            text: value.campus + ' ' + value.title + ' ' + value.professor,
            search: value,
            suggestions: [],
        }))
        console.log(value)
    }


    //자동완성 항목(검색한 단어가 강좌명에 들어가있는 강의들)띄우기
    renderSuggestions () {
        const { suggestions } = this.state;
        if(suggestions.length === 0) {
            return null;
        } 
        return (
          <ul>
            {suggestions.map((item) => 
            <li 
              onClick={() => this.suggestionSelcted(item)}
              key={item.id}>
              {item.campus} {item.title} {item.professor}
            </li>
            )}
          </ul> 
        );
    }

    render() {
      return (
        <form className="search-bar__control">
          <div className="input-group mb-3">
            <input
              onChange={this.onTextChanged}
              type="text"
              className="form-control-search input-group"
              placeholder="교과목이름"
              value={this.state.text}
            />
            <div className="input-group-append">
              <button 
                  className="btn btn-secondary"
                  onClick={() => this.props.selectLecture(this.state.search)}
                  type="button">
                <span>search</span>
              </button>
            </div>
            {this.renderSuggestions()}
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