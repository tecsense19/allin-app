import { StyleSheet } from 'react-native';
import { COLOR, SF } from '../../Assets/AllFactors/AllFactors';

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLOR.white, paddingHorizontal: 30 },
    headerView: { height: 150, backgroundColor: COLOR.black },

    VerificationCodeTxt: {
        textAlign: 'center',
        fontSize: 24,
        color: COLOR.black,
        marginTop: 35,
        fontWeight: 'bold',
        // fontFamily: SF.Black
    },
    DownSmallTxt: {
        textAlign: 'center',
        fontSize: 16,
        color: COLOR.textcolor,
        width: 300,
        alignSelf: 'center',
        fontWeight: '400',
        marginVertical: 10,
        lineHeight: 18,
    },
    numberView: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 40,
        marginLeft: 10,
    },
    numberTxt: {
        color: COLOR.black,
        fontSize: 18,
        letterSpacing: 2,
        fontWeight: '600',
        marginRight: 20,
    },
    editIcon: { height: 25, width: 25 },
    onback: {
        backgroundColor: COLOR.green,
        borderRadius: 100,
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 70,
    }, backimg: {
        height: 18,
        width: 18,
        resizeMode: 'contain',
        marginLeft: -2,
        tintColor: COLOR.white
    }
});
export default styles;
