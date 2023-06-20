import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Platform,
  Button,
  TouchableNativeFeedback,
} from 'react-native';
// import produce from 'immer';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import dateFormatHandler from '../utils/formatHandler';

const CreditCardForm = ({ onInputChange }) => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    console.log(currentDate);
    
    hideDatePicker();
  };

  return (
    <View style={{ marginVertical: 30 }}>
      <Text style={{ left: 39, fontWeight: 'bold', fontSize: 17 }}>
        Add Credit Card Details
      </Text>
      <View style={styles.formContainer}>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Cardholder Name</Text>
          <TextInput
            onChangeText={(value) => onInputChange('cardholderName', value)}
            style={styles.inputStyles}
            cursorColor="red"
            // value={value}
            // onChangeText={handleChange}
            placeholder="Enter your name"
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Card Number</Text>
          <TextInput
            onChangeText={(value) => onInputChange('cardNumber', value)}
            style={styles.inputStyles}
            cursorColor="red"
            // value={value}
            // onChangeText={handleChange}
            placeholder="XXXX   XXXX   XXXX   XXXX"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            // backgroundColor: 'red',
            width: '100%',
          }}>
          {showPicker && (
            <DateTimePicker
              mode="datetime"
              value={date}
              is24Hour={true}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
            />
          )}
          <View>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Expiry</Text>
            <TextInput
              onChangeText={(value) => onInputChange('expiry', value)}
              placeholder="⏱️"
              value={dateFormatHandler(date)}
              onFocus={() => setShowPicker(!showPicker)}
              cursorColor="white"
              style={{ ...styles.tinyInputStyles, paddingHorizontal: 10 }}
            />
          </View>
          <View>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>CVV</Text>
            <TextInput
              onChangeText={(value) => onInputChange('cvv', value)}
              placeholder="e.g 123"
              cursorColor="red"
              style={{
                ...styles.tinyInputStyles,
                paddingHorizontal: 10,
              }}
            />
          </View>
        </View>
      </View>
      <View style={{ marginVertical: 20, alignItems: 'center' }}>
        <TouchableNativeFeedback
          onPress={() => updateGlobalState({ step: globalState.step + 1 })}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Continue</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

const DeliveryAddressDetailForm = ({ onInputChange }) => {
  return (
    <View style={{ marginVertical: 30, width: '100%' }}>
      <Text style={{ left: 39, fontWeight: 'bold', fontSize: 17 }}>
        Add Delivery Adress
      </Text>
      <View style={styles.formContainer}>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.inputStyles}
            cursorColor="red"
            // value={value}
            onChangeText={(value) => onInputChange('city', value)}
            placeholder="Enter your City"
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Street Address</Text>
          <TextInput
            style={styles.inputStyles}
            cursorColor="red"
            // value={value}
            onChangeText={(value) => onInputChange('streetAddress', value)}
            placeholder="eg. 123 Main Street"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Apt, suite, etc (optional)</Text>
          <TextInput
            style={styles.inputStyles}
            cursorColor="red"
            // value={value}
            onChangeText={(value) => onInputChange('aptSuite', value)}
            placeholder="eg. Apt. 456"
          />
        </View>
      </View>
      <View style={{ marginVertical: 20, alignItems: 'center' }}>
        <TouchableNativeFeedback>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Continue</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

const FormDoneComponent = () => {
  return (
    <View>
      <Image
        style={{ height: 300, width: 300 }}
        source={require('../assets/checkout-done-img.png')}
      />
      <Text
        style={{
          marginVertical: 30,
          left: 10,
          fontSize: 25,
          fontWeight: 'bold',
        }}>
        Your order is on the way
      </Text>
    </View>
  );
};

const CheckoutComponent = () => {
  const [step, setStep] = useState(0);
  const [formState, setFormState] = useState({
    cardholderName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    city: '',
    streetAddress: '',
    aptSuite: '',
  });

  const handleInputChange = (field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ProgressSteps
          borderWidth={5}
          activeStepIconBorderColor="#000"
          activeStep={0}
          completedProgressBarColor="#000"
          activeLabelColor="#000"
          completedStepNumColor="#fff"
          completedStepIconColor="#000"
          completedCheckColor="#fff">
          <ProgressStep
            label="Payment Details"
            nextBtnTextStyle={{ color: '#000' }}>
            <CreditCardForm onInputChange={handleInputChange} />
          </ProgressStep>
          <ProgressStep
            label="Delivery Adress"
            previousBtnTextStyle={{ color: '#000' }}
            nextBtnTextStyle={{ color: '#000' }}>
            <View style={{ alignItems: 'center' }}>
              <DeliveryAddressDetailForm onInputChange={handleInputChange}/>
            </View>
          </ProgressStep>
          <ProgressStep
            label="Done"
            nextBtnTextStyle={{ color: '#000' }}
            previousBtnTextStyle={{ color: '#000' }}>
            <View style={{ alignItems: 'center' }}>
              <FormDoneComponent />
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    // backgroundColor: 'green',
    alignItems: 'center',
  },

  fieldContainer: {
    // backgroundColor:'red',
    width: '80%',
    marginVertical: 20,
  },

  label: {
    fontSize: 17,
    fontWeight: 'bold',
  },

  inputStyles: {
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 10,
    height: 50,
    borderColor: 'lightgray',
  },

  tinyInputStyles: {
    borderWidth: 1,
    marginTop: 10,
    width: 100,
    height: 40,
    borderColor: 'lightgray',
    borderRadius: 10,
  },

  button: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 3,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CheckoutComponent;
