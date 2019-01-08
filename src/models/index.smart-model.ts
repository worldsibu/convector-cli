import { IDiskFile } from './IDiskFile.model';
import { join, relative } from 'path';
import { SysWrapper } from '../utils/sysWrapper';
import { SmartModel } from './smartModel';

/** Index exporter compiler object. */
export class IndexModel extends SmartModel {

    constructor(
        public name: string,
        public chaincodeName: string,
        public projectName?: string) {
        super(name, projectName);
    }

    async recompile() {
        let srcFiles = await SysWrapper.enumFilesInFolder(`./packages/${this.chaincodeName}-cc/src/`);
        if (srcFiles) {
            console.log(`UPDATE ${relative('', this.filePath)}`);
            await SysWrapper.removePath(this.filePath);
            await SysWrapper.createFile(this.filePath,
                `// Self generated file - anything in this file may be recreated by Convector-CLI
${srcFiles.filter(file =>
                    file.indexOf('.controller.ts') !== -1 ||
                    file.indexOf('.model.ts') !== -1)
                    .map(file => `export * from './${file.replace('.ts', '')}';
`).join('')}`);
        }
    }

    async save() {
        await SysWrapper.createFile(this.filePath, `export * from './${this.name}.model';
export * from './${this.name}.controller';`);
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
        return join(__dirname, '../../templates/_index.ts.ejs');
    }

    /** Actual file Path for the object. */
    get filePath() {
        return `${this.projectRoot}/packages/${this.chaincodeName}-cc/src/index.ts`;
    }
}
