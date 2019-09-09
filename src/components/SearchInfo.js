import React from 'react';

export default class SearchInfo extends React.Component {
    render() {
        return (
            <div>{this.props.lecture.name} {this.props.lecture.prof}</div>
        );
        
    }
}
