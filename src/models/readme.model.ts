// tslint:disable:max-line-length
import { IDiskFile } from './IDiskFile.model';
import { join } from 'path';
import { SysWrapper } from '../utils/sysWrapper';
import { Utils } from '../utils';
import { SmartModel } from './smartModel';

/** Controller compiler object. */
export class ReadmeModel extends SmartModel {
    constructor(
        public name: string,
        public projectName?: string,
        public ignoreConvention?: boolean) {
        super(name, projectName);
    }

    /** Save to disk. */
    async save() {
        await SysWrapper.createFile(
            this.filePath,
            `# ${this.projectName}

This awesome project was created automatically with <a href="https://github.com/worldsibu/convector-cli" target="_blank">Convector CLI</a>.
By default new Convector projects locally include <a href="https://github.com/worldsibu/hurley">Hurley</a> to manage your development environment seamlessly, so you don't have to worry about setting up the network and hard ways to install  and upgrade your chaincodes.

You may very well install **Hurley** globally for easier and more flexible management. 

\`npm i -g @worldsibu/hurley\`

If you don't want to, don't worries! This project works right away.

## Start - if you have Hurley globally

### Bring your project to life 

\`\`\`
# Install dependencies - From the root of your project
npm i
# Create a new development blockchain network  - From the root of your project
hurl new
\`\`\`

###  Install and upgrade chaincodes

\`\`\`
# Package your smart contract's code  - From the root of your project
npm run cc:package -- ${this.name}
# Install to your blockchain - From the root of your project
cd ./chaincode-${this.name}
hurl install ${this.name} node

# Upgrade your existing chaincode - From the root of your project
cd ./chaincode-${this.name}
hurl upgrade ${this.name} node 1.2
\`\`\`

## Start - if you don't have Hurley globally

### Bring your project to life 

\`\`\`
# Install dependencies - From the root of your project
npm i
# Create a new development blockchain network  - From the root of your project
npm run env:restart
\`\`\`

###  Install and upgrade chaincodes

\`\`\`
# Install to your blockchain - From the root of your project
npm run cc:start -- ${this.name}

# Upgrade your existing chaincode - From the root of your project
npm run cc:start -- ${this.name} 1.2
\`\`\`

> Check all the information to work with Convector <a href="https://worldsibu.github.io/convector" target="_blank">in the DOCS site</a>.

## Collaborate to the Convector Suite projects

* <a href="https://discord.gg/twRwpWt" target="_blank">Discord chat with the community</a>
* <a href="https://github.com/worldsibu" target="_blank">Convector projects</a>
`);
    }

    /**
     * Static template file to be used.
     */
    get templateFile() {
        return join(__dirname, '../../templates/_controller.ts.ejs');
    }

    /** Actual file Path for the object. */
    get filePath() {
        if (!this.ignoreConvention) {
            return `${this.projectRoot}/README.md`;
        } else {
            return join(process.cwd(), `README.md`);
        }
    }
}
