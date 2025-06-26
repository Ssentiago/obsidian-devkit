import React, { FC } from 'react';

import { ReactObsidianSetting } from '@obsidian-devtoolkit/native-react-components';
import { ToggleComponent } from 'obsidian';

import { t } from '../../../../../../lang';
import { useSettingsContext } from '../../../../core/SettingsContext';

const Folding: FC = (): React.ReactElement => {
    const { plugin } = useSettingsContext();
    return (
        <>
            <ReactObsidianSetting
                name={t.settings.pages.images.settings.fold.header}
                setHeading={true}
            />

            <ReactObsidianSetting
                name={t.settings.pages.images.settings.fold.foldByDefault.name}
                addToggles={[
                    (toggle): ToggleComponent => {
                        toggle
                            .setValue(
                                plugin.settings.data.units.folding.foldByDefault
                            )
                            .onChange(async (value: boolean) => {
                                plugin.settings.data.units.folding.foldByDefault =
                                    value;
                                await plugin.settings.saveSettings();
                            });
                        return toggle;
                    },
                ]}
            />

            <ReactObsidianSetting
                name={
                    t.settings.pages.images.settings.fold.autoFoldOnFocusChange
                        .name
                }
                addToggles={[
                    (toggle): ToggleComponent => {
                        toggle
                            .setValue(
                                plugin.settings.data.units.folding
                                    .autoFoldOnFocusChange
                            )
                            .onChange(async (value: boolean) => {
                                plugin.settings.data.units.folding.autoFoldOnFocusChange =
                                    value;
                                await plugin.settings.saveSettings();
                            });
                        return toggle;
                    },
                ]}
            />
        </>
    );
};

export default Folding;
