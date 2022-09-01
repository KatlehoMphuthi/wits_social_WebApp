import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Button } from 'semantic-ui-react';
import { loginUser } from './firebase';
import './styleR.css';

function Login(){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const reset = () =>{navigate('/reset',{replace:true})};
    const signup =() =>{navigate('/register',{replace:true})};

    const handlesubmit = (data) =>{
    
            let obj = {
                email: data.email,
                password: data.password,
            };
        
            const user = loginUser(obj.email,obj.password);
            if(user !== null){
                navigate('/newsfeed',{replace: true});
            }else{
                alert("There is an error");
            }
        };


            
            

    return(
        <div className='form-container'>
        <Form onSubmit={handleSubmit(handlesubmit)}>

            <Form.Field>
                <label>Email</label>
                <input placeholder='Email' type="email"
                {...register("email",{
                    required: true,
                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                })}
                />
            </Form.Field>
            {errors.email && <p className="text-error">Please check the Email</p>}

            <Form.Field>
                <label>Password</label>
                <input placeholder='Password' type="password"
                {...register("password",  {
                    required: true,
                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                })}
                />
            </Form.Field>
            {errors.password && <p className="text-error">Incorrect password</p>}
            
            <Button type='submit'>Sign In</Button>

        </Form>
        <div className='footer'>
                <Button onClick={reset}>Forget Password</Button>
                <p> <Link to="/reset">Forget Password</Link></p>
                <p>Become a member <Link to="/register">Sign up</Link></p>
                
        </div>
    </div>
    );
}

export default Login;