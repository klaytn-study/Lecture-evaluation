import React, { Component } from 'react';
import UploadButton from 'components/UploadButton'


import '../pages/SearchPage.scss'

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: '',
      term: '',
    };
  }
  onSubmit(event) {
    event.preventDefault();
    this.setState({term:''});
  }
  render() {
    return (
      <form className="search-bar">
        <div className="input-group mb-3">
          <input
            onChange={event => this.setState({term: event.target.value})}
            type="text"
            className="form-control-search"
            placeholder="교수이름, 교과목이름"
            value={this.state.term}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              <span>search</span>
            </button>
          </div>
        </div>
      </form>
    );
  }
}

class SearchPage extends Component {
  render() {
    return (
      <div>
        <SearchBar/>
        <UploadButton/>
      </div>
    );
  }
}

export default SearchPage;