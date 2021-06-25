import S3 from 'react-aws-s3';


const config = {
    bucketName: 'bbscouting',
    region: 'eu-east-1',
    accessKeyId: process.env.aws_access_key_id,
    secretAccessKey: process.env.aws_secret_access_key
}

const ReactS3Client = new S3(config);

const newFileName = 'test-file';

ReactS3Client
    .uploadFile(file, newFileName)
    .then(data => console.log(data))
    .catch(err => console.error(err))