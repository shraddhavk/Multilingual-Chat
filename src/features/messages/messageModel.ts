/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppState } from 'main/storeTypes';
import { createSelector } from 'reselect';
import { createMessageReducer, Message as PubNubMessage } from 'pubnub-redux';

export interface MessageContent {
    type?: string;
    body?: string;
    target?: string;
    text?: string;
    emoji?: any;
}

export interface MessageBody {
    data: {
        translate: {
            sender: string;
            content: MessageContent;
        };
    };
}

export type Message = Required<Pick<PubNubMessage, 'channel' | 'message' | 'timetoken'>> & {
    message: MessageBody;
};

const getMessagesSlice = (state: AppState) => {
    return state.messages;
};

export const getMessagesById = createSelector([getMessagesSlice], messages => {
    return messages.byId;
});

const MessageStateReducer = createMessageReducer<Message>();
export { MessageStateReducer };
