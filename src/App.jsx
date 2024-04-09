import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"

function App() {
  const[x,setx]=useState({
    c:0,
    name:"Fahrenheit",
    display:"none",
    load:"no"
})
  const[place,setplace]=useState("")
  const[weather,setweather]=useState({
    place:[],
    tim:"",
    temp:[],
    text:"",
    img:"",
    day:"",
    humidity:"",
    cloud:"",
    precip:"",
    vis:"",
    wind:""
  })
  // console.log(weather);
  // console.log("hii");
  // console.log(place);
  // useEffect(()=>{
  //   if (place==""){
  //     setx({...x,display:"none"})
  //    }
  //    else{
  //     setx({...x,display:"block"})
  //    }
  // },[])
  
  async function get(){
    const a=`http://api.weatherapi.com/v1/current.json?key=2183c815cc374ce2a1393221240504&q=${place}&aqi=no`
    const b= await axios.get(a)
    .then((b)=>{
      console.log(b.data);
    
      let date=new Date()
      let time=date.getHours() + ":" + date.getMinutes()
      
      console.log(time);
      setweather({
        place : [b.data.location.name,b.data.location.region,b.data.location.country,],
        tim:time,
        temp:[b.data.current.temp_c+" C",b.data.current.temp_f+ " F"],
        text:b.data.current.condition.text,
        img:b.data.current.condition.icon,
        day:b.data.current.is_day,
        humidity:b.data.current.humidity,
        cloud:b.data.current.cloud,
        precip:b.data.current.precip_mm,
        vis:b.data.current.vis_km,
        wind:b.data.current.wind_kph,
  
    })
    setx({...x,display:"block"})
    }).catch((e)=>{
      setx({...x,display:"none"})
    })
   
 
  }
  function chng(){
    if(x.c==0){
    setx({...x,c:1,name:"Celsius"})
    }
    else{
      setx({c:0,name:"Fahrenheit"})
    }
  }
  // function yy(){
  //   console.log(place);
  //   if(place!=""){
      
  //     console.log("uy");
  //   setx({...x,display:"block"})
  //   }
  // }
 
  return (
    <>
     <section>
      <div><h1 className='head  mb-4'>Weather</h1></div>
      <input className='inp border rounded-pill ps-4 mb-4' type="text" value={place} onChange={(e)=>setplace(e.target.value)}/>
      <button type="button" className="btn d-block  btn-success fw-bold" style={{marginLeft:"680px", }} onClick={()=>{get()}}>Search</button>
      
      
      
      <div className='bottom border rounded' style={{height:"370px", display:x.display}}>
        <div className='tt ps-4 pt-2' >{weather.place[0]+" , "+ weather.place[2] }<span style={{fontSize:"20px", fontStyle:"normal", color:"grey"}}>  As of  </span>{ weather.tim+" IST "}</div>
        <div className='h-75 w-100 d-flex flex-row mb-3 mt-2 ms-2 pe-4'>
          <div className='h-100 w-25  ps-5 pt-3 left' >
            <p className='mb-0 ' style={{fontSize:"60px", fontWeight:"bolder"}}>{weather.temp[x.c]}</p>
            <p className='ms-2 mb-0' style={{fontSize:"30px", fontWeight:"bolder", marginLeft:"-30px"}}>{weather.text}</p>
            <p className=""style={{backgroundImage: `url(${weather.img})`,width:"60px", height:"60px", marginLeft:"80px"}}></p>
            <p className='ms-2 mb-0' style={{fontSize:"30px", fontWeight:"bolder", marginLeft:"-30px"}}><button className='btn btn-secondary fw-bold' onClick={chng}>{x.name}</button></p>
          </div>
          <div className='h-100 w-75   container text-center pt-5   ms-4' style={{ marginTop:"10px"}}>
          <div class="row row-cols-2">
    <div class="col">Cloud : <span className='ll'>{weather.cloud}</span></div>
    <div class="col">Humidity : <span  className='ll'>{weather.humidity}</span></div>
    <div class="col">Day/Night :{weather.day==0?<><span  className='ll'> Night</span></>:<><span  className='ll'> Day</span></>}</div>
    <div class="col">Precip(mm) : <span  className='ll'>{weather.precip}mm</span></div>
    <div class="col">Wind(kph) : <span  className='ll'>{weather.wind}kph</span></div>
    <div class="col">Visibilty : <span  className='ll'>{weather.vis}</span></div>
  </div>
          </div>
        </div>
      </div>
     </section>
  </>
  )
}

export default App
