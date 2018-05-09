import React, { Component } from 'react';
import {   View, Image,  ListView, ActivityIndicator, TouchableOpacity, Alert, AsyncStorage  } from 'react-native'; 
import { Container, Card, CardItem,  Content,  Button, Left,  Body,  Text, Thumbnail} from 'native-base';
import { StackNavigator } from 'react-navigation';
import { MyGlobalState } from './MyGlobalState.js';
import LoadingScreen from '../magento/LoadingScreen.js';




export default class ProdDetail extends Component {
   
	/* parse data here start */
  
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }
  
  setGuestCart()
   {
	   fetch(MyGlobalState.magento_url+'/react/index/guesscart')
      .then((response) => response.json())
      .then((responseJson) => {
		  
		console.log('Response get guess cart id: '+JSON.stringify(responseJson));
		  
		MyGlobalState.cart_id = responseJson.cart_id;
		
		AsyncStorage.setItem('cart_id', responseJson.cart_id);
		
      })
      .catch((error) => {
		 
        console.error(error);
      });
   }
	
	componentDidMount() {
		
	if(!MyGlobalState.cart_id)
	{
		console.log('Cart id not found');
		this.setGuestCart();
	}	

	
     return fetch(MyGlobalState.magento_url+'/react/index/product?pid='+MyGlobalState.active_pid)
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.data),
        }, function() {
         
		
        });
		
		
      })
      .catch((error) => {
		 
        console.error(error);
      });
  }
  
  
  addToCart()
  {
	  MyGlobalState.loading_product = true;
	  var quote_id = MyGlobalState.cart_id;
	  var cust_id = MyGlobalState.cust_id;
	  
	  this.setState({isLoading: true});
	  console.log(MyGlobalState.magento_url+'/react/index/addtocart?customer_id='+cust_id+'&quote_id='+quote_id+'&qty=1&pid='+MyGlobalState.active_pid);
	  fetch(MyGlobalState.magento_url+'/react/index/addtocart?customer_id='+cust_id+'&quote_id='+quote_id+'&qty=1&pid='+MyGlobalState.active_pid)
      .then((response) => response.json())
      .then((responseJson) => {
		  
		console.log('Response add to cart : '+JSON.stringify(responseJson));
		  
		this.setState({isLoading: false});
		Alert.alert(responseJson.message);
		//MyGlobalState.reload_cart = true;
		//MyGlobalState.loading_cart = true;
		
      })
      .catch((error) => {
		 
        console.error(error);
      });
  }
  
  /* ----------------------- */
  
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.name,
  });
 
  
  render() {

    if (this.state.isLoading) {
      return <LoadingScreen loading={this.state.isLoading} /> ;
    }

    return (
          <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
		  
	  <Container>
        
        <Content>
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
            <CardItem>
              <Text>{rowData.desc}</Text>
            </CardItem>
			
			
          </Card>
		  
			  <Button full warning onPress={this.addToCart.bind(this)}> 
				<Text>Add To Cart</Text>
			  </Button>
        </Content>
      </Container>
		
		  
		  }
        />
	  
    );
  }
}

