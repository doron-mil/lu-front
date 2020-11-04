import React, {useEffect, useState} from "react";

import UsersList from "./UsersList";
import Chat from "./Chat";
import ChatControls from "./ChatControls";

import "./MainChatWin.scss";

function MainChatWin() {
    const [error, setError] = useState(null);
    const [allUsersMap, setAllUsersMap] = useState({});

    const userId = 0;
    const roomId = 1;

    useEffect(() => {
        fetch("http://localhost:3001/users/")
            .then(res => res.json())
            .then(
                (result) => {
                    if (result && result.length !== Object.keys(allUsersMap).length) {
                        const newAllUsersMap = {};
                        result.forEach((user, index) => {
                            newAllUsersMap[user.id] = { name: user.name, colorId: index };
                        });
                        setAllUsersMap(newAllUsersMap);
                    }
                },
                (error) => {
                    console.error('Problem in fetching users', error);
                    setError(error);
                }
            );

        let url = `http://localhost:3001/rooms/${roomId}/users`;
        fetch(url).then(res => res.json()).then((res) => {
            if (!res.users.includes(userId)) {
                console.log(`Adding User ${userId} to room ${roomId}`);
                url = `http://localhost:3001/rooms/${roomId}/users`;
                const body = {
                    userId: userId,
                };
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(body)
                });
            }
        });

    }, []);

    return (

        <div className="main-chat-win">
            <div className="users-list">
                <UsersList roomId={roomId} allUsersMap={allUsersMap}> </UsersList>
            </div>
            <div className="chat-area">
                <Chat roomId={roomId} allUsersMap={allUsersMap}></Chat>
            </div>
            <div className="controls-area">
                <ChatControls roomId={roomId} userId={userId}></ChatControls>
            </div>
        </div>
    );
}

export default MainChatWin;
