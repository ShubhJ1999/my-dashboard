//this line imports react functionality 
import React from 'react';
import { useEffect, useState } from "react";
import { LineChart, Line, Tooltip } from 'recharts';


function CustomTooltip(props) {
    var price = ""
    var date = ""
    console.log(props)
    if (props.data[props.label]) {
        price = props.data[props.label]["1. open"]
        date = props.data[props.label]["date"]
    }
    return (
        <div>
            <div >{date} </div>
            <div style={{ color: "rgb(0,200,5)"}}> $ {price}</div>
        </div>
    )
}

export default function App() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const data = [];
    useEffect(() => {
        fetch("https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=" + process.env.REACT_API)
            .then(res => res.json())
            .then(
                (result) => {                   
                    for (var instance in result["Weekly Time Series"] ) {
                        var mydata = (result["Weekly Time Series"][instance])
                        mydata.date= instance
                        data.push(mydata)
                    }
                    //var isArray = Array.isArray(data);
                    setItems(data.reverse())
                },(error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )            
    }, [])

    return (
      <div>           
      <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Performance Stats
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Last Year
              </h2>
            </div>          
          </div>
          <LineChart width={700} height={250} margin={{ top: 150, right: 0, left: 20, bottom: 5 }} data={items}>
          <Line dot={false}  type="monotone" dataKey="1. open" stroke="rgb(0,200,5)" yAxisId="100" />
          <Tooltip content={<CustomTooltip data={items} />} />                        
          </LineChart>  
        </div>
      </div>
    </>
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Performance Stats
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Last 10 Years
              </h2>
            </div>          
          </div>
          <LineChart width={700} height={250} margin={{ top: 150, right: 0, left: 20 , bottom: 5 }} data={items}>
          <Line dot={false}  type="monotone" dataKey="1. open" stroke="rgb(0,200,5)" yAxisId="100" />
          <Tooltip content={<CustomTooltip data={items} />} />                        
          </LineChart>  
        </div>
      </div>
    </>        
    </div>
      
    )
}
