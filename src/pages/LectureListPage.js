import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../pages/LectureListPage.scss'
import { Table } from 'react-bootstrap'

import Data from '../components/data';

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
    const lect = Data.list__lecture__course
    console.log(Data)
    console.log(lect)
    return(
      <Table className="form-control-lecture" striped bordered hover >
        <thead>
          <tr>
            <th>Campus</th>
            <th>Lecture Name</th>
            <th>Professor</th>
          </tr>
        </thead>
        <tbody>
          {
            lect.map(({ campus, lecturename, professor }) => (
              <tr>
                <td>{campus}</td>
                <td>{lecturename}</td>
                <td>{professor}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      
      // <div className='LectureList'>
      //   {this.handlerError()}
      //   <table className='table table-hover'></table>
      //     <thead>
      //       <tr>
      //         <th>Campusss</th>
      //         <th>Lecture</th>
      //         <th>Professor</th>
      //       </tr>
      //     </thead>
      //     <tbody>

      //     </tbody>
      // </div>
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