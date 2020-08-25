const fetch = require("node-fetch")
const apiURL = "http://localhost:1337"
// process.env.GATSBY_API_URL ||

exports.strapiFetchUser = async ({ token }) => {
  return await fetch(`${apiURL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .catch(err => console.error(JSON.stringify(err, null, 2)))
}
