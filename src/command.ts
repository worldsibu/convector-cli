#!/usr/bin/env node
import * as program from 'commander';
import { CLI } from './cli';
import { resolve } from 'path';

const fixPath = p => resolve(process.cwd(), p);

const tasks = {
    async create(name: string, path?: string) {
        // console.log(`creating at ${path} ${name}`);
        path = path || './';
        return await CLI.create(name, path);
    },

    // async addAdmin(
    //     registry: Registry,
    //     enrollmentID: string,
    //     enrollmentSecret: string,
    //     msp: string
    // ) {
    //     return await registry.addAdmin({ enrollmentID, enrollmentSecret }, msp);
    // },

    // async addUser(
    //     registry: Registry,
    //     enrollmentID: string,
    //     affiliation: string,
    //     role: string,
    //     admin: string,
    //     msp: string
    // ) {
    //     return await registry.addUser({ role, enrollmentID, affiliation, }, admin, msp);
    // },

};

program
    .command('new <name>')
    .option('-p, --path <path>', 'Path', fixPath)
    //   .option('-p, --profile <profile>', 'Network profile path', fixPath)
    .action(async (name: string, cmd: any) => {
        await tasks.create(name, cmd.path);
        // await tasks.create(registry, enrollmentID, enrollmentSecret, msp);
    });

program.parse(process.argv);
