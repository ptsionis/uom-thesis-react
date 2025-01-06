import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../../App";
import { AiOutlineClose } from "react-icons/ai";

import FriendItem from "../FriendItem/FriendItem";

import "./FriendList.css";

const FriendList = ({ toggleShowFriendlist }) => {
  const { socket, user } = useContext(AppContext);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    socket.emit("get_friends");
  }, []);

  socket.on("set_friends", (friends) => {
    setFriends(friends);
    socket.emit("get_friends_status", user.id);
  });

  return (
    <div className="friendlist-wrapper popup-wrapper">
      <div className="friendlist">
        <AiOutlineClose
          className="friendlist-close"
          size={"30px"}
          onClick={toggleShowFriendlist}
        />
        <ul className="friendlist-ul">
          {friends &&
            friends.map((friend, index) => (
              <li key={index}>
                <FriendItem friend={friend} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default FriendList;
