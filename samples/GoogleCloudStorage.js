const { Storage } = require("@google-cloud/storage");

const storage = new Storage();

const bucketName = "your-unique-bucket-name-motaz";

async function createBucket() {
  // Creates the new bucket
//   console.log('storage', JSON.stringify(storage, null, 4));
  await storage.createBucket(bucketName);
  console.log(`Bucket ${bucketName} created.`);
}

async function deleteBucket() {
  await storage.bucket(bucketName).delete();
  console.log(`Bucket ${bucketName} deleted`);
}

async function getBucketMetadata() {
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // Get Bucket Metadata
  const [metadata] = await storage.bucket(bucketName).getMetadata();

  for (const [key, value] of Object.entries(metadata)) {
    console.log(`${key}: ${value}`);
  }
}

deleteBucket().catch(console.error);
