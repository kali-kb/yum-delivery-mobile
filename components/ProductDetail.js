import { useState, useContext, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import { MyContext } from '../context/globalContext';
import { AppButton } from './AppButton';
import { Ionicons } from '@expo/vector-icons';

ingredients = [
  '1/2 sugar',
  'tomato',
  'salad',
  'lettuce',
  'kale',
  'onions',
  'mushrooms',
];

const ProductDetailComponent = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [wishAdded, setWishAdded] = useState(true);
  const [requestSent, setRequestSent] = useState(false);
  const [dish, setDish] = useState({});
  const { state, dispatch } = useContext(MyContext);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const toggleModal = (event) => {
    dispatch({ type: 'TOGGLE_MODAL' });
  };

  //i though this helps but it not
  useEffect(() => {
    setTimeout(() => {
      setRequestSent(false);
    }, 3000);
  }, [requestSent]);

  useEffect(() => {
    fetchDish();
  }, []);

  const fetchDish = async () => {

    try {
      const response = await fetch(
        `https://weak-tan-ostrich-tutu.cyclic.app/dish/${state.productDetailId}`
      );
      if (response.ok) {
        const data = await response.json();
        setDish(data);
      } else {
        console.log('Error: ', response.status);
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  //the screen is freezes after this event handler is called by pressing Add to Cart ??
  const handleButtonState = () => {
    setRequestSent(true);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View>
      <View
        style={{
          margin: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={() => setWishAdded(!wishAdded)}>
          <Ionicons
            name={wishAdded ? 'heart' : 'heart-outline'}
            size={28}
            color={wishAdded ? 'red' : 'black'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleModal}>
          <Ionicons name="close" size={28} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ overflow: 'hidden', height: 300 }}>
        <Image
          resizeMode="cover"
          style={styles.productImg}
          source={{ uri: `${dish.img_url}` }}
        />
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            margin: 10,
            justifyContent: 'space-between',
          }}>
          <Text style={styles.textStyles}>{dish.name}</Text>
          <Text style={styles.textStyles}>${dish.price}</Text>
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, marginVertical: 15, fontWeight: '500' }}>
            Description
          </Text>
          <Text style={{ fontSize: 17, color: 'gray' }}>
            {dish.description}
          </Text>
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, marginVertical: 15 }}>Ingredients</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {ingredients.map((ingredient) => (
              <View key={ingredient} style={styles.chip}>
                <Text>{ingredient}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={{ flexDirection: 'row', margin: 15 }}>
          <View style={{ alignItems: 'center', margin: 10 }}>
            <View
              style={{ borderWidth: 2, borderColor: 'red', borderRadius: 10 }}>
              <TouchableOpacity onPress={incrementQuantity}>
                <Ionicons name="caret-up" size={20} color="black" />
              </TouchableOpacity>
            </View>
            <Text>{quantity}</Text>
            <View
              style={{ borderWidth: 2, borderColor: 'red', borderRadius: 10 }}>
              <TouchableOpacity onPress={decrementQuantity}>
                <Ionicons name="caret-down" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableWithoutFeedback onPress={handleButtonState}>
            <View
              style={{
                borderRadius: 10,
                flexGrow: 1,
                margin: 10,
                padding: 18,
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {requestSent ? (
                <Text style={{ bottom: 7, color: 'white', fontWeight: 20 }}>
                  . . .
                </Text>
              ) : (
                <Text
                  style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
                  Add to Cart
                </Text>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productImg: {
    height: '100%',
    width: '100%',
    // height:300
  },

  chip: {
    marginRight: 10,
    // backgroundColor:'green'
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  textStyles: {
    fontWeight: '600',
    fontSize: 24,
    paddingHorizontal: 10,
  },
});

export default ProductDetailComponent;
