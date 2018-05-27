import React, { Component  }  from 'react';

import { Alert,StyleSheet, Text, View, Image, WebView, TouchableHighlight, TouchableOpacity,ListView, ActivityIndicator,RefreshControl  } from 'react-native'; 
import { createStackNavigator, createDrawerNavigator } from "react-navigation";

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
//import Categories from './screens/Categories';
import Categories from './screens/CategoryTab';

import Pinned from './screens/Pinned';
import { Config } from './screens/Config';

Config.api_ulr_sample = 'https://newsapi.org/v2/top-headlines?country=id&apiKey=bcdfef41b6694d2c830112b65c5d3519';


class TabHome extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
    
            <Button transparent onPress={() => this.props.navigation.toggleDrawer()}>
              <NBIcon name='menu' />
            </Button>

     
          </Left>
          <Body>
            <Title>Latest News</Title>
          </Body>
          <Right>
          
            <Button transparent>
              <NBIcon name='search' />
            </Button>
          </Right>
        </Header>
        <Content>

          <Text>Hahay</Text>

        </Content>
      </Container>
    )
  }
}

class TabProfile extends Component {
  render() {
    return (
       <View><Text>Kategori News</Text></View>
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


class DetailsScreen extends React.Component {
  
   static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.name,
  });
  
  render() {
    return (
     <WebView
        source={{uri: `${this.props.navigation.state.params.sourceUrl}`}}
        style={{marginTop: 5}}
      />
    );
  }
}


class HomeScreen extends React.Component {
  
   static navigationOptions = {
    title: 'Latest News',
  } ;
  
   constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    refreshing: false
    }
  }
  //https://newsapi.org/v2/everything?domains=wsj.com&apiKey=bcdfef41b6694d2c830112b65c5d3519
  componentDidMount() {
    return fetch(Config.api_ulr_sample)
      .then((response) => response.json())
      .then((responseJson) => {
         let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson["articles"]),
        }, function() {
          // do something with new state
        });  
    console.log('parsing json');
    console.log(responseJson["articles"]);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  reloadNews = () =>{
     
    return fetch(Config.api_ulr_sample)
      .then((response) => response.json())
      .then((responseJson) => {
         let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson["articles"]),
        }, function() {
          // do something with new state
      
      this.setState({'refreshing': false});
        });  
    console.log('parsing json');
    console.log(responseJson["articles"]);
      })
      .catch((error) => {
        console.error(error);
      });
     
   };
  
  _onRefresh() {
  
  //Alert.alert('lagi refersh, hadeeeehhh');
    
    this.setState({'refreshing': true});
  //this.setState({'isLoading': true});
  
    /* fetchData().then(() => {
      this.setState({refreshing: false});
    }); */
  
  this.reloadNews();
  }
  
  render() {
  const { navigate } = this.props.navigation;

  
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (

    <Container>
        <Header>
          <Left>
    
            <Button transparent onPress={() => this.props.navigation.toggleDrawer()}>
              <NBIcon name='menu' />
            </Button>

     
          </Left>
          <Body>
            <Title>Latest News</Title>
          </Body>
          <Right>
          
            <Button transparent>
              <NBIcon name='search' />
            </Button>
          </Right>
        </Header>

        <Content>

          <ListView 
      
       refreshControl={
        <RefreshControl
        refreshing={this.state.refreshing}        
        onRefresh={this._onRefresh.bind(this)}
        />
      }
      
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
      
      <TouchableOpacity     
     onPress={() =>
          navigate('Details', { name: `${rowData.title}`,myvar:'wahhh keren',catid:`${rowData.title}`,sourceUrl:`${rowData.url}` })
        }
    > 
    
    {rowData.urlToImage ?

       
      <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: rowData.urlToImage}} />
                <Body>
                  <Text>{rowData.source.name} : {rowData.author}</Text>
                  <Text note>{rowData.title}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
       
              <Image source={{uri: rowData.urlToImage }} style={{height: 100, width: null, flex: 1}}/>
       
            </CardItem>
            <CardItem>

              <Body>
               <Text note>{rowData.description}</Text>
              </Body>
             
            </CardItem>
          </Card>
       
       
       : null}
      </TouchableOpacity>}
        />

        </Content>
        </Container>
    
    );
  }
  
}



const MyApp = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
  },
  Notifications: {
    screen: TabAku,
  },
  Details: {
    screen: TabAku,
  },

});


const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
  }
);


export default class App extends React.Component {
   render(){
       return (
      <MyApp />
    )
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
