import React, { Component } from 'react'
import React from 'react';
import SearchInfo from './SearchInfo';


export default class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            searchData: [{
                name: '수학',
                prof: 'Hong'
            }, {
                name: 'Science',
                prof: 'Ellie'
            }, {
                name: 'English',
                prof: 'David'
            }]
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            keyword: e.target.value
        });
    }

    render() {
      const mapToComponents = (data) => {
          data.sort();
          data = data.filter(
              (lecture) => {
                  return lecture.name.toLowerCase().indexOf(this.state.keyword) > -1;
              }
          )
          return data.map((lecture, i) => {
            return (<SearchInfo lecture={lecture} key={i}/>);
          })
        }

      return (
        <div align = "center">
            <h1 class = "text-center">강평강평</h1>
                <input 
                    class = "text-center"
                    name = "keyword"
                    placeholder = "강좌검색"
                    value={this.state.keyword}
                    onChange={this.handleChange}
                />
            <div>{mapToComponents(this.state.searchData)}</div>       
        </div>
      )
    }
};



