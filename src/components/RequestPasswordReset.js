import React, { useState, useContext } from "react"
// import { navigate } from "gatsby"
// import Cookie from "js-cookie"
import { AuthContext } from "../hooks/useAuth"

const RequestPasswordReset = () => {
  const { requestPasswordReset } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)
    try {
      await requestPasswordReset(email).then(res => {
        console.log(res)
      })
      setLoading(false)
    } catch (e) {
      console.log(e)
      setError(e)
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={e => {
              setEmail(e.target.value)
            }}
            value={email}
            id="email"
            type="email"
            placeholder="email@email.com"
          />
        </div>
        <div>
          <button type="submit">{loading ? "Loading..." : "Request Change"}</button>
        </div>
      </form>
      {error.length > 1 ? <p>{error}</p> : null}
      <p>&copy;2020 Gatsby Authentication. All rights reserved.</p>
    </div>
  )
}

export default RequestPasswordReset
