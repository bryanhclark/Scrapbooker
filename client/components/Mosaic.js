import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchContent } from '../store/content'
import { render } from 'react-dom';
import { fetchSingleEvent } from '../store/singleEvent'
import Gallery from 'react-grid-gallery';

class Mosaic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formattedPictureArray: []
    }
    this.reformatImagesForGallery = this.reformatImagesForGallery.bind(this)
  }

  componentDidMount() {
    this.props.loadContent(this.props.match.params.eventId)
    this.props.loadSingleEvent(this.props.match.params.eventId)
  }



  reformatImagesForGallery(imageArray) {
    const pictureObjArray = imageArray.map(image => {
      console.log('image', image)
      let imgObj = {
        src: image['src'],
        thumbnail: image['src'],
        thumbnailHeight: 174,
        thumbnailWidth: 320,
        isSelected: false,
        orientation: image['orientation']
      }
      return imgObj
    })
    return pictureObjArray
  }

  render() {
    console.log('formattedPictureArray', this.state.formattedPictureArray)
    return (
      <div className='mosaicContainer'>
        <div className="mobile_toggle">
          <NavLink to={`/events/${this.props.singleEvent.id}/upload`} className="mobile_toggle_active">Upload</NavLink>
          <div className="mobile_toggle_disabled">Mosaic</div>
        </div>
        <div className="grid" data-packery='{ "itemSelector": ".grid-item", "gutter": 0 }'>
          <Gallery images={this.reformatImagesForGallery(this.props.content)}
            isSelected={false}
            margin={0}
            enableLightbox={false}
          />
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
    },
    loadSingleEvent(eventId) {
      dispatch(fetchSingleEvent(eventId))
    }
  }
}


const MosaicContainter = connect(mapState, mapDispatch)(Mosaic)
export default MosaicContainter;
