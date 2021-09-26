import ChatMessage from './ChatMessage';

interface Chat {
  _id: string,
  name: string,
  message: string,
  color: string,
  sent: boolean
}

function ChatList(props: { chats: Array<Chat>, removeChat: Function, resendChat: Function, updateChat: Function }) {
  const list = props.chats.map((chat) =>
    <ChatMessage key={chat._id} _id={chat._id} name={chat.name} message={chat.message} sent={chat.sent} color={chat.color ? chat.color : Math.floor(Math.random() * 3) === 1 ? 'btn-info' : Math.floor(Math.random() * 3) === 2 ? 'btn-success' : 'btn-warning'} removeChat={props.removeChat} resendChat={props.resendChat} updateChat={props.updateChat} />
  )
  return (
    <>
      {list}
    </>
  );
}


export default ChatList;
