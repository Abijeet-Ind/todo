import './UserAuthCom.css'

import { useState } from 'react'

import image from './../../assets/images/cover.svg'

import axios from "axios";
import { useNavigate } from 'react-router-dom'

export default function UserAuthCom({inputRendering, identification}) {
    const [inputs, setInput] = useState({ });
    const navigate = useNavigate();
    
    const dataStoreFunc = (e, field) => {
        // console.log(e)
        setInput({...inputs, [field]: e})
    }
    console.log(inputs)
    const sendData = async (url, inputs) => {
        if(window.location.pathname === '/create'){
            inputs.email = localStorage.getItem('Email');
        }

        // console.log(inputs)

        const sendData = await axios({
            method: "POST",
            url: url,
            data: inputs
        })
        
        console.log(sendData.data.message)
        if(sendData.data.status === "success"){
            if(identification === 'Login'){
                localStorage.setItem('Email', inputs.email);
                localStorage.setItem("logout", false);

                
                document.querySelector('.login').style.display = 'none';
                document.querySelector('.signup').style.display = 'none';
                document.querySelector('.logout').style.display = 'block';
                window.location.assign('/');
            }else if (identification === 'Signup'){
                navigate('/login')
            }
            alert(sendData.data.message)

        }else if(sendData.data.status === "Failed"){
            alert(sendData.data.message)
        }
    }

    const sendDataToBackend = async (e) => {
        e.preventDefault();
        // console.log(inputs);
        
        if(identification === 'Login'){
            sendData('/api/v1/user/login', inputs)       

        }else if (identification === 'Signup'){
            sendData('/api/v1/user/signup', inputs)       
        } else if (identification === 'Create To Do'){
            if(localStorage.getItem('Email')){
                sendData('/api/v1/todo/create', inputs, localStorage.getItem('Email'))  
            }else{
                alert('please login to insert data')
            }
        }
    }

    return (
        <div className='wrapper-div' >
            <section className='wrapper'>
                <section className='wrapper-section' style={{ width: window.location.pathname === '/create' ? "fit-content" : "50vw" }}>
                    <div className="information-container" style={{ padding: window.location.pathname === '/create' ? "4rem" : "4rem 2rem 4rem 4rem" }}>
                        <h1 className='title'>{identification}</h1>
                        <form className="fillup-container">
                            {inputRendering.map((input) => (
                                <label className={input + "-label"} key={input}>
                                    <span>{input}</span>
                                    <input onChange={(e) => dataStoreFunc(e.target.value, input)} type={input === "password" ? "password" : (input === "email") ? "email" : (input === "passwordConfirm") ? "password" : "text" } id={input + "-fillup"} />
                                </label>
                            ))}
                            <button type="submit" onClick={(e) => sendDataToBackend(e)}> {(window.location.pathname === '/login') ? "Login" : (window.location.pathname === '/signup') ? "Signup" : "Submit"} </button>
                        </form>
                    </div>

                    
                    {(identification.localeCompare('Login') && identification.localeCompare('Signup')) === 0  && 
                        <div className="svg-container" >
                            <div className="svg">
                                <img src={image} draggable="false" alt="banner cannot be displayed" />
                            </div>
                        </div>
                    }
                </section>
            </section>
        </div>
    )
}
