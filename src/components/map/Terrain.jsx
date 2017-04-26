// Dependencies
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectReddit, fetchPostsIfNeeded, invalidateReddit } from './actions'
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

// Styles
import './Terrain.scss';

class Terrain extends Component {
  static propTypes = {
      selectedReddit: PropTypes.string.isRequired,
      posts: PropTypes.array.isRequired,
      isFetching: PropTypes.bool.isRequired,
      lastUpdated: PropTypes.number,
      dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
      const { dispatch, selectedReddit } = this.props
      dispatch(fetchPostsIfNeeded(selectedReddit))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedReddit !== this.props.selectedReddit) {
      const { dispatch, selectedReddit } = nextProps
      dispatch(fetchPostsIfNeeded(selectedReddit))
    }
  }

  handleChange = nextReddit => {
    this.props.dispatch(selectReddit(nextReddit))
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch, selectedReddit } = this.props
    dispatch(invalidateReddit(selectedReddit))
    dispatch(fetchPostsIfNeeded(selectedReddit))
  }

  render() {
    const { selectedReddit, posts, isFetching, lastUpdated } = this.props
    const isEmpty = posts.length === 0
    console.log(this.state)
    return (
      <div>
          <p>
            {lastUpdated &&
              <span>
                Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                {' '}
              </span>
            }
            {!isFetching &&
              <a href="#"
                 onClick={this.handleRefreshClick}>
                Refresh
              </a>
            }
          </p>
          {isEmpty
            ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
            : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              </div>
        }
        <Map center={[49.44252, -114.6933]} zoom={4}>
          <TileLayer
            url='http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            attribution=''
          />
          {posts.map((dot) => {
          return <Marker position={dot.latlng}>
            <Popup>
              <span>{dot.title} <br/>{dot.user} </span>
            </Popup>
          </Marker>
          })}
        </Map>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { selectedReddit, postsByReddit } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByReddit[selectedReddit] || {
    isFetching: true,
    items: []
  }

  return {
    selectedReddit,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(Terrain)