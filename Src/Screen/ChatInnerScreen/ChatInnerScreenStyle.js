import { StyleSheet, Text } from 'react-native';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
export const styles = StyleSheet.create({
    listOnContainer: { marginTop: 10, padding: 5, borderRadius: 10, flexDirection: 'row', alignItems: 'center' },
    adminImg: { height: 50, width: 50, marginRight: 10 },
    contactName: { fontSize: 18, color: COLOR.black, fontWeight: '700' },
    contactNumber: { fontSize: 16, color: COLOR.gray, fontWeight: '600' },
    contactContainer: { backgroundColor: COLOR.black, flex: 1, },
    contactListContainer: { backgroundColor: COLOR.white, marginTop: 10, paddingHorizontal: 20 },
    selectedContactTxt: { color: COLOR.green, textAlign: 'right', fontWeight: 'bold', fontSize: 18, marginTop: 10, marginRight: 20 },
    contactSearchInput: { backgroundColor: COLOR.verylightgray, height: 45, marginTop: 10, borderRadius: 20, paddingLeft: 20, fontSize: 16, fontWeight: '600', color: COLOR.black },
    ContactFlatList: { height: '100%' },
    OncontactScreenSend: { position: 'absolute', bottom: 20, backgroundColor: COLOR.green, alignSelf: 'center', padding: 10, paddingHorizontal: '30%', borderRadius: 10 }, sendTxt: { fontSize: 20, fontWeight: 'bold', color: COLOR.black },
    chatMainsection: { flex: 1, backgroundColor: COLOR.black, },
    chatHeaderView: { backgroundColor: COLOR.black, paddingHorizontal: 10, },
    GiftedChat: { flex: 1, backgroundColor: COLOR.white, borderTopRightRadius: 20, borderTopLeftRadius: 20, paddingTop: 15 },
    selectCatagoryModalView: { backgroundColor: COLOR.lightgray, },
    createItemModalView: { backgroundColor: COLOR.black, flex: 1 },
    createItemModalView2: { flex: 1, justifyContent: 'center', marginTop: 20 }

})
