import { App, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

import * as cdk from "@aws-cdk/core";
import {
  CodeBuildStep,
  CodePipeline,
  CodePipelineSource
} from "@aws-cdk/pipelines";

//***********Import the pipeline stage***********
import { BlogPipelineStage } from "./pipeline-stage";

export class MyPipelineStack extends cdk.Stack {
	constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);


     // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'PipelineTestQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

		const pipeline = new CodePipeline(this, "BlogPipeline", {
      pipelineName: "BlogPipeline",
      synth: new CodeBuildStep("SynthStep", {
        input: CodePipelineSource.connection(
          //"<Repo owner>/<Repo name>",
          "tushar-en-sharma/ pipel_test",
          "main",
          {
            connectionArn:
              "arn:aws:codestar-connections:ap-south-1:380378407648:connection/ecf99860-8ea4-489f-a799-70554107698b"
          }
        ),
        installCommands: ["npm install -g aws-cdk"],
        commands: ["npm ci", "npm run build", "npx cdk synth"]
			})
		});

    //***********Instantiate the stage and add it to the pipeline***********
		const deploy = new BlogPipelineStage(this, "Deploy");
		pipeline.addStage(deploy);
	}
}