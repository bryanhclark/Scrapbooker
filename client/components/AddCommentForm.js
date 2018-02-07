import React from 'react'



const AddCommentForm = (props) => {
  return (
    <div className='add-Comment-Form-Container'>
      <form onSubmit={props.handleSubmit}>
        <div className='form_row'>
          <label>Comment:</label>
          <input type='text' value={props.comment} name='comment' onChange={props.handleChange} />
        </div>
        <div className='btn_area'>
          <button className='btn' type='subimt' name='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}


export default AddCommentForm