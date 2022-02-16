const { NODE_ENV } = process.env;

let branch = 'release/poc';

let DATALAKE_ENV = 'poc';

if (NODE_ENV === 'dev') branch = 'release/dev';
else if (NODE_ENV === 'uat') branch = 'release/uat';
else if (NODE_ENV === 'production') branch = 'release/prod';
else if (NODE_ENV === 'ops360-demo') branch = 'release/demo';


if (NODE_ENV === 'dev') DATALAKE_ENV = 'dev';
else if (NODE_ENV === 'uat') DATALAKE_ENV = 'uat';
else if (NODE_ENV === 'ops360-demo') DATALAKE_ENV = 'demo';
else if (NODE_ENV === 'production') DATALAKE_ENV = 'prod';


export const DATALAKE_ENV_VAR = DATALAKE_ENV;

export const GIT_BRANCH = branch;

export const deploymentBucketName = `tas-deployments-bucket-${NODE_ENV}-ap-south-1`;

export const deploymentBucketNameUET1 = `tas-deployments-bucket-${NODE_ENV}-us-east-1`;

export const ops360ReleaseBucketName = (NODE_ENV === 'production') ?  `app.coraops360.genpact.com` : `app.coraops360${NODE_ENV}.genpact.com`;

export const gitHubConnectionArnParameterStorePath = '/core/pipelines/github/genpactops360/connection/ARN';

export const amplifyPwaReleaseCodeBuildProjArnParameterStorePath = '/core/pipelines/codebuild/release/amplify-pwa/ARN';

export const cdkCftPrepBuildProjArnParameterStorePath = '/core/pipelines/codebuild/build/cdk/ARN';

export const cloudFormationLintStepProjArnParameterStorePath = '/core/pipelines/codebuild/security/cft-lint/ARN';

export const multiTechReleaseProjArnParameterStorePath = '/core/pipelines/codebuild/release/multi-tech/ARN';

export const nodePwaBuildProjArnParameterStorePath = '/core/pipelines/codebuild/build/node/pwa/ARN';

export const nodeServerlessCftPrepBuildProjArnParameterStorePath = '/core/pipelines/codebuild/build/serverlessjs/ARN';

export const samCftPrepBuildProjArnParameterStorePath = '/core/pipelines/codebuild/build/sam/ARN';

export const secOpsValidationBuildStepProjArnParameterStorePath = '/core/pipelines/codebuild/security/cft-guard-validation/ARN';
