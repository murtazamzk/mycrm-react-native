import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';

const {width,height} = Dimensions.get('window');

export default class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
          <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        width: width,
        height: height,
        backgroundColor: 'rgba(255,255,255,0.5)',
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex:9,
        top:0,
        left:0
    },
    loader: {

    }
})
