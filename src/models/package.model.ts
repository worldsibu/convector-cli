import { PairString, LevelEnum } from '.';
import { join } from 'path';
import { SysWrapper } from '../utils/sysWrapper';
import { IDiskFile } from './IDiskFile.model';

export class PackageModel implements IDiskFile {
    /**
     * Initialize a package file
     * @param projectName Baseline name, if working with root, it's the same as `name`
     * @param name Name of the package
     * @param level Type of package to create (root level or package level)
     */
    constructor(public projectName,
        public name: string, public level: LevelEnum,
        public scripts?: PairString[],
        public dependencies?: PairString[],
        public devDependencies?: PairString[]) {

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
                name: this.name,
                scripts: this.scripts, dependencies: this.dependencies,
                devDependencies: this.devDependencies
            }, this.templateFile);
    }

    /**
     * Static template file to be used.
     */
    get templateFile() {
        if (this.level === LevelEnum.PACKAGE) {
            return join(__dirname, '../../templates/_package.json.ejs');
        } else {
            return join(__dirname, '../../templates/_package.json.ejs');
        }
    }

    /** Actual file Path for the object. */
    get filePath() {
        return this.level === LevelEnum.PACKAGE ?
            join(process.cwd(), `./${this.projectName}/package.json`)
            : join(process.cwd(), `./${this.projectName}/packages/${this.projectName}-cc/package.json`);
    }
}
