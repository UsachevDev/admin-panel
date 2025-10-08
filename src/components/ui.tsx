"use client";
import {
    Button as HButton, Input as HInput, Modal as HModal,
    ModalBody, ModalContent, ModalFooter, ModalHeader,
    Spinner, Checkbox, Select, SelectItem
} from "@heroui/react";

export const Button = HButton;
export const Input = HInput;
export const HSelect = Select;
export const HSelectItem = SelectItem;
export const HCheckbox = Checkbox;
export const HSpinner = Spinner;

export function Modal({
    open, onOpenChange, title, children, footer
}: { open: boolean; onOpenChange: (v: boolean) => void; title: string; children: React.ReactNode; footer?: React.ReactNode; }) {
    return (
        <HModal isOpen={open} onOpenChange={onOpenChange} hideCloseButton placement="center">
            <ModalContent>
                <ModalHeader className="text-base font-semibold">{title}</ModalHeader>
                <ModalBody>{children}</ModalBody>
                <ModalFooter>{footer}</ModalFooter>
            </ModalContent>
        </HModal>
    );
}
