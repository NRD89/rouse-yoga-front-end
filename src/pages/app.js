import React, { useEffect, useContext } from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import Navigation from "../components/app/Navigation"
import UpdateAccount from "../components/app/UpdateAccount"
import Account from "../components/app/Account"
import ResetPassword from "../components/app/ResetPassword"
import {AuthContext} from "../hooks/useAuth"
import { navigate } from "gatsby"

const App = ({ location }) => {
  const { user } = useContext(AuthContext)
  const redirect = location.pathname.split("/").pop()
  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { redirect } })
    }
  }, [user, redirect])

  return (
    <Layout>
      <pre>
        { JSON.stringify(user, null, 2) }
      </pre>
      <Navigation />
      <Router basepath="/app">
        <Account default />
        <UpdateAccount path="/update-account" />
        <ResetPassword path="/reset-password/:token" />
      </Router>
    </Layout>
  )
}
export default App
