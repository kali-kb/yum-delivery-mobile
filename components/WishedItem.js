import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function WishedItemComponent(props) {
  return (
    <View style={styles.card}>
      <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10 }}>
        <Image
          style={{ height: 80, width: 80 }}
          source={require('../assets/image(10).png')}
        />
      </View>
      <View>
        <View style={styles.itemDetail}>
          <Text style={{ fontSize: 18, fontWeight: '400' }}>
            {props.name.length > 16
              ? props.name.substring(0, 16) + '...'
              : props.name}
          </Text>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              ${props.price}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          marginVertical: 10,
          justifyContent: 'center',
        }}>
        <TouchableWithoutFeedback>
          <View style={styles.iconContainer}>
            <Ionicons
              style={{ top: 1, left: 0.6 }}
              name="heart"
              size={22}
              color="red"
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 20,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  itemDetail: {
    justifyContent: 'space-around',
    //backgroundColor:'green',
    width: 180,
    margin: 10,
    flex: 1,
  },

  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'lightgray',
    margin: 10,
    borderRadius: 10,
  },
});

export default WishedItemComponent;
