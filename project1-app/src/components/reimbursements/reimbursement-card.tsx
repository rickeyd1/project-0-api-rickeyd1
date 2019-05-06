import * as React from 'react';
import { Reimbursement } from '../../model/reimbursement';

interface IReimburseCardProps {
    reimbursement: Reimbursement;
}

interface IReimburseCardState {
    author: string;
    resolver: string;
    reImId: number;
    resolved: boolean;
    isAnimationComplete: boolean;
    status: string;
    type: string;
}
 
class ReimburseRowComponent extends React.Component<IReimburseCardProps, IReimburseCardState> {

    constructor(props:IReimburseCardProps){
        super(props);
        this.state = {
            author: undefined,
            resolver: undefined,
            reImId: 0,
            resolved: false,
            isAnimationComplete: false,
            status: '',
            type: ''
        }
    }

    componentDidMount = async () => {
        this.getAuthor(this.props.reimbursement.author);
        this.getResolver(this.props.reimbursement.resolver);
        if (this.props.reimbursement.status === 2 || this.props.reimbursement.status === 3){
            this.setState({
                resolved: true,
                isAnimationComplete: false
            });
        }

        switch(this.props.reimbursement.status)
        {
            case 1:
                this.setState({
                    status: 'Pending'
                });
                break;
            case 2:
                this.setState({
                    status: 'Approved'
                });
                break;
            case 3:
                this.setState({
                    status: 'Denied'
                });
                break;
            default:
                break;
        }

        switch(this.props.reimbursement.type) {
            case 1:
                this.setState({
                    type: 'Lodging'
                });
                break;
            case 2:
                this.setState({
                    type: 'Travel'
                });
                break;
            case 3:
                this.setState({
                    type: 'Food'
                });
                break;
            case 4:
                this.setState({
                    type: 'Other'
                })
                break;
            default:
                break;
        }
    }

    getAuthor = async (authorid:number) => {
        try {
            const resp = await fetch('http://localhost:8008/users/' + authorid, {
                    credentials: 'include'
            });
            const body = await resp.json();
            const fullName = body.firstName + ' ' + body.lastName;
            this.setState({
                author: fullName
            });
        } catch (err) {
            console.log(err);
        }
    }

    getResolver = async (resolverid: number) => {
        try {
            const resp = await fetch('http://localhost:8008/users/employee/' + resolverid, {
                    credentials: 'include'
            });
            const body = await resp.json();
            const fullName = body.firstName + ' ' + body.lastName;
            this.setState({
                resolver: fullName
            });
        } catch (err) {
            console.log(err);
        }
    }

    editReimbursement = async (stat: number) => {
        const newStatus = {
            reimbursementID: this.props.reimbursement.reimbursementID,
            status: stat
        }
        try {
            const resp = await fetch('http://localhost:8008/reimbursements', {
                method: 'PATCH',
                credentials: 'include',
                body: JSON.stringify(newStatus),
                headers: {
                    'content-type' : 'application/json'
                }
            })
            console.log(resp);

            this.setState({
                resolved: true,
                isAnimationComplete: true
            });
        } catch (err) {
            console.log(err);
        } 
    }

    triggerAnimation = () => {
        setTimeout(() => {
            this.setState({
                isAnimationComplete: true
            })
        }, 1000);
        return true;
    }

    render() { 
        const reimbursement = this.props.reimbursement;
        const dateSubmitted = new Date(this.props.reimbursement.dateSubmitted);
        const dateResolved = new Date(this.props.reimbursement.dateResolved);
        const resolver = this.state.resolver;
        const author = this.state.author;
        const isResolved = this.state.resolved;
        const isAnimationComplete = this.state.isAnimationComplete;
        const userRole = localStorage.getItem('role');
        return (
            <tr className={isResolved && isAnimationComplete? 'fadingOut': ''}>
                {isResolved && isAnimationComplete ? <></> :
                <>
                    <th scope="row" className="date-input">{reimbursement.reimbursementID}</th>
                    <td className="date-input">{author}</td>
                    <td className="date-input">{reimbursement.amount}</td>
                    <td className="date-input">{`${dateSubmitted.getMonth()+1}/${dateSubmitted.getDate()}/${dateSubmitted.getFullYear()}`}</td>
                    <td className="date-input">{(this.props.reimbursement.dateResolved) ? `${dateResolved.getMonth()+1}/${dateResolved.getDate()}/${dateResolved.getFullYear()}`: this.props.reimbursement.dateResolved}</td>
                    <td className="date-input">{reimbursement.description}</td>
                    <td className="date-input">{resolver}</td>
                    <td className="date-input">{this.state.status}</td>
                    <td className="date-input">{this.state.type}</td>
                </>
                }
                <>
                    { !(userRole === 'admin' || userRole === 'finance-manager') ? 
                        <></>
                        :
                        <>
                        {isResolved ?
                            <></>
                            : 
                            <td><button className="btn btn-success" onClick={() => {this.editReimbursement(2)}}>Approve</button>
                            <button className="btn btn-danger" id="deny" onClick={() => {this.editReimbursement(3)}}>Deny</button></td>
                        }
                    </>
                    }
                </>
            </tr>
        );
    }
}
 
export default ReimburseRowComponent;