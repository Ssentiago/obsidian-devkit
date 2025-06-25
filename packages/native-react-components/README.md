# React Obsidian Setting Component

A declarative React wrapper for Obsidian's native Setting component.

## Why?

When developing Obsidian plugins with React, working with the native Setting object traditionally requires either:
- Passing `containerEl` directly to React components (non-idiomatic)
- Using multiple `useEffect` and `useRef` hooks (verbose and complex)

This wrapper provides a clean, declarative React-style API for creating native Obsidian settings.

## Usage Example

### Traditional Approach
```jsx
const Page = () => {
    const ref = useRef<HTMLElement | null>(null)
    useEffect(() => {
        if (ref.current) {
            const containerEl = ref.current as HTMLElement;
            new Setting(containerEl).addButton((button) => {
                button.setIcon('save')
            })
            // ... and so on
        }
    }, [ref])
    
    return <div ref={ref}></div>
}
```

### With ReactObsidianSetting

```jsx
const Page = () => {
    return (
        <ReactObsidianSetting
            name='Name'
            addButtons={[
                (button) => button.setIcon('save')
            ]}
        />
    )
}
```


# API Documentation

## Basic Props

### `name`
- Type: `string`
- Optional
- The name/title of the setting
- Example:
```tsx
<ReactObsidianSetting name="Enable Feature" />
```

### `desc`
- Type: `string`
- Optional
- The description text of the setting
- Example:
```tsx
<ReactObsidianSetting 
    name="Enable Feature"
    desc="Enable or disable this awesome feature"
/>
```

### `class`
- Type: `string`
- Optional
- Additional CSS class(es) to apply to the setting
- Example:
```tsx
<ReactObsidianSetting 
    name="Feature Settings"
    class="custom-setting-style"
/>
```

### `setHeading`
- Type: `boolean`
- Optional
- When true, renders the setting as a heading
- Example:
```tsx
<ReactObsidianSetting 
    name="Settings Section"
    setHeading={true}
/>
```

### `setDisabled`
- Type: `boolean`
- Optional
- When true, disables the setting
- Example:
```tsx
<ReactObsidianSetting 
    name="Premium Feature"
    setDisabled={!isPremiumUser}
/>
```

### `noBorder`
- Type: `boolean`
- Optional
- When true, removes the bottom border from the setting
- Example:
```tsx
<ReactObsidianSetting 
    name="Borderless Setting"
    noBorder={true}
/>
```


## Advanced Props

### setupSettingManually
- Type: `(setting: ObsidianSetting) => ObsidianSetting`
- Optional
- Takes a callback and returns a Setting object that users can configure themselves, in a declarative Obsidian-like style
- Example:
```tsx
<ReactObsidianSetting 
    name="Custom Setting"
    setupSettingManually={(setting) => {
        setting.setName('Custom Setting');
        setting.setDesc('This is a custom setting');
        return setting
    }}
/>
```

### `addButtons`
- Type: `SettingCallback<ButtonCallback>[]`
- Add button elements
- Example:
```tsx
<ReactObsidianSetting
    name="Actions"
    addButtons={[
        (button) => button
            .setButtonText("Save Changes")
            .onClick(() => saveChanges())
    ]}
/>
```

### `addExtraButtons`
- Type: `SettingCallback<ExtraButtonCallback>[]`
- Add extra button elements
- Example:
```tsx
<ReactObsidianSetting
    name="Additional Actions"
    addExtraButtons={[
        (button) => button
            .setIcon("trash")
            .onClick(() => deleteItem())
    ]}
/>
```

### `addTexts`
- Type: `SettingCallback<TextCallback>[]`
- Add text input fields
- Example:
```tsx
<ReactObsidianSetting
    name="API Configuration"
    addTexts={[
        (text) => text
            .setPlaceholder("Enter API key")
            .setValue(settings.apiKey)
            .onChange((value) => {
                settings.apiKey = value;
            })
    ]}
/>
```

