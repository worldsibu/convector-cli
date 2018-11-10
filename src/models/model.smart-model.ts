import { IDiskFile } from './IDiskFile.model';
import { join } from 'path';
import { SysWrapper } from '../utils/sysWrapper';
import { SmartModel } from './smartModel';

/** Model compiler object. */
export class ModelModel extends SmartModel {

    constructor(
        public name: string,
        public projectName?: string) {
        super(name, projectName);
    }

    recompile() {
        throw new Error('Method not implemented.');
    }

    async save() {
        await SysWrapper.createFileFromTemplate(
            this.filePath,
            {
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
        return join(__dirname, '../../templates/_model.ts.ejs');
    }

    /** Actual file Path for the object. */
    get filePath() {
        return `${this.projectRoot}/packages/${this.name}-cc/src/${this.name}.model.ts`;
    }
}
