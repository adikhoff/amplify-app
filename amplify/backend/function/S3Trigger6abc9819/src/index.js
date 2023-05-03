const aws = require("aws-sdk");
const sharp = require("sharp");
const s3 = new aws.S3();

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
    if (metadata.width > 800) {

      const widths = [400, 200];

      for (let i = 0; i < widths.length; i++) {
        const newWidth = widths[i];
        const parts = key.split(".");
        const newKey = parts[0] + "_" + newWidth + "." + parts[1];
        console.log("New name: ", newKey);

        // resize image
        const resizedImage = await image
          .resize({width: newWidth})
          .withMetadata()
          .toBuffer();

        // store image
        await s3
          .putObject({Bucket: bucket, Key: newKey, Body: resizedImage, ContentType: "Image/" + parts[1]})
          .promise();
      }
    } else {
      console.log("Skipping " + key);
    }
  } catch (err) {
    context.fail(`Error resizing image: ${err}`);
  }
  console.log(`Operation done in ${Date.now() - start}`);
};
