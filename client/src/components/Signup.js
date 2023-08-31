import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassowrd: ""});
  const {name, email, password } = credentials;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://backend-7zjq.onrender.com/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, password})
    });
    const json = await response.json();
    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      props.showAlert("success", "Signed in Successfully");
      navigate("/")
    }
    else {
      props.showAlert("danger", json.error)
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='container'>
      <h1>Create an account to use iNoteBook</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" value={credentials.name}/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"  value={credentials.email}/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" id="password" onChange={onChange} value={credentials.password} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label> 
          <input type="password" className="form-control" name="cpassword" id="cpassword" onChange={onChange}  minLength={5} required/>
        </div>       
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  )
}

export default Signup;