import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  RefreshControl,
  ScrollView,
  Alert,
  ActivityIndicator,
  AsyncStorage,
  ListView,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { MyGlobalState } from '../magento/MyGlobalState.js';
import LoadingScreen from '../magento/LoadingScreen.js';


import { Container, Content, Button, Text,    Icon, Body, Header, Left,Right, Title, H1, H2, H3 } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";

var {height, width} = Dimensions.get('window');
console.log(height, width);


class CartScreen extends React.Component {
  static navigationOptions = {
    title: 'Shopping Cart',
  }; 
  
  
	
	constructor(props){
		super(props)
		 //AsyncStorage.getItem('customer_id').then((value)=> this.setState({ cust_id: value }));
		 
		 
		 this.state = {
			'cart_id' : '',
			'customer_id' : '',
			'isLoading' : true,
			'test' : 'init',
			'cust_id':'',
			'refreshing' : false,
			'haseumparam' : this.props.myparam,
			'grand_total' : '',
			'subtotal' : '',
			'discount' : '',
			
			
			
		};
		
		//AsyncStorage.getItem('cart_id').then((value)=> this.setState({ cart_id: value }));
		// MyGlobalState.cid = `${this.state.cart_id}`;
		// MyGlobalState.test = 'anyiing haseum siah';
			 
	}
	
	setCID = (value) => {
      AsyncStorage.setItem('customer_id', value);
	  
	  console.log('Set Customer id on AsyncStorage : '+value);
	  
      this.setState({ 'customer_id': value });
   }
   
   setLoading = (value) =>{
	   this.setState({ 'isLoading': value });
   }
   
   setCartData = () =>{
	   
	    var value = MyGlobalState.cart_id;
	   
	    console.log('setCartData Running, value : '+value);
	   if(value){
		   
	   
	   
		  
		   this.setState({ cart_id: value });
		   
		   console.log(MyGlobalState.magento_url+'/react/index/cart?quote_id='+value);
		  
					   fetch(MyGlobalState.magento_url+'/react/index/cart?quote_id='+value)
					  .then((response) => response.json())
					  .then((responseJson) => {
						  
						 console.log('Response Cart data : '+JSON.stringify(responseJson));
						
						
						if(responseJson.item_count)
						{
							 let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
							  this.setState({
							  isLoading: false,
							  refreshing : false,
							  grand_total : responseJson.grandtotal,
							  subtotal : responseJson.subtotal,
							  discount : responseJson.discount,
							  
							  dataSource: ds.cloneWithRows(responseJson.items),
							});   
							
							MyGlobalState.loading_cart = false;
							MyGlobalState.reload_cart = false;
							
							if(!MyGlobalState.loading_cart)
							{
								this.setLoading(false);
							}
						}else{
							Alert.alert('Shopping cart empty');
						}
						
						
						
						
					  })
					  .catch((error) => {

						console.error(error);
					  });
		}else{
			Alert.alert('You have to login');
			
			this.setState({
						  isLoading: false,
						  refreshing : false,
						 
			});   
			
			
		}
	   
   };
   
    
	/* shouldComponentUpdate()
	{
		console.log('cart screen shouldComponentUpdate() run');
		console.log('cart screen shouldComponentUpdate() MyGlobalState.reload_cart run'+MyGlobalState.reload_cart);
		console.log('cart screen shouldComponentUpdate() MyGlobalState.loading_cart '+MyGlobalState.loading_cart);
		
		
		if(MyGlobalState.reload_cart || MyGlobalState.loading_cart)
		{
			
			MyGlobalState.reload_cart = false;
			MyGlobalState.loading_cart = false;
			this.setCartData();
			
			
		}
		
	} */
	
	/* componentDidUpdate()
	{
		console.log('cart screen componentDidUpdate() run');
		
		if(MyGlobalState.loading_cart && MyGlobalState.cart_id)
		{
			
			
			this.setCartData();
			
			MyGlobalState.loading_cart = false;
			
			
		}
	} */
	
