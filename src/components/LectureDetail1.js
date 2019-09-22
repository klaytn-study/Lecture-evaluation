import React, { Component } from 'react';
import { connect } from 'react-redux';
import './LectureDetail.scss';
import { Table } from 'react-bootstrap'
import EvaluationDetail from './EvaluationDetail'

import Data from './data';

const lect = Data.list__detailLec__course
const DetailLec = ({items}) => (
  <Table className="form-control-lecture" bordered hover >
    <thead>
      <tr>
        {/* <th>{lectitle}</th> */}
        <th>index?</th>
        <th>Tittle</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {
        items.map(({ index, title, timestamp }) => (
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
            <td>{title}</td>
            <td>{timestamp}</td>
          </tr>
        ))
      }
    </tbody>
  </Table>
)

export default DetailLec
