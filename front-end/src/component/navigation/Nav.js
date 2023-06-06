import './Nav.css'

import { Link } from 'react-router-dom'

export default function Nav() {
  const whenLogout = () => {
    document.querySelector('.login').style.display = 'block';
    document.querySelector('.signup').style.display = 'block';
    document.querySelector('.logout').style.display = 'none';

    localStorage.removeItem("Email");
    localStorage.setItem("logout", true);
    window.location.assign('/');
  }

  
  return (
    <div className="navigation-container">
        <div className="navigation">
            <ul className="logo"> <Link to={"/"}>Todo</Link> </ul>
            <ul className="navigations">
                <li> <Link to={"/"}  > Home </ Link></li>
                <li> <Link to={"/create"} style={{display: localStorage.getItem("Email") ? "block" : "none"}} > Create </ Link></li>
            </ul>
             <ul className="users">
                <li className='login' style={ {display: localStorage.getItem("Email") ? "none": "block" } }> <Link to={"/login"}  > Login </ Link></li>
                <li className='signup' style={ {display: localStorage.getItem("Email") ? "none": "block" } } > <Link to={"/signup"}  > Signup </ Link></li>
                <li className='logout' onClick={el => whenLogout()} style={ {
                    fontWeight: 900,
                    cursor: "pointer"
                  } }> Logout </li>
            </ul>
        </div>
    </div>
  )
}
