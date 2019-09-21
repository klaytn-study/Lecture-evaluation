import React, { Component } from 'react';
import Loading from 'components/Loading'
import * as cousreActions from 'redux/actions/courses'
import { connect } from 'react-redux';
import { getEvaluationList } from "../redux/actions/evaluations";
import './SearchBar.scss';
import './LittleSearchBar.scss';

class LittleSearchBar extends React.Component {
  // suggestions: 자동완성(아래에 뜨는거)
  // text: 검색창에 보여지는 값
  // search: 실제로 넘어가는 값
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      text: '',
      courseId: 0,
      search: [],
    };
  }
  // componentDidMount() {
  //   const { courses, getCourse } = this.props
  //   console.log(getCourse())
  //   if (!courses) getCourse()
  // }

    // 검색창에 사용자가 검색어를 치면
    // text에 실시간으로 검색어를 반영
    // suggestions에 검색어(강의명)가 들어간 강좌들을 넣음
    onTextChanged = (e) => {
      const { items } = this.props;
      // const value = e.target.value;
      let suggestions = [];
      // this.setState({ text: e.target.value })
      const val = e.target.value
      const filteredLectures = items.filter((lecture) => {
        return lecture.name.indexOf(val) !== -1;
      });
      if (val.length > 0) {
        suggestions = filteredLectures.map((lecture) => lecture)
      }
      this.setState({suggestions: suggestions, text: val})
    }
    hadleTest(e) {
      this.props.Test(e)
    }

    // 자동완성의 항목이 선택되면
    // text는 캠퍼스, 강의명, 교수명을 표시
    // search에 선택한 항목의 값을 저장
    // 자동완성 배열 초기화
    suggestionSelcted(value) {
      console.log(value)
      this.setState(() => ({
        text: value.campus + ' ' + value.name + ' ' + value.professor,
        search: value,
        courseId: value.courseId,
        suggestions: [],
      }))
      this.hadleTest(value.id)
    }


    // 자동완성 항목(검색한 단어가 강좌명에 들어가있는 강의들)띄우기
    renderSuggestions() {
      const { suggestions } = this.state;
      if (suggestions.length === 0) {
        return null;
      }
      return (
        <ul>
          {suggestions.map((item) => 
            <li 
              onClick={() => this.suggestionSelcted(item)}
              key={item.id}>
              {item.campus} {item.name} {item.professor}
            </li>
          )}
        </ul>
      );
    }

    render() {
      return (
        <form className="search-bar__control">
          <div className="input-group mb-3 littleSearchBar">
            <input
              onChange={this.onTextChanged}
              type="text"
              className="form-control-search input-group littleSearchBar"
              placeholder="교과목이름을 입력하세요"
              value={this.state.text}
            />
            {this.renderSuggestions()}
          </div>
        </form>
      )
    }
}

const mapStateToProps = (state) => ({
  courses: state.courses.course,
})

const mapDispatchToProps = (dispatch) => ({
  getCourse: () => dispatch(cousreActions.getCourse()),
  getEvaluationList: (courseId) => dispatch(getEvaluationList(courseId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LittleSearchBar);