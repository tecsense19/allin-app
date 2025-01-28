import { View, Text, FlatList, Image, TouchableOpacity, Modal, TouchableWithoutFeedback, SafeAreaView, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getToken } from '../../Service/AsyncStorage'
import { Scan_Document_List } from '../../Service/actions'
import NavigateHeader from '../../Custom/Header/NavigateHeader'
import { COLOR } from '../../Assets/AllFactors/AllFactors'
import Button from '../../Custom/Button/Button'
import Loader from '../../Custom/Loader/loader'
import PDFView from 'react-native-view-pdf'
import FastImage from 'react-native-fast-image'

const DocumentStore = (props) => {
    const [documentData, setDocumentData] = useState([])
    const [ViewImage, setViewImage] = useState('')
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const GetAllDocument = async () => {
        setLoading(true)
        const token = await getToken()
        Scan_Document_List(token)
            .then((res) => {
                const data = res.data
                const pdfData = data?.filter((i) => i.attachment_name.toLowerCase().endsWith(".pdf"));
                setDocumentData(pdfData.reverse())
                setLoading(false)
            })
            .catch(() => { })
    }
    const list = ({ item, index }) => {
        const date = new Date(item.created_at);
        const options = {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true // This option ensures AM/PM format
        };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const formattedDate = formatter.format(date);



        return (

            <TouchableOpacity onPress={() => { setVisible(true), setViewImage(item?.attachment_path) }} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLOR.verylightgray, marginTop: 20, borderRadius: 5 }}>
                <ImageBackground source={require('../../Assets/Image/pdf.png')} style={{ height: 60, width: 60, }}>
                    <Image
                        source={{ uri: item.attachment_path }} style={{ height: 60, width: 60, borderRadius: 5 }} />
                </ImageBackground>
                {/* <FastImage style={{ height: 60, width: 60 }} source={item.attachment_path} /> */}
                <View>
                    <Text style={{ color: COLOR.black, fontSize: 16, fontWeight: '700', marginLeft: 10 }}>{item.attachment_name?.length > 25 ? item?.attachment_name.slice(0, 28) + '...' : ''}</Text>
                    <Text style={{ color: COLOR.gray, fontSize: 12, fontWeight: '700', marginTop: 5, marginLeft: 10 }}>{formattedDate}</Text>
                </View>
                <ViewImageModal URI={ViewImage} visible={visible} onPressClose={() => { setVisible(false), setViewImage('') }} />
            </TouchableOpacity>
        )
    }
    useEffect(() => {
        GetAllDocument()
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: COLOR.white, }}>
            <View style={{ paddingHorizontal: 15 }}>
                <NavigateHeader title={'Documents'} onPress={() => props.navigation.goBack()} />
            </View>
            {documentData.length > 0 ?
                <FlatList bounces={false} data={documentData} renderItem={list} style={{ paddingHorizontal: 15 }} />
                : <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={{ uri: 'https://cdn4.iconfinder.com/data/icons/backyard-music/96/Audio-Music-Listen-Player-28-512.png' }} style={{ height: 50, width: 50, tintColor: COLOR.gray, marginBottom: 10 }} />
                    <Text style={{ fontSize: 18, fontWeight: '700', color: COLOR.gray, marginBottom: 50 }}>{'No Document!'}</Text>
                </View>
            }
            <Loader visible={loading} Retry={GetAllDocument} />
        </View>
    )
}

export default DocumentStore

const ViewImageModal = ({ visible, URI, onLoad, onPressClose }) => {
    return (
        <Modal transparent visible={visible}>
            <View style={{ flex: 1, backgroundColor: COLOR.black }}>
                {/* <Image source={{ uri: URI }} style={{ height: 400, marginTop: 200, borderRadius: 10 }} onLoad={onLoad} />
                <Button onPress={onPressClose} color={COLOR.white} title={'Close'} borderColor={COLOR.white} borderWidth={1} marginHorizontal={'35%'} marginTop={20} /> */}
                <View style={{ paddingHorizontal: 20 }}>
                    <NavigateHeader
                        onPress={onPressClose}
                        color={COLOR.white}
                        title={'Pdf View'}
                        top={10}
                    />
                </View>
                <View style={{ flex: 1, borderTopRightRadius: 20, borderTopLeftRadius: 20, backgroundColor: COLOR.verylightgray, }}>
                    <PDFView
                        onLoad={(a) => {
                            console.log('load');
                        }}

                        resourceType={'url'}
                        resource={URI}
                        style={{ flex: 1, }}>
                    </PDFView>
                </View>

            </View>

        </Modal>
    )
}