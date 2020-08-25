import React from "react"
import { Link } from "gatsby"
import RequestPasswordReset from '../components/RequestPasswordReset'

import Layout from "../components/layout"

const RequestPasswordResetPage = () => {
  
  return (
    <Layout>
      <h1>Reset Password</h1>
      <p>Please enter your email to be sent a reset password link.</p>
      <div>
        <RequestPasswordReset />
      </div>
      <Link to="/">Go to Home Page</Link>
    </Layout>
  )
}

export default RequestPasswordResetPage