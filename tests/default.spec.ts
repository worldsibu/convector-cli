// tslint:disable:no-unused-expression
import { expect } from 'chai';
import 'mocha';
import { PackageModel } from '../src/models/package.model';
import { LevelEnum } from '../src/models';
import { join } from 'path';

describe('Root Package', () => {
    before(async () => {
        // nothing yet
    });

    it('should create a root `package.json` file', async () => {
        let rootPackage = new PackageModel(
            'coffeecoin', 'coffecoin', LevelEnum.PACKAGE);
        await rootPackage.save();
    });
});