### `addTextAreas`
- Type: `SettingCallback<TextAreaCallback>[]`
- Add textarea input fields
- Example:
```tsx
<ReactObsidianSetting
    name="Custom Notes"
    addTextAreas={[
        (textarea) => textarea
            .setPlaceholder("Enter your notes")
            .setValue(settings.notes)
            .onChange((value) => {
                settings.notes = value;
            })
    ]}
/>
```

### `addDropdowns`
- Type: `SettingCallback<DropdownCallback>[]`
- Add dropdown menus
- Example:
```tsx
<ReactObsidianSetting
    name="Theme Selection"
    addDropdowns={[
        (dropdown) => dropdown
            .addOptions({
                light: "Light Theme",
                dark: "Dark Theme",
                system: "System Default"
            })
            .setValue(settings.theme)
            .onChange((value) => {
                settings.theme = value;
            })
    ]}
/>
```

### `addToggles`
- Type: `SettingCallback<ToggleCallback>[]`
- Add toggle switches to the setting
- Example:
```tsx
<ReactObsidianSetting
    name="Feature Toggle"
    addToggles={[
        (toggle) => toggle
            .setValue(settings.enabled)
            .onChange((value) => {
                settings.enabled = value;
            })
    ]}
/>
```

### `addMomentFormats`
- Type: `SettingCallback<MomentFormatCallback>[]`
- Add moment format selectors to the setting
- Example:
```tsx
<ReactObsidianSetting
    name="Date Format"
    addMomentFormats={[
        (momentFormat) => momentFormat
            .setValue(settings.dateFormat)
            .onChange((value) => {
                // ...
            })
    ]}
/>
```
### `addSearches`
- Type: `SettingCallback<SearchCallback>[]`
- Add search boxes to the setting
- Example:
```tsx
<ReactObsidianSetting
    name="Search"
    addSearches={[
        (search) => search
            .setValue('value')
            .onChange((value) => {
                // ...
            })
    ]}
/>
```

### `addSliders`
- Type: `SettingCallback<SliderCallback>[]`
- Add sliders to the setting
- Example:
```tsx
<ReactObsidianSetting
    name="Slider"
    addSliders={[
        (slider) => slider
            .setValue(50)
            .onChange((value) => {
                // ...
            })
    ]}
/>
```

### `addColorPickers`
- Type: `SettingCallback<ColorPickerCallback>[]`
- Add color pickers to the setting
- Example:
```tsx
<ReactObsidianSetting
    name="Color Picker"
    addColorPickers={[
        (colorPicker) => colorPicker
            .setValue("#ff0000")
            .onChange((value) => {
                // ...
            })
    ]}
/>
```

### `addProgressBars`
- Type: `SettingCallback<ProgressBarCallback>[]`
- Add progress bars to the setting
- Example:
```tsx
<ReactObsidianSetting
    name="Progress Bar"
    addProgressBars={[
        (progressBar) => progressBar
            .setValue(50)
            .onChange((value) => {
                // ...
            })
    ]}
/>
```

### `addMultiDesc`
- Type: `SettingCallback<MultiDescCallback>`
- Add multiple descriptions
- Example:
```tsx
<ReactObsidianSetting
    name="Complex Setting"
    addMultiDesc={{
        callback: (multiDesc) => multiDesc.addDescriptions([
            "This is the first line of description",
            "This setting affects multiple features",
            "Please read carefully before changing"
        ])
    }}
/>
```

### Priority System

You can control the rendering order of components using priorities. Components with lower priority numbers render first:

```tsx
<ReactObsidianSetting
    name="Prioritized Components"
    addButtons={[
        {
            callback: (button) => button
                .setButtonText("Secondary Action"),
            priority: 2
        },
        {
            callback: (button) => button
                .setButtonText("Primary Action"),
            priority: 1
        }
    ]}
/>
```

## Notes

1. The component handles cleanup automatically when unmounting or when props change.
2. All callback props accept `false` or `undefined` to skip adding that component.
3. CSS classes can be added both through the `class` prop and through individual component callbacks.
4. The component is fully typed for TypeScript support.
