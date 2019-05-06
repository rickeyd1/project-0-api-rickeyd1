import * as React from 'react';
import { User } from '../../model/user';

interface IUserEditState {
    user: User;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role: number;
    selectedOption: string;
}
 
class UserEditComponent extends React.Component<any, IUserEditState> {

    constructor(props: any) {
        super(props);
        this.state = {
            user: undefined,
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            role: 0,
            selectedOption: ''
        }
    }
    componentDidMount = async () => {
        const id = localStorage.getItem('id');
        try {
            const resp = await fetch('http://localhost:8008/users/' + id, {
                credentials: 'include'
            });
            const body = await resp.json();
            this.setState({
                user: body
            });
        } catch (err) {
            console.log(err);
        }
    }

    updateUserName = (event) => {
        this.setState({
            username: event.target.value
        });
    }

    updatePassword = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    updateFirstName = (event) => {
        this.setState({
            firstName: event.target.value
        });
    }

    updateLastName = (event) => {
        this.setState({
            lastName: event.target.value
        });
    }

    updateEmail = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    updateRole = (option:string) => {
        if ( option === 'option1' ) {
            this.setState({
                role: 1
            })
        } else if ( option  === 'option2' ) {
            this.setState({
                role: 2
            })
        } else if ( option === 'option3') {
            this.setState({
                role: 3
            });
        } else {
            console.log('I am confused');
        }
    }

    handleOptionChange = (changeEvent) => {
        this.setState({
          selectedOption: changeEvent.target.value
        });
        this.updateRole(changeEvent.target.value);
    }

    submit = async () => {
        console.log('Patching user');
        const newInfo = {
            userId: +localStorage.getItem('eId'),
            username: (this.state.username ? this.state.username : undefined), 
            password: this.state.password ? this.state.password : undefined,
            firstName: (this.state.firstName ? this.state.firstName : undefined),
            lastName: (this.state.lastName ? this.state.lastName : undefined),
            email: (this.state.email ? this.state.email : undefined),
            role: (this.state.role ? this.state.role : +localStorage.getItem('eRole'))
        }
        console.log(newInfo);
        try {
            const resp = await fetch('http://localhost:8008/users', {
                method: 'PATCH',
                credentials: 'include',
                body: JSON.stringify(newInfo),
                headers: {
                    'content-type' : 'application/json'
                }
            });
            console.log(resp);
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <>
            <h4 className="center-button"><u>Edit User</u></h4>
            <form>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Username</span>
                    </div>
                    <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" value={this.state.username} onChange={(e) => this.updateUserName(e)}/>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Password</span>
                    </div>
                    <input type="password" className="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1" value={this.state.password} onChange={(e) => this.updatePassword(e)} />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">First Name</span>
                    </div>
                    <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" value={this.state.firstName} onChange={(e) => this.updateFirstName(e)}/>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Last Name</span>
                    </div>
                    <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" value={this.state.lastName} onChange={(e) => this.updateLastName(e)}/>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Email</span>
                    </div>
                    <input type="email" className="form-control" placeholder="some_email@mail.com" aria-label="Username" aria-describedby="basic-addon1" value={this.state.email} onChange={(e) => this.updateEmail(e)}/>
                </div>
                <fieldset className="form-group">
                    <div className="row bluth-orange">
                        <legend className="col-form-label col-sm-2 pt-0">Role</legend>
                        <div className="col-sm-10">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked={this.state.selectedOption === 'option1'} onChange={(e) => this.handleOptionChange(e)}/>
                                <label className="form-check-label" htmlFor="gridRadios1">
                                    Admin
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" checked={this.state.selectedOption === 'option2'} onChange={(e) => this.handleOptionChange(e)}/>
                                <label className="form-check-label" htmlFor="gridRadios2">
                                    Finance-Manager
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3" checked={this.state.selectedOption === 'option3'} onChange={(e) => this.handleOptionChange(e)}/>
                                <label className="form-check-label" htmlFor="gridRadios2">
                                    Employee
                                </label>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </form>
            <div className="center-button">
                <button className="btn center-button" id="submit-button" onClick={this.submit}>
                    Submit
                </button>
            </div>
            </>
        );
    }
}
 
export default UserEditComponent;