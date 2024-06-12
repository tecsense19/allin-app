import { StyleSheet } from 'react-native';
import { COLOR } from '../../Assets/AllFactors/AllFactors';

const styles = StyleSheet.create({
    detailsview: {
        flex: 1,
        backgroundColor: COLOR.white,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    },
    listcontainer: {
       paddingVertical:7,
        marginTop: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    imgAndNameView: { flexDirection: 'row', alignItems: 'center' },
    chetImg: { height: 50, width: 50, borderRadius: 50, marginRight: 10 },
    name: {
        fontSize: 17,
        fontWeight: '600',
        color: COLOR.titlecolor,
    },
    bio: {
        fontSize: 13,
        color: COLOR.textcolor,
        fontWeight: '500',
    },
    time: {
        fontSize: 13,
        color: COLOR.textcolor,
        fontWeight: '500',
        marginTop: 2,
    },
});
export default styles;
