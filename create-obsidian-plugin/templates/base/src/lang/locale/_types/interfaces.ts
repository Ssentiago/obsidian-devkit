export interface LocaleSchema {
    adapters: {
        pickerMode: {
            notice: {
                error: string;
            };
        };
    };
    commands: {
        togglePanels: {
            notice: {
                noMd: string;
                noActiveImages: string;
                shown: string;
                hidden: string;
            };
        };
        pickerMode: {
            notice: {
                disabled: string;
            };
        };
    };
    image: {
        controlPanel: {
            fold: {
                fold: {
                    folded: string;
                    expanded: string;
                };
            };
            move: {
                upLeft: string;
                up: string;
                upRight: string;
                left: string;
                right: string;
                downLeft: string;
                down: string;
                downRight: string;
            };
            service: {
                hide: {
                    hidden: string;
                    shown: string;
                };
                fullscreen: {
                    off: string;
                    on: string;
                };
                touch: {
                    on: string;
                    off: string;
                };
            };
            zoom: {
                in: string;
                out: string;
                reset: string;
            };
        };
    };
    pickerMode: {
        tooltip: {
            imageState: {
                nonInitialized: string;
                on: string;
                off: string;
            };
            onStart: string;
            onExit: string;
        };
    };
    settings: {
        notice: {
            resetSettings: string;
        };
        pages: {
            about: {
                githubPage: {
                    name: string;
                    linkButtonTooltip: string;
                };
            };
            debug: {
                reportIssue: {
                    name: string;
                    desc: string[];
                    linkButtonTooltip: string;
                };
                enableLogging: {
                    name: string;
                    desc: string;
                };
                logLevel: {
                    name: string;
                    desc: string;
                };
                aboutExportedLogs: {
                    name: string;
                    desc: string[];
                };
                exportLogs: {
                    name: string;
                    exportButtonTooltip: string;
                };
                copyLogs: {
                    name: string;
                    copyButtonTooltip: string;
                    notice: {
                        logsNotFound: string;
                        successfully: string;
                    };
                };
                clearLogsStorage: {
                    name: string;
                    desc: string;
                    clearButtonTooltip: string;
                    notice: {
                        successfully: string;
                    };
                };
            };
            images: {
                miniNavbar: {
                    settingsButtonTooltip: string;
                    managementButtonTooltip: string;
                };
                settings: {
                    interactive: {
                        header: string;
                        pickerMode: {
                            name: string;
                            desc: string[];
                        };
                        autoDetect: {
                            name: string;
                            desc: string[];
                        };
                        activationMode: {
                            name: string;
                            desc: string;
                            dropdown: {
                                immediate: string;
                                lazy: string;
                            };
                            tooltips: {
                                immediate: string;
                                lazy: string;
                            };
                        };
                    };
                    size: {
                        header: string;
                        desc: string;
                        expanded: {
                            name: string;
                            desc: string[];
                        };
                        folded: {
                            name: string;
                            desc: string[];
                        };
                        labels: {
                            height: string;
                            width: string;
                        };
                        placeholders: {
                            height: string;
                            width: string;
                        };
                        validation: {
                            invalidWidth: string;
                            invalidHeight: string;
                            fixErrors: string;
                            nothingToSave: string;
                            savedSuccessfully: string;
                        };
                        saveButtonTooltip: string;
                    };
                    fold: {
                        header: string;
                        foldByDefault: {
                            name: string;
                        };
                        autoFoldOnFocusChange: {
                            name: string;
                        };
                    };
                };
                management: {
                    addNewImageConfig: {
                        header: string;
                        desc: string[];
                        placeholders: {
                            name: string;
                            selector: string;
                        };
                        tooltips: {
                            saveButton: string;
                            infoButton: string;
                        };
                        notices: {
                            newConfigAdded: string;
                        };
                        undoStack: {
                            addAction: string;
                        };
                        userGuideModal: {
                            header: string;
                            howItWorks: {
                                name: string;
                                desc: string[];
                            };
                            workingModes: {
                                name: string;
                                desc: string[];
                            };
                            customSelectors: {
                                name: string;
                                desc: string;
                            };
                            findingSelectors: {
                                name: string;
                                desc: string[];
                            };
                            video: {
                                loading: string;
                                failed: string;
                            };
                        };
                    };
                    availableImageConfigs: {
                        header: string;
                        perPageSlider: {
                            name: string;
                        };
                        pagination: {
                            page: string;
                            buttons: {
                                previous: {
                                    enabled: string;
                                    disabled: string;
                                };
                                next: {
                                    enabled: string;
                                    disabled: string;
                                };
                                editingBlocked: string;
                            };
                        };
                        item: {
                            toggle: {
                                enable: string;
                                disable: string;
                            };
                            buttons: {
                                edit: string;
                                delete: string;
                                options: string;
                                cancel: string;
                                save: string;
                            };
                            actions: {
                                delete: string;
                                enable: string;
                                disable: string;
                                edit: string;
                                changes: {
                                    name: string;
                                    selector: string;
                                };
                            };
                        };
                        optionsModal: {
                            name: string;
                            desc: string;
                            panels: {
                                header: string;
                                states: {
                                    on: string;
                                    off: string;
                                };
                                action: string;
                            };
                        };
                    };
                    history: {
                        tooltips: {
                            undo: {
                                nothing: string;
                                available: string;
                            };
                            redo: {
                                nothing: string;
                                available: string;
                            };
                        };
                        notices: {
                            nothingToUndo: string;
                            nothingToRedo: string;
                        };
                    };
                    unitsValidation: {
                        nameAlreadyExists: string;
                        selectorAlreadyExists: string;
                        invalidSelectorPrefix: string;
                        nothingToSave: string;
                        fillOutField: string;
                        bothInvalid: string;
                        oneInvalid: string;
                    };
                };
            };
        };
    };
}