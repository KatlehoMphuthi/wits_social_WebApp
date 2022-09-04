import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Button } from 'semantic-ui-react';
import { loginUser } from './firebase';
import './styleR.css';

function Login(){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const reset = () =>{navigate('/reset',{replace:true})};
    //const signup =() =>{navigate('/register',{replace:true})};


    const handlesubmit = (data, e) =>{
        //Prevent from from resubmiting after cancel
            e.preventDefault();


    const handlesubmit = (data) =>{
            let result;

            let obj = {
                email: data.email,
                password: data.password,
            };
        
            const response = loginUser(obj.email,obj.password);
            console.log(response);
            
            if(response === "success"){
                navigate('/newsfeed',{replace: true});
            }else{
                alert("There is an error");
            }
        };


            
            

    return(
        <div class="ui form raised very padded text container segment">
        <Form onSubmit={handleSubmit(handlesubmit)} >
            <h1>Sign in</h1>

        
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


            <Form.Field class="field">
                <label>Password</label>
                <input placeholder='Password' type="password"
                {...register("password",  {
                    required: true,
                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                })}
                
                />
            </Form.Field>
             {errors.password && <p className="text-error ">Incorrect password</p>}
            
            <Button type='submit' content='Sign in' primary />

        </Form>
        <div className='footer'>
                <p>Dont't have an account?<Link to="/register">Sign up</Link></p>
                <p> <Link to="/reset">Forgot Password?</Link></p>
                
        </div>
    </div>
    );
}

export default Login;