import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    BackHandler,
    Alert,
  } from 'react-native';
  import React, { useEffect, useState } from 'react';
import { COLOR } from '../../Assets/AllFactors/AllFactors';
import { useDispatch, useSelector } from 'react-redux';
import { setFalse } from '../../Service/Redux/Actions';
  
const offTabColor=COLOR.verylightgray
  const MyTabBar = ({navigation}) => {
    const [active, setActive] = useState(3);
    const isTrue = useSelector((state) => state.boolean.isTrue)
    const dispatch = useDispatch();
    
    const closeModal = () => {
      setActive(1);
    };
    useEffect(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        closeModal,
      );
      return () => backHandler.remove();
    }, [active]);
    useEffect(()=>{
      if(isTrue){
        setActive(2)
      }
    })
    const handleSetTrue = () => {
      dispatch(setFalse());
  };
    return (
      <View style={styles.conatiner}>
        <TouchableOpacity
          disabled={active !== 1 ? false : true}
          style={[styles.onTextPress, { backgroundColor: offTabColor },]}
  
          onPress={() => {
           navigation.navigate('feed');
            setActive(1);
            handleSetTrue()

          }}>
          <Image source={require('../../Assets/Image/bottomfeed.png')} style={{ height: 20, width: 20, resizeMode: 'contain', tintColor: active == 1 ? COLOR.green : COLOR.black }} />
          <Text style={[styles.txt, { color: active == 1 ? COLOR.green : COLOR.black }]}>Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={active !== 2 ? false : true}
          style={[styles.onTextPress, { backgroundColor:offTabColor, },]}
  
          onPress={() => {
           navigation.navigate('tme');
            setActive(2);

          }}>
          <Image source={require('../../Assets/Image/bottomtme.png')} style={{ height: 20, width: 20, resizeMode: 'contain', tintColor: active == 2 ? COLOR.green : COLOR.black }} />
  
          <Text style={[styles.txt, { color: active == 2 ? COLOR.green : COLOR.black }]}>T.me</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={active !== 3 ? false : true}
          style={[styles.onTextPress, { backgroundColor: COLOR.green,height:40,width:40 },]}
  
          onPress={() => {
         navigation.navigate('projectmanagement');
            setActive(3);
            handleSetTrue()

          }}>
          <Image
            source={require('../../Assets/Image/bottomicon.png')}
            style={[styles.icon, { tintColor: COLOR.white }]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={active !== 4 ? false : true}
          style={[styles.onTextPress, { backgroundColor:offTabColor},]}
  
          onPress={() => {
           navigation.navigate('chats');
  
            setActive(4);
            handleSetTrue()

          }}>
          <Image source={require('../../Assets/Image/bottomchat.png')} style={{ height: 20, width: 20, resizeMode: 'contain', tintColor: active == 4 ? COLOR.green : COLOR.black }} />
  
          <Text style={[styles.txt, { color: active == 4 ? COLOR.green : COLOR.black }]}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={active !== 5 ? false : true}
          style={[styles.onTextPress, { backgroundColor: offTabColor},]}
          onPress={() => {
        navigation.navigate('board');
            setActive(5);
            handleSetTrue()

          }}>
          <Image source={require('../../Assets/Image/bottomboard.png')} style={{ height: 20, width: 20, resizeMode: 'contain', tintColor: active == 5 ? COLOR.green : COLOR.black }} />
  
          <Text style={[styles.txt, { color: active == 5 ? COLOR.green : COLOR.black }]}>Board</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  export default MyTabBar;
  const styles = StyleSheet.create({
   
    // conatiner: {
    //   height: 70,
    //   padding: 15,
    //   position: 'absolute',
    //   bottom: 20,
    //   left: 0,
    //   right: 0,
    //   backgroundColor: COLOR.lightgreen,
    //   flexDirection: 'row',
    //   alignItems: 'center',
    //   justifyContent: 'space-between',
    //   shadowColor: COLOR.gray, shadowOpacity: 0.5, shadowOffset: { width: 0, height: 2 }, shadowRadius: 5
    // },
    conatiner: {
        height: 90,
        padding: 15,paddingBottom:25,
        bottom: 0,
        position: 'absolute',
        left: 0,
        right: 0,
        backgroundColor: offTabColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        shadowColor: offTabColor, shadowOpacity: 0.2, shadowOffset: { width: 0, height: 2 }, shadowRadius: 5
      },
    txt: {
      color: COLOR.black,
      fontSize: 15,
      fontWeight: 'bold',
      marginTop: 5
    },
    icon: { height: 20, width: 20, resizeMode: 'stretch' },
    onTextPress: {
      backgroundColor: COLOR.green,
     
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: -8,
      borderRadius: 50,
    },
  });
  
  
  
  
  
  // import {
  //   View,
  //   Text,
  //   TouchableOpacity,
  //   Image,
  //   StyleSheet,
  //   BackHandler,
  // } from 'react-native';
  // import React, { useEffect, useState } from 'react';
  // import COLOR from '../../color/color';
  
  
  // const MyTabBar = props => {
  //   const [active, setActive] = useState(3);
  //   const closeModal = () => {
  //     setActive(1);
  //   };
  
  //   useEffect(() => {
  //     const backHandler = BackHandler.addEventListener(
  //       'hardwareBackPress',
  //       closeModal,
  //     );
  
  //     return () => backHandler.remove();
  //   }, [active]);
  
  //   return (
  //     <View style={styles.conatiner}>
  //       <TouchableOpacity
  //         disabled={active !== 1 ? false : true}
  //         style={[
  //           styles.onTextPress,
  //           { backgroundColor: active == 1 ? COLOR.green : COLOR.lightgreen, },
  //         ]}
  //         onPress={() => {
  //           props.navigation.navigate('feed');
  //           setActive(1);
  //         }}>
  //         <Text style={[styles.txt]}>Feed</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity
  //         disabled={active !== 2 ? false : true}
  //         style={[
  //           styles.onTextPress,
  //           {
  //             backgroundColor: active == 2 ? COLOR.green : COLOR.lightgreen,
  //           },
  //         ]}
  //         onPress={() => {
  //           props.navigation.navigate('tme');
  //           setActive(2);
  //         }}>
  //         <Text style={[styles.txt]}>T.me</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity
  //         disabled={active !== 3 ? false : true}
  //         style={[
  //           styles.onTextPress,
  //           {
  //             backgroundColor: active == 3 ? COLOR.green : COLOR.lightgreen,
  //           },
  //         ]}
  //         onPress={() => {
  //           props.navigation.navigate('notes');
  //           setActive(3);
  //         }}>
  //         <Image
  //           source={require('../../assets/bottomicon.png')}
  //           style={[styles.icon, { tintColor: active == 3 ? COLOR.white : COLOR.black }]}
  //         />
  //       </TouchableOpacity>
  //       <TouchableOpacity
  //         disabled={active !== 4 ? false : true}
  //         style={[
  //           styles.onTextPress,
  //           {
  //             backgroundColor: active == 4 ? COLOR.green : COLOR.lightgreen,
  //           },
  //         ]}
  //         onPress={() => {
  //           props.navigation.navigate('chats');
  
  //           setActive(4);
  //         }}>
  //         <Text style={[styles.txt]}>Chat</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity
  //         disabled={active !== 5 ? false : true}
  //         style={[
  //           styles.onTextPress,
  //           {
  //             backgroundColor: active == 5 ? COLOR.green : COLOR.lightgreen,
  //           },
  //         ]}
  //         onPress={() => {
  //           props.navigation.navigate('board');
  //           setActive(5);
  //         }}>
  //         <Text style={[styles.txt]}>Board</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };
  
  // export default MyTabBar;
  // const styles = StyleSheet.create({
  //   conatiner: {
  //     height: 70,
  //     padding: 15,
  //     position: 'absolute',
  //     bottom: 20,
  //     left: 0,
  //     right: 0,
  //     backgroundColor: COLOR.lightgreen,
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     justifyContent: 'space-between',
  //     shadowColor: COLOR.gray, shadowOpacity: 0.5, shadowOffset: { width: 0, height: 2 }, shadowRadius: 5
  //   },
  //   txt: {
  //     color: COLOR.black,
  //     fontSize: 16,
  //     fontWeight: 'bold',
  //   },
  //   icon: { height: 26, width: 26, resizeMode: 'stretch' },
  //   onTextPress: {
  //     backgroundColor: COLOR.green,
  //     height: 55,
  //     width: 55,
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     marginLeft: -8,
  //     borderRadius: 50,
  //   },
  // });
  