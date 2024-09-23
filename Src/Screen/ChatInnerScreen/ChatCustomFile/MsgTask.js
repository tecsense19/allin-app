import { View, Image, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React from 'react';
import { COLOR } from '../../../Assets/AllFactors/AllFactors';

const MsgTask = ({ data, onPress, disabled, ThreeDott }) => {


    const CheckBox = data.messageDetails.tasks;



    return (
        <TouchableOpacity onPress={onPress} disabled={disabled} style={styles.container}>
            <View style={styles.View1}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center', marginBottom: 10
                }}>
                    <View style={styles.View2}>
                        <Text style={styles.taskTitle}>
                            {data?.messageDetails?.task_name?.length > 28
                                ? `${data?.messageDetails?.task_name.slice(0, 28)}...`
                                : data?.messageDetails?.task_name}
                        </Text>
                        <TouchableOpacity onPress={ThreeDott} style={styles.onThreeDott}>
                            <Image source={require('../../../Assets/Image/dott.png')} style={styles.threedottImg} />
                        </TouchableOpacity>
                    </View>

                </View>
                {CheckBox.map((item, index) => {
                    console.log(item.task_checked)
                    return (
                        <View key={index} style={styles.checkboxContainer}>
                            <Image
                                source={item.task_checked ? require('../../../Assets/Image/check.png') : require('../../../Assets/Image/box.png')}
                                style={[styles.checkImg, { tintColor: item.task_checked ? COLOR.green : COLOR.black }]}
                            />
                            <Text>{item.checkbox}</Text>
                        </View>
                    )
                })}
            </View>
            <Text style={styles.tasktime}>{data?.time}</Text>
        </TouchableOpacity>
    );
};

export default MsgTask;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginVertical: 5,
    },
    View1: {
        width: '100%',
        borderRadius: 10,
        // paddingHorizontal: 10,
        backgroundColor: COLOR.white,
        shadowOpacity: 0.2,
        shadowOffset: { height: 1, width: 1 },
        shadowRadius: 5,
        padding: 15

    },
    View2: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    checkImg: {
        height: 20,
        width: 20,
        marginRight: 10,
    },
    taskTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: COLOR.black,
        width: '92%',

    },
    onThreeDott: {
        position: 'absolute',
        right: 0,
        paddingHorizontal: 5,
    },
    threedottImg: {
        height: 35,
        width: 35,
        tintColor: COLOR.green,
        resizeMode: 'contain',
    },
    tasktime: {
        fontWeight: '700',
        color: COLOR.placeholder,
        marginTop: 5,
        marginLeft: 5,
        fontSize: 12,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
});
