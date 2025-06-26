import InteractifyImage from '../../interactify-image';
import { TriggerType } from '../../types/constants';

export interface IControlPanel {
    unit: InteractifyImage;
    controlPanel: HTMLElement;
    initialize: () => void;
    show(triggerType: TriggerType): void;
    hide(triggerType: TriggerType): void;
    hasVisiblePanels: boolean;
}
