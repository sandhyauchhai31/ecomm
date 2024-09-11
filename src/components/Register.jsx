import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"

function Register() {
  const {register} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e){
    e.preventDefault();
    register(email, password);
  }
  return (
    <div className="container">
      <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
              />
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
    </div>
  )
}

export default Register