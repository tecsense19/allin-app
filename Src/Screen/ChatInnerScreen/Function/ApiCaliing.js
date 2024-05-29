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
            Alert.alert(data.message);
        } else {
            setVisible(false);
            Alert.alert('No message received from server.');
        }
    } catch (error) {
        setVisible(false);
        console.error('Error:', error);
        Alert.alert('An error occurred:', error.message);
    }
};