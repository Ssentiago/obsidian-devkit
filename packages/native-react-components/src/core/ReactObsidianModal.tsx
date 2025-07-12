import React, { ReactPortal, useEffect, useMemo } from 'react';

import { createPortal } from 'react-dom';

interface ReactObsidianModalProps {
    children: React.ReactNode; // children React element
    title: string; // modal title (default Obsidian's)
    onClose: () => void; // action on modal closing
    onOpen?: () => void; // action on modal opening
    width?: string; // width for modal
    height?: string; // height for modal
    maxWidth?: string; // maxWidth for modal
    maxHeight?: string; // maxHeight for modal
    className?: string; // className for modal root component
    closable?: boolean; // if modal can be closed
    // if so, then the user will not be able to close the model
    // (for example, using ESC or pressing outside the modal. Only clearly press the exit button)
}

const ReactObsidianModal = ({
    children,
    title,
    onOpen,
    onClose,
    maxHeight,
    maxWidth,
    width,
    height,
    closable = true,
    className,
}: ReactObsidianModalProps): ReactPortal => {
    const modalRoot = document.body;

    const keyDownHandler = (e: React.KeyboardEvent | KeyboardEvent) => {
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
        const style: Record<string, string> = {};

        if (width) style['--dialog-width'] = width;
        if (height) style.height = height;
        if (maxWidth) style['--dialog-max-width'] = maxWidth;
        if (maxHeight) style['--dialog-max-height'] = maxHeight;

        if (width && !maxWidth) style['--dialog-max-width'] = width;
        if (height && !maxHeight) style['--dialog-max-height'] = height;

        return style;
    }, [width, height, maxWidth, maxHeight]);

    return createPortal(
        <div
            className={'modal-container mod-dim'}
            role='dialog'
            aria-modal='true'
            aria-labelledby='modal-title'
            style={modalContainerStyle as React.CSSProperties}
        >
            <div
                className={'modal-bg'}
                onClick={() => closable && onClose()}
                style={{ opacity: '0.85' }}
                aria-hidden='true'
                onKeyDown={keyDownHandler}
            ></div>
            <div className={`modal ${className ?? ''}`}>
                <div
                    className={'modal-close-button'}
                    onClick={() => closable && onClose()}
                    aria-label='Close modal'
                ></div>
                <div className={'modal-header'}>
                    <div className={'modal-title'}>{title}</div>
                </div>
                <div
                    className={'modal-content'}
                    style={{
                        position: 'relative',
                        zIndex: 100000,
                    }}
                >
                    {children}
                </div>
            </div>
        </div>,
        modalRoot
    );
};

export default ReactObsidianModal;
