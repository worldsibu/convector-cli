import { PackageModel, LernaModel, TsConfigModel, LevelEnum } from '../models';

export class ProjectStructureCompiler {
    rootPackage: PackageModel;
    rootLerna: LernaModel;
    rootTsConfig: TsConfigModel;

    constructor(public projectName: string) {
        this.rootPackage = new PackageModel(projectName, projectName, LevelEnum.ROOT,
            [{
                name: 'env:restart',
                value: './node_modules/@worldsibu/convector-tool-dev-env/scripts/restart.sh'
            },
            {
                name: 'env:clean',
                value: './node_modules/@worldsibu/convector-tool-dev-env/scripts/clean.sh'
            }], null, [
                {
                    name: 'lerna',
                    value: '^3.4.3'
                }, {
                    name: '@worldsibu/convector-adapter-mock',
                    value: '^1.2.0'
                }, {
                    name: '@worldsibu/convector-tool-chaincode-manager',
                    value: '^1.2.0'
                }, {
                    name: '@worldsibu/convector-tool-dev-env',
                    value: '^1.2.0'
                }, {
                    name: 'fabric-ca-client',
                    value: '^1.1.2'
                }, {
                    name: 'fabric-client',
                    value: '^1.1.2'
                }
            ]);
        this.rootLerna = new LernaModel(projectName, projectName);
        this.rootTsConfig = new TsConfigModel(projectName, projectName, LevelEnum.ROOT);
    }

    async save() {
        return Promise.all([
            this.rootPackage.save(),
            this.rootLerna.save(),
            this.rootTsConfig.save()
        ]);
    }
}
