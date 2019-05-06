import * as React from 'react';

interface ISubmitState {
    amount: number;
    description: string;
    type: number;
    selectedOption: string;
}

class SubmitReimComponent extends React.Component<any, ISubmitState> {

    constructor(props: any){
        super(props);
        this.state = {
            amount: 0,
            description: '',
            type: 0,
            selectedOption: ''
        }
    }

    updateDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    updateType = (option: string) => {
        if (option === 'option1') {
            this.setState({
                type: 1
            });
        } else if (option === 'option2') {
            this.setState({
                type: 2
            });
        } else if (option === 'option3') {
            this.setState({
                type: 3
            });
        } else if (option === 'option4') {
            this.setState({
                type: 4
            });
        } else {
            console.log('I am confused');
        }
    }

    updateAmount = (event) => {
        this.setState({
            amount: event.target.value
        })
    }

    handleOptionChange = (event) => {
        this.setState({
            selectedOption: event.target.value
        });
        this.updateType(event.target.value);
    }
    
    submit = async () => {
        console.log('Submitting new reimbursement');
        const reimbursement = {
            reimbursementID: 0,
            amount: this.state.amount,
            description: this.state.description,
            type: this.state.type,
        }

        try {
            const resp = await fetch('http://localhost:8008/reimbursements', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(reimbursement),
                headers: {
                    'content-type' : 'application/json'
                }
            });
            console.log(resp);
        } catch (err) {
            console.log(err)
        }
        
    }

    render() { 
        return (
            <>
                <h4 className="center-button"><u>Submit a new Reimbursement</u></h4>
                <form>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Amount</span>
                    </div>
                    <input type="number" className="form-control" placeholder="Amount" aria-label="Amount" aria-describedby="basic-addon1" value={this.state.amount} onChange={(e) => this.updateAmount(e)} />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Description</span>
                        </div>
                        <textarea className="form-control" aria-label="With textarea" value={this.state.description} onChange={(e) => this.updateDescription(e)}></textarea>
                    </div>
                </div>
                <fieldset className="form-group">
                    <div className="row bluth-orange">
                        <legend className="col-form-label col-sm-2 pt-0">Type</legend>
                        <div className="col-sm-10">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked={this.state.selectedOption === 'option1'} onChange={(e) => this.handleOptionChange(e)}/>
                                <label className="form-check-label" htmlFor="gridRadios1">
                                    Lodging
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" checked={this.state.selectedOption === 'option2'} onChange={(e) => this.handleOptionChange(e)}/>
                                <label className="form-check-label" htmlFor="gridRadios2">
                                    Travel
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3" checked={this.state.selectedOption === 'option3'} onChange={(e) => this.handleOptionChange(e)}/>
                                <label className="form-check-label" htmlFor="gridRadios2">
                                    Food
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios4" value="option4" checked={this.state.selectedOption === 'option4'} onChange={(e) => this.handleOptionChange(e)}/>
                                <label className="form-check-label" htmlFor="gridRadios2">
                                    Other
                                </label>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </form>
            <div className="center-button">
                <button className="btn btn-primary center-button" onClick={this.submit}>Submit</button>
            </div>
            </>
        );
    }
}
 
export default SubmitReimComponent;