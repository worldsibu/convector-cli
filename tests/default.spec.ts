// tslint:disable:no-unused-expression
import { expect } from 'chai';
import 'mocha';
import {
    PackageModel, LevelEnum,
    LernaModel, TsConfigModel, ModelModel, ControllerModel, IndexModel
} from '../src/models';

// TODO: FIX AFTER REFACTOR OF PACKAGES 

describe('Root Package', () => {
    const projectName = 'coffeecoin';
    const ccName = 'test';
    before(async () => {
        // nothing yet
    });

    it('should create a root `package.json` file', async () => {
        let rootPackage = new PackageModel(
            projectName, LevelEnum.ROOT, projectName,
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
                    value: '~1.1.2'
                }, {
                    name: 'fabric-client',
                    value: '~1.1.2'
                }
            ]);
        await rootPackage.save();
    });

    it('should create a root `lerna.json` file', async () => {
        let rootLerna = new LernaModel(projectName, ccName);
        await rootLerna.save();
    });

    it('should create a root `tsconfig.json` file', async () => {
        let rootLerna = new TsConfigModel(projectName, LevelEnum.ROOT, projectName);
        await rootLerna.save();
    });

    it('should create a package `tsconfig.json` file for `chaincode` project', async () => {
        let rootLerna = new TsConfigModel(ccName, LevelEnum.PACKAGE, projectName);
        await rootLerna.save();
    });

    it('should create a package `package.json` file for `chaincode` project', async () => {
        let rootPackage = new PackageModel(
            ccName, LevelEnum.PACKAGE, projectName,
            null, [{
                name: '@types/node',
                value: '^10.12.5'
            }], [
                {
                    name: 'yup',
                    value: '^0.26.6'
                }, {
                    name: 'reflect-metadata',
                    value: '^0.1.12'
                }, {
                    name: '@worldsibu/convector-core-model',
                    value: '^1.2.0'
                }, {
                    name: 'worldsibu/convector-core-controller',
                    value: '^1.2.0'
                }
            ]);
        await rootPackage.save();
    });

    it('should create a `model` file', async () => {
        let modelTest = new ModelModel('test', projectName);
        await modelTest.save();
    });

    it('should create a `controller` file', async () => {
        let modelTest = new ControllerModel('test', projectName);
        await modelTest.save();
    });

    it('should create an `index` file', async () => {
        let modelTest = new IndexModel('test', projectName);
        await modelTest.save();
    });

});
