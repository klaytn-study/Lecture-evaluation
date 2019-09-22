import React, { Component } from 'react';
import { connect } from 'react-redux';
import './LectureDetail.scss';
import { Table } from 'react-bootstrap'
import EvaluationDetail from './EvaluationDetail'

import Data from './data';

const lect = Data.list__detailLec__course
const DetailLec = ({lectitle,lectpro}) => (
  <Table className="form-control-lecture" bordered hover >
    <thead>
      <tr>
        {/* <th>{lectitle}</th> */}

        <th>{lectitle}</th>
        <th>Tittle</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {
        lect.map(({ index, comment_tittle, date }) => (
          <tr
            key={index}
            onClick={() => ui.showModal({
              header: 'EvaluationDetail',
              content: <EvaluationDetail
                id="5778"
                evalId="1"
                lecName="아직 불러지지 않음"
                professor="누구인지 몰라?"
              />,
            })}
          >
            <td>{index}</td>
            <td>{comment_tittle}</td>
            <td>{date}</td>
          </tr>
        ))
      }
    </tbody>
  </Table>
)

export default DetailLec
