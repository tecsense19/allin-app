import { Alert } from "react-native";
import { ACTIONS } from "./API"

export const User_List = async (timeZone, Token, Search) => {
    // console.log('request', token);
    const res = await fetch(ACTIONS.USER_LIST, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${Token}`
        },
        body: JSON.stringify(timeZone)
    })
    const response = await res.json()
    // console.log('response', response);

    return response
}
// export const User_List = async (timeZone, token) => {
//     try {
//         const res = await fetch(ACTIONS.USER_LIST, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify(timeZone)
//         });

//         const response = await res.json();
//         if (response.message == 'Token Expired' && response.status_code == 401) {
//             Alert.alert('expire')
//             const newToken = await refreshToken(token);
//             return User_List(timeZone, newToken);
//         }
//         return response;
//     } catch (error) {
//         console.error('Error in User_List:', error);
//         throw error;
//     }
// };

export const User_Logout = async (device_token, token) => {
    const res = await fetch(ACTIONS.LOGOUT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(device_token)
    })
    const response = await res.json()
    return response
}

export const Check_Mobile_Exists = async (data) => {
    const res = await fetch(ACTIONS.CHECK_MOBILE_EXISTS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    const response = await res.json()
    return response
}

export const Send_Otp = async (data) => {
    const formData = new FormData();

    if (data.type === "Login") {
        formData.append('country_code', data?.country_code);
        formData.append('mobile', data?.mobile);
        formData.append('type', data?.type);
    }
    else {
        formData.append('country_code', data?.country_code);
        formData.append('mobile', data?.mobile);
        formData.append('type', data?.type);
        formData.append('first_name', data?.first_name);
        formData.append('last_name', data?.last_name);
        formData.append('device_token', data?.device_token);
        const profileImageUri = data?.profile[0]?.uri;
        const profileimageName = profileImageUri ? profileImageUri.split('/').pop() : ''; // Extract image name from URI
        if (profileimageName) { formData.append('profile', { uri: profileImageUri, name: profileimageName, type: data?.profile[0]?.type }); }

        const coverImageUri = data?.cover_image[0]?.uri;
        const coverimageName = coverImageUri ? coverImageUri?.split('/').pop() : '';
        if (coverimageName) { formData.append('cover_image', { uri: coverImageUri, name: coverimageName, type: data?.cover_image[0]?.type }); }

    }

    const res = await fetch(ACTIONS.SEND_OTP, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: formData
    })
    const response = await res.json()
    return response
}

export const Verify_Otp = async (data) => {
    const res = await fetch(ACTIONS.VERIFY_OTP, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    const response = await res.json()
    return response
}

export const User_Registration = async (data, otp, deviceToken) => {
    const formData = new FormData();
    formData.append('mobile', data?.mobile);
    formData.append('country_code', data?.country_code);
    formData.append('first_name', data?.first_name);
    formData.append('last_name', data?.last_name);
    formData.append('otp', otp);
    formData.append('device_token', deviceToken);
    const profileImageUri = data?.profile[0]?.uri;
    const profileimageName = profileImageUri ? profileImageUri.split('/').pop() : ''; // Extract image name from URI
    if (profileimageName) { formData.append('profile', { uri: profileImageUri, name: profileimageName, type: data?.profile[0]?.type }); }

    const coverImageUri = data?.cover_image[0]?.uri;
    const coverimageName = coverImageUri ? coverImageUri?.split('/').pop() : '';
    if (coverimageName) { formData.append('cover_image', { uri: coverImageUri, name: coverimageName, type: data?.cover_image[0]?.type }); }
    const res = await fetch(ACTIONS.USER_REGISTRATION, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: formData
    })
    const response = await res.json()
    return response
}

export const Clear_Chat = async (id, token) => {
    const res = await fetch(ACTIONS.CLEAR_CHAT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ user_id: id })
    })
    const response = await res.json()
    return response
}

export const Delete_Chat_User = async (id, token) => {
    const res = await fetch(ACTIONS.DELETE_CHAT_USER, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: id })
    })
    const response = await res.json()
    return response
}

export const Get_All_Messages = async (data, token) => {
    const res = await fetch(ACTIONS.USER_DETAILS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    const response = await res.json()
    return response
}

export const Chat_Text_Messages = async (token, msgType, inputText, userId) => {
    const res = await fetch(ACTIONS.MESSAGE_TEXT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            message_type: msgType,
            message: inputText,
            receiver_id: userId
        })
    })
    const response = await res.json()
    return response
}

export const Read_Unread_Messages = async (token, id) => {
    const res = await fetch(ACTIONS.MESSAGE_READE_UNREADE, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ messageIds: id, status: 'Read' })
    })
    const response = await res.json()
    if (response?.status_code == 200) {
    } else {
        Alert.alert(data?.message);

    }
    return response
}

export const Chat_Delete_Messages = async (token, id) => {
    const res = await fetch(ACTIONS.MESSAGE_DELETE, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message_id: id })
    })
    const response = await res.json()
    if (response?.status_code == 200) {

    } else {
        Alert.alert(data?.message);

    }
    return response
}

export const Chat_File_Message = async (MsgType, fileName, userId, token, fileType) => {
    const res = await fetch(ACTIONS.MESSAGE_FILE_UPLOAD, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message_type: MsgType, attachment_type: fileType, receiver_id: userId, attachment: fileName })
    })
    const response = await res.json()
    if (response?.status_code == 200) {

    } else {
        Alert.alert(data?.message);

    }
    return response
}

export const Forword_Messages = async (token, msgId, userID) => {
    const res = await fetch(ACTIONS.FORWORD_MESSAGES, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message_id: msgId, user_id: userID })
    })
    const response = await res.json()
    if (response?.status_code == 200) {

    } else {
        Alert.alert(data?.message);

    }
    return response
}

export const File_Uplode = async (token, formData,) => {
    const res = await fetch(ACTIONS.FILE_UPLOAD, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: formData
    })
    const response = await res.json()

    return response
}

export const Edit_Profile = async (token, phone, fname, lname, title, description, email, instagramUrl, facebookurl, twitterurl, youtubeurl, linkedinurl, img, bgimg) => {

    const formData = new FormData();
    formData.append('mobile', phone);
    formData.append('first_name', fname);
    formData.append('last_name', lname);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('email', email);
    formData.append('instagram_profile_url', instagramUrl);
    formData.append('facebook_profile_url', facebookurl);
    formData.append('twitter_profile_url', twitterurl);
    formData.append('youtube_profile_url', youtubeurl);
    formData.append('linkedin_profile_url', linkedinurl);
    if (img?.uri) {
        const profileImageUri = img?.uri;
        const profileImageName = profileImageUri ? profileImageUri.split('/').pop() : '';
        const profileImageType = img?.type;
        formData.append('profile', {
            uri: profileImageUri,
            name: profileImageName,
            type: profileImageType
        });
    }
    if (bgimg?.uri) {
        const profileImageUri = bgimg?.uri;
        const profileImageName = profileImageUri ? profileImageUri.split('/').pop() : '';
        const profileImageType = bgimg?.type;
        formData.append('cover_image', {
            uri: profileImageUri,
            name: profileImageName,
            type: profileImageType
        });
    }
    const res = await fetch(ACTIONS.EDIT_PROFILE, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
        body: formData
    })
    const response = await res.json()

    return response

}

export const Task_Messages = async (token, MsgType, taskData) => {

    const remindId = taskData?.remind
    var stringArray = remindId?.map(String);
    var id = stringArray?.join(',');

    const res = await fetch(ACTIONS.MESSAGE_TASK, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message_type: MsgType, receiver_id: id, task_name: taskData?.tasktitle, task_description: taskData?.taskdescriptions })

    })
    const response = await res.json()
    return response
}

export const Task_Detail = async (token, Taskid, Timezone,) => {

    const res = await fetch(ACTIONS.TASK_DETAILS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ task_id: Taskid, timezone: Timezone, })

    })
    const response = await res.json()
    return response
}

export const Task_Message_Send = async (token, taskid, text, chattype, filetype, filename) => {

    const res = await fetch(ACTIONS.MESSAGE_TASK_CHAT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message_type: 'Task Chat', task_id: taskid, message: text, chat_type: chattype, attachment_type: filetype, attachment: filename })


    })
    const response = await res.json()
    return response
}

export const Meeting_Messages = async (token, taskData) => {
    const remindId = taskData?.remind
    var stringArray = remindId?.map(String);
    var id = stringArray?.join(',');
    console.log(taskData.latitude);
    console.log(taskData.longitude);
    console.log(taskData.address);
    const res = await fetch(ACTIONS.MESSAGE_MEETING, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            message_type: 'Meeting',
            receiver_id: id, mode: 'Offline',
            title: taskData.meetingtitle,
            description: taskData.meetingdescription,
            date: taskData.meetingdate,
            start_time: taskData.meetingtime,
            end_time: taskData.meetingtime,
            meeting_url: '',
            latitude: taskData.latitude,
            longitude: taskData.longitude,
            location: taskData.address,
            location_url: `https://www.google.com/maps?q=${taskData?.latitude},${taskData?.longitude}`
        })
    })
    const response = await res.json()
    console.log(response);
    return response
}

