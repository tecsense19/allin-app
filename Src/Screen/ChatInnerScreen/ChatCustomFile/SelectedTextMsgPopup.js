// import { View, Text, TouchableOpacity, Image } from "react-native";
// import React from "react";
// import { COLOR } from "../../../Assets/AllFactors/AllFactors";

// const SelectedTextMsgPopup = ({ OnAddTask, onIgnore }) => {
//     return (
//         <View
//             style={{
//                 flex: 1,
//                 height: 50,
//                 flexDirection: "row",
//                 alignItems: "center",
//                 borderRadius: 10,
//                 width: "60%",
//                 backgroundColor: COLOR.white,
//                 shadowOpacity: 0.2,
//                 shadowRadius: 5,
//                 shadowOffset: { height: 2, width: 2 },
//                 alignSelf: "center",
//                 position: "absolute",
//                 marginTop: 50,
//                 justifyContent: "center",
//             }} >
//             <TouchableOpacity
//                 onPress={onIgnore}
//                 style={{ flexDirection: "row", padding: 10 }}>
//                 <Text style={{ color: "red", fontSize: 15, fontWeight: "600" }}>
//                     Ignore
//                 </Text>
//                 <Image
//                     source={require("../../../Assets/Image/ignore.png")}
//                     style={{ height: 20, width: 20, marginLeft: 5 }}
//                 />
//             </TouchableOpacity>
//             <View
//                 style={{ height: 25, width: 2, backgroundColor: COLOR.lightgray }}
//             ></View>
//             <TouchableOpacity
//                 style={{ flexDirection: "row", padding: 10 }}
//                 onPress={OnAddTask}>
//                 <Text style={{ color: "#0CC73F", fontSize: 15, fontWeight: "600" }}>
//                     Add Task
//                 </Text>
//                 <Image
//                     source={require(".../../../Assets/Image/addtask.png")}
//                     style={{ height: 18, width: 18, tintColor: "#0CC73F", marginLeft: 5 }}
//                 />
//             </TouchableOpacity>
//         </View>
//     );
// };

// export default SelectedTextMsgPopup;
import { View, Text, TouchableOpacity, Image, } from "react-native";
import React from "react";
import { COLOR } from "../../../Assets/AllFactors/AllFactors";

const SelectedTextMsgPopup = ({ OnAddTask, onIgnore, onEditTask, onDeleteTask, onForword, onReminder, userType, msgType }) => {

    return (
        <View
            style={{
                borderRadius: 5, padding: 5,
                width: 130,
                backgroundColor: COLOR.white,
                shadowOpacity: 0.2,
                shadowRadius: 5,
                shadowOffset: { height: 2, width: 2 }, alignSelf: userType == 'loginUser' ? 'flex-end' : 'flex-start',
                marginTop: msgType == 'Text' ? 10 : -5

            }} >

            <TouchableOpacity onPress={OnAddTask} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 8 }}>
                <Text style={{ fontSize: 14, color: COLOR.black, fontWeight: '600' }}>{'Add Task'}</Text>
                <Image source={require('../../../Assets/Image/addtask.png')} style={{ height: 15, width: 15, tintColor: COLOR.green, resizeMode: 'contain' }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onIgnore} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 8 }}>
                <Text style={{ fontSize: 14, color: COLOR.black, fontWeight: '600' }}>{'Ignore'}</Text>
                <Image source={require('../../../Assets/Image/ignore.png')} style={{ height: 17, width: 17, tintColor: COLOR.green, resizeMode: 'contain' }} />
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={onEditTask} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 8 }}>
                <Text style={{ fontSize: 14, color: COLOR.black, fontWeight: '600' }}>{'Edit Task'}</Text>
                <Image source={require('../../../Assets/Image/groupediticon.png')} style={{ height: 15, width: 15, tintColor: COLOR.green, resizeMode: 'contain' }} />
            </TouchableOpacity> */}
            <TouchableOpacity onPress={onForword} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 8 }}>
                <Text style={{ fontSize: 14, color: COLOR.black, fontWeight: '600' }}>{'Forword'}</Text>
                <Image source={require('../../../Assets/Image/forword.png')} style={{ height: 16, width: 16, tintColor: COLOR.green, resizeMode: 'contain' }} />
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={onDeleteTask} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 8 }}>
                <Text style={{ fontSize: 14, color: COLOR.black, fontWeight: '600' }}>{'Delete Task'}</Text>
                <Image source={require('../../../Assets/Image/groupbinicon.png')} style={{ height: 15, width: 15, tintColor: COLOR.green, resizeMode: 'contain' }} />
            </TouchableOpacity> */}
            <TouchableOpacity onPress={onReminder} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 8 }}>
                <Text style={{ fontSize: 14, color: COLOR.black, fontWeight: '600' }}>{'Reminder'}</Text>
                <Image source={require('../../../Assets/Image/taskreminder.png')} style={{ height: 15, width: 15, tintColor: COLOR.green, resizeMode: 'contain' }} />
            </TouchableOpacity>



        </View>
    );
};

export default SelectedTextMsgPopup;
