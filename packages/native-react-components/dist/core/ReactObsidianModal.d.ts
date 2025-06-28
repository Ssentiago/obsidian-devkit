import React, { ReactPortal } from 'react';
interface ReactObsidianModalProps {
    children: React.ReactNode;
    title: string;
    onClose: () => void;
    onOpen?: () => void;
    width?: string;
    height?: string;
    maxWidth?: string;
    maxHeight?: string;
    className?: string;
    closable?: boolean;
}
declare const ReactObsidianModal: ({ children, title, onOpen, onClose, maxHeight, maxWidth, width, height, closable, className, }: ReactObsidianModalProps) => ReactPortal;
export default ReactObsidianModal;
