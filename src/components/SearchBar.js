import React, { Component } from 'react';
import Loading from 'components/Loading'
import { Form, FormControl, Button } from 'react-bootstrap'
import * as cousreActions from 'redux/actions/courses'
import { connect } from 'react-redux';
import { selectLecture } from '../actions';
import { bindActionCreators } from 'redux';
import { getEvaluationList } from "../redux/actions/evaluations";
import './SearchBar.scss';


class SearchBar extends React.Component {
  // suggestions: 자동완성(아래에 뜨는거)
  // text: 검색창에 보여지는 값
  // search: 실제로 넘어가는 값
  constructor(props) {
    super(props);
    this.state = {
      isloading: !props.courses,
      suggestions: [],
      text: '',
      courseId: 0,
      search: [],
      lname: '',
      pname: '',
    };
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const isUpdatedCourse = (nextProps.courses !== prevState.courses) && (nextProps.courses !== null)
    if (isUpdatedCourse) {
      return { isLoading: false }
    }
    return null
  }

  componentDidMount() {
    const { courses, getCourse } = this.props
    console.log(getCourse())
    if (!courses) getCourse()
  }

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
       
      // this.setState(() => ({ suggestions }));

    }


    handleTest(lname, pname, courseId) {
      this.props.Test(lname, pname, courseId)
    }

    // 자동완성의 항목이 선택되면
    // text는 캠퍼스, 강의명, 교수명을 표시
    // search에 선택한 항목의 값을 저장
    // 자동완성 배열 초기화
    suggestionSelcted(value) {
      this.setState(() => ({
        text: value.campus + ' ' + value.name + ' ' + value.professor,
        search: value,
        courseId: value.id,
        suggestions: [],
        lname: value.name,
        pname: value.professor,
      }))
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
          <div className="input-group mb-3">
            <input
              onChange={this.onTextChanged}
              type="text"
              className="form-control-search input-group"
              placeholder="교과목이름"
              value={this.state.text}
              style={{paddingLeft : '1em'}}
            />
            <div className="input-group-append">
              <button
                  className="btn btn-secondary"
                  onClick={() => {
                    this.props.getEvaluationList(this.state.courseId)
                    this.handleTest(this.state.lname, this.state.pname, this.state.courseId)
                  }}
                  type="button">
                <span>search</span>
              </button>
            </div>
              {this.renderSuggestions()}
          </div>
          {/* <p/>     */}
        </form>
      )
    }
}

const mapStateToProps = (state) => ({
  courses: state.courses.course,
  list: state.evaluations.evalu,
})

const mapDispatchToProps = (dispatch) => ({
  getCourse: () => dispatch(cousreActions.getCourse()),
  getEvaluationList: (courseId) => dispatch(getEvaluationList(courseId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);