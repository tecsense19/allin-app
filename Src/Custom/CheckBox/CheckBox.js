import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';

const CheckBox = ({
  ischeck,
  onPress,
  tintColor,
  top,
  bottom,
  right,
  left,
  boxtintcolor,
  checktintcolor,
}) => {
  return (
    <TouchableOpacity
      style={{
        marginTop: top,
        marginBottom: bottom,
        marginLeft: left,
        marginRight: right,
      }}
      onPress={onPress}>
      {!ischeck ? (
        <Image
          style={[styles.boxicon, { tintColor: boxtintcolor }]}
          source={require('../../Assets/Image/box.png')}
        />
      ) : (
        <Image
          style={[styles.chackbox, { tintColor: checktintcolor }]}
          source={require('../../Assets/Image/check.png')}
        />
      )}
    </TouchableOpacity>
  );
};

export default CheckBox;
const styles = StyleSheet.create({
  boxicon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  chackbox: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
});
