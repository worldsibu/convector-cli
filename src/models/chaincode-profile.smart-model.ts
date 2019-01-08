import { PairString, LevelEnum } from '.';
import { join } from 'path';
import { SysWrapper } from '../utils/sysWrapper';
import { IDiskFile } from './IDiskFile.model';
import { SmartModel } from './smartModel';
import { Utils } from '../utils';

export class ChaincodeProfileModel extends SmartModel {
    /**
     * Initialize a package file
     * @param projectName Baseline name, if working with root, it's the same as `name`
     * @param name Name of the package
     * @param level Type of package to create (root level or package level)
     */
    constructor(
        public name: string,
        public orgName: string,
        public projectName?: string) {
        super(name, projectName);
    }

    /** Not implemented. */
    recompile() {
        throw new Error('Method not implemented.');
    }

    /** Save to disk. */
    async save() {
        await SysWrapper.createFileFromTemplate(
            this.filePath,
            {
                org: this.orgName,
                chaincodeFolder: `${this.name}-cc`,
                className: Utils.toPascalCase(this.name),
                root: join(require('os').homedir(), '/hyperledger-fabric-network')
            }, this.templateFile);
    }

    /**
     * Static template file to be used.
     */
    get templateFile() {
        return join(__dirname, '../../templates/_chaincode.config.json.ejs');
    }

    /** Actual file Path for the object. */
    get filePath() {
        return `${this.projectRoot}/${this.orgName}.${this.name}.config.json`;
    }
}
