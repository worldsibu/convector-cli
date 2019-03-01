#!/usr/bin/env node
import * as program from 'commander';
import { CLI } from './cli';
import { resolve } from 'path';
import * as updateNotifier from 'update-notifier';
import { Utils } from './utils';

const pkg = require('../package.json');

const tasks = {
    async create(name: string, chaincode?: string) {
        // name = name.replace(/[^a-zA-Z ]/g, '');
        return await CLI.create(name, chaincode);
    }
};

program
    .command('new <name>')
    .option('-c, --chaincode <chaincode>', 'Default Chaincode Name')
    .action(async (name: string, cmd: any) => {
        name = Utils.toCamelCase(name);
        cmd.chaincode = Utils.toCamelCase(cmd.chaincode);
        await tasks.create(
            name,
            cmd.chaincode);
    });

program
    .command('generate <object> <objectname>')
    .option('-c, --chaincode <chaincode>', 'Chaincode project where to create')
    // .option('-c, --chaincode <chaincode>', 'Default Chaincode Name')
    .action(async (object: string, objectname: string, cmd: any) => {
        // objectname = objectname.replace(/[^a-zA-Z ]/g, '');
        objectname = Utils.toCamelCase(objectname);
        cmd.chaincode = Utils.toCamelCase(cmd.chaincode);

        if ((!cmd || !cmd.chaincode) && object !== 'chaincode') {
            throw new Error('Please specify the chaincode project with the parameter -c');
        }
        switch (object) {
            case 'chaincode':
                return await CLI.generateCC(objectname);
            case 'model':
                return await CLI.generateModel(cmd.chaincode, objectname);
            default:
                // tslint:disable-next-line:max-line-length
                throw new Error(`Option ${object} is not a valid generator. Try with 'model' or 'chaincode' option.`);
        }
    });

updateNotifier({
    pkg,
    updateCheckInterval: 1000 * 60
}).notify();

program
    .version(pkg.version);

program.parse(process.argv);