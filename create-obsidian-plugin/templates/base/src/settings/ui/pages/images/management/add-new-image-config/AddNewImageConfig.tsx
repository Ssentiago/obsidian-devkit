import { FC, useRef, useState } from 'react';

import {
    MultiDescComponent,
    ReactObsidianSetting,
} from '@obsidian-devtoolkit/native-react-components';
import {
    ButtonComponent,
    ExtraButtonComponent,
    Platform,
    TextComponent,
} from 'obsidian';

import { t } from '../../../../../../lang';
import { useSettingsContext } from '../../../../core/SettingsContext';
import { useUnitsHistoryContext } from '../context/HistoryContext';
import { useUnitsManagerContext } from '../context/UnitsManagerContext';
import { useUnitsValidation } from '../hooks/useUnitsValidation';
import UserGuideModal from './modals/UserGuideModal';

const AddNewImageConfig: FC = () => {
    const { plugin } = useSettingsContext();
    const [guideOpen, setGuideOpen] = useState(false);
    const {
        validateSelector,
        validateBoth,
        validateName,
        processSelectorValidation,
        processNameValidation,
        processBothValidation,
    } = useUnitsValidation();

    const { units, saveUnits } = useUnitsManagerContext();

    const { updateUndoStack } = useUnitsHistoryContext();
    const addingUnitWrapperRef = useRef<HTMLInputElement>(null);

    const handleAddUnit = async (): Promise<void> => {
        if (addingUnitWrapperRef.current === null) {
            return;
        }
        const nameInput = addingUnitWrapperRef.current.querySelector(
            '#unit-name'
        ) as HTMLInputElement | null;

        const selectorInput = addingUnitWrapperRef.current.querySelector(
            '#unit-selector'
        ) as HTMLInputElement | null;

        if (!nameInput || !selectorInput) {
            return;
        }

        const validationResult = validateBoth(
            nameInput.value,
            selectorInput.value
        );

        const validated = processBothValidation(
            nameInput,
            selectorInput,
            validationResult
        );
        if (!validated) {
            return;
        }

        const oldUnits = [...units];

        const newUnit = {
            name: nameInput.value,
            selector: selectorInput.value,
            on: true,
            panels: {
                move: {
                    on: true,
                },
                zoom: {
                    on: true,
                },
                service: {
                    on: true,
                },
            },
        };

        const newUnits = [...units, newUnit];

        await saveUnits(newUnits);
        updateUndoStack(
            oldUnits,
            t.settings.pages.images.management.addNewImageConfig.undoStack.addAction.$format(
                {
                    name: newUnit.name,
                    selector: newUnit.selector,
                }
            )
        );
        plugin.showNotice(
            t.settings.pages.images.management.addNewImageConfig.notices
                .newConfigAdded
        );
        nameInput.value = '';
        selectorInput.value = '';
    };

    const onKeyDown = async (e: React.KeyboardEvent) => {
        if (e.code === 'Enter') {
            if (addingUnitWrapperRef.current === null) {
                return;
            }

            const isAnyInputsFocused =
                !!addingUnitWrapperRef.current.querySelector('input:focus');
            if (isAnyInputsFocused) {
                e.preventDefault();
                await handleAddUnit();
            }
        }
    };

    return (
        <div
            onKeyDown={onKeyDown}
            ref={addingUnitWrapperRef}
        >
            <ReactObsidianSetting
                name={
                    t.settings.pages.images.management.addNewImageConfig.header
                }
                setHeading
                noBorder
                addMultiDesc={(multiDesc: MultiDescComponent) => {
                    multiDesc.addDescriptions(
                        t.settings.pages.images.management.addNewImageConfig
                            .desc
                    );
                    return multiDesc;
                }}
            />
            <ReactObsidianSetting
                addTexts={[
                    (name): TextComponent => {
                        name.inputEl.id = 'unit-name';
                        name.setPlaceholder(
                            t.settings.pages.images.management.addNewImageConfig
                                .placeholders.name
                        );
                        name.onChange((text) => {
                            name.setValue(text);
                            const validationResult = validateName(
                                name.getValue()
                            );
                            processNameValidation(
                                name.inputEl,
                                validationResult
                            );
                        });
                        return name;
                    },
                    (selector): TextComponent => {
                        selector.inputEl.id = 'unit-selector';
                        selector.setPlaceholder(
                            t.settings.pages.images.management.addNewImageConfig
                                .placeholders.selector
                        );
                        selector.onChange((text) => {
                            selector.setValue(text);
                            const validationResult = validateSelector(
                                selector.getValue()
                            );
                            processSelectorValidation(
                                selector.inputEl,
                                validationResult
                            );
                        });
                        return selector;
                    },
                ]}
                addButtons={[
                    (button): ButtonComponent => {
                        button.setIcon('save');
                        button.setTooltip(
                            t.settings.pages.images.management.addNewImageConfig
                                .tooltips.saveButton
                        );
                        button.onClick(async () => {
                            await handleAddUnit();
                        });
                        return button;
                    },
                ]}
                addExtraButtons={[
                    Platform.isDesktopApp &&
                        ((extra): ExtraButtonComponent => {
                            extra.setIcon('info');
                            extra.setTooltip(
                                t.settings.pages.images.management
                                    .addNewImageConfig.tooltips.infoButton
                            );
                            extra.onClick(() => {
                                setGuideOpen(true);
                            });
                            return extra;
                        }),
                ]}
            />

            {guideOpen && (
                <UserGuideModal onClose={() => setGuideOpen(false)} />
            )}
        </div>
    );
};

export default AddNewImageConfig;