export const Reminder_Messages = async (token, taskData) => {
    const remindId = taskData?.remind
    var stringArray = remindId?.map(String);
    var id = stringArray?.join(',');
    const a = { title: taskData.remindtitle, description: taskData.reminddescriptions, date: taskData.remindtime, time: taskData.apiTime, date: taskData.apiDate, users: id }
    console.log(a);
    const res = await fetch(ACTIONS.MESSAGE_REMINDER, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: taskData.remindtitle, description: taskData.reminddescriptions, date: taskData.remindtime, date: taskData.apiDate, time: taskData.apiTime, users: id })
    })
    const response = await res.json()
    return response
}

export const Location_Messages = async (token, data, id) => {

    const res = await fetch(ACTIONS.MESSAGE_LOCATION, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message_type: 'Location', receiver_id: id, latitude: data.latitude, longitude: data.longitude, location_url: `https://www.google.com/maps?q=${data?.latitude},${data.longitude}` })
    })
    const response = await res.json()
    console.log(response);
    return response
}

export const Contact_Message = async (token, data, id) => {
    const formData = new FormData()
    formData.append('contact_details', JSON.stringify(data))
    formData.append('receiver_id', JSON.stringify(id))
    const res = await fetch(ACTIONS.MESSAGE_CONTACT, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: formData
    })
    const response = await res.json()
    console.log(response);
    return response
}

