#!/usr/bin/env node
import { Command } from 'commander';
import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync, } from 'fs';
import { join } from 'path';
const LANG_DIR = './src/lang';
const LOCALE_DIR = join(LANG_DIR, 'locale');
const TYPES_DIR = join(LANG_DIR, 'types');
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

## Quick Start Workflow

### 1. Setup
\`\`\`bash
git clone <repository>
npm install
npm run locale:template <LANGUAGE_CODE>
\`\`\`

### 2. Translate
\`\`\`bash
cd ./src/lang/locale/<LANGUAGE_CODE>/
# Edit flat.json - translate values, keep keys unchanged
\`\`\`

### 3. Generate & Submit
\`\`\`bash
npm run locale:nest <LANGUAGE_CODE>
npm run locale:check-locales  # optional: validate your work
git add . && git commit -m "Add <LANGUAGE_CODE> translation"
# Create pull request with both flat.json and generated index.ts
\`\`\`

## Language Codes
- Visit [ISO 639-1 Language Codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
- Use two-letter codes: \`de\`, \`fr\`, \`es\`, \`ru\`
- Region variants: \`en-US\`, \`zh-CN\`, \`pt-BR\`

## Translation Rules

### ✅ DO:
- **Preserve structure**: Keep arrays and objects intact
- \`["item1", "item2"]\` → \`["элемент1", "элемент2"]\`
- **Keep variables**: Variables in \`{{brackets}}\` must stay exactly as-is
- \`"Hello {{name}}"\` → \`"Привет {{name}}"\`
- **Maintain formatting**: Keep \`\\n\` line breaks and spacing
- **Natural translation**: Translate meaning, not word-by-word

### ❌ DON'T:
- Change JSON keys (\`"settings.pages.debug"\` stays as-is)
- Translate \`{{variables}}\` inside brackets
- Reorder array elements
- Break JSON syntax (quotes, commas, brackets)

## Examples

### Simple String
\`\`\`json
"commands.togglePanels.notice.shown": "Control panels shown"
// ✅ Becomes:
"commands.togglePanels.notice.shown": "Панели управления показаны"
\`\`\`

### With Variables
\`\`\`json
"settings.debug.storage.desc": "Storage: {{storage}}, Entries: {{entries}}"
// ✅ Becomes:
"settings.debug.storage.desc": "Хранилище: {{storage}}, Записи: {{entries}}"
\`\`\`

### Array of Strings
\`\`\`json
"help.steps": [
 "Step 1: Enable feature",
 "Step 2: Configure settings",  
 "Step 3: Save changes"
]
// ✅ Becomes:
"help.steps": [
 "Шаг 1: Включить функцию",
 "Шаг 2: Настроить параметры",
 "Шаг 3: Сохранить изменения"
]
\`\`\`

## Tips
- **UI context matters**: Consider where text appears (buttons vs tooltips)
- **Length constraints**: Some UI elements have space limits - adapt accordingly
- **Consistent tone**: Match formality level of original text
- **Check existing translations**: Look at other locale folders for reference
- **Validate JSON**: Use online JSON validators if unsure about syntax

## Available Commands
- \`npm run locale:template <CODE>\` - Create new locale template
- \`npm run locale:nest <CODE>\` - Generate TypeScript from flat.json
- \`npm run locale:check-locales\` - Validate all translations
- \`npm run locale:update-all-nested\` - Bulk update all locales

## Need Help?
- Check other language folders for examples
- Open GitHub issue for questions before starting large translations
- Test your JSON syntax before submitting`;
}
async function getObjectFromTs(tsPath) {
    const content = readFileSync(tsPath, 'utf8');
    // Парсим TypeScript объявление вида:
    // const Locale: LocaleSchema = { ... };
    // const Locale : DeepPartial<LocaleSchema> = { ... };
    const objectRegex = new RegExp([
        'const\\s+', // "const" + обязательные пробелы
        '\\w+', // имя переменной (Locale)
        '\\s*', // необязательные пробелы перед двоеточием
        ':', // двоеточие
        '\\s*', // необязательные пробелы после двоеточия
        '[\\w<>[\\],\\s]+', // тип (LocaleSchema, DeepPartial<LocaleSchema>, etc)
        '\\s*', // необязательные пробелы перед равно
        '=', // знак равно
        '\\s*', // необязательные пробелы после равно
        '({[\\s\\S]*?})', // объект в скобках (захватывающая группа) - ЭТО НАМ НУЖНО
        '\\s*', // необязательные пробелы перед точкой с запятой
        ';', // точка с запятой
    ].join(''));
    const objectMatch = content.match(objectRegex);
    if (!objectMatch) {
        throw new Error(`Object declaration not found in: ${tsPath}`);
    }
    const objectString = objectMatch[1].replace(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '"$1":');
    // objectMatch[1] - это JSON объект из захватывающей группы
    return JSON.parse(objectMatch[1]);
}
async function generateTypes(nested) {
    try {
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
        const enFlatData = JSON.parse(readFileSync(enJsonPath, 'utf8'));
        const snoozedEnFlatData = Object.fromEntries(Object.entries(enFlatData).map(([key, value]) => Array.isArray(value) ? [key, []] : [key, '']));
        const newJsonPath = join(newLocaleDir, 'flat.json');
        writeFileSync(newJsonPath, JSON.stringify(snoozedEnFlatData, null, 4));
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
function sortObjectKeys(obj) {
    if (Array.isArray(obj)) {
        return obj.map(sortObjectKeys);
    }
    if (obj !== null && typeof obj === 'object') {
        const sorted = {};
        Object.keys(obj)
            .sort()
            .forEach((key) => {
            sorted[key] = sortObjectKeys(obj[key]);
        });
        return sorted;
    }
    return obj;
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
        const sortedFlatData = sortObjectKeys(flatData);
        // sort in place
        writeFileSync(jsonPath, JSON.stringify(sortedFlatData, null, 4));
        const nested = sortObjectKeys(nestifyLocale(sortedFlatData));
        const jsonString = JSON.stringify(nested, null, 4);
        const cleanJson = jsonString.replace(/"([a-zA-Z_$][a-zA-Z0-9_$]*)"\s*:/g, '$1:');
        const tsContent = `/**
 * ⚠️ AUTO-GENERATED FILE — DO NOT EDIT!
 *
 * This file was generated by the \`nest\` script from 'flat.json'.
 * To update it, run: \`npm run locale:nest <locale>\`
 */
 
 
import type { LocaleSchema } from '../../types/interfaces';
${locale !== 'en' ? `import { DeepPartial } from '../../types/definitions';\n` : ''}
           
const Locale: ${locale !== 'en' ? 'DeepPartial<LocaleSchema>' : 'LocaleSchema'}  = ${cleanJson};

export default Locale;`;
        writeFileSync(tsPath, tsContent);
        console.log(`✅ Generated ${tsPath}`);
        if (locale === 'en') {
            await generateTypes(nested);
        }
    }
    catch (error) {
        console.error(`❌ Error processing ${jsonPath}:`, error);
        process.exit(1);
    }
}
async function getLocaleStats(locale) {
    const localeDir = join(LOCALE_DIR, locale);
    const enFlatPath = join(LOCALE_DIR, 'en', 'flat.json');
    const jsonPath = join(localeDir, 'flat.json');
    if (!existsSync(enFlatPath)) {
        console.error('❌ Error: en/flat.json not found');
        process.exit(1);
    }
    if (!existsSync(jsonPath)) {
        console.warn(`⚠️ Warning: ${jsonPath} not found\n`);
        process.exit(1);
    }
    const enFlat = JSON.parse(readFileSync(enFlatPath, 'utf8'));
    const enMap = new Map(Object.entries(enFlat));
    const totalKeys = enMap.size;
    try {
        const localeFlatData = JSON.parse(readFileSync(jsonPath, 'utf8'));
        const localeFlatMap = new Map(Object.entries(localeFlatData));
        const missingData = Array.from(enMap).filter(([key, _]) => !localeFlatMap.has(key));
        const extraData = Array.from(localeFlatMap).filter(([key, _]) => !enMap.has(key));
        const localeActualMap = Array.from(localeFlatMap).filter(([key, _]) => enMap.has(key));
        const untranslatedEntries = Array.from(localeActualMap).filter(([key, value]) => value === enFlat[key] ||
            value === '' ||
            (!Array.isArray(value) ? value.trim() : value.length === 0));
        const completed = totalKeys - missingData.length - untranslatedEntries.length;
        const percentage = Math.round((completed / totalKeys) * 100 * 10) / 10;
        return {
            locale,
            completed,
            missing: missingData,
            extra: extraData,
            untranslated: untranslatedEntries,
            percentage,
            enFlat,
        };
    }
    catch (error) {
        console.error(`❌ Error validating ${jsonPath}:`, error);
        process.exit(1);
    }
}
function printSummary(total, stats) {
    if (stats.length > 0) {
        console.log('📊 Translation Progress Summary:');
        console.log(`  English: ${total}/${total} (100%) ✅`);
        stats
            .sort((a, b) => b.percentage - a.percentage)
            .forEach((result) => {
            let statusIcon = '✅';
            if (result.percentage < 50)
                statusIcon = '🔴';
            else if (result.percentage < 80)
                statusIcon = '🟡';
            const padding = ' '.repeat(8 - result.locale.length);
            const issues = [];
            if (result.missing.length > 0)
                issues.push(`${result.missing.length} missing`);
            if (result.untranslated.length > 0)
                issues.push(`${result.untranslated.length} untranslated`);
            const issuesNote = issues.length > 0 ? ` (${issues.join(', ')})` : '';
            console.log(`  ${result.locale}:${padding}${result.completed}/${total} (${result.percentage}%) ${statusIcon}${issuesNote}`);
        });
    }
}
function printCertainStats(total, result) {
    let statusIcon = '✅';
    if (result.percentage < 50)
        statusIcon = '🔴';
    else if (result.percentage < 80)
        statusIcon = '🟡';
    console.log(`${statusIcon} Locale ${result.locale}: ${result.completed}/${total} keys (${result.percentage}%) ${statusIcon}`);
    if (result.missing.length > 0) {
        console.log(`❌ Missing keys (${result.missing.length}):`);
        // Group missing keys by section for better readability
        const keysBySection = new Map();
        result.missing.forEach(([key, value]) => {
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
    if (result.untranslated.length > 0) {
        console.log(`🔄 Untranslated values (${result.untranslated.length}):`);
        result.untranslated.slice(0, 5).forEach(([key, value]) => {
            console.log(`  - ${key}: "${result.enFlat[key]}"`);
        });
        if (result.untranslated.length > 5) {
            console.log(`  ... and ${result.untranslated.length - 5} more`);
        }
    }
    if (result.extra.length > 0) {
        console.log(`⚠️ Extra keys (${result.extra.length}): ${result.extra.map(([k]) => k).join(', ')}`);
    }
    console.log(''); // Empty line between locales
}
function printTotalStats(total, results) {
    if (results.length > 0) {
        console.log('📊 Translation Stats:');
        results
            .sort((a, b) => b.percentage - a.percentage)
            .forEach((result) => {
            printCertainStats(total, result);
        });
    }
}
async function checkOneLocaleAction(locale) {
    const jsonPath = join(LOCALE_DIR, locale, 'flat.json');
    if (!existsSync(jsonPath)) {
        console.error(`❌ Error: ${locale}/flat.json not found.`);
        process.exit(1);
    }
    const enFlatPath = join(LOCALE_DIR, 'en', 'flat.json');
    if (!existsSync(enFlatPath)) {
        console.error('❌ Error: en/flat.json not found');
        process.exit(1);
    }
    const enFlat = JSON.parse(readFileSync(enFlatPath, 'utf8'));
    const enMap = new Map(Object.entries(enFlat));
    const totalKeys = enMap.size;
    const localeStats = await getLocaleStats(locale);
    printCertainStats(totalKeys, localeStats);
    console.log('📊 Summary:');
    console.log(`  ${locale}: ${localeStats.completed}/${totalKeys} (${localeStats.percentage}%)`);
}
async function checkAllLocalesAction() {
    const enFlatPath = join(LOCALE_DIR, 'en', 'flat.json');
    if (!existsSync(enFlatPath)) {
        console.error('❌ Error: en/flat.json not found');
        process.exit(1);
    }
    const enFlat = JSON.parse(readFileSync(enFlatPath, 'utf8'));
    const enMap = new Map(Object.entries(enFlat));
    const totalKeys = enMap.size;
    const locales = readdirSync(LOCALE_DIR, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory() && dirent.name !== 'en')
        .map((dirent) => dirent.name);
    const results = [];
    // Process English
    console.log(`✅ Locale en: ${totalKeys}/${totalKeys} keys (100%) ✅\n`);
    // Process other locales
    for (const locale of locales) {
        const stats = await getLocaleStats(locale);
        results.push(stats);
    }
    printTotalStats(totalKeys, results);
    printSummary(totalKeys, results);
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
// checkAllLocalesAction();
const program = new Command();
program
    .name('locale-tool')
    .description('Locale management tool for translations')
    .version('1.0.0');
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
    .command('check-locale')
    .description('Check your locale against en/flat.json')
    .argument('<locale>', 'Check your translation')
    .action(checkOneLocaleAction);
program
    .command('check-locales')
    .description('Check all locales against en/flat.json')
    .action(checkAllLocalesAction);
program
    .command('update-all-nested')
    .description('Update nested TypeScript files for all locales from their flat.json')
    .action(updateAllNested);
program.parse();
