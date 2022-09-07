import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Form, Button } from 'semantic-ui-react'
import { createUsers } from '../../firebase'
import './authentication.css'

export default function Register () {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm()
  const navigate = useNavigate()


  const onSubmit = (data, e) => {
    //
    e.preventDefault()

    //Get fields from inputs
    let obj = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password
    }

    //create new user
    createUsers(obj.email, obj.password, obj.firstName, obj.lastName)
    navigate('/', { replace: true })

    /*
     if(result === "success"){
            navigate('/',{replace:true});
        }else{
            if(result === "auth/email-already-in-use"){
                alert("Email already exists!");
            }else{
                //console.log(result);
            }
        }*/
  }

  return (
    <div className='form-wrapper'>
      <div class='ui form  text container'>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-header'>
            <img
              src='/svg/WS_Logo.svg'
              alt=''
              width={65}
              className='form-logo'
            />
            <h1>Sign Up</h1>
            <p>Become a member of Wits Social!</p>
          </div>
          <Form.Field>
            <label>First Name</label>
            <input
              placeholder='First Name'
              type='text'
              {...register('firstName', { required: true, maxLength: 10 })}
            />
          </Form.Field>
          {errors.firstName && (
            <p className='text-error'>Please check the First Name</p>
          )}
          <Form.Field>
            <label>Last Name</label>
            <input
              placeholder='Last Name'
              type='text'
              {...register('lastName')}
            />
          </Form.Field>
          {errors.firstName && (
            <p className='text-error'>Please check the First Name</p>
          )}

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

          <Form.Field>
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
          {errors.password && (
            <p className='text-error'>
              your password should contain one Capital Letter, one Small Letter,
              and the number of characters should be between 6 to 15.
            </p>
          )}

          <Form.Field>
            <label>Confirm Password</label>
            <input
              placeholder='Confirm Password'
              type='password'
              {...register('confirm_password', {
                required: true,
                validate: val => {
                  if (watch('password') !== val) {
                    return 'Your passwords do no match'
                  }
                }
              })}
            />
          </Form.Field>
          {errors.confirm_password && (
            <p className='text-error'>{errors.confirm_password.message}</p>
          )}

          <Button
            type='submit'
            loading={isSubmitting}
            content='Sign up'
            primary
          />

          <p>
            Already a member?{' '}
            <Link to='/' className='form-sm-bold'>
              Sign in
            </Link>
          </p>
        </Form>
      </div>
      <div className='info-sidebar-signup'></div>
    </div>
  )
}
