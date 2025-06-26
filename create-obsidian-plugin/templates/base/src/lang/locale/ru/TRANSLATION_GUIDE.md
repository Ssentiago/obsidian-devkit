# Translation Guide

## Getting Started

### 1. Find Your Language Code
- Visit [ISO 639-1 Language Codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) to find your language code
- Use the two-letter code (e.g., `de` for German, `fr` for French, `es` for Spanish)
- For region-specific variants, use format like `en-US`, `zh-CN`, `pt-BR`

### 2. Start Translating
1. Open `flat.json` in this folder
2. Translate the **values** (keep the keys unchanged)
3. When done, run: `npm run locale nest ru`

### 3. Submit Your Translation
- Create a pull request with your locale folder
- Include both `flat.json` and generated `index.ts`

## Translation Rules

### ✅ DO:
- **Preserve structure**: Keep array and object structures intact
 - `["item1", "item2"]` → `["элемент1", "элемент2"]`
- **Keep variables untouched**: Variables in `{{brackets}}` must remain exactly as they are
 - `"Hello {{name}}"` → `"Привет {{name}}"`
- **Maintain line breaks**: Keep `\n` for multi-line messages
- **Respect key hierarchy**: Keys like `"settings.pages.debug"` show UI component structure

### ❌ DON'T:
- Change or remove JSON keys
- Translate variables in `{{brackets}}`
- Reorder array elements
- Break JSON syntax (missing quotes, commas, brackets)

## Examples

### Simple String
```json
"commands.togglePanels.notice.shown": "Control panels shown"
// ✅ Should become:
"commands.togglePanels.notice.shown": "Панели управления показаны"
```

### String with Variables
```json
"settings.pages.debug.clearLogsStorage.desc": "Storage: {{storage}}, Entries: {{entries}}"
// ✅ Should become:
"settings.pages.debug.clearLogsStorage.desc": "Хранилище: {{storage}}, Записи: {{entries}}"
```

### Array of Strings
```json
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
```

## Best Practices

- **Natural translation**: Translate the meaning, not word-by-word
- **Keep UI context**: Consider where the text appears (buttons, tooltips, messages)
- **Test length**: Some UI elements have space constraints - shorten if needed
- **Maintain tone**: Keep the same level of formality as the original
- **Handle pluralization**: Adapt to your language's plural rules

## Need Help?
- Check existing translations in other language folders for reference
- Ask questions in GitHub issues before starting large translations
- Test your JSON syntax using online JSON validators