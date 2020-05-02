/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EmojiInput } from 'features/emoji/EmojiInput/EmojiInput';
import { EmojiSuggestion } from 'features/emoji/EmojiSuggestion/EmojiSuggestion';
import { Wrapper, Container, TextArea } from './MessageInput.style';
import { sendMessageAction } from 'features/messages/sendMessageCommand';
import { getCurrentConversationId, getConversationMessageInputValue } from '../currentConversationModel';
import { updateConversationMessageInputValueAction } from 'features/currentConversation/currentConversationModel';

const emptyMessage = '';

const autoExpand = (el: HTMLTextAreaElement) => {
    setTimeout(function() {
        el.style.cssText = 'height:auto; padding:0';
        el.style.cssText = 'height:' + el.scrollHeight + 'px';
    }, 0);
};

const cleanMessage = (message: string) => message.trim();

type MessageFragment<message = string> = [message, (setTo: message) => void];

const MessageInput = () => {
    const [message, setMessage]: MessageFragment = useState(emptyMessage);
    const conversationId: string = useSelector(getCurrentConversationId);
    const textareaRef = useRef<HTMLTextAreaElement>(document.createElement('textarea'));
    const conversationMessageInputValue: string = useSelector(getConversationMessageInputValue);
    const dispatch = useDispatch();

    const changed = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
        dispatch(updateConversationMessageInputValueAction(conversationId, e.target.value));
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey && cleanMessage(message) !== '') {
            send();
            e.preventDefault();
        }
        autoExpand(e.target as HTMLTextAreaElement);
    };

    const send = () => {
        const emojiaction = localStorage.getItem('emojis');
        //console.log(emojiaction);
        dispatch(
            sendMessageAction({
                //type: "text",
                body: cleanMessage(message),
                //opt: "es",
                //emoji: emojiaction
            }),
        );
        dispatch(updateConversationMessageInputValueAction(conversationId, emptyMessage));
        setMessage(emptyMessage);
    };

    useEffect(() => {
        setMessage(conversationMessageInputValue);
        autoExpand(textareaRef.current);
    }, [conversationId, conversationMessageInputValue]);

    return (
        <Wrapper>
            <EmojiSuggestion
                value={message}
                onSelection={messageWithEmoji => {
                    setMessage(messageWithEmoji);
                }}
            />
            <Container>
                <TextArea
                    ref={textareaRef}
                    rows={1}
                    value={message}
                    onChange={changed}
                    onKeyPress={handleKeyPress}
                    placeholder="Type Message"
                />
                <EmojiInput
                    value={message}
                    onSelection={messageWithEmoji => {
                        setMessage(messageWithEmoji);
                    }}
                />
            </Container>
        </Wrapper>
    );
};

export { MessageInput };
