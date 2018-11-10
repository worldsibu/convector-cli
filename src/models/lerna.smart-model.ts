import { IDiskFile } from './IDiskFile.model';
import { join } from 'path';
import { SysWrapper } from '../utils/sysWrapper';

export class LernaModel  {
    constructor(public projectName,
        public name: string) {

    }
    recompile() {
        throw new Error('Method not implemented.');
    }
    async save() {
        await SysWrapper.createFileFromTemplate(
            this.filePath,
            {
            }, this.templateFile);
    }

    /**
     * Static template file to be used.
     */
    get templateFile() {
        return join(__dirname, '../../templates/_lerna.json.ejs');
    }

    /** Actual file Path for the object. */
    get filePath() {
        return join(process.cwd(), `./${this.projectName}/lerna.json`);
    }
}