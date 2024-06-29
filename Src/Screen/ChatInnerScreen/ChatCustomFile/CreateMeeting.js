import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    Modal,
    FlatList,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-native-date-picker';
import uuid from 'react-native-uuid'
import { COLOR } from '../../../Assets/AllFactors/AllFactors';
import Button from '../../../Custom/Button/Button';
import NavigateHeader from '../../../Custom/Header/NavigateHeader';
import Timezone from 'react-native-timezone'
import { User_List } from '../../../Service/actions';


const CreateMsgMeeting = ({ onSubmit, userId, token }) => {
    const [title, setTitle] = useState('');
    const [search, setSearch] = useState('');
    const [descriptions, setDescription] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [opentime, setOpenTime] = useState(false);
    const [Time, setTime] = useState(new Date());
    const [visible, setVisible] = useState(false);
    const [UserData, setUserData] = useState();
    const [selectedItems, setSelectedItems] = useState([userId]);
    const [myID, setMyId] = useState('');

    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Add 1 to the month and pad with zero
    const day = date.getUTCDate().toString().padStart(2, '0'); // Pad with zero
    const meetingdate = year + '-' + month + '-' + day


    const time = new Date(Time);
    time.setHours(time.getHours());
    time.setMinutes(time.getMinutes());
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');
    const meetingtime = `${hours}:${minutes}:${seconds}`;
    const formattedHours = hours % 12 || 12;
    const period = hours < 12 ? 'AM' : 'PM';
    const meetingDesplayTime = formattedHours + ':' + minutes + ' ' + period

    console.log(meetingtime);
    const handleSubmit = () => {
        const data = { type: 'Meeting', meetingtitle: title, meetingdescription: descriptions, meetingdate: meetingdate, meetingtime: meetingtime, remind: selectedItems }
        if (title == '' || descriptions == '') {
            Alert.alert('Please Enter title and description');
        }
        else if (
            descriptions.length < 50
        ) { Alert.alert('Write minimum 50 Character') }
        else {
            onSubmit(data);
            setTitle(null)
            setDescription(null)
        }
    };
    const filteredUserData = UserData?.filter(user => selectedItems?.includes(user.id)); //show selected user by defualt one user for chat
    const selectedUser = UserData?.filter(user => {

        return user?.id

    })// by defualt selected user not show

    const list = ({ item, index }) => {
        return (
            <View>
                {index < 4 ? <Image source={{ uri: item.profile }} style={{
                    height: 50, width: 50,
                    borderRadius: 100, marginLeft: index == 0 ? 0 : -20
                }} /> : ''}
            </View>
        )
    }
    const toggleItem = (itemId) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter((id) => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    };

    const getuser = async () => {
        const timezone = { timezone: Timezone.getTimeZone() }
        await User_List(timezone, token).then((res) => {
            if (res.status_code == 200) {
                setUserData(res?.data?.userList)

            }
        }).catch((e) => { console.log(e); })

    };
    useEffect(() => {
        getuser()

    }, [myID])
    return (
        <ScrollView
            bounces={false}
            style={{
                backgroundColor: COLOR.white,
                width: '100%',
                paddingHorizontal: 30,
                borderRadius: 20,
                marginBottom: isFocused ? '80%' : 0
            }}>
            <Text style={{ textAlign: 'center', marginTop: 30, fontSize: 18, color: COLOR.black, fontWeight: 'bold' }}>Meeting</Text>

            <Title title={'Title'} />
            <TextInput
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Enter Title..."
                onChangeText={res => setTitle(res)}
                value={title}
                placeholderTextColor={COLOR.placeholder}
                style={{
                    backgroundColor: COLOR.white, shadowOpacity: 0.2, shadowRadius: 5, shadowOffset: { height: 1, width: 1 },
                    height: 45,
                    borderRadius: 5,
                    paddingLeft: 10,
                    fontWeight: '500',
                    fontSize: 16,
                    color: COLOR.textcolor, marginTop: 5
                }}
            />
            <Title title={'Description'} />
            <TextInput
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}

                placeholder="Enter Description..."
                multiline
                value={descriptions}
                onChangeText={(res) => setDescription(res)}
                placeholderTextColor={COLOR.placeholder}
                style={{
                    backgroundColor: COLOR.white, shadowOpacity: 0.2, shadowRadius: 5, shadowOffset: { height: 1, width: 1 },
                    height: 150,
                    borderRadius: 5,
                    paddingLeft: 10,
                    fontSize: 16,
                    marginTop: 8,
                    paddingTop: 10,
                    fontWeight: '500',
                    color: COLOR.textcolor,
                }}
            />
            {descriptions.length > 50 ? '' : <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <Image source={require('../../../Assets/Image/notice.png')} style={{ height: 15, width: 15, marginRight: 5, tintColor: COLOR.orange }} />
                <Text style={{
                    color: COLOR.orange, fontWeight: '500',
                    textAlign: 'left', fontSize: 14, width: '90%',
                }}>{'Descriptions Minimum 50 Characters Are Require'}</Text>
            </View>}

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 25,
                }}>
                <PickerButton title={meetingdate} onPress={() => { setOpen(true) }} />
                <PickerButton title={meetingDesplayTime} onPress={() => { setOpenTime(true) }} />
                <PickerButton title={'Remind'} onPress={() => setVisible(true)} />
            </View>
            <TextInput
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}

                placeholder="write a location"
                onChangeText={res => setSearch(res)}
                value={search}
                placeholderTextColor={COLOR.placeholder}
                style={{
                    backgroundColor: COLOR.white, shadowOpacity: 0.2, shadowRadius: 5, shadowOffset: { height: 1, width: 1 },
                    height: 45,
                    borderRadius: 5,
                    paddingLeft: 10,
                    fontWeight: '500',
                    fontSize: 16,
                    color: COLOR.textcolor, marginTop: 25
                }}
            />
            <View style={{
                alignItems: 'center', justifyContent: 'center',
                height: 150, width: '100%', marginTop: 20,
                backgroundColor: COLOR.white, shadowOpacity: 0.2, shadowRadius: 5, shadowOffset: { height: 1, width: 1 },
            }}>
                <Text style={{ fontSize: 18 }}>Map</Text>
            </View>
            {filteredUserData ? <View style={{
                width: filteredUserData?.length < 2 ? 80
                    : filteredUserData?.length < 3 ? 110
                        : filteredUserData?.length < 4 ? 140 : 170,
                alignSelf: 'center', flexDirection: 'row', alignItems: 'center', marginTop: 40
            }}>
                <FlatList data={filteredUserData} renderItem={list} horizontal bounces={false}
                    style={{}} />
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLOR.titlecolor }}>{filteredUserData.length <= 4 ? '' : '+' + (filteredUserData.length - 4)}</Text>
            </View> : null}
            <Button
                onPress={handleSubmit}
                marginTop={40}
                marginBottom={30}
                title={'Submit'}
                bgColor={COLOR.green}
                color={COLOR.white}
            />

            <DatePicker
                minimumDate={new Date()}
                modal
                mode='date'
                open={open}
                date={date}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                    // console.log(date);
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
            <DatePicker
                minimumDate={new Date()}
                modal
                mode='time'
                open={opentime}
                date={Time}
                onConfirm={(time) => {
                    setOpenTime(false)
                    setTime(time)
                    console.log(time);
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
            <Modal visible={visible} >
                <View style={{ flex: 1, backgroundColor: COLOR.black, }}>
                    <View style={{ paddingHorizontal: 20 }}>
                        <NavigateHeader title={'Select Users'} color={COLOR.white} onPress={() => setVisible(false)} />
                    </View>
                    <View style={{ marginTop: 10, paddingHorizontal: 20, padding: 10, backgroundColor: COLOR.white, flex: 1, borderRadius: 20 }}>
                        <FlatList data={selectedUser} renderItem={(({ item }) => {
                            // console.log(item);
                            const userName = item?.first_name + ' ' + item.last_name
                            return (
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
                            )
                        })} />
                        <View style={{ position: 'absolute', bottom: 20, left: 20, right: 20, }}>
                            <Button color={COLOR.white} bgColor={COLOR.green} title={'Select'} onPress={() => setVisible(false)} />
                        </View>
                    </View>
                </View>
            </Modal>

        </ScrollView>
    );
};

