import { useState, useEffect, useContext } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import LottieView from 'lottie-react-native';
import animation from '../assets/28292-circular-loading-with-gradient.json';
import { MyContext } from '../context/globalContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

function MyComponent(props) {
  const { state, dispatch } = useContext(MyContext);
  const { email, password } = state;
  const [clickedState, setClickedState] = useState(true);
  // const dynamicWidth = props.name == 'Checkout' ? '90%' : null;

  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-Medium': Poppins_500Medium,
    'Poppins-SemiBold': Poppins_600SemiBold,
  });

  useEffect(() => console.log(state), []);

  const handleSignUpSubmit = async () => {
    setClickedState(!clickedState);

    try {
      const response = await fetch(
        'https://weak-tan-ostrich-tutu.cyclic.app/create-user',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        try {
          const responseData = await response.json(); // Parse the response JSON
          console.log('executed', responseData.user);
          await AsyncStorage.setItem(
            '@userData',
            JSON.stringify(responseData.user)
          ); // Use responseData to extract the user object
          setClickedState(false);
          navigation.navigate('Home'); // Navigate to the "Home" screen
        } catch (e) {
          console.error("User data hasn't been stored:", e);
        }
      } else {
        setClickedState(true);
        console.log('Failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginSubmit = async () => {
    setClickedState(!clickedState);

    try {
      const response = await fetch(
        'https://weak-tan-ostrich-tutu.cyclic.app/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        try {
          const responseData = await response.json(); // Parse the response JSON
          console.log('executed', responseData.user);
          await AsyncStorage.setItem(
            '@userData',
            JSON.stringify(responseData.user)
          ); // Use responseData to extract the user object
          setClickedState(false);
          navigation.navigate('Home'); // Navigate to the "Home" screen
        } catch (e) {
          console.error("User data hasn't been stored:", e);
        }
      } else {
        setClickedState(true);
        console.log('Failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={
          props.name == 'Sign up' ? handleSignUpSubmit : handleLoginSubmit
        }>
        {clickedState ? (
          <View>
            <Text style={styles.textStyles}>{props.name}</Text>
          </View>
        ) : (
          <View style={{ width: 30, height: 30 }}>
            <LottieView source={animation} autoPlay loop />
          </View>
        )}
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  textStyles: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 1,
    fontFamily: 'Poppins-SemiBold',
  },

  container: {
    backgroundColor: '#DB0E07',
    borderRadius: 10,
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // Add any other styles you need here
  },
});

export default MyComponent;
