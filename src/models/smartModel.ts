import { join } from 'path';

export abstract class SmartModel {
    constructor(
        public name: string,
        public projectName?: string) {

    }

    get projectRoot() {
        if (!this.projectName) {
            // Inside of project folder
            return join(process.cwd(), `.`);
        } else {
            // Outside of project folder
            return join(process.cwd(), `./${this.projectName}`);
        }
    }

    abstract save(): Promise<void | {}>;
}