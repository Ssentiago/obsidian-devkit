import { MarkdownView, WorkspaceLeaf } from 'obsidian';

import InteractifyImage from '../../interactify-image/interactify-image';
import { LeafID } from './definitions';

export interface Data {
    units: InteractifyImage[];
    livePreviewObserver: MutationObserver | undefined;
}

export interface OrphanData {
    units: InteractifyImage[];
}

export interface IPluginContext {
    leaf: WorkspaceLeaf | undefined;
    view: MarkdownView | undefined;
    leafID: LeafID | undefined;
    active: boolean;
    inPreviewMode: boolean;
    inLivePreviewMode: boolean;
}
