import { join } from 'path';
import { SysWrapper } from '../utils/sysWrapper';

export class GenericFileModel  {
    constructor(public projectName,
        public name: string) {

    }
    recompile() {
        throw new Error('Method not implemented.');
    }
    async save() {
        await SysWrapper.createFileFromTemplatePath(
            this.filePath,
            {
            }, this.templateFile);
    }

    /**
     * Static template file to be used.
     */
    get templateFile() {
        return join(__dirname, `../../templates/_${this.name}.ejs`);
    }

    /** Actual file Path for the object. */
    get filePath() {
        return join(process.cwd(), `./${this.projectName}/${this.name}`);
    }
}