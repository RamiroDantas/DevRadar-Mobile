import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator  } from "@react-navigation/native-stack";
import { View } from 'react-native';
import Profile from "./pages/Profile";
import Main from "./pages/Main";

const Stack = createNativeStackNavigator();


    function Routes (){
        return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='iRadar'>
                <Stack.Screen name="iRadar" component={Main}/> 
                <Stack.Screen name="Profile" component={Profile}/>
            </Stack.Navigator>
        </NavigationContainer>
        )
    }


export default Routes;

