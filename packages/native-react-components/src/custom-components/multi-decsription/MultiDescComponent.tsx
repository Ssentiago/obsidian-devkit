interface MultiDescProps {
    containerEl?: HTMLDivElement;
}

export class MultiDescComponent {
    private element: HTMLDivElement | null = null;

    constructor(props: MultiDescProps) {
        if (props.containerEl) {
            this.element = props.containerEl;
        }
    }

    addDesc(desc: string) {
        if (this.element) {
            const div = document.createElement('div');
            div.textContent = desc;
            this.element.appendChild(div);
        }
    }

    addDescriptions(desc: string[]): this {
        if (this.element) {
            desc.forEach((desc) => this.addDesc(desc));
        }
        return this;
    }

    render(): null {
        return null;
    }
}
