import React, { Component } from "react";
import DashboardDataService from '../Services/DashboardDataService';
import {Rating} from 'react-simple-star-rating'
import dateFormat from 'dateformat';


class Dashboard extends Component {

    constructor(props) {
        super(props);      
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.handleStreamingTimeChange = this.handleStreamingTimeChange.bind(this);
        this.retrieveCharts = this.retrieveCharts.bind(this);
        this.retrievePopularity = this.retrievePopularity.bind(this); 
        this.setSuggestion = this.setSuggestion.bind(this);
        //this.getUpComingStreams =  this.getUpComingStreams.bind(this);        
        this.predict =  this.predict.bind(this);
        this.state = {
          currentUser: {
              id: "",
              firstName: "",
              lastName: ""
          },
          popularityData : [],
          predictionData: [
            {order: ""},
            {viewer: ""}
            ], 
          avgUserLikes:"9",
          avgStreamerLikes:"9",
          rating :"",         
          productCategory:"",
          day:"",
          streamingTime:"",
          orderStatisticsMovAvg:"", 
          orderStatisticsTime:"",
          polarityChart:"",
          popsuggestion:"",
          streams: [],
          pendingStreamCount:""                 
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
              this.retrievePopularity();
              this.retrieveCharts();
              this.getUpcomingStreams();                                      
            });
        }
    }
    getUpcomingStreams(){
        DashboardDataService.getAllUserStreamsPending(this.state.currentUser.id).then(response => {
            this.setState({
                streams: response.data                
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
        DashboardDataService.getAllPendingCount(this.state.currentUser.id).then(response => {
            this.setState({
                pendingStreamCount: response.data                
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }    
    setSuggestion(){
        let userLikes = parseInt(this.state.avgUserLikes)
        let streamerLikes = parseInt(this.state.avgStreamerLikes)  
        console.log(userLikes)
        console.log(streamerLikes)
        if (userLikes < streamerLikes) {

            this.setState({
                popsuggestion: "You are getting less Hearts than other streamers. "+
                "Try to improve. Goodluck!"
              });         
        }
        else if (userLikes == streamerLikes){
            this.setState({
                popsuggestion: "You are getting same number of Hearts as other streamers. "+ 
                "Good job!. Check if you can improve further"
              });         
        }
        else if (userLikes > streamerLikes){
        
            this.setState({
                popsuggestion: "You are getting more Hearts than Other Streamers "+ 
                "Good job!. Check if you can improve even further"
              });         
        }
    }
    async retrievePopularity(){
        DashboardDataService.getUserAverageLikes(this.state.currentUser.id)
        .then(response => {
          this.setState({
            avgUserLikes: response.data
          });
          console.log(response.data);
      })
     .catch(e => {
          console.log(e);
      });

     await  DashboardDataService.getAverageStreamLikes()
        .then(response => {
          this.setState({
            avgStreamerLikes: response.data
          });            
            console.log(response.data);
            
      }).catch(e => {
          console.log(e);
      });  

      await this.setSuggestion()     

    }
     // popularity Chart
    getPopularityChart(){
        var userId = this.state.currentUser.id
        var popChart = DashboardDataService.getpolarityChart(userId)        
        this.setState({ polarityChart: popChart });
        
    }
     // Order TimeSeries Chart 
    getOrderMovingAverage(){
        var movingAverage = DashboardDataService.getOrderMovingAverage()                  
        this.setState({ orderStatisticsMovAvg: movingAverage });

    }
    // Number of orders by time chart
    getOrderByTimePeriod(){
        var bytime =    DashboardDataService.getOrderByTimePeriod()
        this.setState({ orderStatisticsTime: bytime });
    
    }
    async retrieveCharts() {    
        const delay = ms => new Promise(
            resolve => setTimeout(resolve, ms)
          );  
       
        this.getPopularityChart()
        await delay(1000);
        this.getOrderMovingAverage();
        await delay(1000);
        this.getOrderByTimePeriod();
        
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
                            <p>{this.state.popsuggestion}</p>                                                                               
                            <div>{this.state.polarityChart}</div>                     
                        </div> 
                        <div className="p-2">
                            <h4>Orders Pending Confirmation</h4>
                            <p>under construction</p> 
                        </div> 
                    </div> 

                    <div className="d-flex flex-column"> 
                        <div>
                            <h4>My Upcoming Streams</h4>
                            <div>
                            <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">Title</th>		
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.streams.map((item, i) => (
                                    <tr key={i}>                                        
                                        <td> {dateFormat(item.schedule, "dd-mm-yyyy")}</td>
                                        <td>{dateFormat(item.schedule, "HH:MM")}</td>
                                        <td>{item.title}</td>				
                                    </tr>
                            ))}
                            </tbody>
                            </table>
                            </div>
                            <p>{parseInt(this.state.pendingStreamCount) - this.state.streams.length} More.. <a href="http://localhost:3000/mystore">
                                View All</a></p>  
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
