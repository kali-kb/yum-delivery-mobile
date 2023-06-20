import { useState, useContext } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import ProductDetail from '../components/ProductDetail'
import { MyContext } from '../context/globalContext';
import { useNavigation } from '@react-navigation/native';



function ProductCard(props) {

  const [isModalVisible, setIsModalVisible] = useState(true);
  const { state, dispatch } = useContext(MyContext);
  const handleModal = (id) => {
    dispatch({type: 'TOGGLE_MODAL', dishId:id})
  }

  return (
    <TouchableWithoutFeedback onPress={() => handleModal(props.id)}>
      <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
        <View style={styles.card}>
          <ImageBackground
            style={{ height: 110 }}
            source={{ uri: `${props.img_url}` }}
          />
          <View>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                paddingTop: 4,
                fontWeight: 'bold',
                paddingHorizontal: 10,
              }}>
              {props.name}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.descriptionText}>
              {props.description}
            </Text>
            <Text style={{ paddingHorizontal: 10, fontWeight: 'bold' }}>
              ${props.price}
            </Text>
          </View>
        </View>
        {state.productDetailModalShown && (
          <Modal animationType="slide" transparent={false} onRequestClose={handleModal}>
            <ProductDetail id={props.id} />
          </Modal>
        )}
        <View style={styles.container}>
          <ImageBackground source={require('../assets/image(10).png')} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'lightgray',
    height: 180,
    width: 180,
    borderRadius: 10,
    marginHorizontal: -6,
    marginBottom: 15,
    overflow: 'hidden',
  },

  descriptionText: {
    fontWeight: 'bold',
    paddingHorizontal: 10,
    fontSize: 13,
    color: 'gray',
  },
});

export default ProductCard;
