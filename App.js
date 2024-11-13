// import { View, LogBox, TouchableOpacity, Image, } from 'react-native'
// import React, { useEffect } from 'react'
// import StackScreen from './Src/Navigation/Stack/Stcak'
// import { Provider } from 'react-redux';
// import store from './Src/Service/Redux/Store';
// import messaging from '@react-native-firebase/messaging';

// LogBox.ignoreAllLogs();
// const App = () => {
//   // useEffect(() => { getFcmToken() }, [])
//   // const getFcmToken = async () => {
//   //   try {
//   //     const D_token = await messaging().getToken();
//   //     console.log(D_token, '====================================');
//   //   } catch (error) { console.error('Error getting FCM token:', error) }
//   // }

//   return (
//     <Provider store={store}>
//       <View style={{ flex: 1 }}>
//         <StackScreen />
//       </View>
//     </Provider>
//   )
// }
// export default App

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const CustomMessage = ({ currentMessage, onSelectOption }) => {
  const { custom } = currentMessage;

  if (custom && custom.type === 'poll') {
    return (
      <View style={styles.pollContainer}>
        <Text style={styles.pollTitle}>{custom.text}</Text>
        {custom.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.pollOption}
            onPress={() => onSelectOption(option)}>
            <Text style={styles.pollOptionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  if (custom && custom.type === 'image') {
    return (
      <View style={styles.imageContainer}>
        <Image source={{ uri: custom.uri }} style={styles.image} />
      </View>
    );
  }

  if (custom && custom.type === 'file') {
    return (
      <View style={styles.fileContainer}>
        <Text style={styles.fileText}>File: {custom.fileName}</Text>
      </View>
    );
  }

  if (custom && custom.type === 'location') {
    return (
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>
          Location: {custom.latitude}, {custom.longitude}
        </Text>
      </View>
    );
  }

  if (custom && custom.type === 'contact') {
    return (
      <View style={styles.contactContainer}>
        <Text style={styles.contactName}>{custom.name}</Text>
        <Text style={styles.contactPhone}>{custom.phone}</Text>
      </View>
    );
  }

  return null;
};

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [userChoice, setUserChoice] = useState(null);

  const onSend = (newMessages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
  };

  const handlePollOptionSelect = option => {
    setUserChoice(option);
    const newMessage = {
      _id: Math.random().toString(36).substring(7),
      text: `I voted for: ${option}`,
      createdAt: new Date(),
      user: {
        _id: 1,
        name: 'User',
      },
    };
    onSend([newMessage]);
  };

  // Example messages with custom types
  const exampleMessages = [
    {
      _id: Math.random().toString(36).substring(7),
      text: 'What is your favorite color?',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Admin',
      },
      custom: {
        type: 'poll',
        text: 'Vote for your favorite color',
        options: ['Red', 'Green', 'Blue', 'Yellow'],
      },
    },
    {
      _id: Math.random().toString(36).substring(7),
      text: 'Check out this cool image!',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Admin',
      },
      custom: {
        type: 'image',
        uri: 'https://example.com/cool-image.jpg',
      },
    },
    {
      _id: Math.random().toString(36).substring(7),
      text: 'File Location: Document.pdf',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Admin',
      },
      custom: {
        type: 'file',
        fileName: 'Document.pdf',
      },
    },
    {
      _id: Math.random().toString(36).substring(7),
      text: 'Check out this location!',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Admin',
      },
      custom: {
        type: 'location',
        latitude: '37.7749',
        longitude: '-122.4194',
      },
    },
    {
      _id: Math.random().toString(36).substring(7),
      text: 'Here is my contact info.',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Admin',
      },
      custom: {
        type: 'contact',
        name: 'John Doe',
        phone: '+1 (123) 456-7890',
      },
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages.length === 0 ? exampleMessages : messages}
        onSend={onSend}
        user={{ _id: 1 }}
        renderCustomView={(props) => {
          return <CustomMessage currentMessage={props.currentMessage} onSelectOption={handlePollOptionSelect} />;
        }}
      />
      {/* Display selected option */}
      {userChoice && <Text style={styles.userChoice}>You voted for: {userChoice}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  pollContainer: {
    padding: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    marginTop: 10,
  },
  pollTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pollOption: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e1e1e1',
    borderRadius: 5,
  },
  pollOptionText: {
    fontSize: 14,
  },
  imageContainer: {
    padding: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  fileContainer: {
    padding: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
  },
  fileText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  locationContainer: {
    padding: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
  },
  locationText: {
    fontSize: 14,
  },
  contactContainer: {
    padding: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactPhone: {
    fontSize: 14,
  },
  userChoice: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    fontSize: 14,
    color: 'green',
  },
});
