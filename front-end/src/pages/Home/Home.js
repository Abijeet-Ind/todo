// css
import './Home.css'

import { useState, useEffect } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

export default function Home({url, checkButtonUrl}) {
  const navigate = useNavigate()
  const [datas, setDatas] = useState(null);
  const [trigger, setTrigger] = useState(false);

  console.log("trigger", trigger);
  const fetchData = async () => {
    const responseData = await axios.get(`http://127.0.0.1:801/api/v1/todo/findall/${localStorage.getItem("Email")}`);
    setDatas(responseData.data.message)
    setTrigger(false)
  }

  useEffect(() => {
    if(localStorage.getItem('Email')){
      document.querySelector('.login').style.display = 'none';
      document.querySelector('.signup').style.display = 'none';
      document.querySelector('.logout').style.display = 'block';
    }else{
      document.querySelector('.login').style.display = 'block';
      document.querySelector('.signup').style.display = 'block';
      document.querySelector('.logout').style.display = 'none'; 
    }
    fetchData()
  }, [url, trigger])

  
  const todoComplited = async (urlUpdate) => {
    setTrigger(true)
    await axios.patch(`http://127.0.0.1:801/api/v1/todo/completedTodo/${urlUpdate}/${localStorage.getItem('Email')}`);
  };

  const deleteTodos = async (heading) => {
    setTrigger(true)
    await axios.delete(`http://127.0.0.1:801/api/v1/todo/delete/${heading}/${localStorage.getItem('Email')}`); 
  }


  return (
    <div className='items-display'>
      <div className='todo-container'>
        {localStorage.getItem('Email') === null ? <h1 style={{ color:"#323232" }}>Please Login To See your Todo List</h1> : <span></span>}
        {datas && localStorage.getItem('Email') && datas.map((data, i) => (
          <div key={data + i} className={ `todo-items dark`  }>
            <input type="checkbox" checked={(data.isCompleted * 1) === 1 ? true : false} name="" id="" className='button-check' onChange={el => (todoComplited(data.heading))} />
            <h2 onClick={el => navigate(`/detail/${data.heading}`)} className={(data.isCompleted * 1) === 0  ? "h2" : "isComplited h2" }>{data.heading}</h2>
            <button style={{
              backgroundColor: "#F87777",
              padding: " .5rem 1rem .5rem 1rem" 
              }} onClick={el => deleteTodos(data.heading)}>Delete</button>
          </div>
        )) }
      </div>
    </div>
  )
}