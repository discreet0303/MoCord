import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import themeColor from '../utils/theme';
import { fetchTypes } from '../actions/TypesAction';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: themeColor.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  logoText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  tipText: {
    fontSize: 20,
    textAlign: 'center',
  },
});
const LogoScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load data to root state
    dispatch(fetchTypes());

    // Navigate to next page
    const id = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'TabStack' }],
      });
    }, 2000);
  }, []);

  return (
    <View style={styles.root}>
      <Text style={styles.logoText}>MoCord</Text>
      <Text style={styles.tipText}>Load data and navigate to next page after 2 seconds</Text>
      <Text style={styles.tipText}>{Dimensions.get('window').height}</Text>
      <Text style={styles.tipText}>{Dimensions.get('screen').height}</Text>
    </View>
  );
};

export default LogoScreen;
