import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

// component
import Nav from './component/navigation/Nav'
import UserAuthCom from './component/UserAuthCom/UserAuthCom';
import CreatedList from './component/create/CreatedList'
import Detail from './pages/detail page/Detail';

// pages
import Home from './pages/Home/Home'

function App() {
  const [loginInput, setLoginInput] = useState(['email', 'password']);
  const [signupInput, setsignupInput] = useState(['name', 'email', 'password', 'passwordConfirm']);
  const [todoInput, setTodoInput] = useState(['heading', 'description'])


  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <CreatedList />
        <Routes>
          <Route path='/' element={ <Home  />  } ></Route>
          <Route path='/login' element={<UserAuthCom inputRendering={loginInput} identification="Login" />}></Route>
          <Route path='/signup' element={<UserAuthCom inputRendering= {signupInput} identification="Signup"/>}></Route>
          <Route path='/create' element={<UserAuthCom inputRendering= {todoInput} identification="Create To Do"/>}></Route>
          <Route path='/detail/:query' element={<Detail/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;