import { Modal, Text, TextInput, View } from "react-native"
import { COLOR } from "../../Assets/AllFactors/AllFactors"
import Button from "../Button/Button"

const WorkNoteModal = ({ visible, onPress, summary, onChangeText, startTime, EndTime }) => {
    return (
        <Modal visible={visible} transparent>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ height: '60%', width: '100%', backgroundColor: COLOR.white, borderRadius: 10, }}>
                    <Text style={{ fontSize: 20, color: COLOR.black, fontWeight: 'bold', margin: 20, textAlign: 'center' }}>Add Summary</Text>
                    <Text
                        style={{
                            marginTop: 10,
                            color: COLOR.black,
                            fontWeight: 'bold',
                            marginLeft: 5,
                            fontSize: 18,
                            marginBottom: 5, paddingHorizontal: 20
                        }}>
                        Start Date Time :
                    </Text>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '600', paddingHorizontal: 20
                    }}> {startTime}</Text>
                    <Text
                        style={{
                            marginTop: 20,
                            color: COLOR.black,
                            fontWeight: 'bold',
                            marginLeft: 5,
                            fontSize: 18,
                            marginBottom: 5, paddingHorizontal: 20
                        }}>
                        End Date Time :
                    </Text>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '600', paddingHorizontal: 20
                    }}> {EndTime}</Text>
                    <Text
                        style={{
                            marginTop: 20,
                            color: COLOR.black,
                            fontWeight: 'bold',
                            marginLeft: 5,
                            fontSize: 18,
                            marginBottom: 10, paddingHorizontal: 20
                        }}>
                        Note Description (<Text style={{ fontSize: 16, fontWeight: '600', }}>Optional</Text>)
                    </Text>

                    <TextInput
                        placeholder="Enter note"
                        onChangeText={onChangeText}
                        value={summary}
                        multiline={true}
                        placeholderTextColor={COLOR.lightgray}
                        style={{
                            backgroundColor: COLOR.white,
                            marginHorizontal: 20,
                            borderWidth: 1,
                            color: COLOR.textcolor,
                            paddingLeft: 10,
                            borderColor: COLOR.gray,
                            fontSize: 16,
                            fontWeight: '600',
                            paddingVertical: 15,
                            borderRadius: 10,
                            paddingTop: 15,
                            alignItems: 'center',
                            height: 150, marginBottom: 40
                        }}
                    />
                    <Button onPress={onPress} color={COLOR.white} bgColor={COLOR.green} title={'Save'} marginHorizontal={20} />
                </View>
            </View>
        </Modal>
    )
}
export default WorkNoteModal