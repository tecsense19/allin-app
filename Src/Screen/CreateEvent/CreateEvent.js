import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    FlatList,
    Alert
} from 'react-native';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import NavigateHeader from '../../Custom/Header/NavigateHeader';
import Button from '../../Custom/Button/Button';
import MapView, { Circle, Marker } from 'react-native-maps';
import DatePicker from 'react-native-date-picker';
import { Events_Create_Update } from '../../Service/actions';
import { getToken } from '../../Service/AsyncStorage';
import Loader from '../../Custom/Loader/loader';

const CreateEvent = props => {
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState(new Date());
    const [Time, setTime] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [opentime, setOpenTime] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Add 1 to the month and pad with zero
    const day = date.getUTCDate().toString().padStart(2, '0'); // Pad with zero
    const time = new Date(Time);
    time.setHours(time.getHours());
    time.setMinutes(time.getMinutes());
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');
    const meetingtime = `${hours}:${minutes}:${seconds}`;

    const formattedHours = hours % 12 || 12;
    const period = hours < 12 ? 'AM' : 'PM';
    const EventDesplayTime = formattedHours + ':' + minutes + ' ' + period
    const Eventdate = year + '-' + month + '-' + day
    const PLACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place';
    const apiKey = 'AIzaSyBVNrTxbZva7cV4XDyM8isa5JYpqA1SJYo';

    const fetchSuggestions = async (input) => {
        try {
            const response = await fetch(
                `${PLACES_API_BASE_URL}/autocomplete/json?input=${input}&key=${apiKey}&types=geocode`
            );
            const json = await response.json();
            setSuggestions(json.predictions);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
        }
    };
    const handleSelectSuggestion = async (place) => {
        try {
            const response = await fetch(
                `${PLACES_API_BASE_URL}/details/json?placeid=${place.place_id}&key=${apiKey}`
            );
            const json = await response.json();
            const placeDetails = json.result;

            const country = placeDetails.address_components.find(
                (component) => component.types.includes('country')
            )?.long_name;
            const state = placeDetails.address_components.find(
                (component) => component.types.includes('administrative_area_level_1')
            )?.long_name;
            const city = placeDetails.address_components.find(
                (component) => component.types.includes('locality')
            )?.long_name;
            const pincode = placeDetails.address_components.find(
                (component) => component.types.includes('postal_code')
            )?.long_name;
            const address = placeDetails.formatted_address;
            const { lat, lng } = placeDetails.geometry.location;

            setSelectedPlace({
                id: placeDetails.place_id,
                description: placeDetails.formatted_address,
                country: country || '',
                state: state || '',
                city: city || '',
                pincode: pincode || '',
                address: address || '',
                lat: lat,
                lng: lng,
            });

            setQuery(place.description);
            setSuggestions([]);
        } catch (error) {
            console.error('Error fetching place details:', error);
            setSelectedPlace(null);
        }
    };
    const handleCreateEvent = async () => {
        setLoading(true)
        const token = await getToken()
        if (!title || !description || !Eventdate || !meetingtime || !selectedPlace) {
            Alert.alert('required all fields')
            setLoading(false)
            return
        }
        const formData = new FormData();
        formData.append('event_title', title);
        formData.append('event_description', description);
        formData.append('event_date', Eventdate);
        formData.append('event_time', meetingtime);
        formData.append('latitude', selectedPlace.lat);
        formData.append('longitude', selectedPlace.lng);
        formData.append('event_image', '');
        formData.append('location_url', `https://www.google.com/maps?q=${selectedPlace?.lat},${selectedPlace.lng}`);
        formData.append('location', selectedPlace?.address);
        formData.append('users',);

        Events_Create_Update(token, formData)
            .then((res) => {
                Alert.alert(res.message);
                setLoading(false)
                setTitle('')
                setDescription('')
                setSelectedPlace(null)

            })
            .catch((err) => {
                setLoading(false)
                console.log(err);
            })


    }
    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: COLOR.black }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={{ marginHorizontal: 20 }}>
                <NavigateHeader

                    color={COLOR.white}
                    title={'Create event'}
                    onPress={() => props.navigation.goBack()}
                />
            </View>
            <View
                style={{
                    flex: 1,
                    backgroundColor: COLOR.white,
                    marginTop: 10,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                }}>
                <ScrollView style={{ padding: 20 }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: COLOR.lightgreen,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 200,
                            borderRadius: 10,
                        }}>
                        <Image
                            source={require('../../Assets/Image/image.png')}
                            style={{ height: 100, width: 100, resizeMode: 'contain' }}
                        />
                    </TouchableOpacity>
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
                        value={description}
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


                    <TextInput
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Search a place"
                        value={query}
                        onChangeText={(text) => {
                            setQuery(text);
                            fetchSuggestions(text);
                        }}
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

                    {suggestions.length > 0 && (
                        <FlatList
                            style={{ width: '100%', maxHeight: 300 }}
                            data={suggestions}
                            keyExtractor={(item) => item.place_id}
                            renderItem={({ item }) => (
                                <Text style={{ paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#ccc' }} onPress={() => handleSelectSuggestion(item)}>
                                    {item.description}
                                </Text>
                            )}
                        />
                    )}
                    {selectedPlace && (
                        <MapView
                            style={{ height: 250, width: '100%', borderRadius: 10, marginTop: 10 }}
                            followsUserLocation={true}
                            mapType="satellite"
                            // showsUserLocation={true}
                            // onPress={handleMapPress}
                            region={{
                                latitude: selectedPlace?.lat,
                                longitude: selectedPlace?.lng,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01
                            }}

                        >
                            <Marker coordinate={{ latitude: selectedPlace?.lat, longitude: selectedPlace?.lng }}>
                                <Image style={{ height: 25, width: 25, tintColor: 'red' }} source={{ uri: 'https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_location_on_48px-1024.png' }} />
                            </Marker>
                            <Circle
                                center={{ latitude: selectedPlace?.lat, longitude: selectedPlace?.lng }}
                                radius={200} // 1 km in meters
                                strokeColor={'rgba(1, 214, 201, 1)'} // Blue color with transparency
                                fillColor={'rgba(0, 239, 255, 0.1)'} // Blue color with transparency
                            />
                        </MapView>
                    )}

                    {visible ? <Showicon /> : null}
                    <TouchableOpacity
                        onPress={() => {
                            setVisible(!visible);
                        }}>
                        <Image
                            source={require('../../Assets/Image/+.png')}
                            style={{
                                alignSelf: 'center',
                                height: 25,
                                width: 25,
                                marginTop: 20,
                            }}
                        />
                    </TouchableOpacity>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 20,
                        }}>
                        <PickerButton title={Eventdate} onPress={() => { setOpen(true) }} />
                        <PickerButton title={EventDesplayTime} onPress={() => { setOpenTime(true) }} />
                    </View>
                    <Button
                        title={'submit'}
                        marginTop={20}
                        marginBottom={50}
                        bgColor={COLOR.green}
                        color={COLOR.white}
                        onPress={() => handleCreateEvent()}
                    />
                    <Loader visible={loading} />
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
};

