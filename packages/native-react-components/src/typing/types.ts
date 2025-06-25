import {
    ButtonComponent,
    ColorComponent,
    DropdownComponent,
    ExtraButtonComponent,
    MomentFormatComponent,
    ProgressBarComponent,
    SearchComponent,
    Setting as ObsidianSetting,
    SliderComponent,
    TextAreaComponent,
    TextComponent,
    ToggleComponent,
} from 'obsidian';
import { MultiDescComponent } from '../custom-components/multi-decsription/MultiDescComponent';
import { PrioritizedElement } from './interfaces';

export type SettingCallback<T> = T | PrioritizedElement<T> | undefined | false;

export type ButtonCallback = (button: ButtonComponent) => ButtonComponent;
export type DropdownCallback = (
    dropdown: DropdownComponent
) => DropdownComponent;
export type ExtraButtonCallback = (
    button: ExtraButtonComponent
) => ExtraButtonComponent;
export type MomentFormatCallback = (
    momentFormat: MomentFormatComponent
) => MomentFormatComponent;
export type SearchCallback = (search: SearchComponent) => SearchComponent;
export type SliderCallback = (slider: SliderComponent) => SliderComponent;
export type TextCallback = (text: TextComponent) => TextComponent;
export type TextAreaCallback = (
    textArea: TextAreaComponent
) => TextAreaComponent;
export type ToggleCallback = (toggle: ToggleComponent) => ToggleComponent;
export type ColorPickerCallback = (
    colorPicker: ColorComponent
) => ColorComponent;
export type ProgressBarCallback = (
    progressBar: ProgressBarComponent
) => ProgressBarComponent;
export type MultiDescCallback = (
    desc: MultiDescComponent
) => MultiDescComponent;
export type SetupSettingManuallyCallback = (
    setting: ObsidianSetting
) => ObsidianSetting;
