import { PackageModel, LernaModel, TsConfigModel, LevelEnum, ReadmeModel } from '../models';
import { SysWrapper } from './sysWrapper';
import { join } from 'path';

export class ProjectStructureCompiler {
    rootPackage: PackageModel;
    rootLerna: LernaModel;
    rootTsConfig: TsConfigModel;
    readme: ReadmeModel;

    constructor(public projectName: string, public chaincodeName?: string) {
        this.rootPackage = new PackageModel(projectName, LevelEnum.ROOT, projectName,
            [{
                name: 'install',
                value: 'npm-run-all -s lerna:install'
            }, {
                name: 'env:restart',
                value: './node_modules/.bin/hurl new'
            },
            {
                name: 'env:clean',
                value: './node_modules/.bin/hurl clean'
            },
            // Convector Chaincode Manager
            // $1: chaincode name
            // $2: version
            {
                name: 'cc:start',
                // tslint:disable-next-line:max-line-length
                value: 'f() { npm run cc:package -- $1 org1; npm run cc:install $1; }; f'
            },
            {
                name: 'cc:upgrade',
                // tslint:disable-next-line:max-line-length
                value: 'f() { npm run cc:package -- $1 org1; cd ./chaincode-$1; ../node_modules/.bin/hurl upgrade $1 node $2; }; f'
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
                value: 'f() { npm run lerna:build; chaincode-manager --config ./$2.$1.config.json --output ./chaincode-$1 package; }; f'
            }, {
                name: 'cc:install',
                value: 'f() { cd ./chaincode-$1; ../node_modules/.bin/hurl install $1 node; }; f'
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
                }, {
                    name: '@worldsibu/hurley',
                    value: '^0.4.13'
                }
            ]);
        this.rootLerna = new LernaModel(projectName, projectName);
        this.rootTsConfig = new TsConfigModel(projectName, LevelEnum.ROOT, projectName);
        this.readme = new ReadmeModel(chaincodeName, projectName);
    }

    async save() {
        return Promise.all([
            this.rootPackage.save(),
            this.rootLerna.save(),
            this.rootTsConfig.save(),
            this.readme.save(),
            this.breadcrumb()
        ]);
    }

    async breadcrumb() {
        return SysWrapper.createFile(join(process.cwd(), `./${this.projectName}/.convector`),
            `This is a project created with Convector CLI. 
        For more information https://github.com/worldsibu/convector-cli`);
    }
}
