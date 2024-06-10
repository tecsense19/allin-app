export const BASE_URL = 'https://allin.website4you.co.in'
const BASE_PATH = BASE_URL + "/api/v1";

export const ACTIONS = {
    SEND_OTP: BASE_PATH + '/send-otp',
    VERIFY_OTP: BASE_PATH + '/verify-otp',
    REFRESH_TOKEN: BASE_PATH + '/refresh-token',
    LOGOUT: BASE_PATH + '/logout',
    MESSAGE_TEXT: BASE_PATH + '/text-message',
    MESSAGE_FILE_UPLOAD: BASE_PATH + '/file-upload-message',
    MESSAGE_TASK: BASE_PATH + '/message-task',
    MESSAGE_TASK_CHAT: BASE_PATH + '/message-task-chat',
    MESSAGE_LOCATION: BASE_PATH + '/message-location',
    MESSAGE_MEETING: BASE_PATH + '/message-meeting',
    MESSAGE_REMINDER: BASE_PATH + '/add-reminder',
    MESSAGE_READE_UNREADE: BASE_PATH + '/read-unread-message',
    MESSAGE_DELETE: BASE_PATH + '/delete-message',
    CLEAR_CHAT: BASE_PATH + '/clear-message',
    TASK_DETAILS: BASE_PATH + '/task-chat',
    EXPORT_CHAT: BASE_PATH + '/export-chat',
    FILE_UPLOAD: BASE_PATH + '/file-upload',
    CHECK_MOBILE_EXISTS: BASE_PATH + '/check-mobile-exists',
    USER_REGISTRATION: BASE_PATH + '/user-registration',
    USERS_MOBILE_NUMBERS: BASE_PATH + '/users-mobile-numbers',
    USER_LIST: BASE_PATH + '/user-list',
    USER_DETAILS: BASE_PATH + '/user-details',
    EDIT_PROFILE: BASE_PATH + '/edit-profile',
    DELETE_CHAT_USER: BASE_PATH + '/delete-chat-user'



}