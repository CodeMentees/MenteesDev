import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

function Chat() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [groupId, setGroupId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // For pagination

  const user = JSON.parse(localStorage.getItem("user"));
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const socketConnection = io("http://localhost:4000"); // Replace with your backend URL
    setSocket(socketConnection);
    setUserId(user._id);

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (newMessage) => {
      if (newMessage.group === groupId) {
        if (newMessage.sender !== userId.toString()) {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      }
    };

    socket.on("receive-message", handleReceiveMessage);

    return () => {
      socket.off("receive-message", handleReceiveMessage);
    };
  }, [socket, groupId]);

  useEffect(() => {
    fetch("/api/messages/group/getList")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setGroups(data))
      .catch((error) => console.error("Error fetching groups:", error));
  }, []);

  const fetchMessages = async (groupId, page) => {
    try {
      setLoading(true);

      const response = await fetch(`/api/messages/${groupId}?page=${page}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      setMessages((prevMessages) => [...data.reverse(), ...prevMessages]); // Add new messages at the top
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = () => {
    if (message.trim() && groupId) {
      const newMessage = {
        groupId,
        senderId: userId,
        content: message,
        sender: { _id: userId, name: "You" },
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);

      socket.emit("send-message", {
        groupId,
        senderId: userId,
        content: message,
      });

      setMessage(""); // Clear the input field
    }
  };

  // Scroll to the bottom of the chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  const handleScroll = (e) => {
    const container = e.target;
    const scrollPosition = container.scrollTop;
    const isAtTop = scrollPosition === 0 && !loading;

    // If the user is at the top, load more messages
    if (isAtTop) {
      // Save the current scroll position before fetching new messages
      const currentScrollPosition = container.scrollHeight;

      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        fetchMessages(groupId, nextPage); // Fetch previous messages
        return nextPage;
      });

      // Wait until the new messages are added before restoring the scroll position
      setTimeout(() => {
        container.scrollTop = container.scrollHeight - currentScrollPosition;
      }, 0); // Use timeout to ensure that scroll position is updated after the state change
    }
  };

  const handleGroupClick = (groupId) => {
    setMessages([]);
    setGroupId(groupId);
    setPage(1); // Reset pagination when a new group is selected
    fetchMessages(groupId, 1); // Load the first set of messages
  };

  const handlekeyUp = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen fixed top-0 w-full ">
      {/* Sidebar */}
      <div className="w-80 bg-dark-background p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Groups</h2>
        <ul>
          {groups.map((group) => (
            <li
              key={group._id}
              className="flex items-center p-2 mb-1 rounded-lg cursor-pointer bg-dark-box"
              onClick={() => handleGroupClick(group._id)}
            >
              <img
                className="h-12 w-12 rounded-full"
                src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
                alt=""
              />

              <span className="px-4 text-dark-text">{group.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat UI */}
      <div className="flex-1 flex flex-col bg-blue-900">
        <div className="bg-gray-800 p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Chat</h1>
        </div>
        <div className="w-full flex text-lg text-dark-text font-extrabold px-4 bg-dark-background py-4">
          <img
            className="h-12 w-12 rounded-full"
            src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
            alt=""
          />
          <p className="text-center flex items-center px-4">Web Development</p>
        </div>
        <div
          className="flex-1 overflow-y-auto p-4"
          onScroll={handleScroll}
          ref={chatContainerRef}
        >
          <ul className="space-y-4">
            {messages.map((msg, index) => (
              <li
                key={index}
                className={`flex ${
                  msg.sender._id === userId ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    msg.sender._id === userId ? "bg-blue-600" : "bg-gray-700"
                  }`}
                >
                  <p className="font-semibold  mb-1">
                    {msg.sender._id === userId ? "You" : msg.sender.name}
                  </p>
                  <p>{msg.content}</p>
                </div>
              </li>
            ))}
            <div ref={messagesEndRef} />
          </ul>
        </div>

        {/* Input */}
        <div className="bg-gray-800 p-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-gray-700 text-white p-2 rounded-lg"
              onKeyUp={(e) => {
                handlekeyUp(e);
              }}
            />
            <button
              className="bg-dark-btn text-dark-accent py-2 px-4 rounded-lg hover:bg-blue-600"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
