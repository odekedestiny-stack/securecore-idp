import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
export interface SecureVpcProps {
  maxAzs?: number;
}
export class SecureVpc extends Construct {
  public readonly vpc: ec2.Vpc;
  constructor(scope: Construct, id: string, props?: SecureVpcProps) {
    super(scope, id);
    this.vpc = new ec2.Vpc(this, 'VPC', {
      maxAzs: props?.maxAzs ?? 2,
      ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/16'),
      natGateways: 1,
      subnetConfiguration: [
        { name: 'Public', subnetType: ec2.SubnetType.PUBLIC, cidrMask: 24 },
        { name: 'PrivateApp', subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS, cidrMask: 24 },
        { name: 'PrivateData', subnetType: ec2.SubnetType.PRIVATE_ISOLATED, cidrMask: 24 },
      ],
    });
    this.vpc.addFlowLog('VpcFlowLog', {
      trafficType: ec2.FlowLogTrafficType.ALL,
    });
    cdk.Tags.of(this).add('Environment', 'Production');
    cdk.Tags.of(this).add('Project', 'SecureCore-IDP');
    cdk.Tags.of(this).add('CostCenter', 'Engineering-Platform');
    cdk.Tags.of(this).add('ManagedBy', 'AWS-CDK');
  }
}
