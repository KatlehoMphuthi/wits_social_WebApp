import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from 'semantic-ui-react';
import { Link, useNavigate } from "react-router-dom";
import { resetPass } from "./firebase";
import "./Reset.css";

function Reset() {
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const login = () =>{navigate('/',{replace:true})};
  const signup =() =>{navigate('/register',{replace:true})};

const handlesubmit = (data) =>{

        let obj = {
            email: data.email,
        };

        const result = resetPass(obj.email);

        if(result === "success"){
          navigate('/',{replace:true});
        }else{
          console.log(result);
        } 
    
};

  return (
    <div class="ui form raised very padded text container segment">
        <Form onSubmit={handleSubmit(handlesubmit)}>

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

        </Form>
        <div className='footer'>
        <p>Dont't have an account?<Link to="/register">Sign up</Link></p>
        </div>
    </div>
  );
}
export default Reset;