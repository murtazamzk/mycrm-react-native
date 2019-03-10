import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Animated, Dimensions, Keyboard, TextInput, UIManager } from 'react-native';
import { MKTextField, MKButton, } from 'react-native-material-kit';
import {colors,commonStyles} from '../appTheme';
import Logo from '../../assets/logo.png';
import Loader from '../components/Loader';
import firebase from 'firebase';
import fbConfig from '../../firebaseConfig';

const {width,height} = Dimensions.get('window');
const LOGO_POSITION = new Animated.Value(height/2);
const BUBBLE_POSITION = new Animated.Value(-width * 1.5);
const FORM_OPACITY = new Animated.Value(0);
const KB_SHIFT = new Animated.Value(0);
let FB ;


const LoginButton = MKButton.coloredButton().withText('Login').build();

const { State: TextInputState } = TextInput;

export default class Login extends Component {
  
  state = {
    email : '',
    password : '',
    error : '',
    loading : false
  }

  componentWillMount(){
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }
  componentDidMount(){
    
    Animated.parallel([
      Animated.timing(
        LOGO_POSITION,
        {
          toValue: height - 250,
          duration: 2000,              
        }
      ),
      Animated.timing(
        BUBBLE_POSITION,
        {
          toValue: -(width*1.5 + 200)/3  ,
          duration: 3000,              
        }
      )
    ]).start();
    Animated.sequence([
      Animated.delay(3000),
      Animated.timing(
        FORM_OPACITY,
        {
          toValue: 1,
          duration: 3000,              
        }
      )
    ]).start();
  }

  handleKeyboardDidShow = (event) => {
    const { height: windowHeight } = Dimensions.get('window');
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField();
    UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
      const fieldHeight = height;
      const fieldTop = pageY;
      let gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
      if (gap >= 0) {
        return;
      }else{
        gap-= 10;
      }
      Animated.timing(
        KB_SHIFT,
        {
          toValue: gap,
          duration: 500
        }
      ).start();
    });
  }

  handleKeyboardDidHide = () => {
    Animated.timing(
      KB_SHIFT,
      {
        toValue: 0,
        duration: 500
      }
    ).start();
  }


  handleSubmit = () => {
    if(this.state.email == '' || this.state.password == ''){
      this.setState({
        error : 'Invalid Login Details'
      });
    }else{
      this.setState({
        error : ''
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={{...styles.bubble,top:BUBBLE_POSITION}}></Animated.View>
        <Animated.View style={{...styles.logoWrapper,bottom:LOGO_POSITION}}> 
          <Image source={Logo} style={styles.logo} resizeMode="cover" />
          <Text style={styles.logoTitle}>MY CRM</Text>
        </Animated.View>
        <Animated.View style={{...styles.formWrapper,opacity:FORM_OPACITY,transform: [{translateY: KB_SHIFT}]}}>
          <MKTextField
            ref={(input) => { this.emailInput = input; }}
            style={styles.formInput}
            placeholder="Email Address"
            returnKeyType="done"
            text={this.state.email}
            onTextChange={email => this.setState({ email })}
          ></MKTextField>
          <MKTextField
            ref={(input) => { this.passwordInput = input; }}
            style={styles.formInput}
            placeholder="Password"
            returnKeyType="done"
            text={this.state.email}
            password={true}
            onTextChange={password => this.setState({ password })}
          ></MKTextField>
          {this.state.error ? <Text style={styles.errorMsg}>{this.state.error}</Text> : null}
          <LoginButton onPress={this.handleSubmit.bind(this)}></LoginButton>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
      ...commonStyles.container,
      flex:1,
      backgroundColor: '#ffffff',
      position: 'relative',
      justifyContent: 'flex-end'
    },
    bubble:{
      position: 'absolute',
      width: width * 1.5,
      height: width * 1.5,
      borderRadius: width*1.5/2,
      backgroundColor: '#eaeaea'
    },
    logoWrapper:{
      position: 'absolute',
      bottom:0
    },
    logo:{
      width: 100,
      height: 100
    },
    logoTitle:{
      marginTop:10,
      fontSize: 25,
      color: colors.primary
    },
    formWrapper:{
      paddingBottom:height/5,
      position: 'relative'
    },
    errorMsg:{
      color: '#ff0000',
      position: 'relative',
      top:-20
    },
    formInput:{
      width: width - 50,
      paddingBottom: 20,
      marginBottom:20
    }
})
