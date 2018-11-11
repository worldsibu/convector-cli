import { SysWrapper } from './utils/sysWrapper';
import { join } from 'path';
import { PackageStructureCompiler, ProjectStructureCompiler } from './utils';
import { ModelModel, ControllerModel } from './models';

export class CLI {
    static async create(name: string, chaincode?: string) {
        const cli = new CLI(name, chaincode);
        await cli.init();
        return cli;
    }

    static async generateCC(chaincode: string) {
        const cli = new CLI(null, chaincode);
        await cli.generateCC();
        return cli;
    }
    static async generateModel(chaincode: string) {
        const cli = new CLI(null, chaincode);
        await cli.generateModel();
        return cli;
    }
    static async generateController(chaincode: string) {
        const cli = new CLI(null, chaincode);
        await cli.generateController();
        return cli;
    }

    constructor(public name?: string, public chaincode?: string) {
    }

    public async init() {
        let structure = new ProjectStructureCompiler(this.name);
        await structure.save();
        if (this.chaincode) {
            let packageStructure = new PackageStructureCompiler(this.chaincode, this.name);
            await packageStructure.save();
        }
    }

    public async generateCC() {
        let packageStructure = new PackageStructureCompiler(this.chaincode, this.name);
        await packageStructure.save();
    }

    public async generateModel() {
        let model = new ModelModel(this.chaincode, this.name, true);
        await model.save();
    }

    public async generateController() {
        let ctrl = new ControllerModel(this.chaincode, this.name, true);
        await ctrl.save();
    }

}
