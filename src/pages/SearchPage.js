import React, { Component } from 'react';
import '../pages/SearchPage.scss'

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            error: '',
            term: '',
        };
    }
    onSubmit(event){
        event.preventDefault();
        this.setState({term:''});
    }
    render(){
        return (
            <form className='search-bar'>
                <div className='input-group mb-3'>
                    <input 
                        onChange={event => this.setState({term: event.target.value})}
                        type='text' className='form-control-search' placeholder='교수이름, 교과목이름'
                        value={this.state.term}
                    />
                    <div className='input-group-append'>
                        <button className='btn btn-primary' type='button'>
                            <span>search</span>
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

class LectureList extends Component{
    renderClass({lecture, list}){
      return(
          <tr key={lecture.id}>
              <td>{lecture.name}</td>
              <td>{list[0].main.professor}</td>
              <td>{list[0].main.campus}</td>
  
          </tr>
      );
      }
    handlerError(){
      if(this.props.error){
        return(
            <div className="alert alert-danger" role="alert">
                {this.props.error.message}
            </div>
        );
      }
    }
  
    render(){
      return(
        <div className='LectureList'>
          {this.handlerError()}
          <table className='table table-hover'></table>
            <thead>
              <tr>
                <th>Campus</th>
                <th>Lecture</th>
                <th>Professor</th>
              </tr>
            </thead>
            <tbody>
  
            </tbody>
        </div>
      );
    }
  }


class SearchPage extends Component {
    render(){
        return (
            <div>
                <SearchBar/>
                <LectureList/>
            </div>
        );
    }
}

export default SearchPage;