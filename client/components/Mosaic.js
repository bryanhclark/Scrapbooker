import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchContent } from '../store/content'
import { render } from 'react-dom';
import Gallery from 'react-grid-gallery';

class Mosaic extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadContent(this.props.match.params.eventId)
  }

  render() {
    return (
      <div className='mosaicContainer'>
        <div className="mobile_toggle">
          <NavLink to={`/events/${this.props.singleEvent.id}/upload`} className="mobile_toggle_active">Upload</NavLink>
					<div className="mobile_toggle_disabled">Mosaic</div>
				</div>
        <div className="grid" data-packery='{ "itemSelector": ".grid-item", "gutter": 0 }'>
          {
            this.props.content.map(item => (
              <img key={item.id} src={item.src} className="grid-item type_image" />
            ))
          }
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    content: state.content,
    singleEvent: state.singleEvent
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadContent(eventId) {
      console.log("eventId is", eventId)
      dispatch(fetchContent(eventId));
    }
  }
}


const MosaicContainter = connect(mapState, mapDispatch)(Mosaic)
export default MosaicContainter;
