'use strict'
// modules
const rest = require('axios')

// import token and org to import to
const apiToken = require('./token.json').token
const orgId = require('./orgs.json').importOrg
const siteData = require('./sites.json')
console.log(`Imported ${siteData.length} sites.`)

// variables
const restReqConfig = { headers: { Authorization: `Token ${apiToken}` }}
let siteCreateSuccesses = 0
let siteCreateFailures = 0

// site create function
async function createSite(site) {
  try {
    let response = await rest.post(`https://api.mist.com/api/v1/orgs/${orgId}/sites`, site, restReqConfig)
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