export const Add_Work_Hour = async (token, Start, End, Summary, timeZone) => {
    const res = await fetch(ACTIONS.ADD_WORK_HOURS, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ start_date_time: Start, end_date_time: End, summary: Summary, timezone: timeZone })
    })
    const response = await res.json()
    console.log(response);
    return response
}

export const Work_Hour = async (token, Month) => {

    const res = await fetch(ACTIONS.WORK_HOURS, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ month: Month })
    })
    const response = await res.json()
    return response
}

export const Edit_Work_Hour_Summary = async (token, Id, summary) => {

    const res = await fetch(ACTIONS.EDIT_WORK_HOURS_NOTE, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: Id, summary: summary })
    })
    const response = await res.json()
    return response
}
export const Work_Hour_Send = async (token, Id, Month, EmailSummary) => {
    console.log(token, Id, Month, EmailSummary, '================================================');
    const res = await fetch(ACTIONS.SEND_WORK_HOUR_EMAIL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: Id, month: Month, summary: EmailSummary })
    })
    const response = await res.json()
    console.log(response);
    return response
}

export const Add_Note = async (token, Title, Description) => {

    const res = await fetch(ACTIONS.ADD_NOTE, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: Title, description: Description })
    })
    const response = await res.json()
    return response
}

export const Get_Note = async (token) => {
    const res = await fetch(ACTIONS.NOTE_LIST, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    const response = await res.json()
    return response
}
export const Edit_Note = async (token, Id, Title, Description) => {
    const res = await fetch(ACTIONS.EDIT_NOTE, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: Id, title: Title, description: Description })
    })
    const response = await res.json()
    console.log(response);
    return response
}

export const Delete_Note = async (token, Id,) => {
    const res = await fetch(ACTIONS.DELETE_NOTE, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: Id, })
    })
    const response = await res.json()
    console.log(response);
    return response
}

export const Delete_Account = async (token,) => {
    const res = await fetch(ACTIONS.DELETE_ACCOUNT, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    const response = await res.json()
    return response
}

export const Task_User_List = async (token, Type) => {
    const res = await fetch(ACTIONS.TASK_USERS_LIST, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ type: Type }),
    })
    const response = await res.json()
    return response
}

export const Refresh_Token = async (token) => {
    try {
        const response = await fetch(ACTIONS.REFRESH_TOKEN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();
        console.log(data, 'tokendata=========>>>>>>>');
        // await AsyncStorage.setItem('myData', JSON.stringify({ data: { token: newToken } }));
        return newToken;
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
};

