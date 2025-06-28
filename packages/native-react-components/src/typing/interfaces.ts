import { Setting as ObsidianSetting } from 'obsidian';

import {
    MomentFormatCallback,
    MultiDescCallback,
    SearchCallback,
    SliderCallback,
    TextAreaCallback,
    TextCallback,
    ToggleCallback,
    ButtonCallback,
    DropdownCallback,
    ExtraButtonCallback,
    SettingCallback,
    SetupSettingManuallyCallback,
    ColorPickerCallback,
    ProgressBarCallback,
} from './types';

export interface ReactSetting extends ObsidianSetting {}

export interface SettingProps {
    desc?: string;
    name?: string;
    multiDesc?: SettingCallback<MultiDescCallback>;
    class?: string;
    setHeading?: boolean;
    setDisabled?: boolean;
    setTooltip?: string;
    noBorder?: boolean;
    setupSettingManually?: SetupSettingManuallyCallback;
    buttons?: SettingCallback<ButtonCallback>[];
    extraButtons?: SettingCallback<ExtraButtonCallback>[];
    texts?: SettingCallback<TextCallback>[];
    textAreas?: SettingCallback<TextAreaCallback>[];
    dropdowns?: SettingCallback<DropdownCallback>[];
    toggles?: SettingCallback<ToggleCallback>[];
    momentFormats?: SettingCallback<MomentFormatCallback>[];
    searches?: SettingCallback<SearchCallback>[];
    sliders?: SettingCallback<SliderCallback>[];
    colorPickers?: SettingCallback<ColorPickerCallback>[];
    progressBars?: SettingCallback<ProgressBarCallback>[];
}

export interface PrioritizedElement<T> {
    callback: T;
    priority: number;
}

export interface SettingElement {
    type: string;
    callback: any;
    priority: number;
    originalIndex: number;
}
