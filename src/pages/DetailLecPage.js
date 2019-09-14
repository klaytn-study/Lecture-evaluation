import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../pages/DetailLecPage.scss'
import { Table } from 'react-bootstrap'

import Data from '../components/data';

class DetailLec extends Component{
  renderClass({lecture, list}){
    return(
      <tr key={lecture.id}>
        <td>{lecture.index}</td>
        <td>{list[0].main.comment_tittle}</td>
        <td>{list[0].main.date}</td>
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
    const lect = Data.list__detailLec__course
    console.log(Data)
    console.log(lect)
    return(
      <Table className="form-control-lecture" bordered hover >
        <thead>
          <tr>
            <th>Index</th>
            <th>Tittle</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {
            lect.map(({ index, comment_tittle, date }) => (
              <tr>
                <td>{index}</td>
                <td>{comment_tittle}</td>
                <td>{date}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
     
    );
  }
}

class DetailLecPage extends Component {
  render(){
      return (
          <div>
              <DetailLec/>
          </div>
      );
  }
}

export default DetailLecPage;