import { join } from 'path';
import { SysWrapper } from '../utils/sysWrapper';
import { SmartModel } from './smartModel';

export class ChaincodeProfileModel extends SmartModel {
    /**
     * Initialize a package file
     * @param projectName Baseline name, if working with root, it's the same as `name`
     * @param name Name of the package
     * @param level Type of package to create (root level or package level)
     */
    constructor(
        public name: string,
        public projectName?: string,
        public classCCName?: string) {
        super(name, projectName);
    }

    /** Not implemented. */
    recompile() {
        throw new Error('Method not implemented.');
    }

    /** Save to disk. */
    async save() {
        await SysWrapper.createFileFromTemplatePath(
            this.filePath,
            {
                chaincodeFolder: `${this.name}-cc`,
                className: this.classCCName
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
        return `${this.projectRoot}/${this.name}.config.json`;
    }
}
