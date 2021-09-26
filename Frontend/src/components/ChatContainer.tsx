import React from "react";
import ChatInput from "./ChatInput";
import ChatList from "./ChatList";
import './ChatContainer.css'
import axios from 'axios'

const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  timeout: 10000
})

interface Chat {
  _id: string,
  name: string,
  message: string,
  color: string,
  sent: boolean
}

interface State {
  chats: Array<Chat>
}

class ChatContainer extends React.Component<{}, State> {


  constructor(props: any) {
    super(props)
    this.state = {
      chats: []
    }
  }

  componentDidMount() {
    this.loadChat()
  }

  loadChat = () => {
    request.get('/').then(res => {
      this.setState(
        {
          chats: res.data.map((e: Chat) => {
            e.color = Math.floor(Math.random() * 3) === 1 ? 'btn-info' : Math.floor(Math.random() * 3) === 2 ? 'btn-success' : 'btn-warning';
            e.sent = true;
            return e;
          })
        }
      );
    })
  }

  addChat = (chat: Chat) => {
    this.setState((state) => ({
      chats: [...state.chats, chat]
    })
    )

    request.post('/', { name: chat.name, message: chat.message }).then(res => {
      this.setState((state) => {
        let chats = [...state.chats]
        chats.map((e) => {
          if (e._id === chat._id) {
            e._id = res.data._id
          }
          return e
        })
        return ({
          chats
        })
      })
    }).catch(err => {
      this.setState((state) => {
        let chats = [...state.chats]
        chats.map((e) => {
          if (e._id === chat._id) e.sent = false;
          return e
        })
        return ({
          chats
        })
      })
    })
  }

  resendChat = (chat: Chat) => {
    request.post('/', { name: chat.name, message: chat.message }).then(res => {
      this.setState((state) => {
        let chats = [...state.chats]
        chats.map((e) => {
          if (e._id === chat._id) {
            e._id = res.data._id
            e.sent = true
          }
          return e
        })
        return ({
          chats
        })
      })
    }).catch(err => {
      this.setState((state) => {
        let chats = [...state.chats]
        chats.map((e) => {
          if (e._id === chat._id) e.sent = false;
          return e
        })
        return ({
          chats
        })
      })
    })
  }

  removeChat = (_id: string) => {
    request.delete(`/${_id}`).then((res) => {
      this.setState((state) => {
        let chats = [...state.chats]
        chats.splice(state.chats.findIndex((e) => e._id === _id), 1)
        return ({
          chats
        })
      })
    })
  }

  updateChat = (_id: string, message: string) => {
    request.put(`/${_id}`, { message }).then((res) => {
      this.setState((state) => {
        let chats = [...state.chats]
        chats.map((e) => {
          if (e._id === _id) {
            e.message = message
          }
          return e
        })
        return ({
          chats
        })
      })
    })
  }

  render() {
    return (
      <>
        <div className="card bg-light mb-3">
          <div className="card-body text-center"><h3>Comment App</h3></div>
        </div>
        <div className="d-flex flex-row chatcontainer">
          <div className="w-100">
            <div className="container">
            </div>
            <ChatList chats={this.state.chats} removeChat={this.removeChat} resendChat={this.resendChat} updateChat={this.updateChat} />
            <ChatInput addChat={this.addChat} />
          </div>
        </div>
      </>
    )
  }
}

export default ChatContainer;