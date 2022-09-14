#!/usr/bin/env node
import { Command } from 'commander';

const programCommand = new Command();

programCommand.usage('<command> [options]').description('create widget').command('create', 'Create file template');

programCommand.parse(process.argv);
