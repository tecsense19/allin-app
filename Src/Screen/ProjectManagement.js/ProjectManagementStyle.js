import { StyleSheet } from "react-native";
import { COLOR } from "../../Assets/AllFactors/AllFactors";

export const styles = StyleSheet.create({

    mainContainer: { flex: 1, backgroundColor: COLOR.white, padding: 10 },
    P_M_Text: { fontSize: 20, color: COLOR.black, fontWeight: 'bold', marginLeft: 10, marginBottom: 10, marginTop: 60 },
    noteTitleView: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 20, marginBottom: 15, },
    note_T: { fontSize: 20, fontWeight: 'bold', color: COLOR.titlecolor, },
    note_List_Container: { alignSelf: 'center', height: 60, width: '95%', backgroundColor: COLOR.white, marginVertical: 8, justifyContent: 'space-between', borderRadius: 10, shadowColor: "#000", flexDirection: 'row', alignItems: 'center', shadowOffset: { width: 0, height: 1, }, shadowOpacity: 0.3, shadowRadius: 3, },
    listFirstView: { flexDirection: 'row', alignItems: 'center', },
    listuserView: { backgroundColor: COLOR.lightgreen, alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 50, marginLeft: 10, marginRight: 10 },
    listImage: { tintColor: COLOR.green, height: 33, width: 33, },
    listname: { fontSize: 16, color: COLOR.black, fontWeight: 'bold' },
    listarrow: { height: 25, width: 25, marginRight: 15 },
    notelistview: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: COLOR.lightgreen, padding: 10, marginTop: 10, borderRadius: 10, height: 45, marginHorizontal: 10, },
    notelisttitle: { width: 180, fontSize: 16, fontWeight: '600', color: COLOR.titlecolor, },
    notedatetime: { fontSize: 12, fontWeight: '500', color: COLOR.textcolor, },
    listpenicon: { height: 25, width: 25, },
    modalscrollview: { padding: 15, backgroundColor: COLOR.white, marginTop: 20, },
    noteviewtitle: { fontSize: 23, fontWeight: '600', color: COLOR.black, },
    notecreatedtimedate: { fontSize: 15, color: COLOR.gray, fontWeight: '500', marginTop: 10, },
    noteTextindetails: { fontSize: 18, marginTop: 10, fontWeight: '600', lineHeight: 30, color: COLOR.textcolor, }


})