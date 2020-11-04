import React from "react";

import "./Chat.scss";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chatArray: []
        };
        this.chatContainerRef = React.createRef();
    }

    componentDidMount() {
        setInterval(() => {
            if (!this.props.allUsersMap || Object.keys(this.props.allUsersMap).length < 1) {
                return;
            }
            const url = `http://localhost:3001/rooms/${this.props.roomId}/text`;
            fetch(url).then(res => res.json()).then((res) => {
                if (this.state.chatArray.length !== res.text.length) {
                    const formattedChatArray = res.text.map((chatEntry) => ({
                        user: this.props.allUsersMap[chatEntry.userId],
                        text: chatEntry.text,
                    }));
                    this.setState({ chatArray: formattedChatArray });
                    const scrollBottom = this.chatContainerRef?.current?.scrollHeight;
                    if (scrollBottom) {
                        this.chatContainerRef.current.scrollTop = scrollBottom;
                    }
                }

            });
        }, 1000);
    }

    render() {
        return (
            <div className="main-chat-display" ref={this.chatContainerRef}>
                {
                    this.state.chatArray.map((chatEntry, index) =>
                        <div className="chat-entry" key={index}>
                            <div className={`entry-user color-${chatEntry.user.colorId}`}>
                                {chatEntry.user.name}
                            </div>
                            <div className="entry-content">&nbsp;:&nbsp;{chatEntry.text} </div>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default Chat;
