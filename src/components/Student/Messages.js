import React, { useEffect, useState } from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Cookie kütüphanesini ekleyin
import { checkAuthorization } from "../../services/AuthControlPage";
import "./Messages.css"; // CSS dosyasını import ettik

function Messages() {
  const [personeName, setPersonName] = useState("");
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [msgList, setMsgList] = useState([]);
  const [hubConnection, setHubConnection] = useState();

  useEffect(() => {
    createHubConnection();
    const token = Cookies.get("token");
    if (token) {
      debugger;
      var result = checkAuthorization(token, navigate);
      console.log(result.name);
      setPersonName(result.name.toString());
    } else {
      navigate("/Login");
    }
  }, [navigate]);

  const createHubConnection = async () => {
    const hubCn = new HubConnectionBuilder()
      .withUrl("http://localhost:5226/chat")
      .build();
    try {
      await hubCn.start();
      console.log(hubCn.connectionId);
      setHubConnection(hubCn);
    } catch (e) {
      console.log("e", e);
    }
  };

  const sendMsg = () => {
    if (hubConnection) {
      hubConnection
        .invoke("SendMessage", personeName, "receiverId", text)
        .then((res) => {})
        .catch((err) => console.error("Error invoking SendMessage:", err));
      setMsgList((prevState) => [
        ...prevState,
        { sender: personeName, message: text },
      ]);
      setText("");
    }
  };

  useEffect(() => {
    if (hubConnection) {
      hubConnection.on("ReceiveMessage", (sender, message) => {
        setMsgList((prevState) => {
          return [...prevState, { sender, message }];
        });
      });
    }
  }, [hubConnection]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="chat-header">
          <span>Gönderen: {personeName}</span>
        </div>
        <div className="chat-container">
          <div className="message-list">
            {msgList.map((item, index) => {
              const isSender = item.sender === personeName;
              return (
                <div
                  key={index}
                  className={`message-item ${isSender ? "sender" : "receiver"}`}
                >
                  <div className="message-bubble">
                    <span className="message-text">{item.message}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="input-container">
          <input
            className="message-input"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="Bir mesaj yazın..."
          />
          <button className="send-button" onClick={sendMsg}>
            Gönder
          </button>
        </div>
      </header>
    </div>
  );
}

export default Messages;
