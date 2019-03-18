import { join } from 'path';
import { SysWrapper } from '../utils/sysWrapper';
import { SmartModel } from './smartModel';
import { Utils } from '../utils';

/** Test compiler object. */
export class TestModel extends SmartModel {

    /**
     * 
     * @param name File name
     * @param chaincodeName Chaincode Name
     * @param projectName Chaincode project name
     * @param ignoreConvention Save right here
     */
    constructor(
        public name: string,
        public chaincodeName: string,
        public projectName: string,
        public classCCName: string,
        public ignoreConvention?: boolean) {
        super(name, projectName);
    }

    recompile() {
        throw new Error('Method not implemented.');
    }

    async save() {
        await SysWrapper.createFile(
            this.filePath,
            `// tslint:disable:no-unused-expression
import { join } from 'path';
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import { ClientFactory, ConvectorControllerClient } from '@worldsibu/convector-core';
import 'mocha';

import { ${this.classCCName}, ${this.classCCName}Controller } from '../src';

describe('${this.classCCName}', () => {
  let adapter: MockControllerAdapter;
  let ${this.name}Ctrl: ConvectorControllerClient<${this.classCCName}Controller>;
  
  before(async () => {
    // Mocks the blockchain execution environment
    adapter = new MockControllerAdapter();
    ${this.name}Ctrl = ClientFactory(${this.classCCName}Controller, adapter);

    await adapter.init([
      {
        version: '*',
        controller: '${this.classCCName}Controller',
        name: join(__dirname, '..')
      }
    ]);
  });
  
  it('should create a default model', async () => {
    const modelSample = new ${this.classCCName}({
      id: uuid(),
      name: 'Test',
      created: Date.now(),
      modified: Date.now()
    });

    await ${this.name}Ctrl.create(modelSample);
  
    const justSavedModel = await adapter.getById<${this.classCCName}>(modelSample.id);
  
    expect(justSavedModel.id).to.exist;
  });
});`);
    }

    /** Set var name */
    get varName() {
        return Utils.toCamelCase(this.name);
    }

    /** Actual file Path for the object. */
    get filePath() {
        if (!this.ignoreConvention) {
            return `${this.projectRoot}/packages/${this.chaincodeName}-cc/tests/${this.name}.spec.ts`;
        } else {
            return join(process.cwd(), `${this.name}.spec.ts`);
        }
    }
}
