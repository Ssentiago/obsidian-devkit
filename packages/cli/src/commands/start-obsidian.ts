import {spawn} from 'child_process';
import psList from 'ps-list';

async function isObsidianRunning() {
    const processes = await psList();
    return processes.some((p) => p.name.toLowerCase().includes('obsidian'));
}

export async function startObsidian() {
    const isRunning = await isObsidianRunning();
    if (isRunning) {
        return;
    }

    const cp = spawn(
        'flatpak',
        ['run', 'md.obsidian.Obsidian', '--remote-debugging-port=9222'],
        {
            detached: true,
            stdio: 'ignore',
        }
    );

    cp.unref();
}

