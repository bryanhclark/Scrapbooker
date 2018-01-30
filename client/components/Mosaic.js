import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchContent } from '../store/content'

class Mosaic extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
   this.props.loadContent(2)
  }

  render() {
    return (
      <div className='mosaicContainer'>
        <h3>This is the mosaic component</h3>
        <NavLink to='/'>Home</NavLink>
        <div className="grid" data-packery='{ "itemSelector": ".grid-item", "gutter": 0 }'>
          <div className="grid-sizer"></div>
          {
            this.props.content.map(item => {
              console.log("this content is", item)
            switch (item.type) {
              case 'image':
                return (<img key={item.id} src={item.value} className="grid-item type_image" />)
              case 'text':
                return (<div key={item.id} className="grid-item type_text"><span className="quote_start">&ldquo;</span>{item.value}<span className="quote_end">&rdquo;</span></div>)
            }})
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
