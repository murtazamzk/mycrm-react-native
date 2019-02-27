import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Animated, Dimensions } from 'react-native';
import {colors,commonStyles} from '../appTheme';
import Logo from '../../assets/logo.png';
import firebase from 'firebase';

const {width,height} = Dimensions.get('window');
const LOGO_POSITION = new Animated.Value(0);
const BUBBLE_POSITION = new Animated.Value(-width*2);


export default class Login extends Component {
  
  state = {
    position: new Animated.Value(0)
  }
  componentDidMount(){
    Animated.timing(
      LOGO_POSITION,
      {
        toValue: -height/3 + 50,
        duration: 2000,              
      }
    ).start();
    Animated.timing(
      BUBBLE_POSITION,
      {
        toValue: -height/2 + 50,
        duration: 3000,              
      }
    ).start();
  }
  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={{...styles.bubble,top:BUBBLE_POSITION}}></Animated.View>
        <Animated.View style={{...styles.logoWrapper,top:LOGO_POSITION}}> 
          <Image source={Logo} style={styles.logo} resizeMode="cover" />
          <Text style={styles.logoTitle}>MY CRM</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
      ...commonStyles.container,
      flex:1,
      backgroundColor: '#ffffff'
    },
    bubble:{
      top:-width*1.5,
      position: 'absolute',
      width: width * 1.5,
      height: width * 1.5,
      borderRadius: width*1.5/2,
      backgroundColor: '#eaeaea'
    },
    logoWrapper:{
      position: 'relative'
    },
    logo:{
      width: 100,
      height: 100
    },
    logoTitle:{
      marginTop:10,
      fontSize: 25,
      color: colors.primary
    }
})
