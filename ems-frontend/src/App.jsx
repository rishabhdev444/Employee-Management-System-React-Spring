import { useState } from 'react'
import './App.css'
import ListEmployee from './components/ListEmployee'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddEmployee from './components/AddEmployee'
function App() {

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        {/* http://localhost:3030 */}
        <Route path='/' element={<ListEmployee/>}></Route>
        {/* http://localhost:3030/employees */}
        <Route path='/employees' element={<ListEmployee/>}></Route>

        {/* http://localhost:3030/add-employee */}
        <Route path='/add-employee' element={<AddEmployee/>}></Route>

        {/* http://localhost:3030/edit-employee */}
        <Route path='/edit-employee/:id' element={<AddEmployee/>}></Route>
      </Routes>
      
      <Footer/>
    </BrowserRouter>
  )
}

export default App
