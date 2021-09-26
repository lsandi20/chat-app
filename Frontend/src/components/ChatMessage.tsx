import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './ChatMessage.css'

function ChatMessage(props: { _id: string, name: string, message: string, color: string, sent: boolean, removeChat: Function, resendChat: Function, updateChat: Function }) {

  const [isEdited, triggerEdit] = useState(false)
  const [edited, editMessage] = useState(props.message)

  return (
    <div className="container d-flex mb-3 chatmessage">
      <div className="line">
      </div>
      <button className={`btn ${props.color} rounded-circle delete-btn`} onClick={() => { props.removeChat(props._id) }}><i className="bi bi-dash-lg"></i></button>
      <div className="d-flex w-100">
        <div className="triangle triangle-left mt-3">
        </div>
        <div className="card border-0 w-100">
          <div className="card-header bg-light border-0 pt-3 px-3">
            <h5>{props.name}</h5>
          </div>
          <div className={`${isEdited ? 'edithide' : 'editshow'}`}>
            <div className="card-body bg-light border-0 px-3 pt-0" onDoubleClick={() => triggerEdit(true)}>
              <ReactMarkdown children={props.message} remarkPlugins={[remarkGfm]} />
            </div>
            <div className={`container ${props.sent ? 'resendhide' : 'resendshow'}`}>
              <button className="btn btn-secondary float-end" onClick={() => { props.resendChat({ _id: props._id, name: props.name, message: props.message }) }}>
                Resend
                <i className="bi bi-arrow-clockwise "></i>
              </button>
            </div>
          </div>
          <form className={`${isEdited ? 'editshow' : 'edithide'}`}>
            <div className="card-body bg-light border-0 px-3 pt-0">
              <textarea className="form-control" name="inputChat" placeholder="write your chat here..." value={edited} onChange={(event) => editMessage(event.target.value)} ></textarea>
              <button className="btn btn-success mt-3" type="submit" onClick={(event) => { event.preventDefault(); props.updateChat(props._id, edited); triggerEdit(false); editMessage(edited); }}>Save</button>
              <button className="btn btn-danger mt-3 ms-2" type="button" onClick={() => { triggerEdit(false); editMessage(props.message) }}>Cancel</button>
            </div>
          </form>
        </div>
      </div >
    </div >
  );
}


export default ChatMessage;
