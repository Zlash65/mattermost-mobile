// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {combineReducers} from 'redux';
import {BotTypes, UserTypes} from '@mm-redux/action_types';
import {GenericAction} from '@mm-redux/types/actions';
import {Dictionary} from '@mm-redux/types/utilities';
import {Bot} from '@mm-redux/types/bots';

function accounts(state: Dictionary<Bot> = {}, action: GenericAction) {
    switch (action.type) {
    case BotTypes.RECEIVED_BOT_ACCOUNTS: {
        const newBots = action.data;
        const nextState = {...state};
        for (const bot of newBots) {
            nextState[bot.user_id] = bot;
        }
        return nextState;
    }
    case BotTypes.RECEIVED_BOT_ACCOUNT: {
        const bot = action.data;
        const nextState = {...state};
        nextState[bot.user_id] = bot;
        return nextState;
    }
    case UserTypes.LOGOUT_SUCCESS:
        return {};
    default:
        return state;
    }
}

export default combineReducers({
    accounts,
});
