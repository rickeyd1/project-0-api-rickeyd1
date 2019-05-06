import React from 'react';
import { Link } from 'react-router-dom';
import BluthLogo from '../../assets/bluth-logo-update.png';
import { user$ } from '../../streams/current-user.stream';
import { User } from '../../model/user';
import { Subscription } from 'rxjs';
import { updateCurrentUser } from '../../streams/current-user.stream';

interface INavState {
  user?: User,
  userSubscription?: Subscription
}

export class NavComponent extends React.Component<any, INavState>{

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const userSub = user$.subscribe((user) => {
      this.setState({
        user: user
      })
    });

    this.setState({
      userSubscription: userSub
    })
  }

  componentWillUnmount() {
    this.state.userSubscription && this.state.userSubscription.unsubscribe();
  }

  signOut = async () => {
    console.log('Disconnecting user from this session');

    try {
      const resp = await fetch('http://localhost:8008/logout', {
        credentials: 'include'
      })
      console.log(resp);
    } catch (err) {
      console.log(err);
    }
    localStorage.clear();
    updateCurrentUser(undefined);
  }

  render() {
    const currUser = this.state.user;
    return (
      <nav className="navbar navbar-toggleable-md navbar-expand-lg navbar-light display-front nav-pad bluth-orange">
        <div className="navbar-header c-pointer shift-left">
          <Link to="/home" className="unset-anchor">
            <img className="img-adjust-position rev-logo" src={BluthLogo} alt="revature" />
          </Link>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav ml-auto margin-nav">
            <li className="nav-item active">
              <Link to="/home" className="unset-anchor nav-link"><strong className="whitetext">Home</strong></Link>
            </li>
            {!this.state.user ? 
              <li className="nav-item active">
                <Link to="/sign-in" className="unset-anchor nav-link"><strong className="whitetext">Sign In</strong></Link>
              </li> : 
              <>
              { currUser.role.role === 'admin' || currUser.role.role === 'finance-manager' ?
                <>
                  <li className="nav-item active">
                    <Link to="/users" className="unset-anchor nav-link"><strong className="whitetext">Users</strong></Link>
                  </li>
                  <li className="nav-item active">
                    <Link to="/reimbursements" className="unset-anchor nav-link"><strong className="whitetext">Reimbursements</strong></Link>
                  </li>
                  <li className="nav-item active">
                    <Link to="/submit" className="unset-anchor nav-link"><strong className="whitetext">Submit Reimbursement</strong></Link>
                  </li>
                  <li className="nav-item active" onClick={this.signOut}>
                    <Link to="/sign-in" className="unset-anchor nav-link"><strong className="whitetext">Sign Out</strong></Link>
                  </li> 
                </> : 
                <>
                  <li className="nav-item active">
                    <Link to="/users" className="unset-anchor nav-link"><strong className="whitetext">Profile</strong></Link>
                  </li>
                  <li className="nav-item active">
                    <Link to="/reimbursements" className="unset-anchor nav-link"><strong className="whitetext">Pending Reimbursements</strong></Link>
                  </li>
                  <li className="nav-item active">
                    <Link to="/submit" className="unset-anchor nav-link"><strong className="whitetext">Submit Reimbursement</strong></Link>
                  </li>
                  <li className="nav-item active" onClick={this.signOut}>
                    <Link to="/sign-in" className="unset-anchor nav-link"><strong className="whitetext">Sign Out</strong></Link>
                  </li>
                </>
              }
              </>
            }
            {/* {this.state.user && this.state.user.username} */}
            { /*
            <li className="nav-item active dropdown">
              <div className="nav-link dropdown-toggle pointer" id="examples-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Examples</div>
              <div className="dropdown-menu" aria-labelledby="examples-dropdown">
                <div className="dropdown-item"><Link to="/movies" className="unset-anchor nav-link active">Movies</Link></div>
                <div className="dropdown-item"><Link to="/clicker" className="unset-anchor nav-link active">Clicker Game</Link></div>
                <div className="dropdown-item"><Link to="/tic-tac-toe" className="unset-anchor nav-link active">Tic Tac Toe Game</Link></div>
                <div className="dropdown-item"><Link to="/chuck-norris" className="unset-anchor nav-link active">Chuck Norris Jokes</Link></div>
                <div className="dropdown-item"><Link to="/pokemon" className="unset-anchor nav-link active">Pokemon</Link></div>
              </div>
            </li>
            <li className="nav-item active">
              <Link to="/nested" className="unset-anchor nav-link">Nested</Link>
            </li> */}
          </ul>
        </div>
      </nav>
    );
  }
}