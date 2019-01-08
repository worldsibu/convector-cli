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
                name: 'env:restart',
                value: './node_modules/@worldsibu/convector-tool-dev-env/scripts/restart.sh'
            },
            {
                name: 'env:clean',
                value: './node_modules/@worldsibu/convector-tool-dev-env/scripts/clean.sh'
            },
            // Convector Chaincode Manager
            // $1: chaincode name
            // $2: version
            {
                name: 'cc:start',
                // tslint:disable-next-line:max-line-length
                value: 'f() { npm-run-all -s \\"cc:package -- $1 org1\\" \\"cc:install -- $1 $2 org1\\" \\"cc:install -- $1 $2 org2\\" \\"cc:instantiate -- $1 $2 org1\\"; }; f'
            },
            {
                name: 'cc:upgrade',
                // tslint:disable-next-line:max-line-length
                value: 'f() { npm-run-all -s \\"cc:package -- $1 org1\\" \\"cc:install -- $1 $2 org1\\" \\"cc:install -- $1 $2 org2\\" \\"cc:upgradePerOrg -- $1 $2\\"; }; f'
            },
            {
                name: '===================INTERNALS===================',
                value: '===================NO NEED TO CALL THEM DIRECTLY==================='
            }, {
                name: 'lerna:install',
                value: 'lerna bootstrap'
            }, {
                name: 'lerna:build',
                value: 'lerna run build'
            },
            {
                name: 'cc:package',
                // tslint:disable-next-line:max-line-length
                value: 'f() { npm run lerna:build; chaincode-manager --config ./$2.$1.config.json --output ./chaincode-$2 package; }; f'
            }, {
                name: 'cc:install',
                value: 'f() { chaincode-manager --config ./$3.$1.config.json install ./chaincode $1 $2; }; f'
            }, {
                name: 'cc:instantiate',
                value: 'f() { chaincode-manager --config ./$3.$1.config.json instantiate $1 $2; }; f'
            }, {
                name: 'cc:upgradePerOrg',
                value: 'f() { chaincode-manager --config ./org1.$1.config.json upgrade $1 $2; }; f'
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
                    value: '~1.1.2'
                }, {
                    name: 'fabric-client',
                    value: '~1.1.2'
                }, {
                    name: 'npm-run-all',
                    value: '^4.1.5'
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
