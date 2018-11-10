// tslint:disable:no-unused-expression
import { expect } from 'chai';
import 'mocha';

import { PackageStructureCompiler, ProjectStructureCompiler } from '../src/utils';

describe.only('Structure proxies', () => {
    const projectName = 'coffeecoin';
    const ccName = 'test';
    before(async () => {
        // nothing yet
    });

    it('should create root project', async () => {
        let structure = new ProjectStructureCompiler(projectName);
        await structure.save();
    });

    it('should create package project', async () => {
        let structure = new PackageStructureCompiler(ccName, projectName);
        await structure.save();
    });

    it('should create package project', async () => {
        let structure = new PackageStructureCompiler('token', projectName);
        await structure.save();
    });
});