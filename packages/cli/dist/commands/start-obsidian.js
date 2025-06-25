import chalk from 'chalk';
import { spawn } from 'child_process';
import psList from 'ps-list';
async function isObsidianRunning() {
    const processes = await psList();
    return processes.some((p) => p.name.toLowerCase().includes('obsidian'));
}
function getObsidianConfig() {
    const customPath = process.env.OBSIDIAN_PATH;
    if (customPath) {
        return { command: customPath, args: ['--remote-debugging-port=9222'] };
    }
    const platform = process.platform;
    if (platform === 'linux') {
        return {
            command: 'flatpak',
            args: [
                'run',
                'md.obsidian.Obsidian',
                '--remote-debugging-port=9222',
            ],
        };
    }
    else if (platform === 'darwin') {
        return {
            command: 'open',
            args: ['-a', 'Obsidian', '--args', '--remote-debugging-port=9222'],
        };
    }
    else if (platform === 'win32') {
        return {
            command: 'obsidian.exe', // или путь из реестра
            args: ['--remote-debugging-port=9222'],
        };
    }
    return null;
}
export async function startObsidian() {
    const config = getObsidianConfig();
    if (!config) {
        console.log(chalk.red('❌ Cannot detect Obsidian installation'));
        console.log(chalk.yellow('💡 Set OBSIDIAN_PATH environment variable:'));
        console.log(chalk.gray('   export OBSIDIAN_PATH=/path/to/obsidian'));
        console.log(chalk.gray('   # or'));
        console.log(chalk.gray('   export OBSIDIAN_PATH="flatpak run md.obsidian.Obsidian"'));
        return;
    }
    const isRunning = await isObsidianRunning();
    if (isRunning) {
        console.log(chalk.green('✅ Obsidian already running'));
        return;
    }
    try {
        const cp = spawn(config.command, config.args, {
            detached: true,
            stdio: 'ignore',
        });
        cp.unref();
        console.log(chalk.green('🚀 Starting Obsidian with debug port 9222'));
    }
    catch (error) {
        console.log(chalk.red('❌ Failed to start Obsidian'));
        console.log(chalk.yellow('💡 Try setting OBSIDIAN_PATH manually'));
    }
}
