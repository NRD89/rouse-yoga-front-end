import React, { useState, useContext } from "react"
import { navigate } from "gatsby"
import Cookie from "js-cookie"
import { AuthContext } from "../hooks/useAuth"

const Login = ({ redirect }) => {
  const { user, login, setUser, setLoggedIn } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)
    try {
      await login(identifier, password).then(res => {
        console.log(res)
        if (!res.user) {
          setError(res.data[0].messages[0].message)
          setLoading(false)
        } else {
          Cookie.set("token", res.jwt)
          // set authed User in global context to update header/app state
          setUser(res.user)
          setLoggedIn(true)
          setLoading(false)
          navigate("/app")
        }
      })
    } catch (e) {
      console.log(e)
      setError(e)
      setLoading(false)
    }
  }

  return (
    <div>
      <pre>{JSON.stringify({ user }, null, 2)}</pre>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            onChange={e => {
              setIdentifier(e.target.value)
            }}
            value={identifier}
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={e => {
              setPassword(e.target.value)
            }}
            value={password}
            id="password"
            type="password"
            placeholder="******************"
          />
        </div>
        <div>
          <button type="submit">{loading ? "Loading..." : "Sign In"}</button>
        </div>
      </form>
      {error.length > 1 ? <p>{error}</p> : null}
      <p>&copy;2020 Gatsby Authentication. All rights reserved.</p>
    </div>
  )
}

export default Login
