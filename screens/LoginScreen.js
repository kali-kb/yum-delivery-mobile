import { useState, useEffect, useContext } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import { MyContext } from '../context/globalContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';

function SigninScreen(props) {
  // const [isUserDataFound, setIsUserDataFound] = useState(false)
  const { state, dispatch } = useContext(MyContext);
  const navigation = useNavigation();

  useEffect(() => {
    SplashScreen.preventAutoHideAsync().catch(console.warn);

    const checkUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('@userData');
        if (userData) {
          // User data exists, navigate to Home screen
          navigation.navigate('Home');
        } else {
          // User data does not exist, continue showing the splash screen
          SplashScreen.hideAsync().catch(console.warn);
        }
      } catch (error) {
        console.error('Error checking user data:', error);
      }
    };

    checkUserData();


  }, []);

  useEffect(() => {
    SplashScreen.hideAsync().catch(console.warn);
    console.log(state.email, state.password);
  }, [state.email, state.password]);

  const handleEmailChange = (event) => {
    dispatch({ type: 'UPDATE_EMAIL', payload: event.nativeEvent.text });
  };

  const handlePasswordChange = (event) => {
    dispatch({ type: 'UPDATE_PASSWORD', payload: event.nativeEvent.text });
  };

  // const handleSubmit = async () => {
  //   try {
  //     const response = await fetch(
  //       'https://weak-tan-ostrich-tutu.cyclic.app/login',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ email, password }),
  //       }
  //     );

  //     if (response.ok) {
  //       console.log('Success');
  //       try {
  //         const responseData = await response.json(); // Parse the response JSON
  //         console.log("executed",responseData.user)
  //         await AsyncStorage.setItem(
  //           '@userData',
  //           JSON.stringify(responseData.user) // Use responseData to extract the user object
  //         );
  //         navigation.navigate('Home'); // Navigate to the "Home" screen
  //       } catch (e) {
  //         console.error("user data hasn't been stored");
  //       }
  //     } else {
  //       console.log('Failed');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} enabled>
      <SafeAreaView style={styles.screen}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            source={require('../assets/yum-logo.png')}
            style={styles.image}
          />
          <Text style={{ fontWeight: 'bold', fontSize: 30, letterSpacing: 2 }}>
            Welcome Back
          </Text>
        </View>
        <View style={styles.formContainer} keyboardShouldPersistTaps="handled">
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
              onChange={handlePasswordChange}
              secureTextEntry
              cursorColor="red"
              style={styles.inputStyles}
              placeholder="eg.123456"
            />
          </View>
          <Pressable onPress={() => navigation.navigate('SignUp')}>
            <Text>Dont have an account?, Sign Up</Text>
          </Pressable>
          <AppButton name="Log in" />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
    width: '30%',
    height: '30%',
  },

  imageContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
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

export default SigninScreen;
