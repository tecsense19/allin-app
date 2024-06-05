import { Alert } from "react-native";

export const handleMsgText = async (token, msgType, inputText, userId) => {
    try {
        const response = await fetch('https://allin.website4you.co.in/api/v1/text-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                message_type: msgType,
                message: inputText,
                receiver_id: userId
            })
        });

        const data = await response.json();

        if (data?.message) {
            // Alert.alert(data.message);
        } else {
            setVisible(false);
            // Alert.alert('No message received from server.');
        }
    } catch (error) {
        setVisible(false);
        console.error('Error:', error);
        Alert.alert('An error occurred:', error.message);
    }
};
export const handleUnreadeMsg = async (token, id,) => {

    const response = await fetch('https://allin.website4you.co.in/api/v1/read-unread-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ messageIds: id, status: 'Read' })
    });
    const data = await response.json();
    if (data?.status_code == 200) {
        // Alert.alert(data?.message);
        // console.log(data);
    } else {
        // setVisible(false);
        // Alert.alert(data?.message);
        // console.log(data);

    }

};
export const handleFileUplode = async (token, formData, userId, MsgType) => {

    const response = await fetch('https://allin.website4you.co.in/api/v1/file-upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: formData
    });
    const data = await response.json();
    if (data?.status_code == 200) {
        const fileName = data.data.image_name
        const fileType = data.data.file_type
        // console.log(fileType,'typr');
        FileUplode(MsgType, fileName, userId, token, fileType)
    } else {
        Alert.alert(data?.message);
    }

};
const FileUplode = async (MsgType, fileName, userId, token, fileType) => {

    const response = await fetch('https://allin.website4you.co.in/api/v1/file-upload-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            message_type: MsgType,
            attachment_type: fileType,
            receiver_id: userId,
            attachment: fileName
        })
    });
    const data = await response.json();
    if (data?.message) {

    } else {
        Alert.alert(data?.message);
    }

};
export const handaleDeleteMsg = async (token, id) => {

    const response = await fetch('https://allin.website4you.co.in/api/v1/delete-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            message_id: id
        })
    });

    const data = await response.json();

    if (data?.message) {
        // Alert.alert(data.message);
    } else {
        setVisible(false);
        // Alert.alert('No message received from server.');
    }


}