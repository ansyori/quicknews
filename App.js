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
import Categories from './screens/Categories';
import Pinned from './screens/Pinned';



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
      <Categories />
    )
  }
}

class TabAku extends Component {
  render() {
    return (
      <Pinned />
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
    backgroundColor: '#ffffff',
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
