import React, { Component, useState } from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text,
  Alert
} from 'react-native'
export default function Login({navigation}) {
  const [textLongUrl, setLongUrl] = useState('');
  let shortl = ''


  const pressHandlerCreate = () => 
  {
        //Enter login logic here
        try {
          fetch('http://192.168.1.23:8080/userUrl', {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  username: navigation.getParam('username'),
                  url: textLongUrl
              }),
          }).then((response) => response.json())
              .then((responseJson) => {
                  shortl = "http://localhost:8080/" + responseJson.id;
                  console.log(shortl);
                  alert("link is: " + shortl);
          })
          .catch((error) => {
            console.error(error);
          }); 
  
      } catch (err) {
        console.log('error signing up: ', err)
      }
  }


  return (
    <View style={{padding: 10}}>
      <Text>{"\n"}</Text>
      <TextInput
        style={{height: 40, borderColor:'black', borderStyle: 'solid', borderWidth:3}}
        placeholder="Enter long url"
        onChangeText={textLongUrl => setLongUrl(textLongUrl)}
        defaultValue={textLongUrl}
      />
      <Text>{"\n"}</Text>

      <Text>{"\n"}</Text>
      <Button title='Create' onPress={pressHandlerCreate} />

    </View>
  );
}