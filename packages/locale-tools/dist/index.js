#!/usr/bin/env node
import { Command } from 'commander';
import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync, } from 'fs';
import { execSync } from 'node:child_process';
import { unlinkSync } from 'node:fs';
import { join } from 'path';
import { pathToFileURL } from 'url';
const LANG_DIR = './src/lang';
const LOCALE_DIR = join(LANG_DIR, 'locale');
const TYPES_DIR = join(LANG_DIR, 'types/interfaces.ts');
const INTERFACES_FILE = join(TYPES_DIR, 'interfaces.ts');
function flattenLocale(nested) {
    const result = {};
    function traverse(obj, path = '') {
        for (const [key, value] of Object.entries(obj)) {
            const currentPath = path ? `${path}.${key}` : key;
            if (Array.isArray(value)) {
                result[currentPath] = value;
            }
            else if (typeof value === 'object' && value !== null) {
                traverse(value, currentPath);
            }
            else if (typeof value === 'string') {
                result[currentPath] = value;
            }
        }
    }
    traverse(nested);
    return result;
}
function nestifyLocale(flat) {
    const result = {};
    for (const [path, value] of Object.entries(flat)) {
        const keys = path.split('.');
        let current = result;
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            current[key] ??= {};
            current = current[key];
        }
        const lastKey = keys[keys.length - 1];
        current[lastKey] = value;
    }
    return result;
}
function generateTypesFromNest(nest) {
    const interfaceLines = [];
    function traverse(obj, indent = 1, path = '') {
        for (const [key, value] of Object.entries(obj)) {
            const indentStr = '    '.repeat(indent);
            const currentPath = path ? `${path}.${key}` : key;
            if (Array.isArray(value)) {
                interfaceLines.push(`${indentStr}${key}: string[];`);
            }
            else if (typeof value === 'object' && value !== null) {
                interfaceLines.push(`${indentStr}${key}: {`);
                traverse(value, indent + 1, currentPath);
                interfaceLines.push(`${indentStr}};`);
            }
            else if (typeof value === 'string') {
                interfaceLines.push(`${indentStr}${key}: string;`);
            }
        }
    }
    traverse(nest);
    return `export interface LocaleSchema {\n${interfaceLines.join('\n')}\n}`;
}
function getTranslationGuide() {
    return `# Translation Guide

## Getting Started

### 1. Find Your Language Code
- Visit [ISO 639-1 Language Codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) to find your language code
- Use the two-letter code (e.g., \`de\` for German, \`fr\` for French, \`es\` for Spanish)
- For region-specific variants, use format like \`en-US\`, \`zh-CN\`, \`pt-BR\`

### 2. Start Translating
1. Open \`flat.json\` in this folder
2. Translate the **values** (keep the keys unchanged)
3. When done, run: \`npm run locale nest ${process.argv[3] || 'your-locale'}\`

### 3. Submit Your Translation
- Create a pull request with your locale folder
- Include both \`flat.json\` and generated \`index.ts\`

## Translation Rules

### ✅ DO:
- **Preserve structure**: Keep array and object structures intact
 - \`["item1", "item2"]\` → \`["элемент1", "элемент2"]\`
- **Keep variables untouched**: Variables in \`{{brackets}}\` must remain exactly as they are
 - \`"Hello {{name}}"\` → \`"Привет {{name}}"\`
- **Maintain line breaks**: Keep \`\\n\` for multi-line messages
- **Respect key hierarchy**: Keys like \`"settings.pages.debug"\` show UI component structure

### ❌ DON'T:
- Change or remove JSON keys
- Translate variables in \`{{brackets}}\`
- Reorder array elements
- Break JSON syntax (missing quotes, commas, brackets)

## Examples

### Simple String
\`\`\`json
"commands.togglePanels.notice.shown": "Control panels shown"
// ✅ Should become:
"commands.togglePanels.notice.shown": "Панели управления показаны"
\`\`\`

### String with Variables
\`\`\`json
"settings.pages.debug.clearLogsStorage.desc": "Storage: {{storage}}, Entries: {{entries}}"
// ✅ Should become:
"settings.pages.debug.clearLogsStorage.desc": "Хранилище: {{storage}}, Записи: {{entries}}"
\`\`\`

### Array of Strings
\`\`\`json
"settings.pages.debug.reportIssue.desc": [
  "If you encounter any issues, please report them.",
  "How to report:",
  "1. Enable debug logging"
]
// ✅ Should become:
"settings.pages.debug.reportIssue.desc": [
  "Если у вас возникли проблемы, сообщите о них.",
  "Как сообщить:",
  "1. Включите отладочное логирование"
]
\`\`\`

## Best Practices

- **Natural translation**: Translate the meaning, not word-by-word
- **Keep UI context**: Consider where the text appears (buttons, tooltips, messages)
- **Test length**: Some UI elements have space constraints - shorten if needed
- **Maintain tone**: Keep the same level of formality as the original
- **Handle pluralization**: Adapt to your language's plural rules

## Need Help?
- Check existing translations in other language folders for reference
- Ask questions in GitHub issues before starting large translations
- Test your JSON syntax using online JSON validators`;
}
async function generateTypes() {
    const enLocaleDir = join(LOCALE_DIR, 'en');
    const jsonPath = join(enLocaleDir, 'flat.json');
    const tsPath = join(enLocaleDir, 'index.ts');
    if (!existsSync(jsonPath)) {
        console.error('❌ Error: en/flat.json not found. Run "flat en" first.');
        process.exit(1);
    }
    try {
        const fullPath = pathToFileURL(join(process.cwd(), tsPath)).href;
        const tempScript = `
import module from '${fullPath}';
console.log(JSON.stringify(module));
`;
        writeFileSync('./temp-import.mjs', tempScript);
        const result = execSync('npx tsx ./temp-import.mjs', {
            encoding: 'utf-8',
        });
        unlinkSync('./temp-import.mjs');
        const nested = JSON.parse(result.trim());
        const types = generateTypesFromNest(nested);
        if (!existsSync(TYPES_DIR)) {
            mkdirSync(TYPES_DIR, { recursive: true });
        }
        writeFileSync(INTERFACES_FILE, types);
        console.log(`✅ Generated ${INTERFACES_FILE}`);
    }
    catch (error) {
        console.error('❌ Error generating types:', error);
        process.exit(1);
    }
}
async function createTemplate(locale) {
    const enLocaleDir = join(LOCALE_DIR, 'en');
    const enJsonPath = join(enLocaleDir, 'flat.json');
    if (!existsSync(enJsonPath)) {
        console.error('❌ Error: en/flat.json not found. Run "flat en" first.');
        process.exit(1);
    }
    const newLocaleDir = join(LOCALE_DIR, locale);
    if (existsSync(newLocaleDir)) {
        console.error(`❌ Error: Locale "${locale}" already exists`);
        process.exit(1);
    }
    try {
        mkdirSync(newLocaleDir, { recursive: true });
        // Копируем flat.json из en
        const enFlatData = readFileSync(enJsonPath, 'utf8');
        const newJsonPath = join(newLocaleDir, 'flat.json');
        writeFileSync(newJsonPath, enFlatData);
        // Создаём гайд
        const guidePath = join(newLocaleDir, 'TRANSLATION_GUIDE.md');
        writeFileSync(guidePath, getTranslationGuide());
        console.log(`✅ Created locale template: ${newLocaleDir}/`);
        console.log(`📄 Files created:`);
        console.log(`   - flat.json (copy from en, ready for translation)`);
        console.log(`   - TRANSLATION_GUIDE.md (translation instructions)`);
        console.log(`\n🚀 Next steps:`);
        console.log(`   1. Edit ${locale}/flat.json - translate the values`);
        console.log(`   2. Run: npm run locale nest ${locale}`);
        console.log(`   3. Test your translation in the app`);
    }
    catch (error) {
        console.error('❌ Error creating template:', error);
        process.exit(1);
    }
}
async function flattenAction(locale) {
    const localeDir = join(LOCALE_DIR, locale);
    const tsPath = join(localeDir, 'index.ts');
    const jsonPath = join(localeDir, 'flat.json');
    const readmePath = join(localeDir, 'TRANSLATION_GUIDE.md');
    if (!existsSync(tsPath)) {
        console.error(`❌ Error: ${tsPath} not found`);
        process.exit(1);
    }
    try {
        const fullPath = pathToFileURL(join(process.cwd(), tsPath)).href;
        const module = await import(fullPath + '?t=' + Date.now());
        const nested = module.default;
        const flat = flattenLocale(nested);
        writeFileSync(jsonPath, JSON.stringify(flat, null, 2));
        if (locale === 'en') {
            writeFileSync(readmePath, getTranslationGuide());
            console.log(`✅ Generated ${readmePath}`);
        }
        console.log(`✅ Generated ${jsonPath}`);
    }
    catch (error) {
        console.error(`❌ Error processing ${tsPath}:`, error);
        process.exit(1);
    }
}
async function nestifyAction(locale) {
    const localeDir = join(LOCALE_DIR, locale);
    const jsonPath = join(localeDir, 'flat.json');
    const tsPath = join(localeDir, 'index.ts');
    if (!existsSync(jsonPath)) {
        console.error(`❌ Error: ${jsonPath} not found`);
        process.exit(1);
    }
    try {
        const flatData = JSON.parse(readFileSync(jsonPath, 'utf8'));
        const nested = nestifyLocale(flatData);
        const tsContent = `import type { LocaleSchema } from '../_types/interfaces';
${locale !== 'en' ? `import { DeepPartial } from '../../types/definitions';\n` : ''}
           
const Locale: ${locale !== 'en' ? 'DeepPartial<LocaleSchema>' : 'LocaleSchema'}  = ${JSON.stringify(nested, null, 4)};

export default Locale;`;
        writeFileSync(tsPath, tsContent);
        console.log(`✅ Generated ${tsPath}`);
        if (locale === 'en') {
            await generateTypes();
        }
    }
    catch (error) {
        console.error(`❌ Error processing ${jsonPath}:`, error);
        process.exit(1);
    }
}
async function checkAllLocalesAction() {
    const enFlatPath = join(LOCALE_DIR, 'en', 'flat.json');
    if (!existsSync(enFlatPath)) {
        console.error('❌ Error: en/flat.json not found');
        process.exit(1);
    }
    const enFlat = JSON.parse(readFileSync(enFlatPath, 'utf8'));
    const enKeys = new Set(Object.keys(enFlat));
    const totalKeys = enKeys.size;
    const locales = readdirSync(LOCALE_DIR, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory() &&
        dirent.name !== 'en' &&
        dirent.name !== '_types')
        .map((dirent) => dirent.name);
    const results = [];
    // Process English
    console.log(`✅ Locale en: ${totalKeys}/${totalKeys} keys (100%) ✅\n`);
    // Process other locales
    for (const locale of locales) {
        const jsonPath = join(LOCALE_DIR, locale, 'flat.json');
        if (!existsSync(jsonPath)) {
            console.warn(`⚠️ Warning: ${jsonPath} not found\n`);
            continue;
        }
        try {
            const flatData = JSON.parse(readFileSync(jsonPath, 'utf8'));
            const flatKeys = new Set(Object.keys(flatData));
            const missingKeys = [...enKeys].filter((key) => !flatKeys.has(key));
            const extraKeys = [...flatKeys].filter((key) => !enKeys.has(key));
            const completed = totalKeys - missingKeys.length;
            const percentage = Math.round((completed / totalKeys) * 100 * 10) / 10;
            results.push({
                locale,
                completed,
                missing: missingKeys,
                extra: extraKeys,
                percentage,
            });
            // Status icon based on completion
            let statusIcon = '✅';
            if (percentage < 50)
                statusIcon = '🔴';
            else if (percentage < 80)
                statusIcon = '🟡';
            console.log(`${statusIcon} Locale ${locale}: ${completed}/${totalKeys} keys (${percentage}%) ${statusIcon}`);
            if (missingKeys.length > 0) {
                console.log(`❌ Missing keys:`);
                // Group missing keys by section for better readability
                const keysBySection = new Map();
                missingKeys.forEach((key) => {
                    const section = key.split('.').slice(0, 2).join('.');
                    if (!keysBySection.has(section)) {
                        keysBySection.set(section, []);
                    }
                    keysBySection.get(section).push(key);
                });
                keysBySection.forEach((keys, section) => {
                    if (keys.length === 1) {
                        console.log(`  - ${keys[0]}`);
                    }
                    else if (keys.length <= 3) {
                        keys.forEach((key) => console.log(`  - ${key}`));
                    }
                    else {
                        console.log(`  - ${section}.* (${keys.length} keys missing)`);
                        console.log(`    Examples: ${keys
                            .slice(0, 2)
                            .map((k) => k.split('.').pop())
                            .join(', ')}...`);
                    }
                });
            }
            if (extraKeys.length > 0) {
                console.log(`⚠️ Extra keys: ${extraKeys.join(', ')}`);
            }
            console.log(''); // Empty line between locales
        }
        catch (error) {
            console.error(`❌ Error validating ${jsonPath}:`, error);
        }
    }
    // Summary report
    if (results.length > 0) {
        console.log('📊 Translation Progress Summary:');
        console.log(`  English: ${totalKeys}/${totalKeys} (100%) ✅`);
        results
            .sort((a, b) => b.percentage - a.percentage)
            .forEach((result) => {
            let statusIcon = '✅';
            if (result.percentage < 50)
                statusIcon = '🔴';
            else if (result.percentage < 80)
                statusIcon = '🟡';
            const padding = ' '.repeat(8 - result.locale.length);
            console.log(`  ${result.locale}:${padding}${result.completed}/${totalKeys} (${result.percentage}%) ${statusIcon}`);
        });
        const avgCompletion = Math.round((results.reduce((sum, r) => sum + r.percentage, 0) /
            results.length) *
            10) / 10;
        console.log(`\n📈 Average completion: ${avgCompletion}%`);
    }
}
async function updateAllNested() {
    const locales = readdirSync(LOCALE_DIR, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory() && dirent.name !== '_types')
        .map((dirent) => dirent.name);
    for (const locale of locales) {
        try {
            await nestifyAction(locale);
            console.log(`✅ Updated nested structure for locale: ${locale}\n`);
        }
        catch (error) {
            console.error(`❌ Error updating locale ${locale}:`, error);
        }
    }
}
const program = new Command();
program
    .name('locale-tool')
    .description('Locale management tool for translations')
    .version('1.0.0');
program
    .command('flat')
    .argument('<locale>', 'locale code (e.g., en, ru, de)')
    .description('Convert TypeScript locale to flat JSON format')
    .action(flattenAction);
program
    .command('nest')
    .argument('<locale>', 'locale code (e.g., en, ru, de)')
    .description('Convert flat JSON to nested TypeScript format')
    .action(nestifyAction);
program
    .command('types')
    .description('Generate TypeScript interfaces from en/flat.json')
    .action(generateTypes);
program
    .command('template')
    .argument('<locale>', 'new locale code (e.g., de, fr, es)')
    .description('Create new locale template from en/flat.json')
    .action(createTemplate);
program
    .command('check-all')
    .description('Check all locales against en/flat.json')
    .action(checkAllLocalesAction);
program
    .command('update-all-nested')
    .description('Update nested TypeScript files for all locales from their flat.json')
    .action(updateAllNested);
program.parse();
