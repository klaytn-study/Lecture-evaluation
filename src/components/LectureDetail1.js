import React, { Component } from 'react';
import { connect } from 'react-redux';
import './LectureDetail.scss';
import { Table } from 'react-bootstrap'
import moment from 'moment'
import ui from 'utils/ui'
import EvaluationDetail from './EvaluationDetail'

class DetailLec extends Component {
  render() {
    const { items, lectureName, lecturePro, courseId } = this.props
    if (this.props.items.length == 0) {
      return <div> 등록된 강의평가가 없습니다. </div>;
    }
    return (
      <Table className="form-control-lecture" bordered hover >
      <thead>
        <tr>
          <th>Index</th>
          <th>Tittle</th>
          <th>Date</th>
          <th>평가</th>
        </tr>
      </thead>
      <tbody>
        {
          items.map(({ title, timestamp, good, bad }, index) => (
            <tr
              key={index}
              onClick={() => ui.showModal({
                header: 'EvaluationDetail',
                content: <EvaluationDetail
                  id={courseId}
                  evalId={index}
                  lecName={lectureName}
                  professor={lecturePro}
                />,
              })}
            >
              <td>{index}</td>
              <td>{title}</td>
              <td>{moment(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss')}</td>
              <td>
                이 평가 유용함!!!: {good}<br/>
                이 평가 쓰레기임ㅠㅠㅠ: {bad}
              </td>
            </tr>
          ))
        }
      </tbody>
    </Table>
    );
  }
}

export default DetailLec