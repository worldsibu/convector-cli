import { IDiskFile } from './IDiskFile.model';
import { join } from 'path';
import { SysWrapper } from '../utils/sysWrapper';

/** Controller compiler object. */
export class ControllerModel implements IDiskFile {
    constructor(public projectName,
        public name: string) {

    }

    recompile() {
        throw new Error('Method not implemented.');
    }

    /** Save to disk. */
    async save() {
        await SysWrapper.createFileFromTemplate(
            this.filePath,
            {
                projectName: this.projectName,
                name: this.name,
                className: this.className
            }, this.templateFile);
    }

    /** TypeScript classs. */
    get className() {
        return this.name.match(/[a-z]+/gi)
            .map(function (word) {
                return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
            })
            .join('');
    }

    /**
     * Static template file to be used.
     */
    get templateFile() {
        return join(__dirname, '../../templates/_controller.ts.ejs');
    }

    /** Actual file Path for the object. */
    get filePath() {
        return join(process.cwd(), `./${this.projectName}/packages/${this.name}-cc/src/${this.name}.controller.ts`);
    }
}