	componentDidMount() {
		
		console.log('this.props.user.name = '+this.props.isloadingprop);
		
		
		
		var cust_id_tmp = '';
		var cart_id_tmp = '';
		
		AsyncStorage.getItem('customer_id',function(errs,result){
			if (!errs) {
				if (result !== null) {
					//this.setState({customer_id:result});
					
					cust_id_tmp = result;
					console.log('customer_id result : '+result);
					
				}
			}
		}).then((value)=> this.setState({ cust_id: cust_id_tmp }));;
		
		console.log('cust_id_tmp : '+cust_id_tmp);
		
		//if(cust_id_tmp)
		//{
			AsyncStorage.getItem('cart_id',function(errs,result){
			if (!errs) {
				if (result !== null) {
					//this.setState({customer_id:result});
		
					cart_id_tmp = result;
					console.log('cart_id : '+result);

				}
			}
			}).then((value)=> this.setCartData(value) );
		
		
		
	}
	
	
	
	_onRefresh() {
    this.setState({refreshing: true});
    /* fetchData().then(() => {
      this.setState({refreshing: false});
    }); */
	
	this.setCartData();
  }
	
   
	
  
  render() {
   	const { navigate } = this.props.navigation;
	const {state} = this.props.navigation;
	const { screenProps } = this.props
	if(MyGlobalState.loading_cart)
	{
		//this.setCartData.bind(this);
		return <LoadingScreen loading={MyGlobalState.loading_cart} /> ;
				
	}else{
		
		//onRefresh={this._onRefresh.bind(this)}
    return (
      
		  
		 
		  
		   <ListView 
		   
		   refreshControl={
			  <RefreshControl
				refreshing={this.state.refreshing}
				
				onRefresh={()=>this._onRefresh()}
			  />
			}
			
			
		   
		   renderHeader={()=>
		   
		   <View style={{flex: 3, flexDirection: 'row'}}>
		
			<Text style={styles.rowGrid}>Product Name</Text>
			<Text style={styles.rowGridSmall}>Qty</Text>
			<Text style={styles.rowGridSmall}>Total Price</Text>
		  </View>
		   }
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
		  
		  <View style={{flex: 3, flexDirection: 'row'}}>
			<Text style={styles.rowGrid}>{rowData.name}</Text>
			<Text style={styles.rowGridSmall}>{rowData.qty}</Text>
			<Text style={styles.rowGridSmall}>{rowData.row_total}</Text>
		  </View>
		  
		 
		  }
		  
		  
		  renderFooter={() =>  
		  
		 
		  
	    <Container>

         <Content style={{padding:10}}>
		 
		 <View style={{flex: 3, flexDirection: 'row'}}>
			<Text style={styles.rowGrid}><H1>Grand Total : </H1></Text>
			<Text style={styles.rowGrid}><H1>{this.state.grand_total}</H1></Text>
		  </View>
      
          <Button block onPress={() => navigate('Checkout')} >
            <Text>Checkout</Text>
          </Button>
          
        </Content>
      </Container>
		  
		  }
        />
		  
      
	
    );
	}
  }
}

class COScreen extends React.Component {
  static navigationOptions = {
    title: 'Checkout',
  }; 
  
  render() {
	  const { navigate } = this.props.navigation;
    return (
      <Container>
        <Content>
         <Text>Checkout Here</Text>
        </Content>
      </Container>
	  
    );
  }
}

 const MainCart = StackNavigator({
  Cart: { screen: CartScreen },
   Checkout: { screen: COScreen }

});

 

export default class ReactNative_RefreshControl extends Component {
	
	constructor(props)
	{
		super(props)
	}
	
	render(){
		console.log('ReactNative_RefreshControl this.props.myparam : '+this.props.myparam);
		
		const myscreenprops = {
			
			 user: {
				name: 'John Doe',
				username: 'johndoe123',
				email: 'john@doe.com',
			  },
			  
			 isloadingprop :this.props.iscartloading
		}
		
		return <MainCart screenProps={myscreenprops} />;
	}
	

}

function getWidthPercent(percent)
{
	return (percent / 100) * width;
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
   },
   rowGrid :{
	   padding: 10,
	   width : getWidthPercent(50)
   },
   
   rowGridSmall :{
	   padding: 5,
	   width : getWidthPercent(25)
   }
})
