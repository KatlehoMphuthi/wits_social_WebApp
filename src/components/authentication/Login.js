import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Form, Button } from 'semantic-ui-react'
import { useAlert } from 'react-alert'
import {AuthContext} from '../../AuthProvider'
import './authentication.css'

export default function Login () {
  const {login} = useContext(AuthContext);
    //React hook forms to hadle validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
    
  } = useForm()
  const alert = useAlert();

  //To navigate between the pages
  const navigate = useNavigate()


  //This funtion submits the form to firebase
 const handlesubmit = async (data) => {

    //Get form inputs
    let obj = {
      email: data.email,
      password: data.password
    }

    await login(obj.email, obj.password).then(user =>{
      navigate('/newsfeed',{replace:true})
    }).catch(error => {console.log(error.code)
                        if (error.code === "auth/wrong-password"){
                          alert.show("Your email/password is incorrect",{
                            type : 'error',
                            timeout : 2000
                          });
                        }
                         if (error.code === "auth/user-not-found"){
                          alert.show("You are not registered",{
                            type : 'error',
                            timeout : 2000
                          });
                         }
                         else{
                          alert.show("Oops, an error has occurred!",{
                            type : 'error',
                            timeout : 2000
                          });
                         }
                        });
    
    
  }

  //Login form component
  return (
    <div className='form-wrapper'>
      <div className='ui form text container'>
        <Form onSubmit={handleSubmit(handlesubmit)} disabled={isSubmitting}>
          <div className='form-header'>
            <img
              src='/svg/WS_Logo.svg'
              alt='Wits Social Logo'
              width={65}
              className='form-logo'
            />
            <h1>Sign in</h1>
            <p>
              Sign in with your email and password created during your
              registration
            </p>
          </div>
          <Form.Field>
            <label>Email</label>
            <input
              placeholder='Email'
              type='email'
              {...register('email', {
                required: true,
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              })}
            />
          </Form.Field>
          {errors.email && <p className='text-error'>Please check the Email</p>}

          <Form.Field className='field'>
            <label>Password</label>
            <input
              placeholder='Password'
              type='password'
              {...register('password', {
                required: true,
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
              })}
            />
          </Form.Field>
          {errors.password && <p className='text-error '>Incorrect password</p>}

          <Button type='submit' content='Sign in' primary />

          <p>
            Dont't have an account?
            <Link to='/register' className='form-sm-bold'>
              Sign up
            </Link>
          </p>
          <p className='form-sm-bold'>
            <Link to='/reset'>Forgot Password?</Link>
          </p>
        </Form>
      </div>
      <div className='info-sidebar-signin'></div>
    </div>
  )
}
