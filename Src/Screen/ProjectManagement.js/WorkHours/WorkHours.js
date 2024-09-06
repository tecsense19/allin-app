import { View, Text, TouchableOpacity, ImageBackground, Image, FlatList, KeyboardAvoidingView, TextInput, ScrollView, Alert, Modal } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Stopwatch } from 'react-native-stopwatch-timer';
import { COLOR } from '../../../Assets/AllFactors/AllFactors';
import NavigateHeader from '../../../Custom/Header/NavigateHeader';
import WorkNoteModal from '../../../Custom/Modal/WorkNoteModal';
import { Add_Work_Hour, Edit_Work_Hour_Summary, User_List, Work_Hour, Work_Hour_Send } from '../../../Service/actions';
import Loader from '../../../Custom/Loader/loader';
import MonthPicker from 'react-native-month-year-picker'
import TimeZone from 'react-native-timezone'
import { getToken } from '../../../Service/AsyncStorage';
import { useFocusEffect } from '@react-navigation/native';
import ChatInputToolBar from '../../ChatInnerScreen/ChatCustomFile/ChatInputToolBar';
import Button from '../../../Custom/Button/Button';
import Timezone from 'react-native-timezone'



const WorkHours = props => {
    const [start, setStart] = useState(false);
    const [time, setTime] = useState('00:00');
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [timerData, setTimerData] = useState([])
    const [selectedMonth, setSelectedMonth] = useState('')
    const [summary, setSummary] = useState('')
    const [showWorkModal, setShowWorkModal] = useState(false)
    const [clear, setClear] = useState(false)
    const [startTimeDate, setStartTimeDate] = useState('')
    const [endTimeDate, setEndTimeDate] = useState('')
    const [WorkHourData, setWorkHourData] = useState([])
    const [loading, setLoading] = useState(false)
    const [hours, minutes, seconds] = time.split(':');
    const [isUpdate, setIsUpdate] = useState(false)
    const [summaryId, setSummaryID] = useState('')
    const [token, setToken] = useState('')
    const [EmailSummary, setEmailSummary] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [visibleUser, setVisibleUser] = useState(false);
    const [userlist, setUserList] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);


    const monthIndex = date.getMonth();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months[monthIndex] + '-' + date.getFullYear();
    const apiformattedMonth = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    const apiMonthyear = (date.getFullYear()) + '-' + apiformattedMonth
    const newTime = `${minutes}:${seconds}`;
    const listTime = `${hours}h:${minutes}mi`;
    const options = {
        text: {
            fontSize: 18,
            fontWeight: '700',
            color: COLOR.white,
            textAlign: 'center',
        },
    };
    const totalDuration = 10;
    const timestamp = new Date();
    timestamp.setDate(timestamp.getDate());
    timestamp.setHours(timestamp.getHours());
    timestamp.setMinutes(timestamp.getMinutes());
    const formattedDate = timestamp.toISOString().slice(0, 19).replace("T", " ");
    const filteredUserData = userlist?.filter(user => selectedItems?.includes(user.id)); //show selected user by defualt one user for chat

    var stringArray = selectedItems?.map(String);
    var EmailIds = stringArray?.join(',');
    // console.log(id);
    const onhandleLap = async () => {
        let newData = [...timerData];
        newData.push({ id: timerData == null ? 1 : timerData?.length + 1, time: listTime, note: 'hello', o: 'peeeee', date: Date.parse(new Date()) })
        if (start == true) {
            setTimerData(newData)
            setStart(false)
            setEndTimeDate(formattedDate)
            setShowWorkModal(true)
        } else {
            setStart(true)
            setStartTimeDate(formattedDate)
            setClear(false)
        }
    }
    const list = ({ item }) => {
        const originalDate = new Date(item.start_date_time);
        const day = originalDate.getDate();
        const month = originalDate.getMonth() + 1;
        const year = originalDate.getFullYear();
        const formattedDay = day < 10 ? "0" + day : day;
        const formattedMonth = month < 10 ? "0" + month : month;
        const convertedDateString = `${formattedDay}/${formattedMonth}/${year}`;
        const startDateTime = item.start_date_time.toString().slice(0, 19).replace("T", " ");
        const EndDateTime = item.end_date_time.toString().slice(0, 19).replace("T", " ");
        const oneClickPluse = async () => {
            setIsUpdate(true)
            setSummaryID(item.id)
            setStartTimeDate(startDateTime)
            setEndTimeDate(EndDateTime)
            setSummary(item?.summary)
            setShowWorkModal(true)
        }
        return (
            <TouchableOpacity style={{ backgroundColor: COLOR.lightgreen, borderRadius: 10, height: 70, padding: 10, marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLOR.black }}>{convertedDateString}</Text>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: COLOR.textcolor, marginTop: 10 }}>{'Location Address'}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLOR.black }}>{item.total_hours}</Text>
                    <TouchableOpacity onPress={() => { oneClickPluse() }} style={{ backgroundColor: COLOR.white, height: 25, width: 25, alignItems: 'center', justifyContent: 'center', borderRadius: 50, marginLeft: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: '500', color: COLOR.green, marginBottom: 1.5 }}>+</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }
    const AddWorkHours = async () => {
        const timeZone = TimeZone.getTimeZone()
        await Add_Work_Hour(token, startTimeDate, endTimeDate, summary, timeZone)
    }
    const EditWorkHours = async () => {
        await Edit_Work_Hour_Summary(token, summaryId, summary)
    }
    useEffect(() => {
        GetWorkHours()
        get()
        getuser()

    }, [clear, apiMonthyear,])
    // console.log(apiMonthyear);
    const get = async () => {
        const Token = await getToken()
        if (Token) {
            setToken(Token)
            hanaleUserList(Token)

        } else {
            get()
        }
    }
    useFocusEffect(useCallback(() => {
        GetWorkHours()
    }, [WorkHourData]))
    const GetWorkHours = async () => {

        await Work_Hour(token, apiMonthyear)
            .then((res) => {

                setWorkHourData(res.data.workHours);
                setLoading(false)
            })
            .catch((e) => {
                setLoading(false)

                // console.log(e, 'workhour');
            })
    }
    const showPicker = useCallback((value) => setShow(value), []);
    const onValueChange = useCallback(
        (event, newDate) => {
            const selectedDate = newDate || date;
            showPicker(false);
            setDate(selectedDate);
        },
        [date, showPicker],
    );
    const SendEmail = () => {
        Work_Hour_Send(token, EmailIds, apiMonthyear, EmailSummary)
            .then((res) => {
                if (res.statuscode === 200) {
                    setEmailSummary('')
                    selectedItems('')
                    console.log(res, 'wefrgthrgefertyjhtrererterwytey');
                }
            })
            .catch((e) => { })
    }
    const selectedUser = userlist?.filter(user => {
        return user?.id
    })

    const toggleItem = (itemId) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter((id) => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    };
    const getuser = async () => {
        const Token = await getToken();
        if (Token) {
            setToken(Token);

            const bodydata = { timezone: Timezone.getTimeZone(), };

            try {
                const res = await User_List(bodydata, Token);
                if (res.status_code === 200) {
                    setUserList(res.data.userList);
                    setLoading(false);
                } else {
                    console.log('User_List API returned error:', res);
                }
            } catch (error) {
                console.log('User_List API error:', error);

            }
        }
    };
    return (
        <View
            style={{
                backgroundColor: COLOR.white,
                flex: 1,
            }}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
                <ScrollView>
                    <View style={{ padding: 20, paddingHorizontal: 30 }}>
                        <NavigateHeader top={30} color={COLOR.black} title={'Timer'} onPress={() => props.navigation.goBack()} />
                    </View>
                    <ImageBackground source={require('../../../Assets/Image/timerborder.png')} resizeMode='contain' style={{ height: 135, width: 135, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ borderWidth: 2, borderRadius: 100, padding: 10, marginTop: 5, borderColor: '#F7F8F8' }}>
                            <View style={{ height: 80, width: 80, backgroundColor: 'red', borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={onhandleLap}>
                                    <Image source={start ? require('../../../Assets/Image/pause.png') : require('../../../Assets/Image/Play.png')} style={{ height: 40, width: 40, tintColor: COLOR.white }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
                    <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '700', marginTop: -10 }}>{newTime}</Text>
                    <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '500', marginTop: 15, marginBottom: 10 }}>{start ? 'Stop Time' : 'Start Time'}</Text>
                    <Stopwatch
                        getTime={res => setTime(res)}
                        laps
                        start={start}
                        options={options}
                        totalDuration={totalDuration}
                        reset={clear}
                    />
                    <MonthDropDown onPress={() => setShow(!show)} Month={selectedMonth || month} isshow={show} />
                    {show ?
                        <MonthPicker
                            onChange={onValueChange}
                            value={date}
                            maximumDate={new Date()}

                        />
                        //  <View style={{ height: '40%', marginHorizontal: 25, marginTop: 5, borderRadius: 10, backgroundColor: COLOR.white, shadowOffset: { height: 0.5, width: 0 }, shadowColor: 'gray', shadowOpacity: 0.3, }}>
                        //     <FlatList renderItem={({ item }) => (
                        //         <TouchableOpacity style={{ padding: 8, backgroundColor: COLOR.verylightgray, marginTop: 10 }} onPress={() => { setSelectedMonth(item), setShow(false) }}>
                        //             <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: '600' }}>{item}</Text>
                        //         </TouchableOpacity>
                        //     )} data={months} style={{}} />
                        // </View>
                        :
                        <FlatList renderItem={list} data={WorkHourData} style={{ paddingHorizontal: 30 }} />}
                    <ScrollView>
                        <WorkNoteModal Close={() => { setShowWorkModal(false) }} title={isUpdate ? 'Update Summary' : 'Add Summary'} visible={showWorkModal} buttonTitle={isUpdate ? 'Update' : 'Save'}
                            onPress={() => {
                                if (isUpdate) {
                                    EditWorkHours()
                                    setShowWorkModal(false);

                                } else {
                                    setShowWorkModal(false);
                                    setClear(true);
                                    AddWorkHours();
                                    setLoading(true);
                                }
                            }}
                            startTime={startTimeDate} EndTime={endTimeDate} summary={summary} onChangeText={(res) => setSummary(res)} />
                    </ScrollView>

                    <Loader visible={loading} Retry={() => { getuser(), GetWorkHours() }} />

                </ScrollView>
                <View style={{ marginBottom: isFocused ? 5 : 25, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, margin: 10, }}>
                        <TouchableOpacity onPress={() => setVisibleUser(true)} style={{ height: 42, width: 42, backgroundColor: COLOR.green, alignItems: 'center', justifyContent: 'center', borderRadius: 50, marginRight: 5 }}>
                            <Text style={{ fontSize: 25, fontWeight: '500', color: COLOR.white, }}>+</Text>
                        </TouchableOpacity>
                        <FlatList style={{ flex: 1 }} horizontal data={filteredUserData} renderItem={({ item, index }) => {
                            return (
                                <View>
                                    <Image source={{ uri: index > 3 ? '' : item.profile }} style={{ height: 42, width: 42, borderRadius: 50, marginLeft: index > 0 ? -20 : 0 }} />
                                </View>
                            )
                        }} />
                    </View>
                    <ChatInputToolBar placeholder={'Email Summary To...'} hidePlus={true} source={require('../../../Assets/Image/send.png')} onChangeText={text => { setEmailSummary(text) }} onBlur={() => setIsFocused(false)}
                        onFocus={() => setIsFocused(true)} value={EmailSummary} onsend={SendEmail}
                    />
                </View>
            </KeyboardAvoidingView>
            <Modal visible={visibleUser} >
                <View style={{ flex: 1, backgroundColor: COLOR.black, }}>
                    <View style={{ paddingHorizontal: 20 }}>
                        <NavigateHeader title={'Select Users'} color={COLOR.white} onPress={() => setVisibleUser(false)} />
                    </View>
                    <View style={{ marginTop: 10, backgroundColor: COLOR.white, flex: 1, borderRadius: 20 }}>
                        <FlatList style={{ paddingHorizontal: 20, padding: 10, marginBottom: 70 }} data={selectedUser} renderItem={(({ item }) => {
                            // console.log(item);
                            const userName = item?.first_name + ' ' + item.last_name
                            return (
                                <View>
                                    <View style={{ justifyContent: 'space-between', borderRadius: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', marginVertical: 8, padding: 5, shadowRadius: 1.5, shadowOpacity: 0.5, margin: 3, shadowColor: COLOR.gray, shadowOffset: { height: 1, width: 0 } }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image source={{ uri: item?.profile }} style={{ height: 50, width: 50, borderRadius: 50 }} />
                                            <Text style={{ fontSize: 16, marginLeft: 10, color: COLOR.black, fontWeight: 'bold' }}>{userName?.length >= 16 ? userName?.slice(0, 16) + ' . . . ' || '' : userName}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => toggleItem(item?.id)}>
                                            <Image
                                                source={selectedItems.includes(item.id) ? require('../../../Assets/Image/check.png') : require('../../../Assets/Image/box.png')}
                                                style={{ height: 25, width: 25, tintColor: selectedItems.includes(item.id) ? COLOR.green : COLOR.lightgray }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })} />
                        <View style={{ position: 'absolute', bottom: 20, left: 20, right: 20, }}>
                            <Button color={COLOR.white} bgColor={COLOR.green} title={'Select'} onPress={() => setVisibleUser(false)} />
                        </View>
                    </View>
                </View>
            </Modal>

        </View >
    );
};
export default WorkHours;
const MonthDropDown = ({ Month, onPress, isshow }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{
            backgroundColor: COLOR.white, marginHorizontal: 25, height: 45, borderRadius: 10, alignItems: 'center',
            justifyContent: 'center',
            shadowOffset: { height: 0.5, width: 0 }, shadowColor: 'gray', shadowOpacity: 0.3, marginTop: -10
        }}>
            <View style={{ flexDirection: 'row', }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', flex: 0.9, textAlign: 'center' }}>{Month}</Text>
                <Image source={require('../../../Assets/Image/back.png')} style={{ height: 24, width: 24, transform: [{ rotate: isshow ? '-270deg' : '270deg' }] }} />

            </View>



        </TouchableOpacity>
    )
}
