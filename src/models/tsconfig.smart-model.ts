import { PairString, LevelEnum } from '.';
import { join } from 'path';
import { SysWrapper } from '../utils/sysWrapper';
import { IDiskFile } from './IDiskFile.model';

export class TsConfigModel implements IDiskFile {
    /**
     * Initialize a package file
     * @param projectName Baseline name, if working with root, it's the same as `name`
     * @param name Name of the package
     * @param level Type of package to create (root level or package level)
     */
    constructor(public projectName,
        public name: string, public level: LevelEnum) {

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
            join(process.cwd(), `./${this.projectName}/tsconfig.json`)
            : join(process.cwd(), `./${this.projectName}/packages/${this.name}-cc/tsconfig.json`);
    }
}
