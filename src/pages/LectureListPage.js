import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../pages/LectureListPage.scss'

class LectureList extends Component{
  renderClass({lecture, list}){
    return(
      <tr key={lecture.id}>
        <td>{lecture.name}</td>
        <td>{list[0].main.professor}</td>
        <td>{list[0].main.campus}</td>
      </tr>
    );
  }
  handlerError(){
    if(this.props.error){
      return(
          <div className="alert alert-danger" role="alert">
              {this.props.error.message}
          </div>
      );
    }
  }

  render(){
    return(
      <div className='LectureList'>
        {this.handlerError()}
        <table className='table table-hover'></table>
          <thead>
            <tr>
              <th>Campusss</th>
              <th>Lecture</th>
              <th>Professor</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
      </div>
    );
  }
}

class LectureListPage extends Component {
  render(){
      return (
          <div>
              <LectureList/>
          </div>
      );
  }
}

export default LectureListPage;