import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import React, { useCallback, useLayoutEffect } from 'react';
import { Setting as ObsidianSetting } from 'obsidian';
import { MultiDescComponent } from '../custom-components/multi-decsription/MultiDescComponent';
import { SettingWrapper } from '../styled/setting-wrapper';
import { createRoot } from 'react-dom/client';
function isPrioritizedElement(element) {
    return undefined !== element.priority;
}
export const ReactObsidianSetting = ({ name, desc, setHeading, setDisabled, setTooltip, noBorder, class: className, toggles, texts, textAreas, momentFormats, dropdowns, searches, buttons, extraButtons, sliders, colorPickers, progressBars, multiDesc, setupSettingManually, children }) => {
    const settingRef = React.useRef(null);
    const containerRef = React.useRef(null);
    const setupSetting = useCallback((setting) => {
        if (setupSettingManually) {
            setupSettingManually(setting);
        }
        if (name) {
            setting.setName(name);
        }
        if (desc) {
            setting.setDesc(desc);
        }
        if (setTooltip) {
            setting.setTooltip(setTooltip);
        }
        if (multiDesc) {
            const callback = isPrioritizedElement(multiDesc)
                ? multiDesc.callback
                : multiDesc;
            const descContainer = document.createElement('div');
            descContainer.addClass('setting-item-description');
            if (setting.infoEl) {
                setting.infoEl.appendChild(descContainer);
            }
            const multiDescComponent = new MultiDescComponent({
                containerEl: descContainer,
            });
            callback(multiDescComponent);
        }
        if (setHeading) {
            setting.setHeading();
        }
        if (className) {
            setting.setClass(className);
        }
        const elements = [
            ...(toggles?.map((toggle, index) => ({
                type: 'toggle',
                callback: isPrioritizedElement(toggle)
                    ? toggle.callback
                    : toggle,
                priority: isPrioritizedElement(toggle)
                    ? toggle.priority
                    : 0,
                originalIndex: index,
            })) ?? []),
            ...(texts?.map((text, index) => ({
                type: 'text',
                callback: isPrioritizedElement(text) ? text.callback : text,
                priority: isPrioritizedElement(text) ? text.priority : 0,
                originalIndex: index,
            })) ?? []),
            ...(textAreas?.map((textArea, index) => ({
                type: 'textArea',
                callback: isPrioritizedElement(textArea)
                    ? textArea.callback
                    : textArea,
                priority: isPrioritizedElement(textArea)
                    ? textArea.priority
                    : 0,
                originalIndex: index,
            })) ?? []),
            ...(momentFormats?.map((format, index) => ({
                type: 'momentFormat',
                callback: isPrioritizedElement(format)
                    ? format.callback
                    : format,
                priority: isPrioritizedElement(format)
                    ? format.priority
                    : 0,
                originalIndex: index,
            })) ?? []),
            ...(dropdowns?.map((dropdown, index) => ({
                type: 'dropdown',
                callback: isPrioritizedElement(dropdown)
                    ? dropdown.callback
                    : dropdown,
                priority: isPrioritizedElement(dropdown)
                    ? dropdown.priority
                    : 0,
                originalIndex: index,
            })) ?? []),
            ...(searches?.map((search, index) => ({
                type: 'search',
                callback: isPrioritizedElement(search)
                    ? search.callback
                    : search,
                priority: isPrioritizedElement(search)
                    ? search.priority
                    : 0,
                originalIndex: index,
            })) ?? []),
            ...(colorPickers?.map((colorPicker, index) => ({
                type: 'colorPicker',
                callback: isPrioritizedElement(colorPicker)
                    ? colorPicker.callback
                    : colorPicker,
                priority: isPrioritizedElement(colorPicker)
                    ? colorPicker.priority
                    : 0,
                originalIndex: index,
            })) ?? []),
            ...(progressBars?.map((progressBar, index) => ({
                type: 'progressBar',
                callback: isPrioritizedElement(progressBar)
                    ? progressBar.callback
                    : progressBar,
                priority: isPrioritizedElement(progressBar)
                    ? progressBar.priority
                    : 0,
                originalIndex: index,
            })) ?? []),
            ...(buttons?.map((button, index) => ({
                type: 'button',
                callback: isPrioritizedElement(button)
                    ? button.callback
                    : button,
                priority: isPrioritizedElement(button)
                    ? button.priority
                    : 9,
                originalIndex: index,
            })) ?? []),
            ...(extraButtons?.map((button, index) => ({
                type: 'extraButton',
                callback: isPrioritizedElement(button)
                    ? button.callback
                    : button,
                priority: isPrioritizedElement(button)
                    ? button.priority
                    : 10,
                originalIndex: index,
            })) ?? []),
            ...(sliders?.map((slider, index) => ({
                type: 'slider',
                callback: isPrioritizedElement(slider)
                    ? slider.callback
                    : slider,
                priority: isPrioritizedElement(slider)
                    ? slider.priority
                    : 0,
                originalIndex: index,
            })) ?? []),
        ].filter((element) => element.callback !== undefined && element.callback !== false);
        const sortedElements = elements.sort((a, b) => {
            if (a.priority === b.priority) {
                return a.originalIndex - b.originalIndex;
            }
            return a.priority - b.priority;
        });
        sortedElements.forEach((element) => {
            switch (element.type) {
                case 'toggle':
                    setting.addToggle(element.callback);
                    break;
                case 'text':
                    setting.addText(element.callback);
                    break;
                case 'textArea':
                    setting.addTextArea(element.callback);
                    break;
                case 'momentFormat':
                    setting.addMomentFormat(element.callback);
                    break;
                case 'dropdown':
                    setting.addDropdown(element.callback);
                    break;
                case 'search':
                    setting.addSearch(element.callback);
                    break;
                case 'colorPicker':
                    setting.addColorPicker(element.callback);
                    break;
                case 'progressBar':
                    setting.addProgressBar(element.callback);
                    break;
                case 'button':
                    setting.addButton(element.callback);
                    break;
                case 'extraButton':
                    setting.addExtraButton(element.callback);
                    break;
                case 'slider':
                    setting.addSlider(element.callback);
                    break;
            }
        });
        setting.setDisabled(!!setDisabled);
        if (children && setting.controlEl) {
            const childrenContainer = document.createElement('div');
            childrenContainer.addClass('react-children-container');
            setting.controlEl.appendChild(childrenContainer);
            const root = createRoot(childrenContainer);
            root.render(_jsx(_Fragment, { children: children }));
            // Сохраняем root для cleanup
            setting._childrenRoot = root;
        }
    }, [
        name,
        desc,
        setHeading,
        setDisabled,
        setTooltip,
        className,
        toggles,
        texts,
        textAreas,
        momentFormats,
        dropdowns,
        searches,
        buttons,
        extraButtons,
        sliders,
        colorPickers,
        progressBars,
        multiDesc,
        setupSettingManually,
        children
    ]);
    useLayoutEffect(() => {
        if (!containerRef.current) {
            return;
        }
        settingRef.current?.clear();
        containerRef.current.empty();
        settingRef.current = new ObsidianSetting(containerRef.current);
        setupSetting(settingRef.current);
        return () => {
            if (settingRef.current && settingRef.current._childrenRoot) {
                settingRef.current._childrenRoot.unmount();
            }
            settingRef.current?.clear();
            containerRef.current?.empty();
        };
    }, [
        name,
        desc,
        setHeading,
        setDisabled,
        setTooltip,
        noBorder,
        className,
        toggles,
        texts,
        textAreas,
        momentFormats,
        dropdowns,
        searches,
        buttons,
        extraButtons,
        sliders,
        colorPickers,
        progressBars,
        multiDesc,
        setupSettingManually,
    ]);
    return (_jsx(SettingWrapper, { "$noBorder": noBorder, ref: containerRef, className: `react-obsidian-settings-item ${className ?? ''}` }));
};
