import React from 'react';
import './ChatInput.css'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  addChat: Function
}

interface State {
  name: string,
  message: string
}


class ChatInput extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      name: '',
      message: ''
    }
  }

  handleNameChange = (event: any) => {
    this.setState({ name: event.target.value })
  }

  handleMessageChange = (event: any) => {
    this.setState({ message: event.target.value })
  }

  handleSubmit = (event: any) => {
    event.preventDefault()
    this.props.addChat({ _id: uuidv4(), name: this.state.name, message: this.state.message, color: Math.floor(Math.random() * 3) === 1 ? 'btn-info' : Math.floor(Math.random() * 3) === 2 ? 'btn-success' : 'btn-warning', sent: true })
    this.setState({ name: '', message: '' })
  }

  render() {
    return (

      <div className="container d-flex chatinput">
        <div className="lineinput">
        </div>
        <button className={`btn btn-white rounded-circle add-btn`}><i className="bi bi-plus-lg"></i></button>
        <div className="d-flex w-100">
          <div className="triangle triangle-left mt-3">
          </div>
          <div className="card border-0 w-100">
            <form onSubmit={this.handleSubmit}>
              <div className="card-header bg-light border-0 pt-3 px-3">
                <input className="form-control" name="inputName" placeholder="your name" value={this.state.name} onChange={this.handleNameChange} />
              </div>
              <div className="card-body bg-light border-0 px-3 pt-0">
                <textarea className="form-control" name="inputChat" placeholder="write your chat here..." value={this.state.message} onChange={this.handleMessageChange}></textarea>
                <button className="btn btn-primary mt-3" type="submit">Post</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


export default ChatInput;
