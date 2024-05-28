import { StyleSheet } from 'react-native';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
export default styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLOR.white },
    headerView: {
        height: 200,
        width: '100%',
        backgroundColor: COLOR.black,
        resizeMode: 'stretch',
    },
    caneraIconView: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20,
        right: 30,
        alignItems: 'center',
    },
    cameraIcon: {
        height: 27,
        width: 27,
        resizeMode: 'contain',
        marginRight: 7,
        tintColor: COLOR.green,
    },
    detailsView: {
        flex: 1,
        padding: 20,
        backgroundColor: COLOR.white,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        marginTop: -20,
    },
    profileImage: {
        backgroundColor: '#E5F2F5',
        height: 100,
        width: 100,
        alignSelf: 'center',
        borderRadius: 80,
        marginTop: -70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusIcon: { position: 'absolute', bottom: 3, right: 3 },

    profileImageView: {
        height: 100,
        width: 100,
        alignSelf: 'center',
        borderRadius: 80,
        marginTop: -70,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR.lightgreen,
    },
});
