import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {Bucket} from "aws-cdk-lib/aws-s3";
import {CloudFrontWebDistribution, OriginAccessIdentity} from "aws-cdk-lib/aws-cloudfront";

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const bucket = new Bucket(this, 'WebsiteBucket', {
      bucketName: 'bhavik-cdk-react-app',
      websiteIndexDocument: 'index.html',
    });
    const cloudFrontOAI = new OriginAccessIdentity(this, 'OAI');

    bucket.grantRead(cloudFrontOAI.grantPrincipal);

    const distribution = new CloudFrontWebDistribution(this, 'react-distribution', {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: bucket,
            originAccessIdentity: cloudFrontOAI,
          },
          behaviors: [{ isDefaultBehavior: true }]
        }
      ]
    })

    bucket.grantRead(cloudFrontOAI.grantPrincipal);
  }
}
