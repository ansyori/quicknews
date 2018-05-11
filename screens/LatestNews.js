import React, { Component  }  from 'react';
import { StyleSheet, Text, View, Image, WebView, TouchableHighlight,ListView, ActivityIndicator  } from 'react-native'; 
import { Container, Header, Title, Content, Button,  Card, CardItem,  Body, Left, Right, Thumbnail, Icon as NBIcon } from "native-base";
import { createStackNavigator } from 'react-navigation';
import { Config } from './screens/Config.js';




class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
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
          dataSource: ds.cloneWithRows(responseJson.articles),
        }, function() {
          // do something with new state
        }); 
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
          navigate('Details', { name: `${rowData.name}`,myvar:'wahhh keren',catid:`${rowData.source.id}` })
        }
		> 
		  <CardItem>
		      <Left>
              <Thumbnail large  size={200} source={{ uri: rowData.urlToImage }} />
              </Left>
              <Left>
			     <Button full info>
                <Text style={{fontSize:20}}>{rowData.title}</Text>
				</Button>
              </Left>
             </CardItem>
		   
		  </TouchableOpacity>}
        />
		</Card>
        </Content>
      </Container>
    );
  }
	/*
  render() {
    return <Container>

        <Content>
		<TouchableHighlight onPress={() => this.props.navigation.navigate('Details')}>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'https://picsum.photos/200/300'}} />
                <Body>
                  <Text>Author Name</Text>
                  <Text note>Subtitle</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
			 
              <Image source={{uri: 'https://loremflickr.com/320/240'}} style={{height: 100, width: null, flex: 1}}/>
			 
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <NBIcon active name="thumbs-up" />
                  <Text>12 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <NBIcon active name="chatbubbles" />
                  <Text>4 Comments</Text>
                </Button>
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
		 </TouchableHighlight> 
		  
		  <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'https://picsum.photos/200/300'}} />
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>GeekyAnts</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: 'https://loremflickr.com/320/240'}} style={{height: 100, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <NBIcon active name="thumbs-up" />
                  <Text>12 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <NBIcon active name="chatbubbles" />
                  <Text>4 Comments</Text>
                </Button>
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
		  
		  <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'https://picsum.photos/200/300'}} />
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>GeekyAnts</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: 'https://loremflickr.com/320/240'}} style={{height: 100, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <NBIcon active name="thumbs-up" />
                  <Text>12 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <NBIcon active name="chatbubbles" />
                  <Text>4 Comments</Text>
                </Button>
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
		  
		  <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'https://picsum.photos/200/300'}} />
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>GeekyAnts</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: 'https://loremflickr.com/320/240'}} style={{height: 100, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <NBIcon active name="thumbs-up" />
                  <Text>12 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <NBIcon active name="chatbubbles" />
                  <Text>4 Comments</Text>
                </Button>
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
		  
		  <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'https://picsum.photos/200/300'}} />
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>GeekyAnts</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: 'https://loremflickr.com/320/240'}} style={{height: 100, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <NBIcon active name="thumbs-up" />
                  <Text>12 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <NBIcon active name="chatbubbles" />
                  <Text>4 Comments</Text>
                </Button>
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
		  
		  <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'https://picsum.photos/200/300'}} />
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>GeekyAnts</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: 'https://loremflickr.com/320/240'}} style={{height: 100, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <NBIcon active name="thumbs-up" />
                  <Text>12 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <NBIcon active name="chatbubbles" />
                  <Text>4 Comments</Text>
                </Button>
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
		  
        </Content>
      </Container>;
  } */
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

