#!/usr/bin/env node
import * as program from 'commander';
import { CLI } from './cli';
import { resolve } from 'path';

const fixPath = p => resolve(process.cwd(), p);

const tasks = {
    async create(name: string, chaincode?: string) {
        return await CLI.create(name, chaincode);
    },
    async generate(name: string, object: string) {
        switch (object) {
            case 'chaincode':
                return await CLI.generateCC(name);
            default:
                throw new Error(`Option ${object} is not a valid generator. Try with 'chaincode' option.`);
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
