import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Animated, Dimensions } from 'react-native';
import { MKTextField, MKButton, } from 'react-native-material-kit';
import {colors,commonStyles} from '../appTheme';
import Logo from '../../assets/logo.png';
import firebase from 'firebase';
import fbConfig from '../../firebaseConfig';

const {width,height} = Dimensions.get('window');
const LOGO_POSITION = new Animated.Value(height/2);
const BUBBLE_POSITION = new Animated.Value(-width * 1.5);
const FORM_OPACITY = new Animated.Value(0);
let FB ;


const LoginButton = MKButton.coloredButton().withText('Login').build();

export default class Login extends Component {
  
  state = {
    position: new Animated.Value(0)
  }

  componentWillMount(){
    FB = firebase.initializeApp(fbConfig);
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
  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={{...styles.bubble,top:BUBBLE_POSITION}}></Animated.View>
        <Animated.View style={{...styles.logoWrapper,bottom:LOGO_POSITION}}> 
          <Image source={Logo} style={styles.logo} resizeMode="cover" />
          <Text style={styles.logoTitle}>MY CRM</Text>
        </Animated.View>
        <Animated.View style={{...styles.formWrapper,opacity:FORM_OPACITY}}>
          <MKTextField
            style={styles.formInput}
            placeholder="Email Address"
          ></MKTextField>
          <MKTextField
            style={styles.formInput}
            placeholder="Password"
          ></MKTextField>
          <LoginButton></LoginButton>
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
      paddingBottom:height/5
    },
    formInput:{
      width: width - 50,
      paddingBottom: 20,
      marginBottom:20
    }
})
