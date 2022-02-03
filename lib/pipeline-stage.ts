import { Stage, Construct, StageProps } from "@aws-cdk/core";

export class BlogPipelineStage extends Stage {
	constructor(scope: Construct, id: string, props?: StageProps) {
		super(scope, id, props);

	}
}