import React, { Component } from "react";
//import DashboardDataService from '../Services/DashboardDataService';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.retrieveRating = this.retrieveRating.bind(this);
        // this.retrievePopularity = this.retrievePopularity.bind(this);
        // this.retrievePendingOrders = this.retrievePendingOrders.bind(this);
        // this.retrieveSchedule = this.retrieveSchedule.bind(this);
        // this.retrievePredictedOrders = this.retrievePredictedOrders.bind(this);
        // this.retrievePredictedViewers = this.retrievePredictedViewers.bind(this);
        // this.retrieveOrderStatisticsByTime = this.retrieveOrderStatisticByTime.bind(this);
        // this.retrieveOrderStatisticsByDay = this.retrieveOrderStatisticByDay.bind(this);
    
        this.state = {
          rating: 0,
        //   myPopularity: null,
        //   pendingOrders: 0,
        //   schedule: [],
        //   predictedOrders : "10-20",
        //   predictedViewers : "50-100",
             OrderStatisticsByTime: null,              
        //   OrderStatisticsByDay: null,       
            };
    }
    componentDidMount() {
        this.retrieveRating();
        // this.retrieveOrderStatisticsByTime();
        // this.retrieveOrderStatisticsByDay();

    }
    retrieveOrderStatisticsByTime() {
        return(<div>          
        <img src='http://127.0.0.1:5000/chartByTime' height = {300} 
                    alt=""></img>  
        </div>);   
    }    
    retrieveOrderStatisticsByDay() {
        return(<div>          
        <img src='http://127.0.0.1:5000/chartByDay' height = {300}
                    alt=""></img>  
        </div>);   
    }
    retrieveRating() {  
        this.setState({
            rating: 4
          });
    }
    render() {
    
        return (
            <div>   
                <h2>Dashboard</h2>
                <div className="d-flex justify-content-between">
                    <div className="d-flex flex-column">                      
                        <div className="p-2">
                            <h3>My Rating</h3>                            
                            <h4>{this.state.rating}/5</h4>
                        </div>
                        <div className="p-2">
                            <h3>My Popularity</h3>
                            <h4>Under Construction</h4>
                        </div> 
                        <div className="p-2">
                            <h3>Orders Pending Confirmation</h3>
                            <h4>10</h4>
                        </div> 
                    </div> 

                    <div className="d-flex flex-column"> 
                        <div>
                            <h3>My Streaming Schedule</h3> 
                        </div>
                        <div>
                            <p>Table under construction</p> 
                        </div>

                        <div>
                            <h3>Number of viewers & Orders Prediction</h3> 

                            <div className="d-flex flex-row">
                                <div className="p-2">
                                <form className="d-flex flex-column">
                                    <label className="p-2">Product Category</label>
                                    <select className="p-2" id="inlineFormCustomSelectPref">
                                        <option selected>Choose...</option>
                                        <option value="1">Clothings</option>
                                        <option value="2">Food</option>
                                        <option value="3">Home Applicances</option>
                                        <option value="1">Furnitures</option>
                                        <option value="2">Electronics Devices</option>
                                        <option value="3">Baby Items and Toys</option>
                                        <option value="1">HElectronics Accessories</option>
                                        <option value="2">Sprots Items</option>
                                        <option value="3">Groceries</option>
                                        <option value="3">Others</option>
                                    </select>                                
                                    <label className="p-2" for="inlineFormCustomSelectPref">Day</label>
                                    <select className="p-2" id="inlineFormCustomSelectPref">
                                        <option selected>Choose...</option>
                                        <option value="1">Sun</option>
                                        <option value="2">Mon</option>
                                        <option value="3">Tue</option>
                                        <option value="1">Wed</option>
                                        <option value="2">Thu</option>
                                        <option value="3">Fri</option>
                                        <option value="1">Sat</option>                                   
                                    </select>

                                    <label className="p-2" for="inlineFormCustomSelectPref">Streaming Period</label>
                                    <select className="p-2" id="inlineFormCustomSelectPref">
                                        <option selected>Choose...</option>
                                        <option value="1">12am - 6am</option>
                                        <option value="1">6am - 12pm</option>
                                        <option value="1">12pm - 6pm</option>
                                        <option value="1">6pm - 12am</option>                                    
                                    </select>
                                    <button type="submit" class="btn btn-primary my-1">Predict</button>
                                </form>                                
                                </div>
                                    <div >
                                        <h4>Expected Orders:</h4>
                                        <p>Under Construction</p> 
                                        <h4>Expected Viewers:</h4>
                                        <p>Under Construction</p>
                                    </div>
                                </div>
                            </div>                       
                    </div>
                    <div className="d-flex flex-column"> 
                        <div>
                            <h3>Platform Sales Statistics</h3> 
                        </div>
                        <div> 
                       </div>   
                         <span>{this.retrieveOrderStatisticsByTime()}</span>
                         <span>{this.retrieveOrderStatisticsByDay()}</span>                    
                        </div>
                    </div>                           
                <div/>                       
            </div>            
        );  
    } 
}
export default Dashboard