/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ThunkAction } from 'main/storeTypes';
import { getCurrentConversationId } from 'features/currentConversation/currentConversationModel';
import { MessageContent } from './messageModel';
import { sendMessage } from 'pubnub-redux';

import { getLoggedInUserId } from 'features/authentication/authenticationModel';
export const sendMessageAction = (message: MessageContent): ThunkAction => {
    return (dispatch, getState) => {
        const state = getState();
        const change1 = getCurrentConversationId(state);
        const lan = localStorage.getItem('languages');
        // const emoji1 = localStorage.getItem('emojis');
        //console.log(emoji);
        localStorage.setItem('loggedinuser', getLoggedInUserId(state));
        //console.log(message.body);
        return dispatch(
            sendMessage({
                channel: change1,
                message: {
                    data: {
                        translate: {
                            content: message,
                            target: lan,
                            sender: getLoggedInUserId(state),
                            source: 'es',
                            text: message.body,
                        },
                    },
                },
            }),
        );
    };
};
