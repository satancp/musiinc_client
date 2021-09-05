import React from 'react';
import { StyleSheet } from 'react-native';
import { View, TextField, Text, Button, Colors } from 'react-native-ui-lib';
import service from '../../../service';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.loginBtnContainer}>
          <Text
            style={styles.loginBtn}
            onPress={() => {
              service.User.login().then((res) => {
                if (res) {
                  navigation.navigate('HomeScreen');
                }
              });
            }}
          >
            登陆
          </Text>
        </View>
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
  },
  loginBtnContainer: {
    padding: 6,
    minWidth: 100,
    backgroundColor: 'rgb(79, 150, 243)',
    borderRadius: 100,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginBtn: { color: 'white' }
});
