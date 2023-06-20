import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function BottomNav() {
  const [activeTab, setActiveTab] = useState('Home');
  // const { navigator } = props;
  const navigation = useNavigation();

  useEffect(() => {
    if (activeTab == 'Home') {
      navigation.navigate('HomeScreen');
    } else if (activeTab == 'Heart') {
      navigation.navigate('Wishlist');
    } else {
      navigation.navigate('Basket');
    }
  }, [activeTab]);


  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => setActiveTab('Heart')}>
        <View style={{ alignItems: 'center' }}>
          <View>
            <Ionicons
              name={activeTab == 'Heart' ? 'heart-sharp' : 'heart-outline'}
              size={32}
              color={activeTab == 'Heart' ? '#DB0E07' : '#000'}
            />
          </View>
          {activeTab == 'Heart' && (
            <View
              style={{
                height: 8,
                width: 8,
                backgroundColor: 'red',
                borderRadius: 10,
              }}
            />
          )}
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => setActiveTab('Home')}>
        <View style={{ alignItems: 'center' }}>
          <View>
            <Ionicons
              name={activeTab == 'Home' ? 'home-sharp' : 'home-outline'}
              size={32}
              color={activeTab == 'Home' ? '#DB0E07' : '#000'}
            />
          </View>
          {activeTab == 'Home' && (
            <View
              style={{
                height: 8,
                width: 8,
                backgroundColor: 'red',
                borderRadius: 10,
              }}
            />
          )}
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => setActiveTab('Basket')}>
        <View style={{ alignItems: 'center' }}>
          <View>
            <Ionicons
              name={activeTab == 'Basket' ? 'md-basket' : 'md-basket-outline'}
              size={35}
              color={activeTab == 'Basket' ? '#DB0E07' : '#000'}
            />
          </View>
          {activeTab == 'Basket' && (
            <View
              style={{
                height: 8,
                width: 8,
                backgroundColor: 'red',
                borderRadius: 10,
              }}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    // borderWidth: 3,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    //top:0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default BottomNav;
