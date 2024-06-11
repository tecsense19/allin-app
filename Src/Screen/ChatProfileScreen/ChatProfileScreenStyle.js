import { StyleSheet } from 'react-native';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
const styles = StyleSheet.create({
    container: { flex: 1 },
    headerView: { height: 200, width: '100%', backgroundColor: COLOR.black },
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
    },
    detailsView: {
        flex: 1,
        padding: 20,
        backgroundColor: COLOR.white,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        marginTop: -20,
    },
    profileImage: {
        backgroundColor: COLOR.lightgreen,
        height: 100,
        width: 100,
        alignSelf: 'center',
        borderRadius: 80,
        marginTop: -70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    plusIcon: { position: 'absolute', bottom: 0, right: 0 },
});
export default styles;
