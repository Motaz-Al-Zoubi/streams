

// // 'your-unique-bucket-name-motaz';
// // 

// console.log('admin', admin);

// // const bucket = admin.storage().bucket();

// async function getBucketMetadata() {
//   const [metadata] = admin.storage().bucket().getMetadata();

//   for (const [key, value] of Object.entries(metadata)) {
//     console.log(`${key}: ${value}`);
//   }
// }

// getBucketMetadata().catch(console.error);



const { File } = require('@google-cloud/storage');
const admin = require('firebase-admin');
const serviceAccountPath = '/Users/motaz/code/secrets/testing.json';
//const serviceAccountPath = '';
// '/Users/motaz/.config/gcloud/application_default_credentials.json'
const serviceAccount = require(serviceAccountPath);

const bucketName = 'harmonica-testing.appspot.com';
const fileName = 'images/0007119be88e';
const firebaseApp = admin.initializeApp(
    {
        credential: admin.credential.cert(serviceAccount),
        storageBucket: bucketName
    }
);

const bucket = admin.storage().bucket();
async function getSignedUrl() {
    const options = {
        version: 'v2', // defaults to 'v2' if missing.
        action: 'read',
        expires: Date.now() + 1000 * 60 * 60, // one hour
      };
    console.log('bucket :>> ', await bucket.file(fileName).getSignedUrl(options));
}
getSignedUrl().catch(console.error);


// console.log('firebaseApp', firebaseApp);

// async function generateDownloadUrl() {
//     console.log(await firebaseApp.storage().bucket().file(fileName).getMetadata());

//     // let url = await admin.storage().ref(fileName).getDownloadURL();
//     // console.log(url);
// }

// generateDownloadUrl().catch(console.error);


// const {Storage} = require('@google-cloud/storage');

// // Creates a client
// const storage = new Storage({
//     projectId: "p8belel",
//     keyFilename: serviceAccountPath,
// });

// async function generateSignedUrl() {
//     // These options will allow temporary read access to the file
//     const options = {
//         version: "v2", // defaults to 'v2' if missing.
//         action: "read",
//         expires: Date.now() + 1000 * 60 * 60, // one hour
//     };

//     // Get a v2 signed URL for the file
//     const [url] = await storage
//         .bucket(bucketName)
//         .file(fileName)
//         .getDownloadUrl(options);

//     console.log(`The signed url for ${fileName} is ${url}.`);
// }

// generateSignedUrl().catch(console.error);
//   // [END storage_generate_signed_url]


