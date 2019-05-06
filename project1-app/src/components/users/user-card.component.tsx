import * as React from 'react';
import { User } from '../../model/user';
import { Link } from 'react-router-dom';

interface IUserCardProps {
    user: User;
}

export class UserCardComponent extends React.Component<IUserCardProps> {
    sendTo = () => {
        localStorage.setItem('eId', `${this.props.user.userId}`);
        localStorage.setItem('eRole', `${this.props.user.role.roleID}`);
    }

    render() { 
        const myUser = this.props.user;
        const role = localStorage.getItem('role');
        return (      
        <div className="card col-md-4 col-sm-6 col-xs-12">
            <img src= {myUser.img}
                className="card-img-top img-fluid"
                alt="Employee identification" id='user-photo' />
            <div className="card-body">
                <h5 className="card-title">{myUser.firstName + ' ' + myUser.lastName}</h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">UserID: {myUser.userId}</li>
                <li className="list-group-item">Username: {myUser.username}</li>
                <li className="list-group-item">Email: {myUser.email}</li>
                <li className="list-group-item">Role: {myUser.role.role}</li>
                <li className="list-group-item">
                    {role === 'admin' ?
                        <div className="row center-card">
                            <button className="btn btn-dark" onClick={this.sendTo}><Link to="/useredit" className="nav-link unset-anchor editbutton">Edit</Link></button>
                        </div>
                        : 
                        <>
                        </>
                    }
                </li>
            </ul>
        </div>
        );
    }
}