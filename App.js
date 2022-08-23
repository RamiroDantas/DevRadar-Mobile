import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './src/routes';

export default function App() {
  return (
    <>
        <StatusBar barStyle="light-content" backgroundColor='#332FD0'/>
        <View style= {{ flex: 1}}>
        <Routes/>
        </View>
    </>
  );
}

