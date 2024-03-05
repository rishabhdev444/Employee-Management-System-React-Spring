import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

function AddEmployee() {
    const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
    const [email,setEmail]=useState("")

    const {id}=useParams();

    const [errors, setErrors]=useState({
        firstName:'',
        lastName:'',
        email:''
    })

    const navigator=useNavigate();

    useEffect(() => {

        if(id){
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => {
                console.error(error);
            })
        }

    }, [id])


    const saveOrUpdateEmployee=(e)=>{
        e.preventDefault();

        if(validateForm()){
            const employee={firstName,lastName,email};
            console.log(employee)
    
            if(id){
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error => {
                    console.error(error);
                })
            } else {
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees')
                }).catch(error => {
                    console.error(error);
                })
            }
        }

        
    }

    function validateForm(){
        let valid=true;
        const errorCopy={...errors}

        if(firstName.trim()){
            errorCopy.firstName='';
        }else{
            errorCopy.firstName='First Name is required';
            valid=false;
        }

        if(lastName.trim()){
            errorCopy.lastName='';
        }else{
            errorCopy.lastName='Last Name is required';
            valid=false;
        }

        if(email.trim()){
            errorCopy.email='';
        }else{
            errorCopy.email='Email is required';
            valid=false;
        } 

        setErrors(errorCopy);

        return valid;
    }

    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Employee</h2>
        }else{
            return <h2 className='text-center'>Add Employee</h2>
        }
    }

  return (
    <div className='container'>
        <br/><br/>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {pageTitle()}
                <div className='card-body'>
                    <form>
                        <div className="form-group mb-2">
                            <label className='form-label'>First Name : </label>
                            <input 
                            type="text" 
                            className={`form-control ${errors.firstName ? 'is-invalid':''}`}
                            name="firstName"
                            value={firstName}
                            onChange={(e)=>setFirstName(e.target.value)}
                            placeholder="Enter First Name"/>
                            {errors.firstName && <div className='invalid-feedback'> {errors.firstName}</div>}
                        </div>

                        <div className="form-group mb-2">
                            <label className='form-label'>Last Name : </label>
                            <input 
                            type="text" 
                            className={`form-control ${errors.lastName ? 'is-invalid':''}`}
                            name="lastName"
                            value={lastName}
                            onChange={(e)=>setLastName(e.target.value)}
                            placeholder="Enter Last Name"/>
                            {errors.lastName && <div className='invalid-feedback'> {errors.lastName}</div>}
                        </div>

                        <div className="form-group mb-2">
                            <label className='form-label'>Email Address: </label>
                            <input 
                            type="email" 
                            className={`form-control ${errors.email ? 'is-invalid':''}`}
                            name="email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            placeholder="Enter Email Address"/>
                            {errors.email && <div className='invalid-feedback'> {errors.email}</div>}
                        </div>
                      
                        <button type="submit" className="btn btn-success" onClick={saveOrUpdateEmployee}>Submit</button>
                    </form>
                </div>
            </div>
      
        </div>
    </div>
  )
}

export default AddEmployee
