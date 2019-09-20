import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap'
import './SearchBar.scss';

class SearchBar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        error: '',
        term: '',
      };

      this.handleChange = this.handleChange.bind(this);
    }
    onSubmit(event) {
      event.preventDefault();
      this.setState({term:''});
    }
  
    handleChange = (e) => {
      this.setState({
        term: e.target.value,
      })
    }
  
    render() {
  
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



      )
    }
}

export default SearchBar;