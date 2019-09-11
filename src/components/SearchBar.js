import React, { Component } from 'react';
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
        <form className="search-bar">
          <div className="input-group mb-3">
            <input
              onChange={this.handleChange}
              type="text"
              className="form-control-search input-group"
              placeholder="교수이름, 교과목이름"
              value={this.state.term}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">
                <span>search</span>
              </button>
            </div>
          </div>
          <p/>
          <div>{mapToComponents(this.state.searchData)}</div>     
        </form>
        
      )
    }
}

export default SearchBar;