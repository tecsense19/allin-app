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