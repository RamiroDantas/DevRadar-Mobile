import React from "react";
import {WebView} from 'react-native-webview'

function Profile({ navigation }){
    const githubUserName = navigation.route.params('github_username')
    return (
        <WebView style ={{ flex:1}} source = {{ uri: `http://github.com/${githubUserName}`}}/>
    )
}

export default Profile;