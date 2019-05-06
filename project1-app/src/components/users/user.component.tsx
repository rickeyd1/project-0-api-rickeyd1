import * as React from 'react';
import { User } from '../../model/user';
import { UserCardComponent } from './user-card.component';
 

export interface IUserState {
    users: User[];
    errorMessage: string;
    userId: number;
    user: User;
    admin: boolean;
    forbidden: boolean;
}
 
export class UserComponent extends React.Component<any, IUserState> {
    
    constructor(props: any) {
        super(props);
        this.state = {
            users: [],
            user: undefined,
            errorMessage: '',
            userId: +localStorage.getItem('id'),
            admin: false,
            forbidden: false
        }
    }

    componentDidMount = async () => {
        const role = localStorage.getItem('role');
        const id = localStorage.getItem('id');
        if( (role === 'admin') || (role === 'finance-manager') ){
            const resp = await fetch('http://localhost:8008/users', {
                credentials: 'include'
            })
            const body = await resp.json();
            this.setState({
                admin: true,
                users: body,
                forbidden: true
            });
        } else {
            const resp = await fetch('http://localhost:8008/users/' + (+id), {
                credentials: 'include'
            })
            const body = await resp.json();
            this.setState({
                user: body
            })
        }
    }

    updateUserID = (event) => {
        this.setState({
            userId: event.target.value
        });
    }

    getAllUser = async () => {
        try{
            const resp = await fetch('http://localhost:8008/users', {
                credentials: 'include'
            })
            const body = await resp.json();
            this.setState({
                users: body,
                forbidden: true
            })
            console.log(this.state.users);
        } catch (err) {
            console.log(err);
        }
    }

    getUserID = async (id: number) => {
        try {
            const resp = await fetch('http://localhost:8008/users/' + id, {
                credentials: 'include'
            });
            console.log(resp);
            
            if (resp.status === 401) {
                const body = await resp.json();
                this.setState({
                    errorMessage: body.message
                });
                console.log(this.state.errorMessage);
            } else if (resp.status === 404) {
                this.setState({
                    errorMessage: 'User selected does not exist.'
                });
            } else if (resp.status === 200) {
                const body = await resp.json();
                this.setState({
                    user: body,
                    forbidden: false
                });
                return body;
            } else {
                this.setState({
                    errorMessage: 'Some error has occurred please try again later'
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    render() { 
        const { userId } = this.state;
        const myUser = this.state.user;
        return (
            <div className="container">
                {!this.state.admin ? 
                <div className="row center-card" >
                    {myUser && <UserCardComponent user={myUser} />}
                </div> 
                    : 
                <>
                    <div className="form-group">
                        <label htmlFor="user-id-input">UserID:</label>
                        <input type="number" className="form-control"
                            aria-describedby="emailHelp" placeholder="Enter user id" id="user-input" value={userId} onChange={this.updateUserID} />
                            <button type="submit" className="btn button-separation" id="submit-buttonprop" onClick={() => this.getUserID(+this.state.userId)}>Search</button>
                            <button className="btn" id="submit-buttongetAll" onClick={this.getAllUser}>Get All</button>
                    </div>
                    {this.state.forbidden ?
                        <div className="row">
                            {this.state.users.map(user => (
                                <UserCardComponent key={'card- ' + user.userId} user={user} />
                            ))}
                        </div>
                        :
                        <div className="row center-card">
                            {myUser && <UserCardComponent user={myUser}/>}
                        </div>
                    }
                </> 
                }
            </div>
        );
    }
}