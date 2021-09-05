import React from 'react';
import { StyleSheet, FlatList, Dimensions } from 'react-native';
import {
  View,
  TextField,
  Text,
  Button,
  Colors,
  Image
} from 'react-native-ui-lib';
import { Video, Audio } from 'expo-av';
import Util from '../../../../../util';
import { i18n } from '../../../../../i18n';

const screenWidth = Dimensions.get('window').width;

export default class FollowPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('did mout');
  }

  render() {
    const { data } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={(row) => {
            const item = row.item;
            return (
              <View key={`${item.id}-${item.index}`} style={styles.row}>
                <View>
                  {item.avatar ? (
                    <Image
                      source={{ uri: item.avatar }}
                      style={styles.avatar}
                    ></Image>
                  ) : null}
                </View>
                <View style={styles.right}>
                  <View style={styles.header}>
                    {item.name ? (
                      <Text style={styles.name}>{item.name}</Text>
                    ) : null}
                    {item.created_at ? (
                      <Text style={styles.time}>
                        {Util.time.timeFormatter(item.created_at)}
                      </Text>
                    ) : null}
                  </View>
                  <View style={styles.middle}>
                    {item.text_content ? (
                      <Text style={styles.text_content}>
                        {item.text_content}
                      </Text>
                    ) : null}
                    {item.media_content ? (
                      <View style={styles.media_container}>
                        {item.media_content.map((v, index) => {
                          let stylesItem = {};
                          if (index % 3 !== 0) {
                            stylesItem.marginLeft = 4;
                          }
                          if (index >= 3) {
                            stylesItem.marginTop = 4;
                          }
                          if (v.type === 'IMAGE') {
                            stylesItem = Object.assign(
                              {},
                              stylesItem,
                              styles.item_image
                            );
                            return (
                              <Image
                                key={`${v.id}-${index}`}
                                style={stylesItem}
                                source={{ uri: v.image_url }}
                              ></Image>
                            );
                          } else if (v.type === 'VIDEO') {
                            stylesItem = Object.assign(
                              {},
                              stylesItem,
                              styles.item_video
                            );
                            return (
                              <Video
                                key={`${v.id}-${index}`}
                                style={stylesItem}
                                source={{
                                  uri: v.video_url
                                }}
                                resizeMode="cover"
                                isLooping
                                isMuted
                                shouldPlay
                              />
                            );
                          } else if (v.type === 'IMAGE_AUDIO') {
                            stylesItem = Object.assign(
                              {},
                              stylesItem,
                              styles.item_image_audio
                            );
                            return (
                              <View
                                style={styles.image_audio_container}
                                key={index}
                              >
                                <Image
                                  key={`${v.id}-${index}`}
                                  style={stylesItem}
                                  source={{ uri: v.image_url }}
                                ></Image>
                                <View style={styles.audio_container}>
                                  <View style={styles.audio_left_container}>
                                    <Image
                                      key={`${v.id}-${index}-mic`}
                                      style={styles.audio_icon}
                                      source={{
                                        uri: 'https://musiinc-1258669417.cos.ap-shanghai.myqcloud.com/assets/microphone-black-shape.png'
                                      }}
                                    ></Image>
                                  </View>
                                  <View style={styles.audio_right_container}>
                                    <Text
                                      key={`${v.id}-${index}-duration`}
                                      style={styles.audio_label}
                                    >{`${v.audio_duration}${
                                      v.audio_duration > 1
                                        ? i18n(
                                            'PAGE.Community.item.imageAudioUnits'
                                          )
                                        : i18n(
                                            'PAGE.Community.item.imageAudioUnit'
                                          )
                                    }`}</Text>
                                  </View>
                                </View>
                              </View>
                            );
                          }
                          return null;
                        })}
                      </View>
                    ) : null}
                    {item.share_content ? (
                      <View style={styles.share_container}>
                        <Image
                          source={{
                            uri: item.share_content.image
                          }}
                          style={styles.share_image}
                        ></Image>
                        <Text style={styles.share_desc}>
                          {item.share_content.desc}
                        </Text>
                      </View>
                    ) : null}
                    {item.tags ? (
                      <View style={styles.tag_container}>
                        {item.tags.map((v, index) => {
                          let stylesItem = {};
                          if (index % 3 !== 0) {
                            stylesItem.marginLeft = 4;
                          }
                          if (index >= 3) {
                            stylesItem.marginTop = 4;
                          }
                          stylesItem = Object.assign(
                            {},
                            stylesItem,
                            styles.tag
                          );
                          return (
                            <Text style={stylesItem} key={`${v}-${index}`}>
                              {v}
                            </Text>
                          );
                        })}
                      </View>
                    ) : null}
                    {item.location ? (
                      <View style={styles.location_container}>
                        <Image
                          source={{
                            uri: 'https://musiinc-1258669417.cos.ap-shanghai.myqcloud.com/assets/pin.png'
                          }}
                          style={styles.location_icon}
                        ></Image>
                        <Text style={styles.location_label}>
                          {item.location.name}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.footer}>
                    <View style={styles.footer_left}>
                      <Image
                        source={{
                          uri: 'https://musiinc-1258669417.cos.ap-shanghai.myqcloud.com/assets/share.png'
                        }}
                        style={styles.share_icon}
                      ></Image>
                    </View>
                    <View style={styles.footer_right}>
                      <View style={styles.footer_item}>
                        <Image
                          source={{
                            uri: 'https://musiinc-1258669417.cos.ap-shanghai.myqcloud.com/assets/chat%20(1).png'
                          }}
                          style={styles.comment_icon}
                        ></Image>
                        <Text style={styles.comment_label}>
                          {item.comment_number
                            ? Util.number.numberFormatter(item.comment_number)
                            : 0}
                        </Text>
                      </View>
                      <View
                        style={Object.assign({}, styles.footer_item, {
                          marginLeft: 12
                        })}
                      >
                        <Image
                          source={{
                            uri: 'https://musiinc-1258669417.cos.ap-shanghai.myqcloud.com/assets/heart.png'
                          }}
                          style={styles.like_icon}
                        ></Image>
                        <Text style={styles.like_label}>
                          {item.like_number
                            ? Util.number.numberFormatter(item.like_number)
                            : 0}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
        />
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
    display: 'flex',
    flexDirection: 'column',
    marginTop: 8
  },
  row: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    padding: 16,
    borderTopColor: 'rgb(242, 243, 245)',
    borderTopWidth: 1
  },
  right: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: screenWidth - 48 - 32 - 12,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 12
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 8
  },
  header: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'column',
    height: 48,
    paddingTop: 4,
    paddingBottom: 4
  },
  name: {
    color: 'rgb(81, 145, 188)',
    fontWeight: 'bold',
    fontSize: 14
  },
  time: {
    color: '#79889b',
    fontSize: 10
  },
  middle: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  text_content: {
    width: '100%',
    flexWrap: 'wrap'
  },
  item_image: {
    width: (screenWidth - 48 - 32 - 12 - 8) / 3,
    height: (screenWidth - 48 - 32 - 12 - 8) / 3
  },
  item_video: {
    width: (screenWidth - 48 - 32 - 12 - 8) / 3,
    height: (screenWidth - 48 - 32 - 12 - 8) / 3
  },
  item_image_audio: {
    width: (screenWidth - 48 - 32 - 12 - 8) * 0.7,
    height: (screenWidth - 48 - 32 - 12 - 8) * 0.7,
    zIndex: 1,
    position: 'relative'
  },
  image_audio_container: {
    position: 'relative',
    zIndex: 1
  },
  audio_container: {
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
    backgroundColor: 'rgba(242, 242, 242, 0.6)',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    padding: 6
  },
  audio_icon: {
    width: 16,
    height: 16
  },
  audio_label: {
    fontSize: 12,
    color: 'rgb(81, 145, 188)'
  },
  media_container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
    position: 'relative'
  },
  share_container: {
    backgroundColor: 'rgb(242, 242, 242)',
    padding: 4,
    alignItems: 'center',
    justifyContent: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  share_image: {
    width: 48,
    height: 48
  },
  share_desc: {
    flexWrap: 'wrap',
    marginLeft: 4,
    width: screenWidth - 48 - 32 - 12 - 48 - 8 - 4
  },
  tag_container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4
  },
  tag: {
    color: '#3c99d8',
    fontSize: 10,
    fontWeight: 'bold',
    backgroundColor: 'rgb(242, 242, 242)',
    padding: 4,
    borderRadius: 50
  },
  location_container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4
  },
  location_icon: {
    width: 16,
    height: 16
  },
  location_label: {
    color: '#3c99d8',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4
  },
  footer: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginTop: 12
  },
  footer_left: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    display: 'flex',
    flexDirection: 'row'
  },
  footer_right: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    display: 'flex',
    flexDirection: 'row'
  },
  share_icon: {
    width: 16,
    height: 16
  },
  comment_icon: {
    width: 16,
    height: 16
  },
  like_icon: {
    width: 16,
    height: 16
  },
  like_label: {
    color: 'rgb(127, 127, 127)',
    fontSize: 10,
    marginLeft: 4,
    lineHeight: 16
  },
  comment_label: {
    color: 'rgb(127, 127, 127)',
    fontSize: 10,
    marginLeft: 4,
    lineHeight: 16
  },
  footer_item: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    display: 'flex',
    flexDirection: 'row'
  }
});
