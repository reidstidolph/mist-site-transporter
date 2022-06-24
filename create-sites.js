'use strict'
// modules
const rest = require('axios')

// import token and org to import to
const apiTokens = require('./token.json')
const orgInfo = require('./orgs.json')
const orgId = orgInfo.importOrg.id
const siteData = require('./sites.json')
console.log(`Imported ${siteData.length} sites.`)

// variables
let apiHost
let apiToken
if (orgInfo.importOrg.env === "production") {
  apiHost = "api.mist.com"
  apiToken = apiTokens.production
} else if (orgInfo.importOrg.env === "staging") {
  apiHost = "api.mistsys.com"
  apiToken = apiTokens.staging
}
const restReqConfig = { headers: { Authorization: `Token ${apiToken}` }}
let siteCreateSuccesses = 0
let siteCreateFailures = 0

// site create function
async function createSite(site) {
  try {
    let response = await rest.post(`https://${apiHost}/api/v1/orgs/${orgId}/sites`, site, restReqConfig)
    siteCreateSuccesses++
    console.log(`'${response.data.name}' site create success!`)

  } catch (error) {
    siteCreateFailures++
    //console.error(error)
    console.log(`'${site.name}' site create failed.`)
  }
}

async function begin(){

  // iterate through sites and create them
  for (const site of siteData) {
    await createSite(site)
  }

  console.log(`\nsite creation report: ${siteCreateSuccesses} succeeded, ${siteCreateFailures} failed.\n`)

}

begin()
