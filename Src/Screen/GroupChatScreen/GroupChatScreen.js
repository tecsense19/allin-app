import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { User_List_For_Group } from '../../Service/actions';
import { getToken } from '../../Service/AsyncStorage';
import Loader from '../../Custom/Loader/loader';

const GroupChatScreen = (props) => {
    const groupId = props.route.params
    const [userData, setUserData] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        onFatchUserList()
    }, [])

    const onFatchUserList = async () => {
        setLoading(true)
        const token = await getToken()
        User_List_For_Group(token, groupId)
            .then((res) => {
                if (res.status_code == 200) {
                    setLoading(false)
                    setUserData(res.data.user_list)
                }
            })
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>GroupChatScreen</Text>
            <Loader visible={loading} />
        </View>
    )
}

export default GroupChatScreen