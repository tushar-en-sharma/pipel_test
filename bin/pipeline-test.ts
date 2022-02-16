import 'source-map-support/register';
import { App } from '@aws-cdk/core';

import { CdkCorePipelineStack, service, description } from '../lib/cdkpipelines-pipeline-stack';

const { NODE_ENV } = process.env;


if (!NODE_ENV) {
  throw new Error('NODE_ENV environment variable is required');
}

const app = new App();

const env = { region: 'ap-south-1' };

const CdkCorePipelineStackRef = new CdkCorePipelineStack(app, `${service}-stack`, {
  env,
});

CdkCorePipelineStackRef.templateOptions.description = description;

app.synth();
