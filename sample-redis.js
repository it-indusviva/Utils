// Port, host and auth token of Redis server might be defined as environment
// variables. If not, fall back to defaults.
const redisPort = process.env.REDIS_PORT || 6379
const redisHost = process.env.REDIS_HOST || '127.0.0.1'
const redisAuth = process.env.REDIS_AUTH || null
const redis = require('redis')
//const client = redis.createClient();
const asyncRedis = require('async-redis')
const fs = require('fs')

// Since we are waiting for the error event, we don't have to check for errors
// individually after each Redis command.
var onError = function (error) {
  console.error('Error in Redis client: ' + error.message)
  console.error(error.stack)
  console.log('Exiting now because of error in Redis client')
  // Our app doesn't work without DB. Exit.
  process.exit(1)
}

var onConnect = function () {
  console.log('Successfully connected to Redis ' + redisHost + ':' + redisPort)
}

// How to use this module:
// var redis = require('./redis');
// redis.set('key', 'value');
// redis.get('key', function (err, value) {
//   console.log('Value: ' + value);
// });
//
// See http://redis.io/commands for available commands and
// https://github.com/mranney/node_redis for basic usage.

const redisConnect = () => {
  var redisClient = redis.createClient(redisPort, redisHost, {
    auth_pass: redisAuth
  })
  redisClient.on('error', onError)
  redisClient.on('connect', onConnect)
  const asyncRedisClient = asyncRedis.decorate(redisClient)
  // return redisClient
  return asyncRedisClient
}

var redis_client = redisConnect()

// var fs = require('fs')
// const mariadb = require('mariadb')
// const { dbCredentials } = require("../config")

var dbCredentials = {
  host: '127.0.0.1',
  user: 'dev',
  password: 'HmBBL41VsP+b',
  database: 'eng_live',
  port: '3306',
  connectionLimit: '5000'
}
var JSONStream = require('JSONStream')
var es = require('event-stream')
// const { count } = require('console');
var regExpAlphabetsSymbols = /[a-zA-Z\s()-]/g
var regValidPhone = /^(?:[+0]*)(?:[-()\s\.0-9]●?){6,14}[0-9]$/
var regExpRemoveLeadingZero = /\b0+/g
var jsonData = 'distributors_failed.json'
var getStream = function () {
  // var jsonData = 'data.json',
  ;(stream = fs.createReadStream(jsonData, { encoding: 'utf8' })),
    (parser = JSONStream.parse('*'))
  return stream.pipe(parser)
}
var insertContacts = []
var dist = []
var i = 0
var counter = 0
var j = 40
var iterator = 0
var duplicate = 0
var connerro = 0
var quererr = 0

async function sampleAsync () {
  getStream().pipe(
    es.mapSync(async function (data) {
      ++counter
      ++iterator

      // if (iterator >= 0 && iterator < 60000) {
      console.log(counter)
      if (counter % 5000 == 0) {
        j = 5000
        console.log('===============================')
      } else {
        j = 50
      }
     

      if (regValidPhone.test(data.regMobile)) {
        data.regMobile = data.regMobile.replace(regExpAlphabetsSymbols, '')
        if (!data.regMobile.startsWith('+')) {
          data.regMobile = '+91' + data.regMobile.replace(regExpRemoveLeadingZero, '')
        }
        var encoded = decodeURIComponent(data.storeLink)
        // console.log(encoded)
        // var conn = await mariadb.createConnection(dbCredentials)

        console.log('hello')
        if (!dist.includes(data.distributor_id)) {
          dist.push(data.distributor_id)

          console.log(data.regMobile, data.name)

          redis_client
            .set(
              data.regMobile,
              data.name

              // redis.print()
            )
            .then(() => {})
            .catch(error => {
              console.log('Error', error)
            })

          // var conn = await mariadb.createConnection(dbCredentials)

          // var rows = await conn.query(sql, params)
          // conn.end()

          //   setTimeout(() => {
          //     mariadb
          //       .createConnection(dbCredentials)
          //       .then(conn => {
          //         conn
          //           .query(sql, params)
          //           .then(rows => {
          //             conn.end()
          //           })
          //           .catch(err => {
          //             ++quererr
          //             console.log('Error Query ')
          //           })
          //       })
          //       .catch(err => {
          //         ++connerro
          //         console.log('Error database ', err)
          //       })
          //   }, 500)

          // setTimeout(async () => {
          //     // console.log(j)
          //     var conn = await mariadb.createConnection(dbCredentials)

          //     var rows = await conn.query(sql, params)
          //     conn.end()

          // }, j)

          // insertContacts.push(params)
        } else {
          ++duplicate
        }

        // var result = redisConnect.set(data.phone,data.name)

        // console.log('Sanitized >> ', data.phone);
      } else {
      }
      // }

      console.log('duplicates are: ', duplicate)
      // console.log('total iterated over is:', iterator)
      // console.log('Query error: ', quererr)
      // console.log('Connection error:', connerro)
    })
  )
}

sampleAsync().then(() => {
  // console.log("duplicates are: ", duplicate)
  // console.log("total iterated over is:", iterator)
})
