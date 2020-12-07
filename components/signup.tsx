/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import {ApolloClient, InMemoryCache, gql} from '@apollo/client';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
export default function signup() {
  const navigation = useNavigation();
  const client = new ApolloClient({
    uri: 'http://192.168.31.247:4000/',
    cache: new InMemoryCache(),
  });
  function navigateToList() {
    navigation.navigate('Login');
  }
  const [userEmail, setEmail] = useState('');
  const [userPassword, setPassword] = useState('');
  const onSignup = () => {
    const query = gql`
      mutation signup($email: String!, $password: String!) {
        signup(email: $email, password: $password) {
          _id
          email
        }
      }
    `;
    client
      .mutate({
        mutation: query,
        variables: {
          email: userEmail,
          password: userPassword,
        },
      })
      .then((_result) => navigateToList())
      .catch((_error) => Alert.alert('Wrong Credentials'));
    //setInput(e.currentTarget.value);
    navigateToList();
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter New Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter New Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: '#FFC0CB',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,

    alignItems: 'center',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#FF1493',
  },
});
