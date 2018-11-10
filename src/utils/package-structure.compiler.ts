import { PackageModel, LernaModel, TsConfigModel, LevelEnum, ModelModel, ControllerModel, IndexModel } from '../models';
import { SysWrapper } from './sysWrapper';
import { join } from 'path';

export class PackageStructureCompiler {
    rootPackage: PackageModel;
    rootTsConfig: TsConfigModel;
    model: ModelModel;
    controller: ControllerModel;
    index: IndexModel;

    constructor(public ccName: string, public projectName?: string) {
        this.rootPackage = new PackageModel(ccName, LevelEnum.PACKAGE, projectName,
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
        this.rootTsConfig = new TsConfigModel(ccName, LevelEnum.PACKAGE, projectName);
        this.model = new ModelModel(ccName, projectName);
        this.controller = new ControllerModel(ccName, projectName);
        this.index = new IndexModel(ccName, projectName);
    }

    async save() {
        this.safePathCheck()
            .then(() => {
                // a convector valid path
                return Promise.all([
                    this.rootPackage.save(),
                    this.rootTsConfig.save(),
                    this.model.save(),
                    this.controller.save(),
                    this.index.save()
                ]);
            })
            .catch((ex) => {
                console.log('Current folder is not a Convector valid project folder.');
                console.log(ex);
            });
    }

    async safePathCheck() {
        if (!this.projectName) {
            // generating a package with no project
            return SysWrapper.getFile(join(process.cwd(), `./.convector`));
        } else {
            // with project
        }
    }
}
