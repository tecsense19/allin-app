// PusherService.js
import React, { useEffect } from 'react';
import Pusher from 'pusher-js/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PusherService = () => {
    let pusher = null;
    let channel = null;

    useEffect(() => {
        const init = async () => {
            const token = await AsyncStorage.getItem('authToken');

            pusher = new Pusher('9763500e9ace3a62c99b', {
                cluster: 'ap2',
                authEndpoint: 'https://your-backend-url/broadcasting/auth',
                auth: {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            });

            channel = pusher.subscribe('private-chat');
        };

        init();

        return () => {
            if (channel) {
                channel.unbind_all();
                channel.unsubscribe();
            }
            if (pusher) {
                pusher.disconnect();
            }
        };
    }, []);

    const bindEvent = (eventName, callback) => {
        if (channel) {
            channel.bind(eventName, callback);
        }
    };

    const unbindEvent = (eventName) => {
        if (channel) {
            channel.unbind(eventName);
        }
    };

    return { bindEvent, unbindEvent };
};

export default PusherService;
