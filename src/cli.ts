import { SysWrapper } from './utils/sysWrapper';
import { join } from 'path';

export class CLI {
    static async create(name: string, path?: string) {
        const cli = new CLI(name, path);
        await cli.init();

        return cli;
    }

    constructor(public name: string, public path?: string) {
        // super(name);
    }

    public async init() {
        return SysWrapper.execFile(join(__dirname, '../templates/_bootstrap-script.sh.ejs'), {
            name: this.name
        });
        // return SysWrapper.createFile(`${this.path}/${this.name}.txt`, 'hola mundo');
    }
}
