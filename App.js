import { useReducer } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';
import SignupScreen from './screens/SignupScreen';
import BasketItem from './components/BasketItem';
import WishedItem from './components/WishedItem';
import CategoryListItem from './components/CategoryListItem';
import BottomNav from './components/BottomNavigation';
import CategoryDishes from './screens/CategoryDishes';
import CategoryItemsScreen from './screens/CategoryItemsScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import BasketScreen from './screens/BasketScreen';
import WishlistScreen from './screens/WishlistScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import HomeProductCard from './components/HomeProductCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from './components/AppButton';
import SearchBar from './components/SearchBar';
import { NavigationContainer , createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MyContext, initialState, reducer } from './context/globalContext';
import { Card } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';




const navigationRef = createNavigationContainerRef();



export function navigate(name, params) {
  if (navigationRef.isReady()) {
    console.log("navigation ready")
    // Perform navigation if the react navigation is ready to handle actions
    navigationRef.navigate(name, params);
  } else {
    console.log("not") 
  }
}


// export default function App() {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//     <MyContext.Provider value={{ state, dispatch }}>
//       <SafeAreaView style={{flex:1}}>
//         <CheckoutScreen />
//       </SafeAreaView>
//     </MyContext.Provider>
//   );
// }

// SplashScreen.preventAutoHideAsync();

// export default function App() {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   return (
//     <MyContext.Provider value={{ state, dispatch }}>
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen
//             options={{ headerShown: false }}
//             name="Login"
//             component={LoginScreen}
//           />
//           <Stack.Screen
//             name="Home"
//             component={HomeScreen}
//             options={{
//               headerTitle: 'Home',
//               headerRight: () => (
//                 <Image
//                   style={{ width: 32, height: 32 }}
//                   source={{
//                     uri: 'https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Jasper',
//                   }}
//                 />
//               ),
//               headerLeft: () => (
//                 <Image
//                   source={{
//                     uri: 'https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Jasper',
//                   }}
//                   style={{ width: 12, height: 12, marginRight: 10 }}
//                 />
//               ),
//             }}
//           />

//           <Stack.Screen
//             options={{ headerShown: false }}
//             name="SignUp"
//             component={SignupScreen}
//           />
//           <Stack.Screen name="Categories" component={CategoryItemsScreen} />
//           <Stack.Screen name="Category Items" component={CategoryDishes} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </MyContext.Provider>
//   );
// }

const Tab = createBottomTabNavigator();

// const Stack = createStackNavigator();

// export default App = () => {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   return (
//     <MyContext.Provider value={{ state, dispatch }}>
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name="Home" component={HomeScreen} />
//           <Stack.Screen name="Categories" component={CategoryItemsScreen} />
//           <Stack.Screen name="Category Items" component={CategoryDishes} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </MyContext.Provider>
//   );
// };

const HomeScreenStack = createStackNavigator();

function HomeStack() {
  return (
    <HomeScreenStack.Navigator initialRouteName="Home">
      <HomeScreenStack.Screen
        options={{ headerShown: false }}
        name="SignUp"
        component={SignupScreen}
      />
      <HomeScreenStack.Screen
        options={{ headerShown: false }}
        name="LogIn"
        component={LoginScreen}
      />
      <HomeScreenStack.Screen name="Home" component={HomeScreen} />
      <HomeScreenStack.Screen
        name="Categories"
        component={CategoryItemsScreen}
      />
      <HomeScreenStack.Screen
        name="Category Items"
        component={CategoryDishes}
      />
    </HomeScreenStack.Navigator>
  );
}




export default App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <MyContext.Provider value={{ state, dispatch }}>
      <NavigationContainer ref={navigationRef}>
        <Tab.Navigator tabBar={(props) => <BottomNav {...props} />}>
          <Tab.Screen
            options={{ headerShown: false }}
            name="HomeScreen"
            component={HomeStack}
          />
          <Tab.Screen name="Wishlist" component={WishlistScreen} />
          <Tab.Screen name="Basket" component={BasketScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </MyContext.Provider>
  );
};
