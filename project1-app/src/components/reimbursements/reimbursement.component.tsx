import * as React from 'react';
import ReimburseRowComponent from './reimbursement-card';
import { Reimbursement } from '../../model/reimbursement';
import { User } from '../../model/user';
import { Subscription } from 'rxjs';

interface IReimburseState {
    reimbursements: Reimbursement[];
    submitDateStart: string;
    submitDateEnd: string;
    authorId: number;
    admin: boolean;
    user?: User,
    userSubscription?: Subscription
}

class ReimbursementComponent extends React.Component<any, IReimburseState> {

    constructor(props: any) {
        super(props);
        this.state = {
            reimbursements: [],
            submitDateStart: '2016-01-01',
            submitDateEnd: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`,
            authorId: 0,
            admin: false
        }
    }

    componentDidMount = async () => {
        const role = localStorage.getItem('role');
        const id = +localStorage.getItem('id');
        if ( (role === 'admin') || (role === 'finance-manager') ) {
                const end =  `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`;
                const endDate = new Date(end).getTime();
            try {
                const resp = await fetch(`http://localhost:8008/reimbursements/status/1/date-submitted?start=18000000&end=${endDate}`, {
                    credentials: 'include'
                });
                const body = await resp.json();
                this.setState({
                    admin: true,
                    reimbursements: body
                });
            } catch (err) {
                console.log(err);
            }
        } else {
            const end =  `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`;
            const endDate = new Date(end).getTime();
            const author = id;
            try {
                const resp = await fetch(`http://localhost:8008/reimbursements/author/userId/${author}/date-submitted?start=18000000&end=${endDate}`, {
                    credentials: 'include'
                });
                const body = await resp.json();
                this.setState({
                    reimbursements: body
                });
            } catch (err) {
    
            }
        }
    }

    updateSubmitStart = (event) => {
        this.setState({
            submitDateStart: event.target.value
        })
    }

    updateSubmitEnd = (event) => {
        this.setState({
            submitDateEnd: event.target.value
        })
    }

    getReimByStatus = async (statusid:number, start:number, end:number) => {
        try {
            const resp = await fetch(`http://localhost:8008/reimbursements/status/${statusid}/date-submitted?start=${start}&end=${end}`, {
                credentials:'include'
            });
            const body = await resp.json();
            this.setState({
                reimbursements: body
            });
        } catch (err) {
            console.log(err);
        }
    }

    getReimByAuthor = async (author:number, start:number, end:number) => {
        try {
            const resp = await fetch(`http://localhost:8008/reimbursements/author/userId/${author}/date-submitted?start=${start}&end=${end}`, {
                credentials: 'include'
            });
            const body = await resp.json();
            this.setState({
                reimbursements: body
            });
        } catch (err) {

        }
    }

    updateAuthorID = (event) =>{
        this.setState({
            authorId: event.target.value
        });
    }

    render() { 
        const start = new Date(this.state.submitDateStart).getTime();
        const end = new Date(this.state.submitDateEnd).getTime();
        const author = this.state.authorId;
        const first = localStorage.getItem('fname');
        const last = localStorage.getItem('lname');
        return (
            <>
                {!this.state.admin ? 
                <>
                    <h2><u>{`${first} ${last}'s reimbursements`}</u></h2>
                    <div className="table-responsive" id="reimbursetable">
                    <table className="table table-orange" id="spacing">
                        <thead>
                            <tr>
                                <th scope="col" className="date-input">Reimbursement ID</th>
                                <th scope="col" className="date-input">Author</th>
                                <th scope="col" className="date-input">Amount</th>
                                <th scope="col" className="date-input">Date Submitted</th>
                                <th scope="col" className="date-input">Date Resolved</th>
                                <th scope="col" className="date-input">Description</th>
                                <th scope="col" className="date-input">Resolver</th>
                                <th scope="col" className="date-input">Status</th>
                                <th scope="col" className="date-input">Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.reimbursements.map(reimbursement => (
                                <ReimburseRowComponent key={'reimbursement- ' + reimbursement.reimbursementID} reimbursement={reimbursement} />
                            ))}
                        </tbody>
                    </table>
                    </div>
                </> : 
                <>
                <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <h6>Filter by Status</h6>
                        <div className="btn-group btn-group-toggle" data-toggle="buttons">
                            <label className="btn btn-outline-secondary active highlighted" onClick={() => this.getReimByStatus(1, start, end)}>
                                Pending
                                <input type="radio" name="options" id="option1" autoComplete="off" />
                            </label>
                            <label className="btn btn-outline-success highlighted" onClick={() => this.getReimByStatus(2, start, end)}>
                                Approved
                                <input type="radio" name="options" id="option2" autoComplete="off" />
                            </label>
                            <label className="btn btn-outline-danger highlighted" onClick={() => this.getReimByStatus(3, start, end)}>
                                Declined
                                <input type="radio" name="options" id="option3" autoComplete="off" />
                            </label>
                        </div>
                    </div>
                    <div className="col-sm" id="user-input">
                        Search for reimbursements by user
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="addon-wrapping">Author ID</span>
                        </div>
                        <input type="text" className="form-control" placeholder="User ID" aria-label="Username" aria-describedby="addon-wrapping" value={this.state.authorId} onChange={(e) => this.updateAuthorID(e)} />
                    </div>
                    <div className="center-button">
                        <button className="btn" id="submit-button" onClick={() => this.getReimByAuthor(author, start, end)}>Search</button>
                    </div>
                    </div>
                    <div className="col-sm date-input">
                        Search for reimbursements from
                        <input type="date" aria-label="First name" value={this.state.submitDateStart} className="form-control date-input" onChange={(e) => this.updateSubmitStart(e)}/>
                        to
                        <input type="date" aria-label="Last name" value={this.state.submitDateEnd} className="form-control date-input" onChange={(e) => this.updateSubmitEnd(e)} />
                    </div>
                </div>
            </div>

            <div className="table-responsive" id="reimbursetable">
                <table className="table table-orange" id="spacing">
                    <thead>
                        <tr>
                            <th scope="col" className="date-input">Reimbursement ID</th>
                            <th scope="col" className="date-input">Author</th>
                            <th scope="col" className="date-input">Amount</th>
                            <th scope="col" className="date-input">Date Submitted</th>
                            <th scope="col" className="date-input">Date Resolved</th>
                            <th scope="col" className="date-input">Description</th>
                            <th scope="col" className="date-input">Resolver</th>
                            <th scope="col" className="date-input">Status</th>
                            <th scope="col" className="date-input">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.reimbursements.map(reimbursement => (
                            <ReimburseRowComponent key={'reimbursement- ' + reimbursement.reimbursementID} reimbursement={reimbursement} />
                        ))}
                    </tbody>
                </table>
            </div>
            </>
            }
            </>
        );
    }
}
 
export default ReimbursementComponent;

// <div class="btn-group btn-group-toggle" data-toggle="buttons">
//   <label class="btn btn-secondary active">
//     <input type="radio" name="options" id="option1" autocomplete="off" checked> Active
//   </label>
//   <label class="btn btn-secondary">
//     <input type="radio" name="options" id="option2" autocomplete="off"> Radio
//   </label>
//   <label class="btn btn-secondary">
//     <input type="radio" name="options" id="option3" autocomplete="off"> Radio
//   </label>
// </div>