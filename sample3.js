//working file 
var fs = require('fs')
const mariadb = require('mariadb')
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
var jsonData = 'distributors_all.json'
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
  var conn = await mariadb.createConnection(dbCredentials)
  getStream().pipe(
    es.mapSync(async function (data) {
      ++counter
      ++iterator

      // if (iterator >= 0 && iterator < 60000) {

      if (counter % 5000 == 0) {
        j = 5000
        console.log('===============================')
      } else {
        j = 50
      }
      

      if (regValidPhone.test(data.regMobile)) {
        data.regMobile = data.regMobile.replace(regExpAlphabetsSymbols, '')
        if (!data.regMobile.startsWith('+')) {
          data.regMobile =
            '+91' + data.regMobile.replace(regExpRemoveLeadingZero, '')
        }
        var encoded = decodeURIComponent(data.storeLink)
        // console.log(encoded)
        // var conn = await mariadb.createConnection(dbCredentials)
var achieved_rank_key = null
var status_key = null
var email = null
var gender = null
var profession = null
var city = null
        if (!dist.includes(data.distributor_id)) {
          dist.push(data.distributor_id)
          // var params = [
          //   data.distributor_id,
          //   data.name,
          //   data.password,
          //   data.achieved_rank_key,
          //   data.created_on,
          //   data.status_key,
          //   data.regMobile,
          //   data.email,
          //   data.gender,
          //   data.profession,
          //   data.city,
          //   encoded
          // ]

          var params = [
            data.distributor_id,
            data.name,
            data.password,
           achieved_rank_key,
            data.created_on,
           status_key,
            data.regMobile,
            email,
            gender,
            profession,
            city,
            encoded
          ]
          var sql =
            'INSERT INTO distributors_test (distId,name,password,rankId,jointOn,accStatusId,phone,email,gender,profession,city,storeLink) VALUE(?,?,?,?,?,?,?,?,?,?,?,?)'

          // var conn = await mariadb.createConnection(dbCredentials)

          // var rows = await conn.query(sql, params)
          // conn.end()

          setTimeout(() => {
            conn.query(sql, params)

            // mariadb
            //   .createConnection(dbCredentials)
            //   .then(conn => {
            //     conn
            //       .query(sql, params)
            //       .then(rows => {
            //         conn.end()
            //       })
            //       .catch(err => {
            //         ++quererr
            //         console.log('Error Query ')
            //       })
            //   })
            //   .catch(err => {
            //     ++connerro
            //     console.log('Error database ', err)
            //   })
          }, 500)

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

        // var result = redisConnect.set(data.regMobile,data.name)

        // console.log('Sanitized >> ', data.regMobile);
      } else {
      }
      // }

      // console.log('duplicates are: ', duplicate)
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
