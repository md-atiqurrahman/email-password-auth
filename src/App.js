import './App.css';
import app from './firebase.init';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';

const auth = getAuth(app)

function App() {
  const [validated, setValidated] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleNameOnBlur = event =>{
    setName(event.target.value);
  }

  const handleEmailOnBlur = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordOnBlur = (event) => {
    setPassword(event.target.value)
  }

  const handleOnCheckOut = event => {
    setRegistered(event.target.checked)
  }

  const handleOnSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError('Your password must contain at least one special character');
      return;
    }

    setError('');
    setValidated(true);

    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
        })
        .catch(error => {
          setError(error.message);
        })
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
          setEmail('')
          setPassword('')
          verifyEmail()
          setUserName()
        })
        .catch(error => {
          setError(error.message)
        })
    }

    const verifyEmail = () => {
      sendEmailVerification(auth.currentUser)
        .then(() => {
          console.log('email is sent');
        })
    }
  }
  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('email is sent for reset password')
      })
  }

  const setUserName = () =>{
    updateProfile(auth.currentUser,{
      displayName: name
    })
    .then(() =>{
      console.log('update user profile')
    })
    .catch(error =>{
      setError(error.message)
    })
  }
  return (
    <div>
      <div className='register w-50 mx-auto'>
        <h2 className='text-primary mt-2'>Please {registered ? 'Login' : 'Register'}
          !!</h2>
        <Form noValidate validated={validated} onSubmit={handleOnSubmit}>
          {
            !registered && <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Your Name</Form.Label>
              <Form.Control onBlur={handleNameOnBlur} type="text" placeholder="Enter your name" required />
              <Form.Control.Feedback type="invalid">
                Please provide a your name.
              </Form.Control.Feedback>
            </Form.Group>
          }
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailOnBlur} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordOnBlur} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
            <p className='text-danger'>{error}</p>
          </Form.Group>
          <Form.Check
            className='mb-2'
            onChange={handleOnCheckOut}
            label="Already Registered ?"
            feedbackType="invalid"
          />
          <Button variant="primary" type="submit">
            {registered ? 'Login' : 'Registered'}
          </Button>
          <br />
          <Button onClick={handleResetPassword} variant="link">Forgot password?</Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
