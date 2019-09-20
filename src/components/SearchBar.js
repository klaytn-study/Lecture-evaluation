import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap'

import { connect } from 'react-redux';
import { selectLecture } from '../actions';
import { bindActionCreators } from 'redux';
import './SearchBar.scss';

class SearchBar extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            suggestions: [],
            text: '',
        };
    }

    onTextChanged = (e) => {
        const { items } = this.props;
        const value = e.target.value;
        let suggestions = [];
        if(value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = items.lectures.map((lecture) => lecture.title + ' ' + lecture.professor).sort().filter(v => regex.test(v));
        }
        console.log(suggestions)
        this.setState(() => ({ suggestions, text: value }));
    }

    suggestionSelcted (value) {
        this.setState(() => ({
            text: value,
            suggestions: [],
        }))
    }

    renderSuggestions () {
        const { suggestions } = this.state;
        if(suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map((item) => <li onClick={() => this.suggestionSelcted(item)}>{item}</li>)}
            </ul>
        );
    }

    render() {
      // const { text } = this.state;
      // console.log(this.state.text)
      // return(
      //     <div>
      //         <div className="AutoCompleteText">
      //             <input 
      //                 value = {text} 
      //                 onChange={this.onTextChanged} 
      //                 type="text" />
      //             {this.renderSuggestions()}
      //         </div>
      //         <div>
      //             <button 
      //                 className="searchbarBtn" 
      //                 type="button"
      //                 onClick={() => this.props.selectLecture(this.state.text)}>
      //             <span>검색</span>
      //             </button>
      //         </div>
      //     </div>
          
      // )
  
      return (
        <form className="search-bar__control">

          <div className="input-group mb-3">
            <input
              onChange={this.handleChange}
              type="text"
              className="form-control-search input-group"
              placeholder="교수이름, 교과목이름"
              value={this.state.term}
            />
            <div className="input-group-append">
              <button className="btn btn-secondary" type="button">
                <span>search</span>
              </button>
            </div>
          </div>
          <p/>    
        </form>
      )

        // <Form inline>
        //   <FormControl type="text" placeholder="Search"  />
        //   <Button variant="outline-primary">Search</Button>
        // </Form>

        // <Form>
        //   <InputGroup>
        //     <Form.Control
        //       type="text"
        //       placeholder="교수이름, 교과목이름"
        //       ref={node => {
        //         input = node;
        //       }}
        //     />
        //     <InputGroup.Append>
        //       <Button type="submit">Search</Button>
        //     </InputGroup.Append>
        //   </InputGroup>
      // )
    }
}

function mapStateToProps({lectures}) {
  return {
    lectures
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({selectLecture}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);