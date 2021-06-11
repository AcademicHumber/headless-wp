const axios = require("axios")
const { nanoid } = require("nanoid")
const oauthSignature = require("oauth-signature")
// Require env variables
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

// Set up essential values
const secretData = {
  apiUrl: process.env.GF_API_URL,
  gfKey: process.env.GF_CONSUMER_KEY,
  gfSecret: process.env.GF_CONSUMER_SECRET,
}

// For those requests
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
}

const formHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.json({ message: "Try a POST!" })
  }

  // Auth Stuff
  const authParams = new0AuthParameters(secretData.gfKey)
  const signature = oauthSignature.generate(
    "POST",
    secretData.apiUrl,
    authParams,
    secretData.gfSecret
  )
  // Set form data
  const formData = {
    form_id: "1",
    2: req.body.email, // "2" is the id of the text field on GF builder
  }

  // Send request - references: https://github.com/robmarshall/gatsby-gravityforms-component
  let result

  try {
    result = await axios({
      method: "post",
      url: secretData.apiUrl,
      responseType: "json",
      params: {
        ...authParams,
        oauth_signature: signature,
      },
      data: formData,
    })
  } catch (error) {
    console.log("new-gf-entry.js Error Data")
    console.log(error)

    const errorResponse = error.response?.data

    // Here we know this is a Gravity Form Error
    if (errorResponse && errorResponse?.is_valid === false) {
      return res.status(422).json({
        message: "Ha habido problemas al guardar la entrada",
        error: errorResponse,
      })
    } else {
      // Unknown error
      return res.status(400).json({
        message: "Ha habido problemas al guardar la entrada",
        error: errorResponse,
      })
    }
  }

  return res.status(201).json(`¡Suscripción satisfactoria!`)
}

module.exports = formHandler

function new0AuthParameters(consumerKey) {
  return {
    oauth_consumer_key: consumerKey,
    oauth_timestamp: getCurrentTimestamp(),
    oauth_signature_method: "HMAC-SHA1",
    oauth_version: "1.0",
    oauth_nonce: nanoid(11),
  }
}

function getCurrentTimestamp() {
  return Math.round(new Date().getTime() / 1000)
}
