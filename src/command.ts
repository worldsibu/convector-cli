#!/usr/bin/env node
import * as program from 'commander';
import { CLI } from './cli';
import { resolve } from 'path';

const fixPath = p => resolve(process.cwd(), p);

const tasks = {
    async create(name: string, chaincode?: string) {
        name = name.replace(/[^a-zA-Z ]/g, '');
        return await CLI.create(name, chaincode);
    },
    async generate(name: string, object: string) {
        name = name.replace(/[^a-zA-Z ]/g, '');
        switch (object) {
            case 'chaincode':
                return await CLI.generateCC(name);
            case 'model':
                return await CLI.generateModel(name);
            case 'controller':
                return await CLI.generateController(name);
            default:
                // tslint:disable-next-line:max-line-length
                throw new Error(`Option ${object} is not a valid generator. Try with 'chaincode', 'model', or 'controller' option.`);
        }
    }
};

program
    .command('new <name>')
    .option('-c, --chaincode <chaincode>', 'Default Chaincode Name')
    .action(async (name: string, cmd: any) => {
        await tasks.create(
            name,
            cmd.chaincode);
    });

program
    .command('generate <object> <name>')
    // .option('-c, --chaincode <chaincode>', 'Default Chaincode Name')
    .action(async (object: string, name: string, cmd: any) => {
        await tasks.generate(
            name,
            object);
    });

program.parse(process.argv);
