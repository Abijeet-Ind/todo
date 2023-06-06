import "./Detail.css"

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Detail() {
    const [data, setData] = useState();
    const navigate = useNavigate();

    const fetchData = async () => {
        const extData = await axios.get(`http://127.0.0.1:801/api/v1/todo/detail/${localStorage.getItem('Email')}/${window.location.pathname.split("/")[2]}`)
        setData(extData.data.message)
        console.log(data)
    }
    
    useEffect(() => {
        fetchData();
    }, [])

  return (
    <div className="detail-container">
        <div className="center-item">
            {data && 
                <>
                    <h1 className="heading-title">{data.heading}</h1>
                    <div className="heading-description">{data.description}</div>
                </>
            }
            <button style={{
                 backgroundColor: "#F87777",
                padding: " .5rem 1rem .5rem 1rem",
              }} onClick={el => navigate('/')}> Back To Home</button>
        </div>
    </div>
  )
}