import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/criar-usuario');
  };

  const handleForgotPassword = () => {
    navigate('/redefinir-senha');
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 


    const email = event.target.emailInput.value;
    const password = event.target.passwordInput.value;

    if (email === 'user@example.com' && password === 'password') {
      onLogin(); 
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-primary text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>
              <form onSubmit={handleSubmit}>
                <MDBInput wrapperClass='mb-4 w-100' labelClass='text-white' label='Email address' id='emailInput' type='email' size="lg" />
                <MDBInput wrapperClass='mb-4 w-100' labelClass='text-white' label='Password' id='passwordInput' type='password' size="lg" />
                <p className="small mb-3 pb-lg-2"><a href="#!" className="text-white-50" onClick={handleForgotPassword}>Forgot password?</a></p>
                <MDBBtn outline className='mx-2 px-5' color='light' size='lg' type="submit">
                  Login
                </MDBBtn>
              </form>
              <div className='d-flex flex-row mt-3 mb-5'>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='facebook-f' size="lg" />
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='twitter' size="lg" />
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='google' size="lg" />
                </MDBBtn>
              </div>
              <div>
                <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold" onClick={handleSignUp}>Sign Up</a></p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
