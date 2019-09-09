import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as courseActions from 'redux/actions/courses'
import moment from 'moment'
import Loading from 'components/Loading'
import TransferOwnershipButton from 'components/TransferOwnershipButton'
// import { drawImageFromBytes} from 'utils/imageUtils'
import { last } from 'utils/misc'

import * as photoActions from 'redux/actions/photos'

import './Feed.scss'

class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: !props.feed,
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const isUpdatedFeed = (nextProps.feed !== prevState.feed) && (nextProps.feed !== null)
    if (isUpdatedFeed) {
      return { isLoading: false }
    }
    return null
  }

  componentDidMount() {
    const { feed, getFeed } = this.props
    if (!feed) getFeed()
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.getCourse(this.state.term);
    this.setState({term: ''});
  }

  render() {
    const { feed, userAddress } = this.props

    if (this.state.isLoading) return <Loading />

    return (
      <div className="Feed">
        {feed.length !== 0
          ? feed.map(({
            id,
            ownerHistory,
            data,
            name,
            location,
            caption,
            timestamp,
          }) => {
            const originalOwner = ownerHistory[0]
            const currentOwner = last(ownerHistory).toLowerCase()
            // const imageUrl = drawImageFromBytes(data)
            const imageUrl = null
            const issueDate = moment(timestamp * 1000).fromNow()
            return (
              <form className='search-bar' onSubmit={event => this.onSubmit(event)}>
                <div className='input-group mb-3'>
                  <input 
                    onChange={event => this.setState({term: event.target.value})}
                    type='text' className='form-control' placeholder='Search' 
                    value={this.state.term}
                  />
                  <div className='input-group-append'>
                    <button className={clsName} type='button'>
                      <i className='fa fa-spinner fa-spin' />
                      <span>Search</span>
                    </button>
                  </div>
                </div>
              </form>
            )
          })
          : <span className="Feed__empty">No Info :D</span>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  feed: state.photos.feed,
  userAddress: state.auth.address,
})

const mapDispatchToProps = (dispatch) => ({
  getFeed: () => dispatch(photoActions.getFeed()),
  getCourse: () => dispatch(courseActions.getCourse()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Feed)