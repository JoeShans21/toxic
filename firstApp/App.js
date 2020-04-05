import * as React from 'react';
import { Text, View, TouchableOpacity, TextInput, Modal } from 'react-native';
import { Mainpage } from './Main.js';
import { styles } from './Style.js';

const  [page, changePage] = React.useState('Signin');
const  [user, changeUserText] = React.useState("");
const  [pass, changePassText] = React.useState("");
export default function YourApp() {
  if (page == 'Home') {
    return (
      <Mainpage/>
    )
  }
  else if (page == 'Signin') {
    return (
      // Sign In Page
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>
        <TextInput
          placeholder="Username"
          style={styles.textInput}
          onChangeText={text => changeUserText(text)}
          value={user}
        />
        <TextInput
          placeholder="Password"
          style={styles.textInput}
          onChangeText={text => changePassText(text)}
          value={pass}
        />
        <TouchableOpacity 
          style={styles.nativeButton}
          onPress={() => signIn(user, pass)}
        >
           <Text style={{color: "blue"}}>Sign In</Text>
         </TouchableOpacity>
      </View>
    );
  }
}
async function signIn(user, pass) {
  try {
    let response = await fetch('http://192.168.1.227:8080/?type=signin&user=' + user + '&pass=' + pass);
    if (response == "Signed in") {
      changePage("Home")
    }
  } catch (error) {
    console.error(error);
  }
}