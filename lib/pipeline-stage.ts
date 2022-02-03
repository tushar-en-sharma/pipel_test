import { Stage, Construct, StageProps } from "@aws-cdk/core";

//***********Import te resource stack***********
import { MyPipelineStack } from "./pipeline-test-stack";

export class BlogPipelineStage extends Stage {
	constructor(scope: Construct, id: string, props?: StageProps) {
		super(scope, id, props);

		//***********Instantiate the resource stack***********
		new MyPipelineStack(this, `CdkPipelinesBlogStack`);
	}
}