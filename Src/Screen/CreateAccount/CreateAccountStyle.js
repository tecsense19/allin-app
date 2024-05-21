import { StyleSheet } from 'react-native';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLOR.white },
    headerView: { height: 200, width: '100%', backgroundColor: COLOR.black, },
    caneraIconView: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 30,
        right: 14,
        alignItems: 'center',
    },
    cameraIcon: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        marginRight: 7,
        tintColor: COLOR.green,
    },
    detailsView: {
        flex: 1,
        padding: 20,
        backgroundColor: COLOR.white,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        marginTop: -20,
        paddingHorizontal: 30
    },
    profileImage: {
        backgroundColor: '#E5F2F5',
        height: 100,
        width: 100,
        alignSelf: 'center',
        borderRadius: 80,
        marginTop: -70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    plusIcon: { position: 'absolute', bottom: 5, right: 5 },
    phonenumber: {
        marginTop: 20,
        color: COLOR.titlecolor,
        fontWeight: '600',
        marginLeft: 5,
        fontSize: 18,
    },
    countryPickerView: {
        marginTop: 8,
        borderWidth: 1,
        borderColor: COLOR.bordercolor,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        height: 45,
    },
    pickertitle: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 16,
        color: COLOR.titlecolor,
    },
    selectedcountrytext: {
        paddingLeft: 5,
        fontSize: 16,
        color: COLOR.black,
        textAlign: 'right',
        fontWeight: '500',
        marginHorizontal: 5,
    },
    countrynametext: {
        paddingLeft: 20,
        color: COLOR.titlecolor,
        fontSize: 16,
        textAlign: 'right',
        fontWeight: '600',
    },
    countryflag: {
        paddingLeft: 20,
        color: COLOR.titlecolor,
        fontSize: 18,
        textAlign: 'right',
        fontWeight: '600',
    },
    phonenumberinput: {
        color: COLOR.black,
        fontWeight: '500',
        fontSize: 16,
        flex: 1,
    },
    lodingmodalview: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    indicator: {
        backgroundColor: 'white',
        padding: 40,
        borderRadius: 10
    }
});
export default styles;
