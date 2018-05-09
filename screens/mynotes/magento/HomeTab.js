import React, { Component  }  from 'react';
 
import { Content,Container, Header, Item, Input, Icon as IconNB, Text, Card, CardItem,  Button, Left,  Body, Thumbnail  } from 'native-base';
import {  Alert, StyleSheet, View, Image,  ListView, ActivityIndicator, TouchableOpacity, AsyncStorage, Dimensions, FlatList } from 'react-native';

 // 2.3.3
import Slideshow from 'react-native-slideshow';
import { StackNavigator } from 'react-navigation';
import LoadingScreen from '../magento/LoadingScreen.js';
import { MyGlobalState } from '../magento/MyGlobalState.js';
import ProdDetail from '../magento/ProductDetailScreen.js';

MyGlobalState.home = 'from home tab';

const { width, height } = Dimensions.get('window');

const equalWidth =  (width / 3 ) - 2;


class HomeScreen extends Component {
   static navigationOptions = {
    title: 'Mage-React App'
  }; 
  
   state = {
      'show_screen_search': '0',
	  'search_text':'',
	  'isLoading' : true,
	   moviesList: []
	  
	  
   }
   
  
  
 _onChangeText()
 {
	 Alert.alert('test text has been changed to '+this.state.search_text);
 }
 
  _setStext = (value) =>
 {
	 this.state.search_text = value;
 }
 
  _keyExtractor = (item, index) => item.title;

  renderRowItem = (itemData) => {
	  
	  const { navigate } = this.props.navigation;
    return (
	
	  
      <View style={{flex:1,alignItems:'center',justifyContent:'center',  width : equalWidth, height:200}}>
        <TouchableOpacity 
		 onPress={() =>
          navigate('ProdDetail', { name: `${itemData.item.name}`, pid:`${itemData.item.product_id}` })
        }> 
		<Image style={{ height: equalWidth,  width : equalWidth}} source={{ uri: itemData.item.url }} resizeMode='cover' />
		<Text>{itemData.item.title}</Text>
		</TouchableOpacity>
      </View>
    )
  }
  
  componentDidUpdate()
  {
	  
	  this.state.cart_id = MyGlobalState.cart_id;
	 console.log('there is an update'); 
  }
 
 componentDidMount() {
	  
	  {this.getMoviesFromApiAsync()}
	 
	  AsyncStorage.getItem('customer_id').then((value)=> this.setState({ cust_id: value }));
	  AsyncStorage.getItem('cart_id').then((value)=> this.setState({ cart_id: value }));
	  
	 
    return fetch(MyGlobalState.magento_url+'/react/index/random')
      .then((response) => response.json())
      .then((responseJson) => {
		  //console.log('json random : '+JSON.stringify(responseJson));
		if(responseJson){
			this.setState({
			  isLoading: false,
			  no_result: false,
			  dataSource: responseJson,
			});
			
			
		
			
		}else{
			this.setState({no_result: true,
							isLoading: false,
							dataSource: [
											{ url:'http://placeimg.com/640/480/3', title: 'Product A',    caption: 'Lorem ipsum lorem ipsum' },
											{ url:'http://placeimg.com/640/480/1', title: 'title 2',    caption: 'Lorem ipsum lorem ipsum' },
											{ url:'http://placeimg.com/640/480/4', title: 'title 3',    caption: 'Lorem ipsum lorem ipsum' }
										]
			});
			
			Alert.alert('Failed to get content from server');
		}
        
		
		
      })
      .catch((error) => {

        console.error(error);
      });
  }
 
 
 getMoviesFromApiAsync = () => {
    return fetch(MyGlobalState.magento_url+'/react/index/random?grid=1')
      .then((response) => response.json())
      .then((responseJson) => {
       // alert(JSON.stringify(responseJson))
        this.setState({ moviesList: responseJson }) // this will update state to re-render ui
        return responseJson;
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
        <Header searchBar rounded>
		
		  <Item>
            <IconNB name="ios-search" />
            <Input placeholder="Search" onEndEditing={() => navigate('Search', {name: `${this.state.search_text}`, begin:'1'})}
				onChangeText={(text) => this._setStext(text)}
			/>
           
          </Item>
  
        </Header>
        <Content>
		   <Slideshow dataSource={this.state.dataSource} />
		   
		   <Text>MyGlobalState CID : {MyGlobalState.cust_id}</Text>
		   <Text>MyGlobalState CART ID : {MyGlobalState.cart_id}</Text>
		   
		   <FlatList
          data={this.state.moviesList}
          numColumns={3}
          renderItem={this.renderRowItem}
        />
		   
        </Content>
       
      </Container>
    );
  }
}

class SearchScreen extends Component {
 
  
  static navigationOptions = ({ navigation }) => ({
    title: `Search :  ${navigation.state.params.name}`,
  });
  
  state = {
	  
	  'isLoading' : true,
	  'searching_flag' : '',
	  'no_result':false
	  
  }
  
  
   
   componentDidMount() {
    return fetch(MyGlobalState.magento_url+'/react/index/search?q='+`${this.props.navigation.state.params.name}`)
      .then((response) => response.json())
      .then((responseJson) => {
		  console.log('json search : '+JSON.stringify(responseJson.data));
		if(responseJson.data.count){
			let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
			this.setState({
			  isLoading: false,
			  no_result: false,
			  dataSource: ds.cloneWithRows(responseJson.data),
			}, function() {
			  // do something with new state

			});
		}else{
			this.setState({no_result: true});
		}
        
		
		
      })
      .catch((error) => {

        console.error(error);
      });
  }
  
  
  
  
  
  render() {
	  
	const { navigate } = this.props.navigation;
	const {state} = this.props.navigation;
	
	if(this.state.no_result)
	{
		return(
			<View style = {styles.container}>
           <Text>Your search returns no results.</Text>
			</View>
		);
	}
	
	if(this.state.isLoading)
	{
		return <LoadingScreen loading={this.state.isLoading} /> ;
		
	}else{
		
		return (

		   <Container>
			
			<Content>
			  <ListView 
			  dataSource={this.state.dataSource}
			  renderRow={(rowData) =>
			  
			  <TouchableOpacity 
			 onPress={() =>
			  navigate('ProdDetail', { name: `${rowData.name}`,myvar:'wahhh keren',pid:`${rowData.product_id}` })
			}> 
			  <Card>
				<CardItem>
				  <Left>
					<Body>
					  <Text>{rowData.name}</Text>
					  <Text note>{rowData.price}</Text>
					</Body>
				  </Left>
				</CardItem>
				<CardItem cardBody>
				  <Image source={{uri: rowData.image_url}} style={{height: 200, width: null, flex: 1}}/>
				</CardItem>	
				<CardItem />				
			  </Card>
			  </TouchableOpacity>}
			/>
			
			</Content>
		  </Container>
		);
	}
  }
}


class ProdDetailScreen extends Component {
	
  constructor(props)
  {
	  super(props);
  }
  render() {
	console.log('Render product detail from search pid : '+this.props.navigation.state.params.pid);
	MyGlobalState.active_pid = this.props.navigation.state.params.pid;
    return (
     <ProdDetail />
    );
  }
}

const MainHome = StackNavigator({
  Home: { screen: HomeScreen },
  Search: { screen: SearchScreen },
  ProdDetail : {screen: ProdDetailScreen}
});



export default class App extends Component {
  static navigationOptions = {
    title: 'This search screen'
  };
  render() {
    return <MainHome />;
  }
}
 
const styles = StyleSheet.create ({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 70
   },
   activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   }
})

