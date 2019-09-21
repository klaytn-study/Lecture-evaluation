import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap'

import { connect } from 'react-redux';
import { selectLecture } from '../actions';
import { bindActionCreators } from 'redux';
import './SearchBar.scss';

class SearchBar extends React.Component {
    
    //suggestions: 자동완성(아래에 뜨는거)
    //text: 검색창에 보여지는 값
    //search: 실제로 넘어가는 값
    constructor (props) {
        super(props);
        this.state = {
            suggestions:[],
            text:'',
            search: [],
            
        };
    }

    //검색창에 사용자가 검색어를 치면
    //text에 실시간으로 검색어를 반영
    onTextChanged = (e) => {
      const{ items } = this.props;
      const value = e.target.value;
      let suggestions=[];
      const filteredLectures = items.lectures.filter((lecture) => {
        return lecture.title.indexOf(this.state.text) !== -1;
        }
      );
      console.log(filteredLectures);
      if(value.length > 0){
        suggestions = filteredLectures.map((lecture) => lecture)
      }
      this.setState(() => ({ suggestions, text: value }));

    }

    //자동완성의 항목이 선택되면
    //text는 강의의 제목을 표시
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


    //추천검색어를 어떻게 띄워야하는가...ㅅㅂ이게문제야
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
              key={item.campus, item.title, item.professor}>
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
              placeholder="교수이름, 교과목이름"
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