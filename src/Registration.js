
import React from 'react'
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Button } from 'semantic-ui-react';
import {createUsers} from './firebase';
import './styleR.css';


export default function Register(){


    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
           
    //Send data to firebase
    const onSubmit = (data) => {

        //object with form inputs
        console.log(data);
        
        //TODO
        //Check if the username already exists in the database
        //Implement confirm password
        //Implement the show password eye
        //Tell the user they have successfully registered
        //Clear form after validation

        let obj = {
            firstName : data.firstName,
            lastName:data.lastName,
            email:data.email,
            password:data.password
        }

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
        <div className='form-container'>
            <Form onSubmit={handleSubmit(onSubmit)}>
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
                    //{...register("confirmpassword")}
                    />
                </Form.Field>
                <Button type='submit'>Sign Up</Button>
            </Form>

        </div>
    )}
