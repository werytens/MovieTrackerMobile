import { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './components/Login';
import { Api } from './assets/api';
import Films from './components/Films';
import {LogBox} from 'react-native';

export default function App() {

    const [user, setUser] = useState();
    const [auth, setAuth] = useState(false);

    const [updating, setUpdating] = useState(0);0

    LogBox.ignoreAllLogs();

    useEffect(() => {
        const auth = async () => {
            const token = await AsyncStorage.getItem('authToken');

            if (!token) {
                setAuth(false);
            } else {
                setAuth(true);

                const responseUser = await Api.me(token);
                setUser(responseUser.data.userData)
            }
        }
        auth();
    }, [updating]);

    return (
        <View style={styles.container} >
            {
                auth ?
                    <Films id={user?.id} />
                : 
                    <Login updating={updating} setUpdating={setUpdating} />
            }
            <StatusBar styles="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#374139'
    }
});
