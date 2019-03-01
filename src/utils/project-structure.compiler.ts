import { PackageModel, LernaModel, TsConfigModel, LevelEnum, ReadmeModel } from '../models';
import { SysWrapper } from './sysWrapper';
import { join } from 'path';
import { Utils } from '.';
import { UpdatePathsScriptModel } from '../models/update-paths.admin';

export class ProjectStructureCompiler {
    rootPackage: PackageModel;
    rootLerna: LernaModel;
    rootTsConfig: TsConfigModel;
    readme: ReadmeModel;
    updatePathsScript: UpdatePathsScriptModel;

    constructor(public projectName: string, public chaincodeName?: string) {
        const classCCName = Utils.toPascalCase(chaincodeName || projectName);
        projectName = Utils.toCamelCase(projectName);

        this.rootPackage = new PackageModel(projectName, classCCName, LevelEnum.ROOT, projectName,
            [{
                name: 'install',
                value: 'npm-run-all -s lerna:install'
            }, {
                name: 'build',
                value: 'node ./update-paths.js'
            }, {
                name: 'env:restart',
                value: 'hurl new'
            }, {
                name: 'test',
                value: 'npm-run-all -s lerna:test'
            }, {
                name: 'env:clean',
                value: 'hurl clean'
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
                value: 'f() { npm run cc:package -- $1 org1; hurl upgrade $1 node $2  -P ./chaincode-$1; }; f'
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
                value: 'f() { hurl install $1 node -P ./chaincode-$1; }; f'
            }, {
                name: 'lerna:test',
                value: 'lerna exec npm run test'
            }], null, [
                {
                    name: 'lerna',
                    value: '^3.13.0'
                }, {
                    name: '@worldsibu/convector-adapter-mock',
                    value: '~1.2.0'
                }, {
                    name: '@worldsibu/convector-tool-chaincode-manager',
                    value: '~1.2.0'
                }, {
                    name: '@worldsibu/convector-tool-dev-env',
                    value: '~1.2.0'
                }, {
                    name: 'fabric-ca-client',
                    value: '~1.4.0'
                }, {
                    name: 'fabric-client',
                    value: '~1.4.0'
                }, {
                    name: 'npm-run-all',
                    value: '^4.1.5'
                }, {
                    name: '@worldsibu/hurley',
                    value: '~0.5.1'
                }
            ]);
        this.rootLerna = new LernaModel(projectName, projectName);
        this.rootTsConfig = new TsConfigModel(projectName, LevelEnum.ROOT, projectName);
        this.readme = new ReadmeModel(chaincodeName, projectName);
        this.updatePathsScript = new UpdatePathsScriptModel(chaincodeName, projectName);
    }

    async save() {
        return Promise.all([
            this.rootPackage.save(),
            this.rootLerna.save(),
            this.rootTsConfig.save(),
            this.readme.save(),
            this.updatePathsScript.save(),
            this.breadcrumb()
        ]);
    }

    async breadcrumb() {
        return SysWrapper.createFile(join(process.cwd(), `./${this.projectName}/.convector`),
            `This is a project created with Convector CLI. 
For more information https://github.com/worldsibu/convector-cli`);
    }
}
