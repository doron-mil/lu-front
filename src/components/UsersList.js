import React from "react";

import "./UsersList.scss";

class UsersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        setInterval(() => {
            if (!this.props.allUsersMap || Object.keys( this.props.allUsersMap ) < 1){
                return ;
            }

            const url = `http://localhost:3001/rooms/${this.props.roomId}/users`;
            fetch(url).then(res => res.json()).then((res) => {
                const users = res.users.map((userId) => this.props.allUsersMap[userId] )
                this.setState({ users });
            });
        }, 1000);
    }


    render() {
        return (
            <div className="main-users-list">
                {this.state.users.map((user, index) =>
                    <div key={index} className= { `user-item color-${user.colorId}` }>{user.name}</div>
                )}
            </div>
        );
    }
}

export default UsersList;
