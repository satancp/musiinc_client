import React from 'react';
import { StyleSheet } from 'react-native';
import { View, TextField, Text, Button, Colors } from 'react-native-ui-lib';

export default class PreparingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>准备中，暂未开放</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  }
});
