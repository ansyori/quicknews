import React, { Component  }  from 'react';
import { StyleSheet, Text, View, Image, WebView  } from 'react-native'; 

import { Container, Header, Title, Content, Button,  Card, CardItem,  Body, Left, Right, Thumbnail, Icon as NBIcon } from "native-base";


import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/FontAwesome'
import {Dimensions} from 'react-native'

const deviceW = Dimensions.get('window').width

const basePx = 375

function px2dp(px) {
  return px *  deviceW / basePx
}

import LatestNews from './screens/LatestNews';

class TabHome extends Component {
  render() {
    return (
      <LatestNews />
    )
  }
}

class TabProfile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Profile
        </Text>
      </View>
    )
  }
}

class TabAku extends Component {
  render() {
    return (
      <View style={styles.container}>
         <Image
          source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/cat.gif' }}
          style={{ height: 140, width: 200 }}
        />
      </View>
    )
  }
}


export default class App extends React.Component {
	
	 static navigationOptions = {
    title: 'Home',
  };
	
	state= {
    selectedTab: 'tabhome'
  };
  render() {
    return <TabNavigator style={styles.container} headerTitle ="Latest News">
        <TabNavigator.Item
          selected={this.state.selectedTab === 'tabhome'}
          title="Latest News"
          selectedTitleStyle={{color: "#0678db"}}
          renderIcon={() => <Icon name="newspaper-o" size={px2dp(22)} color="#666"/>}
          renderSelectedIcon={() => <Icon name="newspaper-o" size={px2dp(22)} color="#0678db"/>}
          onPress={() => this.setState({selectedTab: 'tabhome'})}>
		  
		  
		  
          <TabHome/>
        </TabNavigator.Item>
		
        <TabNavigator.Item
          selected={this.state.selectedTab === 'tabprofile'}
          title="Categories"
          selectedTitleStyle={{color: "#0678db"}}
          renderIcon={() => <Icon name="book" size={px2dp(22)} color="#666"/>}
          renderSelectedIcon={() => <Icon name="book" size={px2dp(22)} color="#0678db"/>}
          onPress={() => this.setState({selectedTab: 'tabprofile'})}>
          <TabProfile/>
        </TabNavigator.Item>
		
		<TabNavigator.Item
          selected={this.state.selectedTab === 'tabaku'}
          title="Pinned"
          selectedTitleStyle={{color: "#0678db"}}
          renderIcon={() => <Icon name="thumb-tack" size={px2dp(22)} color="#666"/>}
          renderSelectedIcon={() => <Icon name="thumb-tack" size={px2dp(22)} color="#0678db"/>}
          onPress={() => this.setState({selectedTab: 'tabaku'})}>
          <TabAku/>
        </TabNavigator.Item>
      </TabNavigator>;
  }
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a0c1f7',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
