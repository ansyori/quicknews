import React, { Component  }  from 'react';
import { StyleSheet, Text, View, Image, WebView, TouchableHighlight, TouchableOpacity,ListView, ActivityIndicator  } from 'react-native'; 
import { Container, Header, Title, Content, Button,  Card, CardItem,  Body, Left, Right, Thumbnail, Icon as NBIcon } from "native-base";
import { createStackNavigator } from 'react-navigation';
import { Config }  from './Config.js';




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
	}	;
  
   constructor(props) {
    super(props);
    this.state = {
      isLoading: true
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
       
        <Content>
          <Card>
          <ListView 
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
		</Card>
        </Content>
      </Container>
    );
  }
	
}


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
	
  
	
  render() {
    return <RootStack />;
  }
}

