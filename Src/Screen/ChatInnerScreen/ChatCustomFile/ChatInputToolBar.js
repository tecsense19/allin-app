import { View, Text, TouchableOpacity, TextInput, Image, } from 'react-native'
import React from 'react'
import { COLOR } from '../../../Assets/AllFactors/AllFactors';
const ChatInputToolBar = ({ onPress, onsend, value, onFocus, onBlur, onChangeText, autoFocus, source }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 50,
                marginHorizontal: 20, marginTop: 5
            }}>
            <View
                style={{
                    backgroundColor: '#F7F8F8',
                    borderRadius: 15,
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <TouchableOpacity onPress={onPress}>
                    <Text
                        style={{
                            fontSize: 24,
                            color: COLOR.black,
                            marginLeft: 12,
                            marginRight: 7,
                            fontWeight: '600',
                        }}>
                        +
                    </Text>
                </TouchableOpacity>
                <TextInput
                    value={value}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChangeText={onChangeText}
                    placeholderTextColor={COLOR.gray}
                    cursorColor={COLOR.black}
                    autoFocus={autoFocus}
                    style={{
                        flex: 1,
                        height: 50,
                        fontSize: 15,
                        fontWeight: '500',
                        alignItems: 'flex-start',
                        paddingLeft: 10,
                        color: COLOR.black, paddingRight: 10
                    }}
                    placeholder="Message Type Here"
                />
            </View>
            <TouchableOpacity
                onPress={onsend}
                style={{
                    backgroundColor: '#213460',
                    height: 50,
                    width: 50,
                    marginLeft: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
                }}>
                <Image
                    source={source}
                    style={{ height: 20, width: 20, tintColor: COLOR.white }}
                />
            </TouchableOpacity>
        </View>
    );
}

export default ChatInputToolBar