export default CreateMsgMeeting;
const PickerButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{
            flexDirection: 'row', alignItems: 'center', borderWidth: 1, height: 40, paddingHorizontal: 8, borderRadius: 10, borderColor: COLOR.bordercolor
        }}>
            <Text style={{ fontSize: 15, fontWeight: '700', color: COLOR.titlecolor }}>{title}</Text>
            <Image source={require('../../../Assets/Image/down.png')}
                style={{ height: 15, width: 15, resizeMode: 'contain', marginTop: -5, marginLeft: 5, tintColor: COLOR.green }} />
        </TouchableOpacity>
    )
}
const Title = ({ title }) => {
    return (

        <Text style={{ fontSize: 16, fontWeight: '700', color: COLOR.titlecolor, marginTop: 20 }}>{title}</Text>

    )
}














// import React, { useState } from 'react';
// import { View, TextInput, FlatList, Text } from 'react-native';

// const PLACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place';

// const App = () => {
//   const [query, setQuery] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedPlace, setSelectedPlace] = useState(null);

//   const apiKey = 'AIzaSyBVNrTxbZva7cV4XDyM8isa5JYpqA1SJYo'; // Replace with your Google Places API key

//   const fetchSuggestions = async (input) => {
//     try {
//       const response = await fetch(
//         `${PLACES_API_BASE_URL}/autocomplete/json?input=${input}&key=${apiKey}&types=geocode`
//       );
//       const json = await response.json();
//       setSuggestions(json.predictions);
//     } catch (error) {
//       console.error('Error fetching suggestions:', error);
//       setSuggestions([]);
//     }
//   };

