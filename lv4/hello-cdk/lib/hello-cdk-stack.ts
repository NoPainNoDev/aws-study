import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';

/*
  cdk의 진입점 
*/

export class HelloCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // sqs 대기열
    // const queue = new sqs.Queue(this, 'HelloCdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    // s3 버킷 추가
    const firstBucket = new s3.Bucket(this, "my-first-bucket", {
      versioned: true,
      bucketName: "some-bucket-name",
      autoDeleteObjects: true, 
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // s3로 배포
    new s3deploy.BucketDeployment(this, "BucketDeployment", {
      sources: [s3deploy.Source.asset('./website/')],
      destinationBucket: firstBucket,
    });
  }
}
