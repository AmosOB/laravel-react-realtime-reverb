import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import PrivateRoutes from './components/Auth/PrivateRoutes'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(

    <BrowserRouter>
        <Routes>
            <Route path='/login' element = { <Login />} />
            <Route path='/register' element = { <Register />} />
            <Route element = { <PrivateRoutes />} >
                <Route path='/' element = { <App />} />
                <Route path='/:id' element = { <App />} />
            </Route>

        </Routes>
    </BrowserRouter>,
)
