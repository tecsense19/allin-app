export const BASE_URL = 'https://allin.website4you.co.in'
const BASE_PATH = BASE_URL + "/api/v1";

export const ACTIONS = {
    SEND_OTP: BASE_PATH + '/send-otp',
    VERIFY_OTP: BASE_PATH + '/verify-otp',
    REFRESH_TOKEN: BASE_PATH + '/refresh-token',
    LOGOUT: BASE_PATH + '/logout',
    MESSAGE_TEXT: BASE_PATH + '/text-message',
    EDIT_TEXT_MESSAGE: BASE_PATH + '/update-text-message',
    MESSAGE_FILE_UPLOAD: BASE_PATH + '/file-upload-message',
    MESSAGE_TASK: BASE_PATH + '/message-task',
    MESSAGE_TASK_CHAT: BASE_PATH + '/message-task-chat',
    MESSAGE_LOCATION: BASE_PATH + '/message-location',
    MESSAGE_MEETING: BASE_PATH + '/message-meeting',
    MESSAGE_REMINDER: BASE_PATH + '/add-reminder',
    MESSAGE_CONTACT: BASE_PATH + '/message-contact',
    MESSAGE_READE_UNREADE: BASE_PATH + '/read-unread-message',
    MESSAGE_DELETE: BASE_PATH + '/delete-message',
    FORWORD_MESSAGES: BASE_PATH + '/forward-message',
    CLEAR_CHAT: BASE_PATH + '/clear-message',
    TASK_DETAILS: BASE_PATH + '/task-chat',
    EXPORT_CHAT: BASE_PATH + '/export-chat',
    FILE_UPLOAD: BASE_PATH + '/file-upload',
    FILE_SCAN_UPLOAD: BASE_PATH + '/file-scan-upload',
    USER_DOCUMENTS: BASE_PATH + '/user-documents',
    CHECK_MOBILE_EXISTS: BASE_PATH + '/check-mobile-exists',
    USER_REGISTRATION: BASE_PATH + '/user-registration',
    USERS_MOBILE_NUMBERS: BASE_PATH + '/users-mobile-numbers',
    USER_LIST: BASE_PATH + '/user-list',
    USER_DETAILS: BASE_PATH + '/user-details',
    EDIT_PROFILE: BASE_PATH + '/edit-profile',
    DELETE_CHAT_USER: BASE_PATH + '/delete-chat-user',
    ADD_WORK_HOURS: BASE_PATH + '/add-work-hours',
    WORK_HOURS: BASE_PATH + '/work-hours',
    EDIT_WORK_HOURS_NOTE: BASE_PATH + '/edit-work-hours-summary',
    SEND_WORK_HOUR_EMAIL: BASE_PATH + '/send-work-hours-email',
    NOTE_LIST: BASE_PATH + '/note',
    ADD_NOTE: BASE_PATH + '/add-note',
    EDIT_NOTE: BASE_PATH + '/edit-note',
    EDIT_NOTE: BASE_PATH + '/edit-note',
    DELETE_NOTE: BASE_PATH + '/delete-note',
    DELETE_ACCOUNT: BASE_PATH + '/deleted-user-account',
    TASK_USERS_LIST: BASE_PATH + '/task-users-list',
    TASK_DONE: BASE_PATH + '/sent-task-done',
    TASK_SUMMARIZE_SEND: BASE_PATH + '/sent-task-summary-email',
    EVENTS_CREATE_UPDATE: BASE_PATH + '/events-create-update',
    EVENT_LIST: BASE_PATH + '/events-list',
    TASK_METTIN_EVENT_COUNT: BASE_PATH + '/unread-message-count',
    READ_UNREAD_COUNT: BASE_PATH + '/read-unread-manage',
    MEETINGS: BASE_PATH + '/meetings',
    CREATE_GROUP: BASE_PATH + '/create-group',
    ADD_GROUP_MAMBER: BASE_PATH + '/add-group-user',
    USER_LIST_FOR_GROUP: BASE_PATH + '/user-list-for-group',
    GROUP_LIST: BASE_PATH + '/group-list',
    EDIT_GROUP: BASE_PATH + '/edit-group',
    REMOVE_GROUP_USER: BASE_PATH + '/remove-group-user',
    TASK_UPDATE: BASE_PATH + '/tasks/update',
    REMINDER_PING: BASE_PATH + '/message-task-notification',
    MEETING_DONE: BASE_PATH + '/sent-meeting-done',
    GROUP_DETAILS: BASE_PATH + '/user-group-details',
    GROUP_SEND_TEXT_MESSAGE: BASE_PATH + '/group-text-message',
    GROUP_USER_LIST: BASE_PATH + '/user-list-for-group',
    GROUP_USER_SEARCH: BASE_PATH + '/group-member-search',
    GROUP_USER_REMOVE: BASE_PATH + '/remove-group-user',
    GROUP_ADD_USER: BASE_PATH + '/add-group-user',
    GROUP_EDIT: BASE_PATH + '/edit-group',
    GROUP_DELETE: BASE_PATH + '/group-delete',


}