import React, { useContext } from 'react'
import RequestPasswordReset from "../RequestPasswordReset"
import { AuthContext } from "../../hooks/useAuth"

const UpdateAccount = () => {
  const { redirectToManage } = useContext(AuthContext)

  return (
  <>
    <h2>Request to Change Password</h2>
    <RequestPasswordReset />
    <button onClick={redirectToManage}>Manage Subcription</button>
  </>
)}

export default UpdateAccount