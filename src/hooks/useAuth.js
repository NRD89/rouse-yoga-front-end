import React, { createContext, useState, useEffect } from "react"
import { navigate } from "gatsby"
import axios from "axios"
import Cookie from "js-cookie"
const apiURL = process.env.GATSBY_API_URL || "http://localhost:1337"

const defaultValues = {
  user: {},
  loggedIn: false,
  registerUser: () => {},
  login: () => {},
  logout: () => {},
  requestPasswordReset: () => {},
  resetPassword: () => {},
  redirectToManage: () => {},
}

export const AuthContext = createContext(defaultValues)

// Check if there is a browser
const isntBrowser = typeof window === "undefined"

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(defaultValues.user)
  const [loggedIn, setLoggedIn] = useState(defaultValues.loggedIn)
  const isAuthenticated = loggedIn && Object.keys(user).length

  // grab token value from cookie
  const token = Cookie.get("token")

  useEffect(() => {
    if (isntBrowser) {
      return
    }

    // grab token value from cookie
    // const token = Cookie.get("token")

    if (token) {
      // Authenticate token through Strapi and place user object in defaultValues.user
      fetch(`/.netlify/functions/get-customer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }).then(async res => {
        // if res comes back not valid, token is not valid
        // delete the token and log the user out on client
        if (!res.ok) {
          Cookie.remove("token")
          setUser(defaultValues.user)
          return null
        }
        const data = await res.json()
        console.log(data)
        setUser(data)
        setLoggedIn(true)
      })
    }
  }, [])

  //register a new user
  const registerUser = async (username, email, password) => {
    //prevent function from being ran on the server
    if (isntBrowser) {
      return
    }

    const info = {
      username: username,
      email: email,
      password: password,
    }

    const response = await fetch("/.netlify/functions/create-customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then(res => res.json())
      .catch(err => console.error(JSON.stringify(err, null, 2)))

    console.log("response =>", response)

    return response
  }

  const login = async (identifier, password) => {
    //prevent function from being ran on the server
    if (isntBrowser) {
      return
    }

    const creds = {
      identifier,
      password,
    }

    const response = await fetch("/.netlify/functions/login-customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    })
      .then(res => res.json())
      .catch(err => console.error(JSON.stringify(err, null, 2)))

    console.log("response =>", response)

    return response
  }

  const logout = () => {
    //remove token and user cookie
    Cookie.remove("token")
    delete window.__user
    // sync logout between multiple windows
    window.localStorage.setItem("logout", Date.now())
    //redirect to the home page
    navigate("/")
    setLoggedIn(defaultValues.loggedIn)
  }

  const requestPasswordReset = async email => {
    if (isntBrowser) {
      return
    }

    const response = await fetch("/.netlify/functions/request-password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then(res => res.json())
      .catch(err => console.error(JSON.stringify(err, null, 2)))

    console.log("response =>", response)

    return response
  }

  const resetPassword = async email => {
    if (isntBrowser) {
      return
    }

    const response = await fetch("/.netlify/functions/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then(res => res.json())
      .catch(err => console.error(JSON.stringify(err, null, 2)))

    console.log("response =>", response)

    return response
  }

  const redirectToManage = async () => {
    const response = await fetch("/.netlify/functions/sub-manage-link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then(res => res.json())
      .then(link => {
        window.location.href = link
      })
      .catch(err => console.error(JSON.stringify(err, null, 2)))

    console.log("response =>", response)

    return response

    // Based on https://github.com/jlengstorf/jamstack-subscriptions/blob/master/src/index.html
  }

  return (
    <AuthContext.Provider
      value={{
        ...defaultValues,
        user,
        setUser,
        isAuthenticated,
        registerUser,
        login,
        logout,
        setLoggedIn,
        requestPasswordReset,
        resetPassword,
        redirectToManage,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const wrapRootElement = ({ element }) => (
  <AuthProvider>{element}</AuthProvider>
)