//   const handleSelectSuggestion = async (place) => {
//     try {
//       const response = await fetch(
//         `${PLACES_API_BASE_URL}/details/json?placeid=${place.place_id}&key=${apiKey}`
//       );
//       const json = await response.json();
//       const placeDetails = json.result;

//       const country = placeDetails.address_components.find(
//         (component) => component.types.includes('country')
//       )?.long_name;
//       const state = placeDetails.address_components.find(
//         (component) => component.types.includes('administrative_area_level_1')
//       )?.long_name;
//       const city = placeDetails.address_components.find(
//         (component) => component.types.includes('locality')
//       )?.long_name;
//       const pincode = placeDetails.address_components.find(
//         (component) => component.types.includes('postal_code')
//       )?.long_name;
//       const address = placeDetails.formatted_address;
//       const { lat, lng } = placeDetails.geometry.location;

//       setSelectedPlace({
//         id: placeDetails.place_id,
//         description: placeDetails.formatted_address,
//         country: country || '',
//         state: state || '',
//         city: city || '',
//         pincode: pincode || '',
//         address: address || '',
//         lat: lat,
//         lng: lng,
//       });

//       setQuery(place.description);
//       setSuggestions([]);
//     } catch (error) {
//       console.error('Error fetching place details:', error);
//       setSelectedPlace(null);
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
//       <TextInput
//         placeholder="Search for a location..."
//         value={query}
//         onChangeText={(text) => {
//           setQuery(text);
//           fetchSuggestions(text);
//         }}
//         style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10, width: '100%' }}
//       />
//       {suggestions.length > 0 && (
//         <FlatList
//           style={{ width: '100%', maxHeight: 200 }}
//           data={suggestions}
//           keyExtractor={(item) => item.place_id}
//           renderItem={({ item }) => (
//             <Text style={{ paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#ccc' }} onPress={() => handleSelectSuggestion(item)}>
//               {item.description}
//             </Text>
//           )}
//         />
//       )}
//       {selectedPlace && (
//         <View style={{ marginTop: 20, width: '100%' }}>
//           <Text style={{ fontWeight: 'bold' }}>{selectedPlace.description}</Text>
//           <Text>Country: {selectedPlace.country}</Text>
//           <Text>State: {selectedPlace.state}</Text>
//           <Text>City: {selectedPlace.city}</Text>
//           <Text>Pincode: {selectedPlace.pincode}</Text>
//           <Text>Address: {selectedPlace.address}</Text>
//           <Text>Latitude: {selectedPlace.lat}</Text>
//           <Text>Longitude: {selectedPlace.lng}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// export default App;

