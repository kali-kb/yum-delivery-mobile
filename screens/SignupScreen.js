import { useState, useContext } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import { MyContext } from '../context/globalContext';
import { useNavigation } from '@react-navigation/native';



function SignupScreen(props) {
  const { state, dispatch } = useContext(MyContext);
  const navigation = useNavigation();


  const handleEmailChange = (event) => {
    dispatch({ type: 'UPDATE_EMAIL', payload: event.nativeEvent.text });
  };

  const handlePasswordChange = (event) => {
    dispatch({ type: 'UPDATE_PASSWORD', payload: event.nativeEvent.text });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          source={require('../assets/say-yum-to-the-perfect-bite.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.fieldContainer}>
          <Text style={{ fontWeight: 'bold' }}>Email</Text>
          <TextInput
            onChange={handleEmailChange}
            cursorColor="red"
            style={styles.inputStyles}
            placeholder="eg.JohnDoe@example.com"
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={{ fontWeight: 'bold' }}>Password</Text>
          <TextInput
            secureTextEntry
            onChange={handlePasswordChange}
            cursorColor="red"
            style={styles.inputStyles}
            placeholder="eg.123456"
          />
        </View>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text>Already have an account?, Log In</Text>
        </Pressable>
        <AppButton name="Sign up" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fieldContainer: {
    //marginTop: 20,
    //marginBottom:30
  },

  inputStyles: {
    borderWidth: 2,
    borderRadius: 10,
    width: 300,
    paddingHorizontal: 10,
    marginTop: 10,
    height: 50,
    borderColor: 'lightgray',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  imageContainer: {
    flex: 0.5,
    overflow: 'hidden',
  },

  formContainer: {
    borderWidth: 2,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderColor: 'lightgray',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 0.5,
  },

  screen: {
    backgroundColor: '#fff',
    flex: 1,
  },


});

export default SignupScreen;
