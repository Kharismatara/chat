import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import "./App.css";

function App() {
  const [state, setState] = useState({ message: "", name: "" });
  // const [nameSubmit, setNameSubmit] = useState(false);
  const [nameUser, setNameUser] = useState("");
  const [chat, setChat] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:5173");
    socketRef.current.on("message", ({ name, message }) => {
      setChat((prevChat) => [...prevChat, { name, message }]);
    });

    return () => socketRef.current.disconnect();
  }, []);

  const onNameChange = (e) => {
    setNameUser(e.target.value);
  };

  const onContentChange = (e) => {
    const getNameUser = nameUser;
    setState((prevState) => ({
      ...prevState,
      name: getNameUser,
      message: e.target.value,
    }));
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { name, message } = state;
    socketRef.current.emit("message", { name, message });
    setState((prevState) => ({ ...prevState, message: "" }));
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) =>
      nameUser === name ? (
        <div key={index}>
          <div className="bg1 mb-2 p-2 float-left box-messenger">
            <p className="mb-0 text-messenger text-white">{message}</p>
          </div>
          <div style={{ clear: "both" }} />
        </div>
      ) : (
        <div key={index}>
          <div className="bg2 mb-2 p-2 float-right box-messenger">
            <p className="mb-0 text-messenger">{message}</p>
          </div>
          <div style={{ clear: "both" }} />
        </div>
      )
    );
  };

  // if (!nameSubmit) {
  //   return (
  //     <form
  //       onSubmit={(e) => {
  //         e.preventDefault();
  //         setNameSubmit(true);
  //       }}
  //     >
  //       <input name="name" onChange={(e) => onNameChange(e)} value={nameUser} placeholder="Enter your name" />
  //       <button type="submit">Chat</button>
  //     </form>
  //   );
  // }

  return (
    <div className="box-main">
      <div className="bg1 p-3 box-header">
        <p className="font-weight-bold text-white mb-0">{nameUser}</p>
      </div>
      <div className="p-2 box-content">{renderChat()}</div>
      <form onSubmit={onMessageSubmit}>
        <div className="pl-2 pt-2 box-bottom">
          <div className="box-input">
            <input onChange={(e) => onContentChange(e)} value={state.message} name="message" placeholder="Please reply" className="bg2 pl-2 input-text" type="text" />
          </div>
          <div className="px-2 box-button">
            <button className="bg1 text-center reply-button" type="submit">
              <i className="fa fa-paper-plane text-white button-icon" aria-hidden="true" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
