
import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Button } from 'semantic-ui-react';
import {createUsers} from './firebase';
import './styleR.css';


export default function Register(){


    const { register, handleSubmit, formState: { errors, isSubmitting, },watch } = useForm();
    const navigate = useNavigate();
    //const signin =() =>{navigate('/login',{replace:true})};
           
    //This is a test comment 2
    //Send data to firebase
    const onSubmit = (data,e) => {
        //
        e.preventDefault()

        //Get fields from inputs
        let obj = {
            firstName : data.firstName,
            lastName:data.lastName,
            email:data.email,
            password:data.password
        }

        //create new user
        createUsers(obj.email,obj.password,obj.firstName,obj.lastName);
        navigate('/',{replace:true});

       /* if(result === "success"){
            navigate('/',{replace:true});
        }else{
            if(result === "auth/email-already-in-use"){
                alert("Email already exists!");
            }else{
                //console.log(result);
            }
        }*/

      };
    
      return(
        <div class="ui form raised very padded text container segment">
            <Form onSubmit={handleSubmit(onSubmit)} >
                <h1>Sign up</h1>
                <Form.Field>
                    <label>First Name</label>
                    <input placeholder='First Name' type="text"
                    {...register("firstName" , { required: true, maxLength: 10 })}
                    />
                </Form.Field>
                {errors.firstName && <p className="text-error">Please check the First Name</p>}
                <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='Last Name' type="text"
                    {...register("lastName")}
                    />
                </Form.Field>
                {errors.firstName && <p className="text-error">Please check the First Name</p>}

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
                {errors.password && <p className="text-error">your password should contain one Capital Letter, one Small Letter, and the number of characters should be between 6 to 15.</p>}
               
               
                <Form.Field>
                    <label>Confirm Password</label>
                    <input placeholder='Confirm Password' type="password"
                    {...register("confirm_password", {
                        required: true,
                        validate: (val) => {
                          if (watch('password') !== val) {
                            return "Your passwords do no match";
                          }
                        },
                       })}
                    />
                </Form.Field>
                {errors.confirm_password && <p className="text-error">{errors.confirm_password.message}</p>}
                
                <Button type='submit' loading={isSubmitting}  content='Sign up' primary />

                <p>Already a member? <Link to="/">Sign in</Link></p>
            </Form>
        </div>
    )

}
