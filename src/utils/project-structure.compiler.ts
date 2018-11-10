import { PackageModel, LernaModel, TsConfigModel, LevelEnum } from '../models';
import { SysWrapper } from './sysWrapper';
import { join } from 'path';

export class ProjectStructureCompiler {
    rootPackage: PackageModel;
    rootLerna: LernaModel;
    rootTsConfig: TsConfigModel;

    constructor(public projectName: string) {
        this.rootPackage = new PackageModel(projectName, LevelEnum.ROOT, projectName,
            [{
                name: 'install',
                value: 'npm-run-all -s lerna:install'
            }, {
                name: 'lerna:install',
                value: 'lerna bootstrap'
            }, {
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
                }, {
                    name: 'npm-run-all',
                    value: '^4.1.3'
                }
            ]);
        this.rootLerna = new LernaModel(projectName, projectName);
        this.rootTsConfig = new TsConfigModel(projectName, LevelEnum.ROOT, projectName);
    }

    async save() {
        return Promise.all([
            this.rootPackage.save(),
            this.rootLerna.save(),
            this.rootTsConfig.save(),
            this.breadcrumb()
        ]);
    }

    async breadcrumb() {
        return SysWrapper.createFile(join(process.cwd(), `./${this.projectName}/.convector`),
            `This is a project created with Convector CLI. 
        For more information https://github.com/worldsibu/convector-cli`);
    }
}
