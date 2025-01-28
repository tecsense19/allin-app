import { Image, Text, TouchableOpacity, View } from 'react-native'
import { COLOR } from '../../../Assets/AllFactors/AllFactors'

const CtrateHeader = ({ source, onBack, title }) => {
    return (
        <View style={{ paddingHorizontal: 15, padding: 15, marginTop: 35, flexDirection: 'row', alignItems: 'center', marginBottom: -15 }}>
            <TouchableOpacity onPress={onBack} style={{
                backgroundColor: COLOR.green,
                borderRadius: 50,
                height: 30,
                width: 30,
                alignItems: 'center',
                justifyContent: 'center', marginRight: 5
            }}>
                <Image
                    source={require('../../../Assets/Image/back.png')}
                    style={{
                        height: 16,
                        width: 16,
                        resizeMode: 'contain', tintColor: COLOR.black, marginLeft: -2
                    }}
                />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {source ? <Image source={{ uri: source }} style={{ height: 45, width: 45, marginLeft: 8, borderRadius: 50 }} /> : ''}
                <Text style={{
                    color: COLOR.white,
                    fontSize: 18,
                    fontWeight: '600',
                    marginLeft: 10,
                }}>{title}</Text>
            </View>
        </View>
    )
}
export default CtrateHeader