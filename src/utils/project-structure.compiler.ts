import { PackageModel, GenericFileModel, TsConfigModel, LevelEnum, ReadmeModel } from '../models';
import { SysWrapper } from './sysWrapper';
import { join } from 'path';
import { Utils } from '.';
import { UpdatePathsScriptModel } from '../models/update-paths.admin';

export class ProjectStructureCompiler {
    rootPackage: PackageModel;
    rootLerna: GenericFileModel;
    rootGitIgnore: GenericFileModel;
    rootEditorConfig: GenericFileModel;
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
                name: 'env:restart',
                value: 'hurl new'
            }, {
                name: 'test',
                value: 'npm-run-all -s lerna:test'
            }, {
                name: 'test:e2e',
                value: 'npm-run-all -s lerna:test:e2e'
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
                value: 'f() { npm run cc:package -- $1; npm run cc:install $1 $2; }; f'
            },
            {
                name: 'cc:upgrade',
                // tslint:disable-next-line:max-line-length
                value: 'f() { npm run cc:package -- $1; hurl upgrade ${3:-$1} node $2  -P ./chaincode-$1; }; f'
            },
            {
                name: 'cc:start:debug',
                // tslint:disable-next-line:max-line-length
                value: 'f() { npm run cc:package -- $1; npm run cc:install:debug $1 $2; }; f'
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
                value: 'f() { npm run lerna:build; chaincode-manager --update --config ./$1.config.json --output ./chaincode-$1 package; }; f'
            }, {
                name: 'cc:install',
                value: 'f() { hurl install ${2:-$1} node -P ./chaincode-$1; }; f'
            },
            {
                name: 'cc:install:debug',
                // tslint:disable-next-line:max-line-length
                value: 'f() { hurl install ${2:-$1} node -P ./chaincode-$1 --debug; }; f'
            }, {
                name: 'lerna:test',
                value: 'lerna run test --stream'
            }, {
                name: 'lerna:test:e2e',
                value: 'lerna run test:e2e --stream'
            }], null, [
                {
                    name: 'lerna',
                    value: '~3.13.0'
                }, {
                    name: '@worldsibu/convector-adapter-mock',
                    value: '~1.3.6'
                }, {
                    name: '@worldsibu/convector-platform-fabric',
                    value: '~1.3.6'
                }, {
                    name: '@worldsibu/hurley',
                    value: '~1.1.1'
                }, {
                    name: 'fabric-ca-client',
                    value: '~1.4.0'
                }, {
                    name: 'fabric-client',
                    value: '~1.4.0'
                }, {
                    name: 'npm-run-all',
                    value: '~4.1.5'
                }
            ]);
        this.rootLerna = new GenericFileModel(projectName, 'lerna.json');
        this.rootGitIgnore = new GenericFileModel(projectName, '.gitignore');
        this.rootEditorConfig = new GenericFileModel(projectName, '.editorconfig');
        this.rootTsConfig = new TsConfigModel(projectName, LevelEnum.ROOT, projectName);
        this.readme = new ReadmeModel(chaincodeName, projectName);
    }

    async save() {
        return Promise.all([
            this.rootPackage.save(),
            this.rootLerna.save(),
            this.rootGitIgnore.save(),
            this.rootEditorConfig.save(),
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
