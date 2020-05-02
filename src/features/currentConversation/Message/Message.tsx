/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { ReactNode } from 'react';
import { UserInitialsAvatar } from 'foundations/components/UserInitialsAvatar';
import convertTimestampToTime from 'foundations/utilities/convertTimestampToTime';
import { Wrapper, Body, Header, Avatar, SenderName, Content, TimeSent } from './Message.style';
import { useState } from 'react';
import { EmojiInput } from './EmojiInput';
import pubnub from 'pubnub';
export interface MessageFragment {
    sender: {
        id: string;
        name: string;
    };
    timetoken: string;
    message: {
        data: {
            translate: {
                content: {
                    body?: string;
                };
                target?: string;
                output_lang?: string;
                sender?: string;
                text?: string;
                // emoji?: string;
            };
            text?: string;
        };
    };
    subscribedChannel?: string;
}

interface MessageProps {
    message: MessageFragment;
    avatar?: ReactNode;
}

const emptyMessage = '';
const initialvalue = '';

type MessageFragment1<message1 = string> = [message1, (setTo: message1) => void];
type MessageFragment2<timetokenvalue = string> = [timetokenvalue, (setTo: timetokenvalue) => void];
const Message = ({ message, avatar }: MessageProps) => {
    const [timetokenvalue, settimeTokenvalue]: MessageFragment2 = useState(initialvalue);
    const [message1, setMessage]: MessageFragment1 = useState(emptyMessage);
    const [emojiIcon, setemojiIcon] = useState(false);
    const sender = message.sender || { id: 'unknown', name: 'Unknown' };
    // localStorage.setItem('emojis', message1);

    return (
        <Wrapper
            onMouseEnter={() => {
                settimeTokenvalue(message.timetoken);
                setemojiIcon(true);
            }}
            onMouseLeave={() => setemojiIcon(false)}
            style={{ position: 'relative' }}
        >
            <div style={{ position: 'absolute', top: '15px', right: '16px' }}>
                {emojiIcon && (
                    <EmojiInput
                        value={message1}
                        onSelection={messageWithEmoji => {
                            setMessage(messageWithEmoji);
                        }}
                    />
                )}
            </div>
            <Avatar>{avatar ? avatar : <UserInitialsAvatar size={36} name={sender.name} uuid={sender.id} />}</Avatar>

            <Body>
                <Header>
                    <SenderName>{sender.name}</SenderName>
                    <TimeSent>{convertTimestampToTime(message.timetoken)}</TimeSent>
                </Header>

                <Content>{message.message.data.text}</Content>

                {/* <div>{message.message.emoji}</div> */}
            </Body>
        </Wrapper>
    );
};

export { Message };
