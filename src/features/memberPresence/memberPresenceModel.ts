/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppState } from 'main/storeTypes';
import { createSelector } from 'reselect';
import { createPresenceReducer, Presence } from 'pubnub-redux';

export interface ConversationPresence {
    [conversationId: string]: {
        name: string;
        occupants: Presence[];
        occupancy: number;
    };
}

const MemberPresenceReducer = createPresenceReducer();
export { MemberPresenceReducer };

const getByPresenceSlice = (state: AppState) => {
    //console.log(state.memberPresence);
    return state.memberPresence;
};

export const getPresenceByConversationId = createSelector(
    [getByPresenceSlice],
    (presence: { byId: ConversationPresence }) => {
        //console.log(presence.byId);
        return presence.byId;
    },
);
