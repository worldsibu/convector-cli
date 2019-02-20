import { IDiskFile } from './IDiskFile.model';
import { join } from 'path';
import { SysWrapper } from '../utils/sysWrapper';
import { SmartModel } from './smartModel';

/** Model compiler object. */
export class ModelModel extends SmartModel {

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
        await SysWrapper.createFileFromTemplatePath(
            this.filePath,
            {
                name: this.name,
                className: this.classCCName
            }, this.templateFile);
    }

    /**
     * Static template file to be used.
     */
    get templateFile() {
        return join(__dirname, '../../templates/_model.ts.ejs');
    }

    /** Actual file Path for the object. */
    get filePath() {
        if (!this.ignoreConvention) {
            return `${this.projectRoot}/packages/${this.chaincodeName}-cc/src/${this.name}.model.ts`;
        } else {
            return join(process.cwd(), `${this.name}.model.ts`);
        }
    }
}
