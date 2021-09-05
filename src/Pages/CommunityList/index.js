import React from 'react';
import {
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableHighlight,
  Animated
} from 'react-native';
import { TextField, Text, Button, Colors, View } from 'react-native-ui-lib';
import { Ionicons, Feather } from '@expo/vector-icons';
import ScrollableTabView, {
  ScrollableTabBar
} from 'react-native-scrollable-tab-view';
import FollowPage from './Children/Follow';
import SelectedPage from './Children/Selected';
import MatesPage from './Children/Mates';
import LocalPage from './Children/Local';
import { i18n } from '../../../i18n';
import service from '../../../service';

const PAGES = ['FOLLOW', 'SELECTED', 'MATES', 'LOCAL'];

class CommunityListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      tabLabelSize: [
        new Animated.Value(18),
        new Animated.Value(14),
        new Animated.Value(14),
        new Animated.Value(14)
      ],
      data: [],
      tabIndex: 0
    };
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.renderTab = this.renderTab.bind(this);
    this.init = this.init.bind(this);
  }

  handleChangeTab({ i, ref, from }) {
    if (i !== from) {
      this.setState({ tabIndex: i }, () => {
        Animated.timing(this.state.tabLabelSize[i], {
          useNativeDriver: false,
          toValue: 18,
          duration: 300
        }).start(({ finished }) => {});
        Animated.timing(this.state.tabLabelSize[from], {
          toValue: 14,
          useNativeDriver: false,
          duration: 300
        }).start(({ finished }) => {});
        this.init();
      });
    }
  }

  componentDidMount() {
    this.init();
  }

  async init() {
    const { tabIndex } = this.state;
    const data = await service.Community.get({
      page: 1,
      paegSize: 10,
      type: PAGES[tabIndex]
    });
    if (data) {
      this.setState({ data });
    }
  }

  renderTab(name, page, isTabActive, onPressHandler, onLayoutHandler) {
    const { tabLabelSize } = this.state;
    return (
      <TouchableHighlight
        key={`${name}_${page}`}
        onPress={() => {
          onPressHandler(page);
        }}
        onLayout={onLayoutHandler}
        underlayColor="transparent"
        style={styles.tabItem}
      >
        <Animated.Text
          style={[
            styles.tabItemLabel,
            {
              fontSize: tabLabelSize[page]
            }
          ]}
        >
          {name}
        </Animated.Text>
      </TouchableHighlight>
    );
  }

  render() {
    const { searchValue, data } = this.state;
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.searchInputContainer}>
            <View style={styles.searchInputLeftContainer}>
              <Ionicons name="search" size={20} color="gray" />
              <TextInput
                style={styles.searchInput}
                value={searchValue}
                placeholder={i18n('PAGE.Community.header.searchPlaceHolder')}
                onChangeText={(v) => {
                  this.setState({ searchValue: v });
                }}
              />
            </View>
            <Ionicons name="mic" size={20} color="gray" />
          </View>
          <Feather
            name="edit"
            size={20}
            color="black"
            style={styles.edit}
            onPress={() => {
              navigation.navigate('Publish', {
                onGoBack: () => {
                  this.init();
                }
              });
            }}
          />
        </View>
        <ScrollableTabView
          style={styles.tabView}
          initialPage={0}
          renderTabBar={() => (
            <ScrollableTabBar
              style={styles.tabItemContainer}
              renderTab={this.renderTab}
            />
          )}
          onChangeTab={this.handleChangeTab}
        >
          <FollowPage
            key={'follow'}
            tabLabel={i18n('PAGE.Community.innerTab.follow')}
            data={data}
          />
          <SelectedPage
            key={'selected'}
            tabLabel={i18n('PAGE.Community.innerTab.selected')}
          />
          <MatesPage
            key={'mates'}
            tabLabel={i18n('PAGE.Community.innerTab.mates')}
          />
          <LocalPage
            key={'local'}
            tabLabel={i18n('PAGE.Community.innerTab.local')}
          />
        </ScrollableTabView>
      </SafeAreaView>
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
    flexDirection: 'column'
  },
  edit: {
    minWidth: 40,
    paddingLeft: 10,
    paddingRight: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    lineHeight: 40
  },
  tabView: {
    width: '100%',
    marginTop: 10
  },
  tabItemContainer: {
    height: 36,
    borderWidth: 0
  },
  tabItem: { height: '100%' },
  tabItemLabel: { fontSize: 14 },
  topContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40
  },
  searchInput: {
    fontSize: 16,
    lineHeight: 20,
    marginLeft: 12,
    marginRight: 12
  },
  searchInputLeftContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(242, 242, 242)',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 50,
    flex: 1,
    justifyContent: 'space-between'
  }
});

export default CommunityListPage;
