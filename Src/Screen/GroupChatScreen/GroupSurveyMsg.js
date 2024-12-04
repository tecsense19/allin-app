import { View, Text, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import * as Progress from 'react-native-progress';
import { Set_Vote } from '../../Service/actions';

const GroupSurveyMsg = ({ message, totalVotes, myid }) => {
    const IsSender = message.sentBy == "loginUser"
    const WIDTH = Dimensions.get('screen').width

    return (
        <View style={{ flexDirection: 'row', alignSelf: IsSender ? 'flex-end' : 'flex-start', alignItems: 'flex-end' }}>
            {IsSender ? null :
                <Image source={{ uri: message.senderProfile }}
                    style={{
                        height: 35, width: 35, borderRadius: 35, marginRight: 5
                    }} />}
            <View style={{ width: '85%', backgroundColor: IsSender ? COLOR.lightgreen : COLOR.verylightgray, borderRadius: 10, }}>
                <Text style={{ color: COLOR.black, fontSize: 16, fontWeight: 'bold', marginTop: 20, paddingHorizontal: 20 }}>{message?.message}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, paddingHorizontal: 20 }}>
                    <Image source={require('../../Assets/Image/pollmoreoptionicon.png')} style={{ height: 15, width: 30, resizeMode: 'contain' }} />
                    <Text>{'Selecte one or more'}</Text>
                </View>
                <FlatList scrollEnabled={false} style={{ marginTop: 20, paddingHorizontal: 20 }} data={message?.messageDetails} renderItem={({ item }) => {
                    const count = item?.user_data?.length

                    const calculatePercentage = () => {
                        if (totalVotes === 0) return 0;
                        return (count == undefined ? 0 : count / totalVotes).toFixed(2);
                    };
                    const isVoted = item?.user_data?.some(i => i?.id === myid);

                    const handleVoteApi = (id) => {
                        Set_Vote(id, isVoted ? 'false' : 'true')
                    }

                    return (
                        <View style={{ marginTop: 15, flex: 1 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                    {isVoted ?
                                        <TouchableOpacity onPress={() => handleVoteApi(item?.option_id)}>
                                            <Image source={require('../../Assets/Image/pollsellect.png')} style={{ height: 18, width: 18 }} />
                                        </TouchableOpacity> :
                                        <TouchableOpacity onPress={() => handleVoteApi(item?.option_id)}>

                                            <Image source={require('../../Assets/Image/pollunselect.png')} style={{ height: 18, width: 18 }} />
                                        </TouchableOpacity>}
                                    <Text numberOfLines={2} style={{ fontSize: 14, marginLeft: 5, color: COLOR.black, fontWeight: '500', flex: 1, }}>{item.option}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View>
                                        <FlatList horizontal data={item.user_data} renderItem={({ item, index }) => {

                                            return (
                                                <Image source={{ uri: item.profile }} style={{ height: 20, width: 20, borderRadius: 20, marginLeft: index == '0' ? 0 : -10 }} />
                                            )
                                        }} />
                                    </View>
                                    <Text style={{ fontSize: 14, marginLeft: 5, color: COLOR.black, fontWeight: '500' }}>{count ? count : null}</Text>
                                </View>
                            </View>
                            <Progress.Bar unfilledColor={COLOR.lightgray} borderWidth={0} height={7} color={COLOR.green} progress={calculatePercentage()} width={WIDTH / 1.45} style={{ marginTop: 10 }} />

                        </View>
                    )
                }} />
                <Text style={{ textAlign: 'right', color: COLOR.gray, fontSize: 13, marginVertical: 10, paddingHorizontal: 20, fontWeight: '600' }}>{message.time}</Text>
                <View style={{ borderBottomWidth: 1, borderColor: COLOR.lightgray, marginTop: 10 }} />
                <TouchableOpacity style={{}}>
                    <Text style={{ fontSize: 16, textAlign: 'center', padding: 15, color: COLOR.green, fontWeight: 'bold' }}>
                        View Votes
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default GroupSurveyMsg