# Tips API Specs
Create a node.js application that uses MongoDB to store model data.  The app has one REST endpoint - tips.  This endpoint should handle:

- GET /tips/
- GET /tips/<id>
- POST /tips/
- PUT /tips/<id>
- DELETE /tips/<id>

A ‘tip’ shall consist of:
- id (unique)
- Timestamp when tip was created
- Timestamp of last tip update
- Message
- Original message (first message submitted for a tip)
- Username of submitter

GET methods should implement a reasonable HTTP caching scheme.

# Requirements
This assumes that you have NodeJS and NPM installed via the command line.  At time of writing, I am using the following versions:

- node v0.12.2
- npm v2.9.0

# Installing
    npm install

# Running
    node server.js

# Testing
I used Postman to test the API.  Specifically the [Chrome packaged app](https://chrome.google.com/webstore/detail/postman-rest-client-packa/fhbjgbiflinjbdggehcddcbncdddomop).  With this, use the following keys:

- message
- username

# Considerations and Improvements
- Chose not to use Mongo's _id, instead went for tip_id
- "use strict", should consider taking out for deployment
- The foreach in POST for /tips is naive, and more consideration should probably be had for partial updates?  or batch-saving only if error-free run through
