import { join } from 'path';
import { SysWrapper } from '../utils/sysWrapper';
import { SmartModel } from './smartModel';
import { Utils } from '../utils';

/** Test compiler object. */
export class UpdatePathsScriptModel extends SmartModel {

    /**
     * 
     * @param name File name
     * @param ignoreConvention Save right here
     */
    constructor(
        public name: string,
        public projectName: string,
        public ignoreConvention?: boolean) {
        super(name, projectName);
    }

    recompile() {
        throw new Error('Method not implemented.');
    }

    async save() {
        await SysWrapper.createFile(
            this.filePath,
            `const os = require('os');
const fs = require('fs');
const path = require('path');
const homedir = os.homedir();

console.log('Replacing references in config.json')
const configFilePath = path.join(__dirname, './org1.${this.name}.config.json');
const configFilePath2 = path.join(__dirname, './org2.${this.name}.config.json');

const configFile = require(configFilePath);
const configFile2 = require(configFilePath2);
fs.writeFileSync(configFilePath, JSON.stringify({
    ...configFile,
    keyStore: configFile.keyStore.replace(/^.+\\/hyperledger-fabric-network/, path.join(homedir, 'hyperledger-fabric-network')),
    networkProfile: configFile.networkProfile.replace(/^.+\\/hyperledger-fabric-network/, path.join(homedir, 'hyperledger-fabric-network'))
}, null, 2));
fs.writeFileSync(configFilePath2, JSON.stringify({
    ...configFile,
    keyStore: configFile.keyStore.replace(/^.+\\/hyperledger-fabric-network/, path.join(homedir, 'hyperledger-fabric-network')),
    networkProfile: configFile.networkProfile.replace(/^.+\\/hyperledger-fabric-network/, path.join(homedir, 'hyperledger-fabric-network'))
}, null, 2));

console.log('Paths updated successfully')
`);
    }

    /** Set var name */
    get varName() {
        return Utils.toCamelCase(this.name);
    }

    /** Actual file Path for the object. */
    get filePath() {
        if (!this.ignoreConvention) {
            return `${this.projectRoot}/update-paths.js`;
        } else {
            return join(process.cwd(), `update-paths.ts`);
        }
    }
}