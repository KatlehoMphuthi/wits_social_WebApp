
import React, {useState,setState} from 'react';
import {database,auth,createUsers} from './firebase'
import {ref,push,child,update} from "firebase/database";
import './styleR.css'
import userEvent from '@testing-library/user-event';

function RegistrationForm() {
    
    const [email, setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [confirmPassword,setConfirmPassword] = useState(null);
    const [emailError,setEmailError ]= useState(null);
    const [passwordError,setPasswordError] = useState(null);
    const [confirmPasswordError,setConfirmPasswordError] = useState(null);

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
        if(id === "confirmPassword"){
            setConfirmPassword(value);
        }
        

    }

    
    const handleValidation= () => {
        let emailError ="";
        let  passwordError = "";

        let confirmPasswordError ="";

 
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!email || reg.test(email) === false){
            emailError = "Email Field is Invalid ";
        }
 
        if(!password){
            passwordError = "Password field is required";
        }

        if(!confirmPassword){
            confirmPasswordError = "Password field is required";
        }

        if(password !== confirmPassword){
            confirmPasswordError = "Passwords are not matching";
        }
 
        if(emailError){
            setEmailError(emailError);
            return false;
        }
        if(passwordError){
            setPasswordError(passwordError);
            return false;
        }

        if(confirmPasswordError){
            setConfirmPasswordError(confirmPasswordError);
            return false;
        }
 
        return true;
        }
    
    const handleSubmit = () =>{
        if(handleValidation() === true ){
            let obj = {
                email: email,
                password: password,
                confirmPassword:confirmPassword

            };

            createUsers(auth,obj.email,obj.password);
        }else{
            alert("There are errors.");
        }
    }

    return(
        <div className="form">
            <div className="form-body">
                
                <div className="email">
                   
                    <input  type="email" id="email" className="form__input" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
                    <span className="text-danger">{emailError}</span>
                </div>
                <div className="password">
                   
                    <input className="form__input" type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                    <span className='text-danger'>{passwordError}</span>
                </div>
                <div className="confirm-password">
                    <input className="form__input" type="password" id="confirmPassword" value={confirmPassword} onChange = {(e) => handleInputChange(e)} placeholder="Confirm Password"/>
                    <span className='text-danger'>{confirmPasswordError}</span>
                </div>
                <div class="footer">
                <button onClick={()=>handleSubmit()} type="submit" class="btn">Register</button>
            </div>
            </div>
           
        </div>
       
    )       
}

export default RegistrationForm;