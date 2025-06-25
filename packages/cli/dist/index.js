#!/usr/bin/env node
import { release } from './commands/release';
import { startObsidian } from './commands/start-obsidian';
(async () => {
    const command = process.argv[2];
    try {
        switch (command) {
            case 'start':
                await startObsidian();
                break;
            case 'release':
                await release();
                break;
            default:
                console.log('Usage: obsidian-cli <start|release>');
        }
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
