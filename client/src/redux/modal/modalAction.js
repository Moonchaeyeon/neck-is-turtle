import { ACTION_TYPES } from "./modalTypes";

export const setShowLoginModal = (showModal) => {
    return {type: ACTION_TYPES.SET_SHOW_LOGIN, data: showModal};
}

export const setShowCompleteModal = (showModal) => {
    return {type:ACTION_TYPES.SET_SHOW_COMPLETE, data: showModal};
}