// dependencies
const AWS = require('aws-sdk');
const util = require('util');
const sharp = require('sharp');

// get reference to S3 client
const s3 = new AWS.S3();

exports.handler = async (event, context, callback) => {
  const start = Date.now();
  console.log("Reading options from event:\n", util.inspect(event, {depth: 5}));
  console.log("stopping the cascade");
  return;
  const srcBucket = event.Records[0].s3.bucket.name;
  const srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));

  const typeMatch = srcKey.match(/\.([^.]*)$/);
  if (!typeMatch) {
    console.log("Could not determine the image type.");
    return;
  }

  const imageType = typeMatch[1].toLowerCase();
  if (imageType !== "jpg" && imageType !== "png") {
    console.log(`Unsupported image type: ${imageType}`);
    return;
  }

  try {
    const params = {
      Bucket: srcBucket,
      Key: srcKey
    };
    var origimage = await s3.getObject(params).promise();
  } catch (error) {
    console.log(error);
    return;
  }

  const widths = [200, 400];
  for (let i = 0; i < widths.length; i++) {
    const width = widths[i];
    const srcParts = srcKey.split(".");
    const dstKey = srcParts[0] + "-" + width + "." + srcParts[1];
    console.log("Creating new file: ", dstKey);

    try {
      var buffer = await sharp(origimage.Body).resize(width).toBuffer();
    } catch (error) {
      console.log(error);
      continue;
    }

    try {
      const destparams = {
        Bucket: srcBucket,
        Key: dstKey,
        Body: buffer,
        ContentType: "image"
      };

      const putResult = await s3.putObject(destparams).promise();

    } catch (error) {
      console.log(error);
      continue;
    }

    console.log('Successfully resized ' + srcBucket + '/' + srcKey +
      ' and uploaded to ' + srcBucket + '/' + dstKey);
  }

  console.log(`Operation completed in ${Date.now() - start} ms`);
};
