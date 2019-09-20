import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../pages/LectureDetailPage.scss';
import '../pages/LectureDetailPage';
import { Table } from 'react-bootstrap'

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
            <tr>

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
