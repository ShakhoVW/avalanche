// Dependencies
import L from 'leaflet';
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { selectPoint, fetchPointIfNeeded, invalidatePoint } from './actions'

// Styles
import './Terrain.scss';

class Terrain extends Component {
  static propTypes = {
      selectedPoint : PropTypes.string.isRequired,
      posts         : PropTypes.array.isRequired,
      isFetching    : PropTypes.bool.isRequired,
      lastUpdated   : PropTypes.number,
      dispatch      : PropTypes.func.isRequired
  }

  componentDidMount() {
      const { dispatch, selectedPoint } = this.props
      dispatch(fetchPointIfNeeded(selectedPoint))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedPoint !== this.props.selectedPoint) {
      const { dispatch, selectedPoint } = nextProps
      dispatch(fetchPointIfNeeded(selectedPoint))
    }
  }

  handleChange = nextPoint => {
    this.props.dispatch(selectPoints(nextPoint))
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch, selectedPoint } = this.props
    dispatch(invalidatePoint(selectedPoint))
    dispatch(fetchPointIfNeeded(selectedPoint))
  }

  render() {
    const { selectedPoint, posts, isFetching, lastUpdated } = this.props
    const isEmpty = posts.length === 0
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
  const { selectedPoint, postsByPoint } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByPoint[selectedPoint] || {
    isFetching: true,
    items: []
  }

  return {
    selectedPoint,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(Terrain)