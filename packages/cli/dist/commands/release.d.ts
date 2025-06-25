/**
 * Asynchronously sets the release version by iterating through a loop to handle user input.
 *
 * The function prompts the user to enter a new version number, provides options for confirmation,
 * and executes Git commands to update the plugin version in package.json and manifest.json files.
 *
 * @returns A Promise that resolves when the release process is completed.
 */
export declare function release(): Promise<void>;
