import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
const ReactObsidianModal = ({ children, title, onOpen, onClose, maxHeight, maxWidth, width, height, closable = true, className, }) => {
    const modalRoot = document.body;
    const keyDownHandler = (e) => {
        if (e.key === 'Escape' && closable) {
            onClose();
        }
    };
    useEffect(() => {
        window.addEventListener('keydown', keyDownHandler);
        return () => {
            window.removeEventListener('keydown', keyDownHandler);
        };
    }, [onClose]);
    useEffect(() => {
        onOpen && onOpen();
    }, [onOpen]);
    const modalContainerStyle = useMemo(() => {
        const style = {};
        if (width)
            style['--dialog-width'] = width;
        if (height)
            style.height = height;
        if (maxWidth)
            style['--dialog-max-width'] = maxWidth;
        if (maxHeight)
            style['--dialog-max-height'] = maxHeight;
        if (width && !maxWidth)
            style['--dialog-max-width'] = width;
        if (height && !maxHeight)
            style['--dialog-max-height'] = height;
        return style;
    }, [width, height, maxWidth, maxHeight]);
    return createPortal(_jsxs("div", { className: 'modal-container mod-dim', role: 'dialog', "aria-modal": 'true', "aria-labelledby": 'modal-title', style: modalContainerStyle, children: [_jsx("div", { className: 'modal-bg', onClick: () => closable && onClose(), style: { opacity: '0.85' }, "aria-hidden": 'true', onKeyDown: keyDownHandler }), _jsxs("div", { className: `modal ${className ?? ''}`, children: [_jsx("div", { className: 'modal-close-button', onClick: () => closable && onClose(), "aria-label": 'Close modal' }), _jsx("div", { className: 'modal-header', children: _jsx("div", { className: 'modal-title', children: title }) }), _jsx("div", { className: 'modal-content', children: children })] })] }), modalRoot);
};
export default ReactObsidianModal;
