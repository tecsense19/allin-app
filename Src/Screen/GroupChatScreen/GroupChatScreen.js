import { View, Text } from 'react-native'
import React from 'react'

const GroupChatScreen = (props) => {
    const groupId = props.route.params
    console.log(groupId);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>GroupChatScreen</Text>
        </View>
    )
}

export default GroupChatScreen