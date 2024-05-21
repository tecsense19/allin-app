import { StyleSheet } from 'react-native';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLOR.black },
    headerView: { height: 150, backgroundColor: COLOR.black },
    detailsView: {
        flex: 1,
        backgroundColor: COLOR.white,
    }, onBack: {
        backgroundColor: COLOR.green,
        borderRadius: 100,
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',

        marginTop: 50
    }, backimg: {
        height: 18,
        width: 18,
        resizeMode: 'contain',
        marginLeft: -2,
        tintColor: COLOR.white
    }
});
export default styles;
