export default {
    mongoURI: process.env.MONGO_URI,
    secretKey: process.env.SECRET_KEY,
    bucketName: process.env.AWS_S3_BUCKET_NAME,
    awsKey: process.env.AWS_ACCESS_KEY_ID,
    awsSecret: process.env.AWS_SECRET_ACCESS_KEY,
};