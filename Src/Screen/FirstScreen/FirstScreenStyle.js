import { StyleSheet } from 'react-native';
import { COLOR } from '../../Assets/AllFactors/AllFactors';

const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: COLOR.white, padding: 30 },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F7F8F8',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    view1: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    view2: {
        textAlign: 'center',
        color: COLOR.black,
        fontSize: 32,
        marginTop: 40,
        fontWeight: '600',
    },
    logoImg: { height: 62, width: 60, resizeMode: 'contain', alignSelf: 'center', marginTop: '50%' },
    footerView: {
        flexDirection: 'row',
        marginTop: 20,
        paddingRight: 30

    },
    intext: {
        fontSize: 60,
        color: '#213460',
        fontWeight: 'bold', textAlign: 'center'
    },
    termsandcondition: {
        color: COLOR.textcolor,
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 18,
    }
    , byCreateing: {
        color: COLOR.textcolor,
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 18,
    }
    , underlineText: {
        textDecorationLine: 'underline',
        fontWeight: '500',
        fontSize: 14,
        color: COLOR.textcolor
    }
});
export default styles;
