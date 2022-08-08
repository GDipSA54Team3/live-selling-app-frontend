import React, { Component } from "react";
import DashboardDataService from '../Services/DashboardDataService';
import {Rating} from 'react-simple-star-rating'


class Dashboard extends Component {

    constructor(props) {
        super(props);      
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.handleStreamingTimeChange = this.handleStreamingTimeChange.bind(this);
        this.retrieveCharts = this.retrieveCharts.bind(this);       

        this.predict =  this.predict.bind(this);
        this.state = {
          currentUser: {
              id: "",
              firstName: "",
              lastName: ""
          },
          predictionData: [
            {order: ""},
            {viewer: ""}
            ], 
          rating :"",         
          productCategory:"",
          day:"",
          streamingTime:"",
          orderStatisticsMovAvg:"", 
          orderStatisticsTime:""       
      }              
    }
    componentDidMount() {      
        if (sessionStorage.getItem('user') === null) {
            this.props.navigate('/home');
        } 
        else {
            const user = JSON.parse(sessionStorage.getItem('user'));                       
            this.setState({
                productCategory: "Clothing",
                day: "SUN",
                streamingTime: "12am-6am",
                orderStatisticsMovAvg:"",
                orderStatisticsTime:"",   
                currentUser: {
                    ...this.state.currentUser,
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName
                },              
                
            }, () => {
              this.retrieveRating();         
              this.predict();
              this.retrieveCharts();
            //   this.retrieveOrderStatisticsByDay();
            });
        }
    }  
    async retrieveCharts() {     

        const delay = ms => new Promise(
            resolve => setTimeout(resolve, ms)
          );
        // Number of orders by time chart
        var movingAverage =    <div>          
            <img src='http://127.0.0.1:5000/charts?name=movavg' height = {300}
                        alt=""></img>  
            </div>;            
        this.setState({ orderStatisticsMovAvg: movingAverage });
        await delay(1000);
        // Number of orders per Day chart
        var bytime =    <div>          
        <img src='http://127.0.0.1:5000/charts?name=bytime' height = {300}
                    alt=""></img>  
        </div>;
        this.setState({ orderStatisticsTime: bytime });

    }
    showStar() {          
        return (
          <div >
            <Rating initialValue={parseInt(this.state.rating)} size='22px' readonly/>
          </div>
        )
    }
    retrieveRating() {
      DashboardDataService.getUserAverageRating(this.state.currentUser.id)
        .then(response => {
          this.setState({
            rating: response.data
          });
          console.log(response.data);
      }).catch(e => {
          console.log(e);
      });
    }
    handleCategoryChange(e) {
        this.setState({productCategory:e.target.value});        
    }
    handleDayChange(e) {
        this.setState({day:e.target.value});              
    }
    handleStreamingTimeChange(e) {
        this.setState({streamingTime:e.target.value});              
    }
    predict(){   
    
    
    var bodyFormData = new FormData();
    bodyFormData.append('product_category', this.state.productCategory);
    bodyFormData.append('day', this.state.day);
    bodyFormData.append('time_period', this.state.streamingTime);

    DashboardDataService.getPrediction(bodyFormData)
        .then(response => {
            this.setState({
            predictionData: response.data
            });            
        }).catch(e => {
            console.log(e);
        }); 
        // console.log(this.state.predictionData); 
        // console.log(this.state.predictionData[0]); 
        // var x=this.state.predictionData[0];
        // var y=x["order"];
        // console.log(y);
    }    
    render() {
    
        return (
            <div>               
                <h3>Welcome {this.state.currentUser.firstName} {this.state.currentUser.lastName}! </h3>
                <br></br>  
                <div className="d-flex justify-content-between">
                    <div className="d-flex flex-column">                      
                        <div className="p-2">
                            <h4>My Rating</h4>                            
                            <h4>{this.state.rating}/5</h4>
                            <div>
                                {this.showStar()}                     
                            </div>  
                        </div>
                        <div className="p-2">
                            <h4>My Popularity</h4>
                            <p>under construction</p> 
                        </div> 
                        <div className="p-2">
                            <h4>Orders Pending Confirmation</h4>
                            <p>under construction</p> 
                        </div> 
                    </div> 

                    <div className="d-flex flex-column"> 
                        <div>
                            <h4>My Streaming Schedule</h4> 
                        </div>
                        <div>
                            <p>Table under construction</p> 
                        </div>

                        <div>
                            <h4>Number of viewers & Orders Prediction</h4>
                            <br></br>  
                            <div className="d-flex flex-row">
                                <div className="p-2">
                                <form className="d-flex flex-column">
                                    <label className="p-2">Product Category</label>
                                    <select className="p-2" id="inlineFormCustomSelectPref" name="product_category"
                                        defaultValue={this.state.productCategory} onChange={this.handleCategoryChange} >                                        
                                        <option value="CLOTHING">Clothing</option>
                                        <option value="FOOD">Food</option>
                                        <option value="APPLIANCES">Home Appliances</option>
                                        <option value="FURNITURES">Furnitures</option>
                                        <option value="TECHNOLOGY">Electronics Devices</option>
                                        <option value="BABY">Baby Items and Toys</option>
                                        <option value="HEALTH">Health and Beauty</option>                                       
                                        <option value="SPORTS">Sports Items</option>
                                        <option value="GROCERIES">Groceries</option>
                                        <option value="OTHERS">Others</option>
                                    </select>                                
                                    <label className="p-2">Day</label>
                                    <select className="p-2" id="inlineFormCustomSelectPref" name="day"
                                    defaultValue={this.state.day} onChange={this.handleDayChange}>                                        
                                        <option value="SUN">Sunday</option>
                                        <option value="MON">Monday</option>
                                        <option value="TUE">Tuesday</option>
                                        <option value="WED">Wednesday</option>
                                        <option value="THU">Thursday</option>
                                        <option value="FRI">Friday</option>
                                        <option value="SAT">Saturday</option>                                  
                                    </select>

                                    <label className="p-2">Streaming Period</label>
                                    <select className="p-2" id="inlineFormCustomSelectPref" name="time_period"
                                    defaultValue={this.state.streamingTime} onChange={this.handleStreamingTimeChange} >                                        
                                        <option value="12am-6am">12am-6am</option>
                                        <option value="6am-12pm">6am-12pm</option>
                                        <option value="12pm-6pm">12pm-6pm</option>
                                        <option value="6pm-12am">6pm-12am</option>                                    
                                    </select>
                                    <br></br>                                    
                                </form>
                                <button className="btn btn-success" onClick = {this.predict}>Predict</button>                                                             
                                </div>
                                    <div >
                                        <h5>Expected Orders:</h5>
                                        <div>{this.state.predictionData[0]["order"]}</div> 
                                        <h5>Expected Viewers:</h5>
                                        <div>{this.state.predictionData[1]["viewer"]}</div>
                                    </div>
                                </div>
                            </div>                       
                    </div>
                    <div className="d-flex flex-column"> 
                        <div>
                            <h4>Platform Sales Statistics</h4> 
                        </div>
                        <div> 
                       </div>                      
                            <div>{this.state.orderStatisticsMovAvg}</div>  
                            <div>{this.state.orderStatisticsTime}</div>            
                        </div>
                    </div>                           
                <div/>                       
            </div>            
        );  
    } 
}
export default Dashboard
