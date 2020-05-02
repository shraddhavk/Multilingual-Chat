/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import 'emoji-mart/css/emoji-mart.css';
import React, { useState, useCallback, useRef } from 'react';
import useClickOutside from 'foundations/hooks/useClickOutside';
import { Picker, EmojiData } from 'emoji-mart';
import { FunnyEmoji } from 'foundations/components/icons/FunnyEmoji';
import { Dialog, EmojiButton } from './EmojiInput.Style';

interface EmojiInputProps {
    value: string;
    onSelection(contentWithEmoji: string): any;
}

const EmojiInput = ({ value, onSelection }: EmojiInputProps) => {
    const [showPicker, setPickerState] = useState(false);
    const picker = useRef<HTMLDivElement>(null);

    const dismissPicker = useCallback(() => {
        setPickerState(false);
    }, [setPickerState]);

    useClickOutside([picker], dismissPicker);

    const togglePicker = () => {
        setPickerState(!showPicker);
    };

    const addEmoji = (emoji: EmojiData) => {
        //console.log(value);
        if ('native' in emoji) {
            onSelection(`${value}${emoji.native}`);
            dismissPicker();
        }
    };

    return (
        <div ref={picker}>
            <Dialog>{showPicker && <Picker emoji="" title="" onSelect={addEmoji} />}</Dialog>
            <EmojiButton onClick={togglePicker}>
                <FunnyEmoji />
            </EmojiButton>
        </div>
    );
};

export { EmojiInput };
