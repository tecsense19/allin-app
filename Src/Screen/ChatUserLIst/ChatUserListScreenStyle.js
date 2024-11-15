import { StyleSheet } from 'react-native';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLOR.black },

    headerView: {
        height: 120,
        width: '100%',
        backgroundColor: COLOR.black,
    },
    detailsview: {
        flex: 1,
        backgroundColor: COLOR.white,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20, marginTop: 10
    },
    listcontainer: {


        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    imgAndNameView: { flexDirection: 'row', alignItems: 'center' },
    chetImg: { height: 55, width: 55, borderRadius: 50, marginRight: 10 },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: COLOR.black,
    },
    bio: {
        fontSize: 14,
        fontWeight: '500',
        color: COLOR.placeholder, flexWrap: 'wrap',

        marginTop: 5,
    },
    time: { fontSize: 13, color: COLOR.placeholder, fontWeight: '600' },
    msgView: {
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        backgroundColor: COLOR.slateblue,
        padding: 1,
        borderRadius: 100,
        paddingHorizontal: 5,
    },
    msgCount: { color: COLOR.white, fontSize: 13, fontWeight: '700', },
    modalMainView: { backgroundColor: 'rgba(0,0,0,0.2)', flex: 1 },
    modalView: {
        height: 90,
        width: 149,
        backgroundColor: COLOR.white,
        position: 'absolute',
        right: 0,
        top: 26,
        padding: 5,
    },
    modalText: {
        fontSize: 13,
        color: COLOR.black,
        fontWeight: '400',
        marginTop: 10,
    },
    swipeView: {
        alignItems: 'center',
        backgroundColor: COLOR.white,
        flexDirection: 'row',
        width: 150,
        justifyContent: 'space-around',
    },
    onbin: {
        backgroundColor: COLOR.orange,
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    swipeicon: { height: 20, width: 20 },
    searchView: {
        backgroundColor: COLOR.white,
        height: 45,
        marginHorizontal: 15,
        borderRadius: 20,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    input: { height: 45, fontWeight: 'bold', flex: 1 },
    searchicon: {
        tintColor: COLOR.black,
        height: 25,
        width: 25,
        resizeMode: 'contain',
    },
});
export default styles;
