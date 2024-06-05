import { ACTIONS } from "./API"

export const User_List = async (timeZone, token) => {
    const res = await fetch(ACTIONS.USER_LIST, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(timeZone)
    })
    const response = await res.json()
    return response
}

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
    const res = await fetch(ACTIONS.SEND_OTP, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
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