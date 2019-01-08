import { SysWrapper } from './utils/sysWrapper';
import { join } from 'path';
import { PackageStructureCompiler, ProjectStructureCompiler } from './utils';
import { ModelModel, ControllerModel, IndexModel } from './models';
import { Analytics } from './utils/analytics';
import * as Insight from 'insight';

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
    static async generateModel(chaincode: string, objectname: string) {
        const cli = new CLI(objectname, chaincode);
        await cli.generateModel();
        return cli;
    }
    static async generateController(chaincode: string, objectname: string) {
        const cli = new CLI(objectname, chaincode);
        await cli.generateController();
        return cli;
    }

    analytics: Analytics;

    /**
     * 
     * @param name Project Name
     * @param chaincode File Name
     */
    constructor(public name?: string, public chaincode?: string) {
        this.analytics = new Analytics();
        this.chaincode = this.chaincode || this.name;
    }

    public async init() {
        let structure = new ProjectStructureCompiler(this.name, this.chaincode || this.name);
        await structure.save();
        this.analytics.trackNewProject(`PROJECT=${this.name}`);
        if (this.chaincode) {
            let packageStructure = new PackageStructureCompiler(this.chaincode, this.name);
            await packageStructure.save();
            this.analytics.trackGenerateCC(`CHAINCODE=${this.chaincode}`);
        }
    }

    public async generateCC() {
        let packageStructure = new PackageStructureCompiler(this.chaincode, this.name);
        await packageStructure.save();
        this.analytics.trackGenerateCC(`CHAINCODE=${this.chaincode}`);
    }

    public async generateModel() {
        let model = new ModelModel(this.name, this.chaincode, null, false);
        await model.save();

        let newIndex = new IndexModel(this.name, this.chaincode, null);
        await newIndex.recompile();

        this.analytics.trackGenerateModel(`CHAINCODE=${this.chaincode}`);
    }

    public async generateController() {
        let ctrl = new ControllerModel(this.name, this.chaincode, null, false);
        await ctrl.save();
        let newIndex = new IndexModel(this.name, this.chaincode, null);
        await newIndex.recompile();
        this.analytics.trackGenerateController(`CHAINCODE=${this.chaincode}`);
    }
}
