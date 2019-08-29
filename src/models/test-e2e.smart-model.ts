import { join } from 'path';
import { SysWrapper } from '../utils/sysWrapper';
import { SmartModel } from './smartModel';
import { Utils } from '../utils';

/** Test compiler object. */
export class E2EModel extends SmartModel {

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
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import 'mocha';

import { CouchDBStorage } from '@worldsibu/convector-storage-couchdb';
import { FabricControllerAdapter } from '@worldsibu/convector-platform-fabric';
import { BaseStorage, ClientFactory, ConvectorControllerClient } from '@worldsibu/convector-core';

import { ${this.classCCName}, ${this.classCCName}Controller } from '../src';

describe('${this.classCCName}', () => {
  let adapter: FabricControllerAdapter;
  let ${this.name}Ctrl: ConvectorControllerClient<${this.classCCName}Controller>;

  before(async () => {
      adapter = new FabricControllerAdapter({
        skipInit: true,
        txTimeout: 300000,
        user: 'user1',
        channel: 'ch1',
        chaincode: '${this.chaincodeName}',
        keyStore: '$HOME/hyperledger-fabric-network/.hfc-org1',
        networkProfile: '$HOME/hyperledger-fabric-network/network-profiles/org1.network-profile.yaml',
        userMspPath: '$HOME/hyperledger-fabric-network/artifacts/crypto-config/peerOrganizations/org1.hurley.lab/users/User1@org1.hurley.lab/msp',
        userMsp: 'org1MSP'
      });
      ${this.name}Ctrl = ClientFactory(${this.classCCName}Controller, adapter);
      await adapter.init(true);

      BaseStorage.current = new CouchDBStorage({
        host: 'localhost',
        protocol: 'http',
        port: '5084'
      }, 'ch1_${this.chaincodeName}');
  });

  after(() => {
    // Close the event listeners
    adapter.close();
  });

  it('should create a default model', async () => {
    const modelSample = new ${this.classCCName}({
      id: uuid(),
      name: 'Test',
      created: Date.now(),
      modified: Date.now()
    });

    await ${this.name}Ctrl.create(modelSample);

    const justSavedModel = await ${this.classCCName}.getOne(modelSample.id);
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
            return `${this.projectRoot}/packages/${this.chaincodeName}-cc/tests/${this.name}.e2e.ts`;
        } else {
            return join(process.cwd(), `${this.name}.spec.ts`);
        }
    }
}
