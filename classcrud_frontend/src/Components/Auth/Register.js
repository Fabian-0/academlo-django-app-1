import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { FormError } from "../helpers/Alerts";
import { AlertDangerous } from "../helpers/Alerts";

function Register() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [requestError, setRequestError] = useState(false);
  let history = useHistory()

  const onSubmit = async (data) => {
  
    const response = await fetch('http://127.0.0.1:8000/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if(response.status !== 201) return setRequestError(true)
    alert('Succes!')
    return history.replace('/');
  }

  return (
    <>
      {requestError && <AlertDangerous alertText='User already exists' />}
      <form action="/register/" className="row col-lg-8 mx-auto my-4 border border-secondary p-4 rounded-3" onSubmit={handleSubmit(onSubmit)} method="POST">
        <h2 className="text-center">Register</h2>
        <div className="col-12 mb-4">

          <input type="text" {...register('username', {required: true, maxLength: 100})} className="form-control" placeholder="Username" />

          {errors.username?.type === 'required' && <FormError error={'Field Required'} />}
          {errors.username?.type === 'maxLength' && <FormError error={'Max Length 100 Chars'} />}
        </div>
        <div className="col-12 mb-4">

          <input type="text" {...register('first_name', {required: true, maxLength: 100})} className="form-control" placeholder="First name" />

          {errors.first_name?.type === 'required' && <FormError error={'Field Required'} />}
          {errors.first_name?.type === 'maxLength' && <FormError error={'Max Length 100 Chars'} />}
        </div>
        <div className="col-12 mb-4">

          <input type="text" {...register('last_name', {required: true, maxLength: 100})} className="form-control" placeholder="Last name" />

          {errors.last_name?.type === 'required' && <FormError error={'Field Required'} />}
          {errors.last_name?.type === 'maxLength' && <FormError error={'Max Length 100 Chars'} />}
        </div>
        <div className="col-12 mb-4">

          <input type="email" {...register('email', {required: true, maxLength: 100})} className="form-control" placeholder="Email" />

          {errors.email?.type === 'required' && <FormError error={'Field Required'} />}
          {errors.email?.type === 'maxLength' && <FormError error={'Max Length 100 Chars'} />}
        </div>
        <div className="col-12 mb-4">

          <input type="url" {...register('avatar', {required: true, maxLength: 255})} className="form-control" placeholder="Avatar Url" />

          {errors.avatar?.type === 'required' && <FormError error={'Field Required'} />}
          {errors.avatar?.type === 'maxLength' && <FormError error={'Max Length 255 Chars'} />}
        </div>
        <div className="col-12 mb-4">

          <input type="password" {...register('password', {required: true, maxLength: 15})} className="form-control" placeholder="Password" />

          {errors.password?.type === 'required' && <FormError error={'Field Required'} />}
          {errors.password?.type === 'maxLength' && <FormError error={'Max Length 15 Chars'} />}
        </div>
        <div className="col-12 mb-4">

          <select className="form-select" id="autoSizingSelect" {...register('account_type', {required: true})}>
            <option value='' >Select Account Type</option>
            <option value="professor">Professor</option>
            <option value="student">Student</option>
          </select>

          {errors.account_type?.type === 'required' && <FormError error={'Field Required'} />}
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary m-auto d-block">Register</button>
        </div>
      </form>
    </>
  );
}

export default Register;