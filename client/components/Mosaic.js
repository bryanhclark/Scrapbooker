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
    this.props.loadContent(1)
  }

  render() {
    console.log('this.props.content', this.props.content)
    return (
      <div className='mosaicContainer'>
        <h3>This is the mosaic component</h3>
        <NavLink to='/'>Home</NavLink>
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
    content: state.content
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
