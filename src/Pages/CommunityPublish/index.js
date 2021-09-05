import React from 'react';
import { StyleSheet, TextInput, Dimensions } from 'react-native';
import { View, TextField, Text, Button, Colors } from 'react-native-ui-lib';
import { AntDesign } from '@expo/vector-icons';
import { i18n } from '../../../i18n';
import service from '../../../service';
import LocalCache from '../../../cache';

const screenWidth = Dimensions.get('window').width;

export default class CommunityPublishPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { textContent: '' };
    this.onChangeText = this.onChangeText.bind(this);
    this.publish = this.publish.bind(this);
  }

  async publish() {
    const { navigation, route } = this.props;
    const { textContent } = this.state;
    let user = await LocalCache.getKey('user');
    if (user && typeof user === 'string') {
      user = JSON.parse(user);
    }
    const data = await service.Community.create({
      text_content: textContent,
      avatar: user && user.avatar ? user.avatar : '',
      name: user && user.name ? user.name : '',
      media_content: [],
      tags: [],
      location: {
        lat: '',
        lng: '',
        name: '比基尼海滩·比奇堡'
      }
    });
    if (data) {
      navigation.goBack();
      if (route.params.onGoBack) {
        route.params.onGoBack();
      }
    }
  }

  setPublishBtnState() {
    const { navigation } = this.props;
  }

  async componentDidMount() {
    const { navigation } = this.props;
    let currentUser = await LocalCache.getKey('user');
    if (currentUser) {
      currentUser = JSON.parse(currentUser);
    }
    let title = currentUser && currentUser.name ? currentUser.name : '';
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerTitle: title,
      headerRightContainerStyle: styles.publishHeaderContainer,
      headerRight: () => [
        <Button
          onPress={() => {
            this.publish();
          }}
          style={styles.publishBtn}
          key="publish-btn"
        >
          <View style={styles.publishBtnContainer}>
            <Text style={styles.publishBtnText}>
              {i18n('PAGE.CommunityPublish.headerBtn.publish')}
            </Text>
          </View>
        </Button>
      ]
    });
  }

  onChangeText(text) {
    this.setState({ textContent: text });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.rowTextInputContainer}>
          <TextInput
            style={styles.textContentInputContainer}
            placeholder={i18n('PAGE.CommunityPublish.body.textPlaceholder')}
            onChangeText={this.onChangeText}
            multiline={true}
            textAlignVertical="top"
            textAlign="left"
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.rowMediaContainer}>
          <AntDesign
            name="plus"
            size={64}
            color="rgb(166, 166, 166)"
            style={styles.mediaBtn}
          />
        </View>
        <View style={styles.rowTagContainer}>
          <Text style={styles.addTagBtn}>
            {i18n('PAGE.CommunityPublish.body.addTag')}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderTopColor: 'rgb(203, 203, 203)',
    borderTopWidth: 1
  },
  publishHeaderContainer: {},
  publishBtn: {
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  publishBtnContainer: {
    backgroundColor: 'rgb(79, 150, 243)',
    padding: 6,
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  publishBtnText: {
    color: 'white',
    fontSize: 14
  },
  rowTextInputContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  rowMediaContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingLeft: 24,
    paddingRight: 24,
    marginTop: 12
  },
  textContentInputContainer: {
    width: screenWidth - 24,
    padding: 6,
    minHeight: 200,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    display: 'flex',
    flexDirection: 'column'
  },
  mediaBtn: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: 'rgb(242, 242, 242)'
  },
  rowTagContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingLeft: 18,
    paddingRight: 18,
    marginTop: 12
  },
  addTagBtn: {
    borderColor: 'rgb(180, 180, 180)',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 100,
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 3,
    paddingBottom: 3,
    color: 'rgb(180, 180, 180)'
  }
});
