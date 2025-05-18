import { communicateWithServer } from "../service/api-service";
import { useState } from "react";
import "./styles/TalkToServer.css";

const TalkToServer = () => {
  const [serverMessage, setServerMessage] = useState("");

  const handleClick = async () => {
    const message = await communicateWithServer();
    setServerMessage(message);
  };

  return (
    <div>
      <button className="server-button" onClick={handleClick}>
        Communicate with Server
      </button>
      {serverMessage && <p>Server message: {serverMessage}</p>}
    </div>
  );
};

export default TalkToServer;
