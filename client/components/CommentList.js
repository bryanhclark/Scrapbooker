import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCurrentComments, addNewCommentThunk } from '../store/comments'
import AddCommentForm from './AddCommentForm'



class CommentList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.loadComments(this.props.image.id)
  }

  handleChange(e) {
    e.preventDefault()
    let change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.postComment({
      contentId: this.props.image.id,
      body: this.state.comment,
      userId: this.props.singleParticipant.id
    })
    this.setState({ comment: '' })
  }

  render() {
    return (
      <div className='comment-List-Container'>
        <div className='comment-List-Header'>
        </div>
        <div className='comment-List-Comment-Container'>
          <ul className='commentList-Unordered-List'>
            {
              this.props.comments.map(comment => (
                <li className='comment-List-Item' key={comment.id}>
                  <strong>{comment.user.fullName}</strong><br />
                  {comment.body}
                </li>
              ))
            }
          </ul>
        </div>
        <div className='add-Comment-Container'>
          <AddCommentForm handleChange={this.handleChange} comment={this.state.comment} handleSubmit={this.handleSubmit} />
        </div>
      </div>
    )
  }
}


const mapState = (state) => {
  return {
    comments: state.comments,
    singleParticipant: state.singleParticipant
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadComments(contentId) {
      dispatch(fetchCurrentComments(contentId))
    },
    postComment(commentObj) {
      dispatch(addNewCommentThunk(commentObj))
    }
  }
}




const CommentListContainer = connect(mapState, mapDispatch)(CommentList)


export default CommentListContainer