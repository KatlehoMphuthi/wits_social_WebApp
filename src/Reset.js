import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from 'semantic-ui-react';
import { Link, useNavigate } from "react-router-dom";
import { resetPass } from "./firebase";

import './styleR.css'

function Reset() {
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const login = () =>{navigate('/',{replace:true})};
  const signup =() =>{navigate('/register',{replace:true})};

const handlesubmit = (data) =>{
        //create an object to store the information 
        let obj = {
            email: data.email,
        };
        
        //call the reset password function from firebase
        const result = resetPass(obj.email);
        
  
        // determine if the email was either sent or not  sent 
        if(result === "success"){
          navigate('/',{replace:true});
        }else{
          console.log(result);
        } 
    
};

  return (
    <div className='login-container'>
    <div class='ui form text container'>
        <Form onSubmit={handleSubmit(handlesubmit)}>
        <div className='form-header'>
            <img
              src='/svg/WS_Logo.svg'
              alt=''
              width={65}
              className='form-logo'
            />
            <p>Enter your email to reset password</p>
          </div>
            <Form.Field>
                <label>Email</label>
                <input placeholder='Email' type="email"
                {...register("email",{
                    required: true,
                    pattern: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                })}
                />
            </Form.Field>
            {errors.email && <p className="text-error">Please check the Email</p>}
            
            <Button type='submit'>Send email </Button>
                
            <div className='footer'>
        <p>Dont't have an account?  <Link to="/register" className='form-sm-bold'>Sign up</Link></p>
        </div>
        </Form>
        </div>
      <div className='info-sidebar-reset'></div>
    </div>
  );
}
export default Reset;
