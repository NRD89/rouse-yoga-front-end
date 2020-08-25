import React from 'react'
import { Link } from 'gatsby'

export default () => (
  <ul>
    <li><Link to="/app">Account</Link></li>
    <li><Link to="/app/update-account">Update Account</Link></li>
    {/* <li><Link to="/app/reset-password/123token456">Reset Password</Link></li> */}
  </ul>
)