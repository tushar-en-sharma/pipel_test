import {
  Stage, Construct, StageProps,
} from '@aws-cdk/core';

const { NODE_ENV } = process.env;
// import { Ops360PowerBiSamPipelineStack } from './ops360/ops360-powerbi-sam-pipeline-stack';
import { Ops360PowerBiCftPipelineStack } from './ops360/ops360-powerbi-sam-pipeline-stack';
import { Ops360DatalakeGlueCftPipelineStack } from './ops360/ops360-datalake-glue-cft-pipeline-stack';
import { Ops360DatalakeCoreCftPipelineStack } from './ops360/ops360-datalake-core-cft-pipeline-stack';
//import { Ops360DatalakeWorkflowCftPipelineStack } from './ops360/ops360-datalake-workflow-cft-pipeline-stack';
import { Ops360COreInfraCftPipelineStack } from './ops360/ops360-core-infra-sam-pipeline-stack';
import { Ops360CoraSeqCftPipelineStack } from './ops360/ops360-cora-seq-sam-pipeline-stack';
import { Ops360RBACCftPipelineStack } from './ops360/ops360-rbac-sam-pipeline-stack';
//import { Ops360PulseCftPipelineStack } from './ops360/ops360-pulse-sam-pipeline-stack';
import { Ops360SeleniumTestingPipelineStack } from './ops360/ops360-selenium-testing-pipeline-stack';
import { Ops360FrontendCftPipelineStack } from './ops360/ops360-frontend-cft-pipeline-stack';

import { Ops360TasksApiCftPipelineStack } from './ops360/ops360-tasks-api-sam-pipeline-stack';
import { Ops360PulseWorkflowCftPipelineStack } from './ops360/ops360-pulse-workflow-api-sam-pipeline-stack';
import { Ops360DatalakeOperationTransformationCftPipelineStack } from './ops360/ops360-datalake-operation-transformation-cft-pipeline-stack';
import { Ops360DatalakeOperationCurationCftPipelineStack } from './ops360/ops360-datalake-operation-curation-cft-pipeline-stack';
import { Ops360DatalakeFinancialTransformationCftPipelineStack } from './ops360/ops360-datalake-finance-transformation-cft-pipeline-stack';
import { Ops360DatalakeFinancialCurationCftPipelineStack } from './ops360/ops360-datalake-finance-curation-cft-pipeline-stack';
import { Ops360DatalakeDataIngestionCftPipelineStack } from './ops360/ops360-datalake-dataingestion-cft-pipeline-stack';
import { ops360datalakeherculestransformationcftPipelineStack } from './ops360/ops360-datalake-hercules-transformation-cft-pipeline-stack';
import { Ops360DatalakeBenchmarkingCurationCftPipelineStack } from './ops360/ops360-datalake-benchmarking-curation-cft-pipeline-stack';
import { Ops360COreInfraFrontendServerCftPipelineStack } from './ops360/ops360-frontend-server-sam-pipeline-stack';
import { Ops360AdminApiCftPipelineStack } from './ops360/ops360-admin-api-pipeline-stack';
import { Ops360OffconApiCftPipelineStack } from './ops360/ops360-offcon-api-pipeline-stack';

import { Ops360DatalakeCurationCoreCftPipelineStack } from './ops360/ops360-datalake-curation-core-cft-pipeline';
import { Ops360DatalakePeopleTransformationCftPipelineStack } from './ops360/ops360-datalake-people-transformation-cft-pipeline';
import { Ops360DatalakeHorizontalTransformationCftPipelineStack } from './ops360/ops360-datalake-horizontal-transformation-cft-pipeline';
import { Ops360DatalakeAnalyzeLambdaCftPipelineStack } from './ops360/ops360-datalake-analyze-lambda-cft-pipeline';


export class CdkDependantRepoPipelinesReleaseStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    const Ops360DatalakeCurationCoreCftPipelineStackRef = new Ops360DatalakeCurationCoreCftPipelineStack(this, 'ops360-datalake-curation-core-cft-pipeline');
    Ops360DatalakeCurationCoreCftPipelineStackRef.templateOptions.description = 'ops360-datalake-curation-core';
    const Ops360DatalakePeopleTransformationCftPipelineStackRef = new Ops360DatalakePeopleTransformationCftPipelineStack(this, 'ops360-datalake-people-transformation-cft-pipeline');
    Ops360DatalakePeopleTransformationCftPipelineStackRef.templateOptions.description = 'ops360-datalake-people-transformation-cft-pipeline';
    const Ops360DatalakeHorizontalTransformationCftPipelineStackRef = new Ops360DatalakeHorizontalTransformationCftPipelineStack(this, 'ops360-datalake-horizontal-transformation-cft-pipeline');
    Ops360DatalakeHorizontalTransformationCftPipelineStackRef.templateOptions.description = 'ops360-datalake-horizontal-transformation-cft-pipeline';
    const Ops360DatalakeAnalyzeLambdaCftPipelineStackRef = new Ops360DatalakeAnalyzeLambdaCftPipelineStack(this, 'ops360-datalake-analyze-lambda-cft-pipeline');
    Ops360DatalakeAnalyzeLambdaCftPipelineStackRef.templateOptions.description = 'ops360-datalake-analyze-lambda-cft-pipeline';

    const Ops360AdminApiCftPipelineStackRef = new Ops360AdminApiCftPipelineStack(this, 'ops360-admin-api-pipeline-stack');
    Ops360AdminApiCftPipelineStackRef.templateOptions.description = 'OPS360 Sam Admin Apis pipeline stack';
    const Ops360OffconApiCftPipelineStackRef = new Ops360OffconApiCftPipelineStack(this, 'ops360-offcon-api-pipeline-stack');
    Ops360OffconApiCftPipelineStackRef.templateOptions.description = 'OPS360 Sam Offcon Apis pipeline stack';

    const Ops360TasksApiCftPipelineStackRef = new Ops360TasksApiCftPipelineStack(this, 'ops360-tasks-api-pipeline-stack');
    Ops360TasksApiCftPipelineStackRef.templateOptions.description = 'OPS360 Sam Tasks Apis pipeline stack';
    const Ops360PulseWorkflowCftPipelineStackRef = new Ops360PulseWorkflowCftPipelineStack(this, 'ops360-pulseworkflow-pipeline-stack');
    Ops360PulseWorkflowCftPipelineStackRef.templateOptions.description = 'OPS360 Sam Pulse Workflow Api pipeline stack';
    const Ops360DatalakeOperationTransformationCftPipelineStackRef = new Ops360DatalakeOperationTransformationCftPipelineStack(this, 'ops360-datalake-operation-transformation-pipeline-stack');
    Ops360DatalakeOperationTransformationCftPipelineStackRef.templateOptions.description = 'OPS360 datalake-operation-transformation-pipeline stack';
    const Ops360DatalakeOperationCurationCftPipelineStackRef = new Ops360DatalakeOperationCurationCftPipelineStack(this, 'ops360-datalake-operation-curation-pipeline-stack');
    Ops360DatalakeOperationCurationCftPipelineStackRef.templateOptions.description = 'OPS360 ops360-datalake-operation-transformation-pipeline-stack';
    const Ops360DatalakeFinancialTransformationCftPipelineStackRef = new Ops360DatalakeFinancialTransformationCftPipelineStack(this, 'ops360-datalake-finance-transformation-cft-pipeline-stack');
    Ops360DatalakeFinancialTransformationCftPipelineStackRef.templateOptions.description = 'OPS360 Sam powerBI pipeline stack';
    const Ops360DatalakeFinancialCurationCftPipelineStackRef = new Ops360DatalakeFinancialCurationCftPipelineStack(this, 'ops360-datalake-finance-curation-cft-pipeline-stack');
    Ops360DatalakeFinancialCurationCftPipelineStackRef.templateOptions.description = 'ops360-datalake-finance-curation-cft-pipeline-stack';
    const Ops360DatalakeDataIngestionCftPipelineStackRef = new Ops360DatalakeDataIngestionCftPipelineStack(this, 'ops360-datalake-dataingestion-cft-pipeline-stack');
    Ops360DatalakeDataIngestionCftPipelineStackRef.templateOptions.description = 'OPS360 Sam powerBI pipeline stack';
   const ops360datalakeherculestransformationcftPipelineStackRef = new ops360datalakeherculestransformationcftPipelineStack(this, 'ops360-datalake-hercules-transformation-cft-pipeline-stack');
   ops360datalakeherculestransformationcftPipelineStackRef.templateOptions.description = 'ops360-datalake-hercules-transformation-pipeline';
    const Ops360DatalakeBenchmarkingCurationCftPipelineStackRef = new Ops360DatalakeBenchmarkingCurationCftPipelineStack(this, 'ops360-powerbi-pipeline-stackops360-datalake-benchmarking-curation-cft-pipeline-stack');
    Ops360DatalakeBenchmarkingCurationCftPipelineStackRef.templateOptions.description = 'ops360-datalake-benchmarking-curation-cft-pipeline-stack';

    
    const Ops360PowerBiSamPipelineStackRef = new Ops360PowerBiCftPipelineStack(this, 'ops360-powerbi-pipeline-stack');
    Ops360PowerBiSamPipelineStackRef.templateOptions.description = 'OPS360 Sam powerBI pipeline stack';
    const Ops360COreInfraCftPipelineStackRef = new Ops360COreInfraCftPipelineStack(this, 'ops360-core-infra-pipeline-stack');
    Ops360COreInfraCftPipelineStackRef.templateOptions.description = 'OPS360 Core Infra pipeline stack';
    const Ops360DatalakeCoreCftPipelineStackRef = new Ops360DatalakeCoreCftPipelineStack(this, 'ops360-datalake-core-pipeline-stack');
    Ops360DatalakeCoreCftPipelineStackRef.templateOptions.description = 'OPS360 Datalake Core pipeline stack';
    const Ops360CoraSeqCftPipelineStackRef = new Ops360CoraSeqCftPipelineStack(this, 'ops360-cora-seq-pipeline-stack');
    Ops360CoraSeqCftPipelineStackRef.templateOptions.description = 'OPS360 cora seq pipeline stack';
    const Ops360DatalakeGlueCftPipelineStackRef = new Ops360DatalakeGlueCftPipelineStack(this, 'ops360-datalake-glue-pipeline-stack');
    Ops360DatalakeGlueCftPipelineStackRef.templateOptions.description = 'OPS360 DataLake Glue CFT pipeline stack';
    const Ops360RBACCftPipelineStackRef = new Ops360RBACCftPipelineStack(this, 'ops360-rbac-pipeline-stack');
    Ops360RBACCftPipelineStackRef.templateOptions.description = 'OPS360 RBAC CFT pipeline stack';
  //  const Ops360PulseCftPipelineStackRef = new Ops360PulseCftPipelineStack(this, 'ops360-pulse-pipeline-stack');
  //  Ops360PulseCftPipelineStackRef.templateOptions.description = 'OPS360 Pulse CFT pipeline stack';
  //  const Ops360DatalakeWorkflowCftPipelineStackRef = new Ops360DatalakeWorkflowCftPipelineStack(this, 'ops360-datalake-workflow-stack');
  //  Ops360DatalakeWorkflowCftPipelineStackRef.templateOptions.description = 'OPS360 Datalake Workflow CFT pipeline stack';
    const Ops360FrontendCftPipelineStackRef = new Ops360FrontendCftPipelineStack(this, 'ps360-frontend-web-pipeline');
    Ops360FrontendCftPipelineStackRef.templateOptions.description = 'OPS360 Frontend WEB CFT pipeline stack';

    const Ops360COreInfraFrontendServerCftPipelineStackRef = new Ops360COreInfraFrontendServerCftPipelineStack(this, 'ops360-core-cft-frontend-server-testing-pipeline');
    Ops360COreInfraFrontendServerCftPipelineStackRef.templateOptions.description = 'OPS360 Core Infra Frontend Server Pipeline Stack';

    if (NODE_ENV === 'dev') {
      const Ops360SeleniumTestingPipelineStackRef = new Ops360SeleniumTestingPipelineStack(this, 'ops360-selenium-testing-pipeline');
      Ops360SeleniumTestingPipelineStackRef.templateOptions.description = 'OPS360 Selenium Testing pipeline stack';
    }
  }
}
