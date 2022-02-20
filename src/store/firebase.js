const admin = require('firebase-admin')

// Initialize firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert('D:\project\management-report\management-report'),
  storageBucket: management-report-cce54.appspot.com
})
// Cloud storage
const bucket = admin.storage().bucket()

module.exports = {
  bucket
}