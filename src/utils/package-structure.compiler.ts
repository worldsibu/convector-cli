import {
    PackageModel, TsConfigModel, LevelEnum, ModelModel,
    ControllerModel, IndexModel, ChaincodeProfileModel,
    TestModel, E2EModel
} from '../models';
import { SysWrapper } from './sysWrapper';
import { join } from 'path';
import { Utils } from '.';

export class PackageStructureCompiler {
    rootPackage: PackageModel;
    rootTsConfig: TsConfigModel;
    model: ModelModel;
    test: TestModel;
    e2e: E2EModel;
    controller: ControllerModel;
    index: IndexModel;
    ccProfileOrg1: ChaincodeProfileModel;

    constructor(public ccName: string, public projectName?: string) {
        const classCCName = Utils.toPascalCase(ccName);
        ccName = Utils.toCamelCase(ccName);

        this.rootPackage = new PackageModel(ccName, classCCName, LevelEnum.PACKAGE, projectName,
            [
                {
                    name: 'clean',
                    value: 'rimraf dist client'
                },
                {
                    name: 'build',
                    value: 'npm run clean && tsc'
                },
                {
                    name: 'prepare',
                    value: 'npm run build'
                },
                {
                    name: 'test',
                    value: 'mocha -r ts-node/register tests/*.spec.ts --reporter spec'
                },
                {
                    name: 'test:debug',
                    value: 'mocha --inspect -r ts-node/register tests/*.spec.ts --reporter spec'
                },
                {
                    name: 'test:e2e',
                    value: 'mocha -r ts-node/register tests/*.e2e.ts -t 300000 --reporter spec'
                },
                {
                    name: 'test:e2e:debug',
                    value: 'mocha --inspect -r ts-node/register tests/*.e2e.ts -t 300000 --reporter spec'
                }
            ], [
                {
                    name: 'yup',
                    value: '0.26.10'
                }, {
                    name: 'reflect-metadata',
                    value: '~0.1.12'
                }, {
                    name: '@worldsibu/convector-core',
                    value: '~1.3.6'
                }, {
                    name: '@worldsibu/convector-platform-fabric',
                    value: '~1.3.6'
                }
            ], [{
                name: '@types/node',
                value: '10.12.5'
            }, {
                name: '@types/yup',
                value: '0.26.10'
            }, {
                name: '@worldsibu/convector-storage-couchdb',
                value: '~1.3.6'
            }, {
                name: 'rimraf',
                value: '2.6.2'
            }, {
                name: 'ts-node',
                value: '8.0.2'
            }, {
                name: 'mocha',
                value: '5.0.3'
            }, {
                name: 'chai',
                value: '4.1.2'
            }, {
                name: 'typescript',
                value: '2.9.2'
            }, {
                name: '@types/mocha',
                value: '5.2.5'
            }, {
                name: '@types/chai',
                value: '4.1.4'
            }
            ]);

        this.rootTsConfig = new TsConfigModel(ccName, LevelEnum.PACKAGE, projectName);
        this.model = new ModelModel(ccName, ccName, projectName, classCCName);
        this.test = new TestModel(ccName, ccName, projectName, classCCName);
        this.e2e = new E2EModel(ccName, ccName, projectName, classCCName);
        this.controller = new ControllerModel(ccName, ccName, projectName, classCCName);
        this.index = new IndexModel(ccName, ccName, projectName);

        this.ccProfileOrg1 = new ChaincodeProfileModel(ccName, projectName, classCCName);
    }

    /**
     * Provision everything.
     */
    async save() {
        this.safePathCheck()
            .then(() => {
                // a convector valid path
                return Promise.all([
                    this.rootPackage.save(),
                    this.rootTsConfig.save(),
                    this.model.save(),
                    this.test.save(),
                    this.e2e.save(),
                    this.controller.save(),
                    this.index.save(),
                    this.ccProfileOrg1.save(),
                ]);
            })
            .catch((ex) => {
                console.log('Current folder is not a Convector valid project folder.');
                console.log(ex);
            });
    }

    /**
     * Check if current folder is suitable for a chaincode package
     * generation.
     */
    async safePathCheck() {
        if (!this.projectName) {
            // generating a package with no project
            return SysWrapper.getFile(join(process.cwd(), `./.convector`));
        } else {
            // with project
        }
    }
}