export default CreateEvent;

const Showicon = () => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 40,
            }}>
            <TouchableOpacity style={[styles.optionsImageText, { marginLeft: 0 }]}>
                <Text style={{ fontSize: 40, fontWeight: 'bold', color: COLOR.green }}>
                    T
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionsImageText}>
                <Image
                    source={require('../../Assets/Image/image.png')}
                    style={{ height: 50, width: 50, resizeMode: 'contain' }}
                />
            </TouchableOpacity>
        </View>
    );
};

const SearchInput = () => {
    return (
        <View
            style={{
                height: 50,
                borderRadius: 5,
                borderWidth: 1,
                marginTop: 20,
                borderColor: COLOR.gray,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
            <TextInput
                placeholder="Search Place"
                style={{
                    paddingLeft: 10,
                    height: 50,
                    fontSize: 15,
                    flex: 1,
                }}
            />
            <Image
                source={require('../../Assets/Image/search.png')}
                style={{ tintColor: COLOR.black, height: 30, width: 30, marginRight: 10 }}
            />
        </View>
    );
};
const Title = ({ title }) => {
    return (
        <Text style={{ fontSize: 16, fontWeight: '700', color: COLOR.titlecolor, marginTop: 20 }}>{title}</Text>

    )
}
const PickerButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{
            flexDirection: 'row', alignItems: 'center', margin: 5, borderWidth: 1, height: 40, paddingHorizontal: 8, borderRadius: 10, borderColor: COLOR.bordercolor
        }}>
            <Text style={{ fontSize: 15, fontWeight: '700', color: COLOR.titlecolor }}>{title}</Text>
            <Image source={require('../../Assets/Image/down.png')}
                style={{ height: 15, width: 15, resizeMode: 'contain', marginTop: -5, marginLeft: 5, tintColor: COLOR.green }} />
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        color: COLOR.black,
        fontSize: 16,
        height: 200,
        borderColor: COLOR.gray,
        paddingLeft: 10,
        borderRadius: 5,
        marginTop: 30,
        fontWeight: '500'
    },
    optionsImageText: {
        height: 60,
        width: 60,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR.lightgreen,
        padding: 10,
        borderRadius: 10,
    },
});
