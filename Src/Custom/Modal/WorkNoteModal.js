import { Image, Modal, Text, TextInput, TouchableOpacity, View } from "react-native"
import { COLOR } from "../../Assets/AllFactors/AllFactors"
import Button from "../Button/Button"
import NavigateHeader from "../Header/NavigateHeader"

const WorkNoteModal = ({ visible, onPress, summary, Close, onChangeText, startTime, EndTime, title, buttonTitle, Totle, locationValue, setLocationValue }) => {
    return (
        <Modal visible={visible} transparent>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ height: '70%', width: '100%', backgroundColor: COLOR.white, borderRadius: 10, }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 25 }}>
                        <TouchableOpacity onPress={Close} style={{ height: 28, width: 28, backgroundColor: COLOR.green, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ height: 12, width: 12, resizeMode: 'contain' }} source={require('../../Assets/Image/x.png')} />
                        </TouchableOpacity>
                        <Text style={{ flex: 0.9, fontSize: 20, color: COLOR.black, fontWeight: 'bold', textAlign: 'center' }}>{title}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center', justifyContent: 'space-between', marginTop: 30 }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ marginTop: 10, color: COLOR.black, fontWeight: 'bold', fontSize: 18, }}>Start Time</Text>
                            <Text style={{ color: COLOR.gray, fontWeight: 'medium', fontSize: 16, marginTop: 7 }}>{startTime}</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ marginTop: 10, color: COLOR.black, fontWeight: 'bold', fontSize: 18, }}>End Time</Text>
                            <Text style={{ color: COLOR.gray, fontWeight: 'medium', fontSize: 16, marginTop: 7 }}>{EndTime}</Text>
                        </View>
                    </View>
                    <View style={{ height: 52, backgroundColor: COLOR.lightgreen, marginTop: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ color: COLOR.black, fontWeight: 'bold', fontSize: 18, }}> Total Time </Text>
                        <Text style={{ fontSize: 16, color: COLOR.gray, fontWeight: 'medium' }}>{Totle}</Text>
                    </View>
                    <Text style={{ marginTop: 20, color: COLOR.black, fontWeight: 'bold', marginLeft: 20, fontSize: 18, }}> Location </Text>
                    <TextInput value={locationValue} onChangeText={setLocationValue} placeholder="Enter Location" style={{ backgroundColor: COLOR.white, marginHorizontal: 20, borderWidth: 1, color: COLOR.textcolor, paddingLeft: 10, borderColor: COLOR.lightgray, fontSize: 16, fontWeight: '600', paddingVertical: 15, borderRadius: 10, paddingTop: 15, alignItems: 'center', height: 48, marginTop: 5 }} />

                    <TextInput
                        placeholder="Enter note"
                        onChangeText={onChangeText}
                        value={summary}
                        multiline={true}
                        placeholderTextColor={COLOR.lightgray}
                        style={{ backgroundColor: COLOR.white, marginHorizontal: 20, borderWidth: 1, color: COLOR.textcolor, paddingLeft: 10, borderColor: COLOR.lightgray, fontSize: 16, fontWeight: '600', paddingVertical: 15, borderRadius: 10, paddingTop: 15, alignItems: 'center', height: 150, marginBottom: 40, marginTop: 20 }}
                    />
                    <Button onPress={onPress} color={COLOR.white} bgColor={COLOR.green} title={buttonTitle} marginHorizontal={20} />
                </View>
            </View>
        </Modal >
    )
}
export default WorkNoteModal