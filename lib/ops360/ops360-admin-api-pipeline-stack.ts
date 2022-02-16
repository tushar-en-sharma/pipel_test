import 'source-map-support/register';
import {
  Stack, StackProps, Construct, CfnOutput,
} from '@aws-cdk/core';
import { Artifact, Pipeline } from '@aws-cdk/aws-codepipeline';
import { BitBucketSourceAction, CodeBuildAction, ManualApprovalAction } from '@aws-cdk/aws-codepipeline-actions';
import { Project } from '@aws-cdk/aws-codebuild';
import { Bucket } from '@aws-cdk/aws-s3';
import { StringParameter } from '@aws-cdk/aws-ssm';
import {
  GIT_BRANCH,
  deploymentBucketName,
  gitHubConnectionArnParameterStorePath,
  samCftPrepBuildProjArnParameterStorePath,
  cloudFormationLintStepProjArnParameterStorePath,
  secOpsValidationBuildStepProjArnParameterStorePath,
  multiTechReleaseProjArnParameterStorePath,
} from '../shared/constants';
const { NODE_ENV } = process.env;
export class Ops360AdminApiCftPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const gitHubConnectionArn = StringParameter.valueForStringParameter(this, gitHubConnectionArnParameterStorePath);
    const repoSourceArtifact = new Artifact('SourceArtifact');
    const cloudFormationArtifact = new Artifact('CloudFormationPrepareOutput');

    const sourceBucket = Bucket.fromBucketName(this, 'BucketByName', deploymentBucketName);
    const samCftPrepBuildProj = Project.fromProjectArn(this, 'SamCftPrepBuildProjArn', StringParameter.valueForStringParameter(this, samCftPrepBuildProjArnParameterStorePath));
    const cloudFormationLintStepProj = Project.fromProjectArn(this, 'CloudFormationLintStepProjArn', StringParameter.valueForStringParameter(this, cloudFormationLintStepProjArnParameterStorePath));
    const secOpsValidationBuildStepProj = Project.fromProjectArn(this, 'SecOpsValidationBuildStepProjArn', StringParameter.valueForStringParameter(this, secOpsValidationBuildStepProjArnParameterStorePath));
    const multiTechReleaseProj = Project.fromProjectArn(this, 'MultiTechReleaseProjArn', StringParameter.valueForStringParameter(this, multiTechReleaseProjArnParameterStorePath));

    const GitHubAction = new BitBucketSourceAction({
      actionName: 'Checkout',
      owner: 'tushar-en-sharma',
      repo: 'pipel_test',
      branch: GIT_BRANCH,
      connectionArn: gitHubConnectionArn,
      output: repoSourceArtifact,
    });
    const releaseActions: Array<any> = [new CodeBuildAction({
      actionName: 'CfnGuardRun',
      project: secOpsValidationBuildStepProj,
      input: cloudFormationArtifact,
    })];

    if (NODE_ENV === 'uat' || NODE_ENV === 'production') {
      releaseActions.push(new ManualApprovalAction({
        actionName: 'Approve',
        notifyEmails: [
          'mihir.ashar@genpact.com',
          'satpal.sharma@genpact.com',
          'rahul.chavda@genpact.digital',
          'amarendra.yadava@genpact.com',
          'avanish.pandey@genpact.com',
          'kishori.deka@genpact.com',
          'rohit.kohli@genpact.com',
          'phalguni.varasanaghatta@genpact.com',
          'vinod.somashekhara@genpact.com',
          'zeeshan.khan1@genpact.com',
          'chinmay.patil@genpact.com',
          'virender.jangra@genpact.com',
          'harsh.gupta3@genpact.com',
          'pankaj.monga@genpact.com',
          'aditya.aditya@genpact.com',
          'sahil.arora3@genpact.com',
        ],
      }));
    }

    const pipeline = new Pipeline(this, 'Ops360AdminApiCftPipelineStack', {
      pipelineName: 'ops360-admin-api-pipeline',
      restartExecutionOnUpdate: true,
      artifactBucket: sourceBucket,
      stages: [
        {
          stageName: 'SourceCodeDownload',
          actions: [
            GitHubAction,
          ],
        },
        {
          stageName: 'Build',
          actions: [
            new CodeBuildAction({
              actionName: 'CloudFormationPrepare',
              project: samCftPrepBuildProj,
              input: repoSourceArtifact,
              outputs: [cloudFormationArtifact],
            }),
          ],
        },
        {
          stageName: 'LintValidation',
          actions: [
            new CodeBuildAction({
              actionName: 'CfnLintRun',
              project: cloudFormationLintStepProj,
              input: cloudFormationArtifact,
            }),
          ],
        },
        {
          stageName: 'SecOpsValidation',
          actions: releaseActions,
        },
        // {
        //   stageName: 'SecOpsValidation',
        //   actions: [
        //     new CodeBuildAction({
        //       actionName: 'CfnGuardRun',
        //       project: secOpsValidationBuildStepProj,
        //       input: cloudFormationArtifact,
        //     }),
        //     // new ManualApprovalAction({
        //     //   actionName: 'Approve',
        //     //   notifyEmails: [
        //     //     'manish.kumar11@genpact.com',
        //     //     'zeeshan.khan2@genpact.com',
        //     //   ],
        //     // }),
        //   ],
        // },
        //
        {
          stageName: 'Release',
          actions: [
            new CodeBuildAction({
              actionName: 'ReleaseArtifacts',
              project: multiTechReleaseProj,
              input: repoSourceArtifact,
              environmentVariables: {
                DEPLOYMENT_BUCKET_NAME: {
                  value: deploymentBucketName,
                },
              },
            }),
          ],
        },
      ],
    });

    new CfnOutput(this, 'PipelineArn: ', {
      value: pipeline.pipelineArn ?? 'Something went wrong with the deploy',
    });
  }
}
