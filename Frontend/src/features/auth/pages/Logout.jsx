import React,{useEffect} from 'react'
import { useAuth } from '../hooks/useAuth.js'

const Logout = () => {
    const {handleLogout,loading} = useAuth();

    useEffect(() => {
        handleLogout();
    }, []);

    if (loading) {
        return (
            <main>
                <h1>Logging out...</h1>
            </main>
        )
    }
  return (
    <div>
      <h1>Logout Successful</h1>
    </div>
  )
}

export default Logout
