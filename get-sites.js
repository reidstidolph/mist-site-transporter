'use strict'
// modules
const rest = require('axios')
const fs = require('fs')

// import token and org to export from
const apiTokens = require('./token.json')
const orgInfo = require('./orgs.json')
const orgId = orgInfo.exportOrg.id

// variables
let apiHost
let apiToken
if (orgInfo.exportOrg.env === "production") {
  apiHost = "api.mist.com"
  apiToken = apiTokens.production
} else if (orgInfo.exportOrg.env === "staging") {
  apiHost = "api.mistsys.com"
  apiToken = apiTokens.staging
}
const restReqConfig = { headers: { Authorization: `Token ${apiToken}` }}
const siteFileName = 'sites.json'

// function for writing JSON to file
const writeToFile = function(path, contentString){
  return new Promise((resolve, reject) => {
    fs.writeFile(path, contentString, {mode: 0o600,encoding: 'utf8'}, (err) => {
      if (err) { reject(err) }
      else { resolve() }
    })
  })
}

async function begin() {
  try {
    // fetch sites
    let response = await rest.get(`https://${apiHost}/api/v1/orgs/${orgId}/sites`, restReqConfig)
    let siteData = response.data

    // log message
    console.log(`Retrieved ${siteData.length} sites.`)

    // filter out all but required site parameters
    let savedSiteData = siteData.map(site => (
      {
        name: site.name,
        country_code: site.country_code,
        address: site.address,
        latlng: site.latlng,
        timezone: site.timezone
      }
    ))

    // write sites to file
    await writeToFile(siteFileName, JSON.stringify(savedSiteData, null, 2))
    console.log(`wrote sites to file: '${siteFileName}'`)

  } catch (error) {
    // handle error
    console.error(error)
  }
}

begin()
