import type { LocaleSchema } from '../_types/interfaces';

           
const Locale: LocaleSchema  = {
    "adapters": {
        "pickerMode": {
            "notice": {
                "error": "This type of content is unsupported. Please check the plugin settings."
            }
        }
    },
    "commands": {
        "togglePanels": {
            "notice": {
                "noMd": "This command can only be used when a Markdown view is open.",
                "noActiveImages": "No active images found",
                "shown": "Control panels shown",
                "hidden": "Control panels hidden"
            }
        },
        "pickerMode": {
            "notice": {
                "disabled": "Picker mode is disabled"
            }
        }
    },
    "image": {
        "controlPanel": {
            "fold": {
                "fold": {
                    "folded": "Expand",
                    "expanded": "Fold"
                }
            },
            "move": {
                "upLeft": "Move up left",
                "up": "Move up",
                "upRight": "Move up right",
                "left": "Move left",
                "right": "Move right",
                "downLeft": "Move down left",
                "down": "Move down",
                "downRight": "Move down right"
            },
            "service": {
                "hide": {
                    "hidden": "Show panels",
                    "shown": "Hide panels"
                },
                "fullscreen": {
                    "off": "Open in fullscreen mode",
                    "on": "Exit fullscreen mode"
                },
                "touch": {
                    "on": "Disable touch",
                    "off": "Enable touch"
                }
            },
            "zoom": {
                "in": "Zoom in",
                "out": "Zoom out",
                "reset": "Reset zoom and position"
            }
        }
    },
    "pickerMode": {
        "tooltip": {
            "imageState": {
                "nonInitialized": "Cannot initialize this image. Consult for docs for more info",
                "on": "Deactivate interactive mode",
                "off": "Activate interactive mode"
            },
            "onStart": "Picker mode enabled\nClick on image to toggle interactive mode\nPress Esc to exit",
            "onExit": "Picker mode disabled"
        }
    },
    "settings": {
        "notice": {
            "resetSettings": "Settings have been reset to default."
        },
        "pages": {
            "about": {
                "githubPage": {
                    "name": "GitHub page",
                    "linkButtonTooltip": "Go to GitHub page of this plugin"
                }
            },
            "debug": {
                "reportIssue": {
                    "name": "Report an issue",
                    "desc": [
                        "If you encounter any issues or have suggestions, please report them on GitHub.",
                        "How to report an issue:",
                        "1. Enable debug logging below and set level to `Debug`.",
                        "Warning: This may impact performance temporarily.",
                        "2. Reproduce the issue with logging enabled.",
                        "3. Export logs using the button below.",
                        "4. Click \"Report an issue\" and fill out the form.",
                        "5. Attach the exported log file.\n6. Submit the issue."
                    ],
                    "linkButtonTooltip": "Report an issue"
                },
                "enableLogging": {
                    "name": "Enable logging",
                    "desc": "Enable debug logging for troubleshooting"
                },
                "logLevel": {
                    "name": "Log level",
                    "desc": "Set minimum log level to display"
                },
                "aboutExportedLogs": {
                    "name": "About exported logs",
                    "desc": [
                        "Exported logs contain:",
                        "• Complete system information (OS, hardware, plugins)",
                        "• Debug events with timestamps",
                        "• Performance metrics",
                        "Review logs before sharing - remove sensitive data if needed."
                    ]
                },
                "exportLogs": {
                    "name": "Export logs",
                    "exportButtonTooltip": "Export logs"
                },
                "copyLogs": {
                    "name": "Copy logs",
                    "copyButtonTooltip": "Copy logs to clipboard",
                    "notice": {
                        "logsNotFound": "No logs data found",
                        "successfully": "Logs was copied to clipboard"
                    }
                },
                "clearLogsStorage": {
                    "name": "Clear logs storage",
                    "desc": "Storage: {{storage}}, Entries: {{entries}}",
                    "clearButtonTooltip": "Clear logs storage",
                    "notice": {
                        "successfully": "Logs storage was cleared"
                    }
                }
            },
            "images": {
                "miniNavbar": {
                    "settingsButtonTooltip": "Images settings",
                    "managementButtonTooltip": "Images management"
                },
                "settings": {
                    "interactive": {
                        "header": "Interactivity options",
                        "pickerMode": {
                            "name": "Enable picker mode",
                            "desc": [
                                "Adds a ribbon button and command palette entry for toggling picker mode.",
                                "When activated, hover over images/SVG elements to see availability status, then click to initialize or toggle interactivity."
                            ]
                        },
                        "autoDetect": {
                            "name": "Auto-detect images",
                            "desc": [
                                "* This option is available only for Obsidian Markdown View",
                                "When enabled, the plugin will automatically scan and prepare all suitable images for potential interactivity."
                            ]
                        },
                        "activationMode": {
                            "name": "Activation mode for Obsidian Markdown View",
                            "desc": "Live Preview mode uses lazy loading by default",
                            "dropdown": {
                                "immediate": "Immediate",
                                "lazy": "Lazy"
                            },
                            "tooltips": {
                                "immediate": "Images become interactive instantly when detected. Best for small notes.",
                                "lazy": "Images become interactive only when scrolled into view. Best for notes with many images."
                            }
                        }
                    },
                    "size": {
                        "header": "Image size",
                        "desc": "Note: You need to reopen all the open Markdown views with images in them to apply these settings.",
                        "expanded": {
                            "name": "Expanded image container size",
                            "desc": [
                                "Set the container dimensions for expanded state.",
                                "px: 100-1000, %: 10-100",
                                "Click Save button or press Enter to apply changes."
                            ]
                        },
                        "folded": {
                            "name": "Folded image container size",
                            "desc": [
                                "Set the container dimensions for folded state.",
                                "px: 100-1000, %: 10-100",
                                "Click Save button or press Enter to apply changes."
                            ]
                        },
                        "labels": {
                            "height": "Height:",
                            "width": "Width:"
                        },
                        "placeholders": {
                            "height": "height",
                            "width": "width"
                        },
                        "validation": {
                            "invalidWidth": "Invalid width. Please enter number in range {{range}}.",
                            "invalidHeight": "Invalid height. Please enter number in range {{range}}.",
                            "fixErrors": "Please fix validation errors",
                            "nothingToSave": "Nothing to save",
                            "savedSuccessfully": "Saved successfully"
                        },
                        "saveButtonTooltip": "Save changes"
                    },
                    "fold": {
                        "header": "Fold",
                        "foldByDefault": {
                            "name": "Fold images by default"
                        },
                        "autoFoldOnFocusChange": {
                            "name": "Automatically fold images on focus change"
                        }
                    }
                },
                "management": {
                    "addNewImageConfig": {
                        "header": "Add new image config",
                        "desc": [
                            "Here you can configure which images will receive enhanced controls and UI.",
                            "Adding a Image Config:",
                            "1. Enter a unique name using only Latin letters, numbers and `-` (A-Z, a-z, 0-9, -)",
                            "2. Specify a valid CSS selector for your image",
                            "Once added, matching units will get:",
                            "• Mouse and keyboard navigation",
                            "• Additional control buttons",
                            "Note: Red border indicates invalid input - hover to see details"
                        ],
                        "placeholders": {
                            "name": "Example Unit",
                            "selector": ".example-unit"
                        },
                        "tooltips": {
                            "saveButton": "Add this unit",
                            "infoButton": "Click for more information on how the plugin works and how you can find image unit selectors"
                        },
                        "notices": {
                            "newConfigAdded": "New image config was added"
                        },
                        "undoStack": {
                            "addAction": "Add image config\nName: {{name}}\nSelector: {{selector}}"
                        },
                        "userGuideModal": {
                            "header": "User Guide",
                            "howItWorks": {
                                "name": "How this plugin works",
                                "desc": [
                                    "The plugin automatically processes all images and SVG elements in your markdown files.",
                                    "In auto-detect mode, it finds all suitable images and makes them interactive",
                                    "In picker mode, hover over any image and click to make it interactive with zoom, drag, and control panels."
                                ]
                            },
                            "workingModes": {
                                "name": "Working modes",
                                "desc": [
                                    "• Auto-detect: Plugin automatically finds and processes all images",
                                    "• Picker toggle: Hover over images and click to activate interaction",
                                    "• Use ribbon button or command palette to toggle picker mode"
                                ]
                            },
                            "customSelectors": {
                                "name": "Custom selectors (optional)",
                                "desc": "Selectors are only needed for specific behavior overrides. For example, to disable UI panels for SVG inside Mermaid diagrams."
                            },
                            "findingSelectors": {
                                "name": "Finding selectors (when needed):",
                                "desc": [
                                    "1. Open DevTools (Ctrl+Shift+I)",
                                    "2. Use element selector (Ctrl+Shift+C)",
                                    "3. Click on the specific element you want to customize",
                                    "4. Find the class attribute: `.mermaid`, `.block-language-plantuml`, etc.",
                                    "5. Use this selector to create specific settings overrides"
                                ]
                            },
                            "video": {
                                "loading": "Loading video...",
                                "failed": "Video failed to load. Please try again later."
                            }
                        }
                    },
                    "availableImageConfigs": {
                        "header": "Available image configs",
                        "perPageSlider": {
                            "name": "Image configs per page"
                        },
                        "pagination": {
                            "page": "Page {{current}} of {{total}} (Total image configs: {{count}})",
                            "buttons": {
                                "previous": {
                                    "enabled": "Go to previous page",
                                    "disabled": "No previous page"
                                },
                                "next": {
                                    "enabled": "Go to next page",
                                    "disabled": "No next page"
                                },
                                "editingBlocked": "Can't change page while editing"
                            }
                        },
                        "item": {
                            "toggle": {
                                "enable": "Enable {{name}} unit",
                                "disable": "Disable {{name}} unit"
                            },
                            "buttons": {
                                "edit": "Edit {{name}} unit",
                                "delete": "Delete {{name}} unit",
                                "options": "Options for {{name}} unit",
                                "cancel": "Cancel operation? All changes will be lost.",
                                "save": "Save changes for {{name}}?"
                            },
                            "actions": {
                                "delete": "Delete unit\n`Name: {{name}}\nSelector: {{selector}}`",
                                "enable": "Enable {{name}} unit",
                                "disable": "Disable {{name}} unit",
                                "edit": "Edit unit \"{{name}}\":\n{{changes}}",
                                "changes": {
                                    "name": "name: \"{{old}}\" → \"{{new}}\"",
                                    "selector": "selector: \"{{old}}\" → \"{{new}}\""
                                }
                            }
                        },
                        "optionsModal": {
                            "name": "{{name}} unit options",
                            "desc": "These settings will only apply to this unit.",
                            "panels": {
                                "header": "Panels",
                                "states": {
                                    "on": "on",
                                    "off": "off"
                                },
                                "action": "Turn {{state}} panel `{{panel}}` for unit `{{name}}`"
                            }
                        }
                    },
                    "history": {
                        "tooltips": {
                            "undo": {
                                "nothing": "Nothing to undo\nShortcut: CTRL+Z",
                                "available": "Undo\n{{description}}{{count}}\nShortcut: CTRL+Z"
                            },
                            "redo": {
                                "nothing": "Nothing to redo\nShortcut: CTRL+SHIFT+Z",
                                "available": "Redo\n{{description}}{{count}}\nShortcut: CTRL+SHIFT+Z"
                            }
                        },
                        "notices": {
                            "nothingToUndo": "Nothing to undo",
                            "nothingToRedo": "Nothing to redo"
                        }
                    },
                    "unitsValidation": {
                        "nameAlreadyExists": "Unit with that name already exists",
                        "selectorAlreadyExists": "Unit with that selector already exists",
                        "invalidSelectorPrefix": "Invalid CSS selector: {{err}}",
                        "nothingToSave": "Nothing to save",
                        "fillOutField": "Fill out unit {field} field!",
                        "bothInvalid": "Unit name and selector are both invalid",
                        "oneInvalid": "Unit {field} is invalid"
                    }
                }
            }
        }
    }
};

export default Locale;