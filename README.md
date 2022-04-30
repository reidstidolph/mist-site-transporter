# Mist Site Transporter

This is used for mass export, import, and cleanup (delete) of sites in Mist orgs.

## Installation and Setup

### Clone Repo

To begin, clone this repo to your machine:
```
git clone https://github.com/reidstidolph/mist-site-transporter.git
cd mist-site-transporter
```

### Module Install

Make sure you have NodeJS installed on your machine running this script. Install required modules by running:
```
npm install
```

### Auth Token

You will need Mist API token with access to the target orgs you'll be exporting, importing, or deleting sites from.

You can issue yourself a new token by browsing to https://api.mist.com/api/v1/self/apitokens , and sending a `POST`. 

The response will return some JSON, including a `key` value. 

**NOTE:** The key will only be retrievable in this response returned. If you fail to record the key, you will need to throw away the token (or let it expire) and generate a new one.

In your working directory, create a JSON file called `token.json`, and copy the token key text into it. JSON needs to look like:
```
{
  "token": "TxLu...long...token...string...FSW2"
}
```

For API reference on tokens, see https://api.mist.com/api/v1/docs/Auth#api-token .

### Orgs

In your working directory, create a JSON file called `orgs.json`. In the JSON, create properties for the following:
- `exportOrg`: OrgID you want the script to export sites from.
- `importOrg`: OrgID you want to import sites to.
- `cleanupOrg`: OrgID you want to delete sites from.

Example:
```
{
  "exportOrg" : "38b04356-4cc3-41cc-bc1a-5de54beb1941",
  "importOrg" : "987c1ca9-0134-4984-bb8f-588c7c9b1bdf",
  "cleanupOrg" : "987c1ca9-0134-4984-bb8f-588c7c9b1bdf"
}
```

## Usage

With your modules installed, and token and orgs JSON set up, you are ready to go!

### Export Sites

To export sites from the `exportOrg`:
```
node get-sites.js
```

This will write site data from `exportOrg` to a `sites.json` file within the working directory. Feel free to inspect `sites.json` for a closer look.

### Import Sites

To import sites from `sites.json` into `importOrg`:
```
node create-sites.js
```

### Cleanup Sites

To delete all sites except the default "Primary Site" from `cleanupOrg`:
```
node cleanup-sites.js
```