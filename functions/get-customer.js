const { strapiFetchUser } = require("./utils/strapi")

exports.handler = async event => {
  const { token } = JSON.parse(event.body)

  const response = await strapiFetchUser({ token })

  console.log("response =>", JSON.stringify(response))

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  }
}
