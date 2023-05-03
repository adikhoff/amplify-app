const aws = require("aws-sdk");
const sharp = require("sharp");
const s3 = new aws.S3();

/**
 * Resizes images that are wider than pixels 1024 to 1024 pixels.
 */
exports.handler = async function (event, context) {
  const start = Date.now();
  console.log("Received S3 event:", JSON.stringify(event, null, 2));

  if (event.Records[0].eventName === "ObjectRemoved:Delete") {
    return;
  }

  const bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;
  console.log(`Bucket: ${bucket}`, `Key: ${key}`);

  try {
    // get image from s3
    let image = await s3.getObject({Bucket: bucket, Key: key}).promise();

    image = await sharp(image.Body);
    const metadata = await image.metadata();
    if (metadata.width > 1024) {
      // resize image
      const resizedImage = await image
        .resize({width: 1024})
        .withMetadata()
        .toBuffer();

      // store image
      await s3
        .putObject({Bucket: bucket, Key: key, Body: resizedImage})
        .promise();
    } else {
      console.log("Skipping " + key);
    }
  } catch (err) {
    context.fail(`Error resizing image: ${err}`);
  }
  console.log(`Operation done in ${Date.now() - start}`);
};
