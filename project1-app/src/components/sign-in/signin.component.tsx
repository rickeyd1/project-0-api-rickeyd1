import * as React from 'react';
import BluthLogo from '../../assets/bluth_logo.png';
import { updateCurrentUser } from '../../streams/current-user.stream';

interface ISignInState {
    username: string;
    password: string;
    errorMessage: string;
} 

export class SignInComponent extends React.Component<any, ISignInState> {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        }
    }

    submit = async (event) => {
        event.preventDefault();
        console.log('Attempting to login');
        const credentials = {
            username: this.state.username,
            password: this.state.password
        };

        try {
            const resp = await fetch('http://localhost:8008/login', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(credentials),
                headers: {
                    'content-type': 'application/json'
                }
            })
            console.log(resp);

            if(resp.status === 401) {
                this.setState({
                    errorMessage: 'Invalid Credentials'
                });
            } else if (resp.status === 200) {
                const body = await resp.json();
                localStorage.setItem('id', body.userId);
                localStorage.setItem('username', body.username);
                localStorage.setItem('pass', body.password);
                localStorage.setItem('fname', body.firstName);
                localStorage.setItem('lname', body.lastName);
                localStorage.setItem('email', body.email);
                localStorage.setItem('role', body.role.role);
                localStorage.setItem('img', body.img);
                // redirect to the home page
                updateCurrentUser(body);
                this.props.history.push('/home');
            } else {
                this.setState({
                    errorMessage: 'Cannot Login At This Time'
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    updateUsername = (event) => {
        this.setState({
            username: event.target.value
        });
    }

    updatePassord = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    render() { 
        const { username, password, errorMessage } = this.state;
        return (
        <form className="form-signin" onSubmit={this.submit}>
            <img src= {BluthLogo} alt="Bluth logo" id="bluth-pic" />
            <label htmlFor="inputUsername" className="sr-only">Username</label>
            <input type="text" id="inputUsername" name="username"
            className="form-control" placeholder="Username"
            required value={username} onChange={this.updateUsername} />

            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input type="password" id="inputPassword" name="password"
            className="form-control" placeholder="Password"
            required value={password} onChange={this.updatePassord} />

            <button className="btn btn-lg btn-block" id="submit-buttonprop" type="submit">Sign in</button>
            <p id="login-error">{errorMessage}</p>
        </form>
        );
    }
}