import { PairString, LevelEnum } from '.';
import { join } from 'path';
import { SysWrapper } from '../utils/sysWrapper';
import { IDiskFile } from './IDiskFile.model';
import { SmartModel } from './smartModel';

export class TsConfigModel extends SmartModel {
    /**
     * Initialize a package file
     * @param projectName Baseline name, if working with root, it's the same as `name`
     * @param name Name of the package
     * @param level Type of package to create (root level or package level)
     */
    constructor(
        public name: string, public level: LevelEnum,
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
            }, this.templateFile);
    }

    /**
     * Static template file to be used.
     */
    get templateFile() {
        if (this.level === LevelEnum.ROOT) {
            return join(__dirname, '../../templates/_tsconfig.json.ejs');
        } else {
            return join(__dirname, '../../templates/_tsconfig.cc.json.ejs');
        }
    }

    /** Actual file Path for the object. */
    get filePath() {
        return this.level === LevelEnum.ROOT ?
            `${this.projectRoot}/tsconfig.json`
            : `${this.projectRoot}/packages/${this.name}-cc/tsconfig.json`;
    }
}
