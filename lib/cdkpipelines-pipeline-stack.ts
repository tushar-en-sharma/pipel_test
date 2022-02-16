import 'source-map-support/register';
import {
  Construct, Stack, StackProps,
} from '@aws-cdk/core';
import { Artifact } from '@aws-cdk/aws-codepipeline';
import { BitBucketSourceAction } from '@aws-cdk/aws-codepipeline-actions';
import { CdkPipeline, SimpleSynthAction } from '@aws-cdk/pipelines';
import { StringParameter } from '@aws-cdk/aws-ssm';
import { name, description as desc } from '../package.json';
import { CdkDependantRepoPipelinesReleaseStage } from './cdk-pipelines-release-stages';
import { gitHubConnectionArnParameterStorePath, GIT_BRANCH } from './shared/constants';

const { NODE_ENV } = process.env;

export const service = name;
export const description = desc;

/**
 * The stack that defines the core CDK pipeline
 */
export class CdkCorePipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const gitHubConnectionArn = StringParameter.valueForStringParameter(this, gitHubConnectionArnParameterStorePath);

    const repoSourceArtifact = new Artifact('SourceArtifact');
    const sourceArtifact = new Artifact('SourceArtifact');
    const cloudAssemblyArtifact = new Artifact('CloudFormationPrepareOutput');

    const corePipeline = new CdkPipeline(this, 'CdkCorePipeline', {
      pipelineName: service,
      cloudAssemblyArtifact,

      // Where the source can be found
      sourceAction: new BitBucketSourceAction({
        actionName: 'Checkout',
        owner: 'tushar-en-sharma',
        repo: 'pipel_test',
        branch: GIT_BRANCH,
        connectionArn: gitHubConnectionArn,
        output: repoSourceArtifact,
      }),

      // How it will be built and synthesized
      synthAction: SimpleSynthAction.standardNpmSynth({
        sourceArtifact,
        cloudAssemblyArtifact,
        installCommand: 'npm install --production=false',
        // We need a build step to compile the TypeScript Lambda
        environment: {
          privileged: true,
        },
        environmentVariables: {
          NODE_ENV: {
            value: NODE_ENV,
          },
        },
      }),
    });

    // This is where we add the application stages
    const deploy = new CdkDependantRepoPipelinesReleaseStage(this, 'CdkOps360Deploy-CHILD-PIPELINE');
    corePipeline.addApplicationStage(deploy);
  }
}
