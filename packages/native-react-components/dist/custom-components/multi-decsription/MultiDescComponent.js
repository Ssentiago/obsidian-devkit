export class MultiDescComponent {
    element = null;
    constructor(props) {
        if (props.containerEl) {
            this.element = props.containerEl;
        }
    }
    addDesc(desc) {
        if (this.element) {
            const div = document.createElement('div');
            div.textContent = desc;
            this.element.appendChild(div);
        }
    }
    addDescriptions(desc) {
        if (this.element) {
            desc.forEach((desc) => this.addDesc(desc));
        }
        return this;
    }
    render() {
        return null;
    }
}
