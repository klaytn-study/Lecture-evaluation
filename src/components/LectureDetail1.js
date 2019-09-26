import React, { Component } from 'react';
import { connect } from 'react-redux';
import './LectureDetail.scss';
import { Table } from 'react-bootstrap'
import moment from 'moment'
import ui from 'utils/ui'
import EvaluationDetail from './EvaluationDetail'

const DetailLec = ({ items, lectureName, lecturePro, courseId }) => (
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
        items.map(({ title, timestamp }, index) => (
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
          </tr>
        ))
      }
    </tbody>
  </Table>
)

export default DetailLec