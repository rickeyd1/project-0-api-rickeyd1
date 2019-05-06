import * as React from 'react';
import newProject from '../../assets/sudden_valley.png';
import money from '../../assets/money.png';
import bananaStand from '../../assets/banana_stand.png';
import progbar from '../../assets/progbar.png'

interface IHomeState {
    inputs: string[]
    animate: boolean;
}
 
export class HomeComponent extends React.PureComponent<any, IHomeState> {
    
    constructor(props: any) {
        super(props);
        this.state = {
            inputs: [],
            animate: false
        }
    }

    logKey = (event) => {
        const key = event.key;
        let arr:any[] = this.state.inputs.splice(0);
        arr.push(key);
        const winningArr = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'a', 'b', 'Enter'];
        this.setState({
            inputs: arr,
            animate: false
        });
        let differences = 0;
        if(arr.length === 11) {
            for(let i = 0; i < winningArr.length; i++) {
                if(arr[i] !== winningArr[i]){
                    differences++;
                }
            }
            if (differences === 0) {
                this.setState({
                    animate: true
                })
            }

            this.setState({
                inputs: []
            });
            differences = 0;
        }
    }

    render() { 
        return (
            <>
                <div id="Home" onKeyDown={this.logKey} tabIndex={0} >
                    <h3><u>Bluth Company Reimbursement System</u></h3>
                </div>
                <div className="d-flex justify-content-center">
                    <img src={newProject} className="img-fluid" id="home-img" alt="New construction project" />
                </div>
                <>
                { this.state.animate ? 
                    <div className="order">
                        <img src={money} className="img-fluid fadeIn" alt="money" />
                        <img src={progbar} className="img-fluid fadeInUp prog" alt="Progress towards new banana stand" />
                        <img src={bananaStand} className="img-fluid fadeIn banana" alt="banana stand" />
                    </div>
                    :
                    <div className="order">
                        <img src={bananaStand} className="img-fluid fadeInLeftBig banana" alt="banana stand" />
                        <img src={progbar} className="img-fluid fadeInUp prog" alt="Progress towards new banana stand" />
                        <img src={bananaStand} className="img-fluid fadeInRightBig banana" alt="banana stand" />
                    </div>
                }
                </>
            </>
        );
    }
}