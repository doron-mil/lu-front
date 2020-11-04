import React from "react";

import "./ChatControls.scss";

class ChatControls extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    sendMessage(e) {
        if (e.key === 'Enter') {
            const message = e.target.value;
            const body = {
                userId: this.props.userId,
                text: message
            };
            const url = `http://localhost:3001/rooms/${this.props.roomId}/text`;
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(body)
            });
            e.target.value = "";
        }
    }

    exitChat() {
        const url = `http://localhost:3001/rooms/${this.props.roomId}/users/${this.props.userId}`;
        fetch(url, { method: 'DELETE' });
    }

    render() {
        return (
            <div className="main-chat-controls">
                <div className="chat-controls-editor">
                    <textarea wrap="hard" cols={10} rows={10} onKeyUp={(e) => this.sendMessage(e)}/>
                </div>

                <button className="btn btn-primary" onClick={() => this.exitChat()}>Exit</button>
            </div>
        );
    }
}

export default ChatControls;
