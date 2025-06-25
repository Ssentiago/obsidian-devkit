interface MultiDescProps {
    containerEl?: HTMLDivElement;
}
export declare class MultiDescComponent {
    private element;
    constructor(props: MultiDescProps);
    addDesc(desc: string): void;
    addDescriptions(desc: string[]): this;
    render(): null;
}
export {};
