import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import Register from './components/Register/Register.jsx'
import Enter from './components/Enter/Enter.jsx'
import Submit from './components/Submit/Submit.jsx'
import ProblemSet from './components/ProblemSet/ProblemSet.jsx'
import { loggedInUser } from './service/api.js'
import DisplayProblem from './components/DisplayProblem/DisplayProblem.jsx'
import MySubmissions from './components/MySubmissions/MySubmissions.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' loader={loggedInUser} element={<Layout />}>
        <Route path='' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/enter' element={<Enter />} />
        <Route path='/submit/:id' element={<Submit/>} />
        <Route path='/problemSet' element={<ProblemSet/>}/>
        <Route path='/displayProblem/:id' element={<DisplayProblem/>}/>
        <Route path='/mySubmissions' element={<MySubmissions/>}/>
      </Route>
    </>

  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
