import React from 'react'
import { useNavigate,Link } from 'react-router'
const Register = () => {

    
  return (
    <main>
        <div className="form-container">
            <h1>Create an Account</h1>

            <form>
                <div className="input-group">
                    <label htmlFor="username">Username: </label>
                    <input type="text" id='username' name='username' placeholder='Enter username' autoComplete='true'/>
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email: </label>
                    <input type="email" id='email' name='email' placeholder='Enter email address' autoComplete='true'/>
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" id='password' name='password' placeholder='Enter password'/>
                </div>

                <button className='button primary-button'>
                    Submit
                </button>
            </form>

            <p>Already have an account? <Link to={"/login"}>Login</Link></p>
        </div>
    </main>
  )
}

export default Register
