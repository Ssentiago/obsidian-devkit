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
    class?: string;
    setHeading?: boolean;
    setDisabled?: boolean;
    setTooltip?: string,
    noBorder?: boolean;
    setupSettingManually?: SetupSettingManuallyCallback;
    addButtons?: SettingCallback<ButtonCallback>[];
    addExtraButtons?: SettingCallback<ExtraButtonCallback>[];
    addTexts?: SettingCallback<TextCallback>[];
    addTextAreas?: SettingCallback<TextAreaCallback>[];
    addDropdowns?: SettingCallback<DropdownCallback>[];
    addToggles?: SettingCallback<ToggleCallback>[];
    addMomentFormats?: SettingCallback<MomentFormatCallback>[];
    addSearches?: SettingCallback<SearchCallback>[];
    addSliders?: SettingCallback<SliderCallback>[];
    addColorPickers?: SettingCallback<ColorPickerCallback>[];
    addProgressBars?: SettingCallback<ProgressBarCallback>[];
    addMultiDesc?: SettingCallback<MultiDescCallback>;
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
