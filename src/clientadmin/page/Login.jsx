import React, { useState } from 'react';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const passwordAsInteger = parseInt(password, 10);
  
  // Perform API call for login
      const response = await fetch('/clientadmin/CheckLoginCredentials', {
         method: 'POST',
           headers: {
          'Content-Type': 'application/json',
       },
         body: JSON.stringify({ email, password: passwordAsInteger }),
      });
      console.log(response)

      // alert(email )
      if (response.ok) {
        // const data = await response.json();
        // handleLogin(data);
        const data = await response.json();
        // Include email in the data sent to handleLogin
        handleLogin({ ...data, email }); // Adding email to the data object
      } else {
        // console.error('Login failed');
        setErrorMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setSuccessMessage('');
      if (error.response) {
        setErrorMessage(`Error Status Code: ${error.response.status}`);
      } else {
        setErrorMessage('An error occurred during login. Please try again later.');
      }
    }
  }; 

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo"> 
                  <img src="../../images/dashboard/EV-CLIENT-ADMIN.png" alt="logo" style={{width:'83%', height:'200%'}}/>
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <form className="pt-3" onSubmit={handleLoginFormSubmit}>
                  <div className="form-group">
                    <input type="email" className="form-control form-control-lg" placeholder="Enter your email" value={email} onChange={(e) => {const value = e.target.value; const noSpaces = value.replace(/\s/g, ''); const validChars = noSpaces.replace(/[^a-zA-Z0-9@.]/g, ''); const atCount = (validChars.match(/@/g) || []).length; const sanitizedEmail = atCount <= 1 ? validChars : validChars.replace(/@.*@/, '@'); setEmail(sanitizedEmail); }}required/>  
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control form-control-lg" placeholder="Enter your password" value={password} maxLength={4} onChange={(e) => {const value = e.target.value; const sanitizedValue = value.replace(/[^0-9]/g, ''); setPassword(sanitizedValue);}} required/>
                  </div>
                  {errorMessage && <p className="text-danger">{errorMessage}</p>}<br/>
                  {successMessage && <p className="text-success">{successMessage}</p>}<br/>
                  <div className="mt-3">
                    <button type="submit" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN IN</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login
