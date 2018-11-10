import { PackageModel, LernaModel, TsConfigModel, LevelEnum, ModelModel, ControllerModel, IndexModel } from '../models';

export class PackageStructureCompiler {
    rootPackage: PackageModel;
    rootTsConfig: TsConfigModel;
    model: ModelModel;
    controller: ControllerModel;
    index: IndexModel;

    constructor(public projectName: string, public ccName) {
        this.rootPackage = new PackageModel(projectName, ccName, LevelEnum.PACKAGE,
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
        this.rootTsConfig = new TsConfigModel(projectName, ccName, LevelEnum.PACKAGE);
        this.model = new ModelModel(projectName, ccName);
        this.controller = new ControllerModel(projectName, ccName);
        this.index = new IndexModel(projectName, ccName);
    }

    async save() {
        return Promise.all([
            this.rootPackage.save(),
            this.rootTsConfig.save(),
            this.model.save(),
            this.controller.save()
        ]);
    }

}
