import sequelizeConfig from './database';

const config = {
  awsS3BucketName: process.env.S3_BUCKET_NAME,
  localstackUrl: process.env.LOCALSTACK_URL,
  sequelize: sequelizeConfig
};

export default config;
