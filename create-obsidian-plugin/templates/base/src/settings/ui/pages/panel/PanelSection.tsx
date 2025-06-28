import { FC } from 'react';

import { ReactObsidianSetting } from '@obsidian-devtoolkit/native-react-components';
import { ButtonComponent } from 'obsidian';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { MiniNavbar } from './PanelSection.styled';
import Management from './management/Management';
import Settings from './settings/Settings';

const PanelSection: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isSettingsActive =
        location.pathname === '/panel/settings' ||
        location.pathname === '/panel';
    const isManagementActive = location.pathname === '/panel/management';

    return (
        <>
            <MiniNavbar>
                <ReactObsidianSetting
                    buttons={[
                        (button): ButtonComponent => {
                            button.setIcon('settings');
                            button.setTooltip('Panels Settings');
                            button.onClick(async () => {
                                await navigate('/panel/settings');
                            });
                            if (isSettingsActive) {
                                button.setClass('button-active');
                            }
                            return button;
                        },

                        (button): ButtonComponent => {
                            button.setIcon('folder-plus');
                            button.setTooltip('Panels Management');
                            button.onClick(async () => {
                                await navigate('/panel/management');
                            });
                            if (isManagementActive) {
                                button.setClass('button-active');
                            }
                            return button;
                        },
                    ]}
                />
            </MiniNavbar>

            <Routes>
                <Route
                    index
                    element={<Settings />}
                />
                <Route
                    path='settings'
                    element={<Settings />}
                />
                <Route
                    path='management'
                    element={<Management />}
                />
            </Routes>
        </>
    );
};

export default PanelSection;
