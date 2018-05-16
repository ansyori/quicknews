import React, { Component  }  from 'react';
import { StyleSheet,  View, AsyncStorage  } from 'react-native'; 
import {Text} from 'native-base' // 2.3.3
import TabNavigator from 'react-native-tab-navigator'; // 0.3.4
import Icon from 'react-native-vector-icons/FontAwesome' // 4.4.2
import {Dimensions} from 'react-native'


import MyProfileTab from './magento/MyProfileTab';
import CategoriesTab from './magento/CategoriesTab';
import HomeTab from './magento/HomeTab';
import MyCartTab from './magento/MyCartScreen';
import { MyGlobalState } from './magento/MyGlobalState.js';



MyGlobalState.main_color = AsyncStorage.getItem('customer_id');
MyGlobalState.login_flag = false;
MyGlobalState.loading_cart = true;
MyGlobalState.loading_product = false;
MyGlobalState.reload_cart = false;
MyGlobalState.cust_id = 0;
MyGlobalState.cart_id = 0;
MyGlobalState.active_pid = 0;
MyGlobalState.magento_url = 'http://magereact.strangled.net';



const deviceW = Dimensions.get('window').width
const basePx = 375


function px2dp(px) {
  return px *  deviceW / basePx
}

class TabHome extends Component {
	
  render() {
    return (
     <HomeTab myparam='prop' />
    )
  }
}
class TabKategori extends Component {
  render() {
    return (
     <CategoriesTab />
    )
  }
}
class TabProfile extends Component {
  render() {
    return (
     <MyProfileTab />
    )
  }
}
/* class MyCart extends Component {
	constructor(props)
	{
		super(props)
	}
  render() {
    return (
      <MyCartTab myparam={props.ansyoristate} updateparam={props.ubahparam} />
    )
  }
} */

const MyCart = (propsz) => {
	 
   return (
      <MyCartTab myparam='ah aning' updateparam={propsz.ubahparam} />
    );
}




export default class App extends React.Component {
	
	constructor(props)
	{
		super(props)
	}
	
		state= {
			selectedTab: 'tabhome',
			ansyoriParam : 'isiansyoriparam pertamax',
			iscartloading : true
 
		}
  
	
	updateAnsyoriParam = (value) => {
      this.setState({ ansyoriParam: value })
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
  
 
   componentDidMount(){
	   
	    console.log('MyGlobalState.magento_url : '+MyGlobalState.magento_url);
		MyGlobalState.login_flag = false;
		
		AsyncStorage.getItem('customer_id',function(errs,result){
			if (!errs) {
				if (result !== null) {
					MyGlobalState.cust_id = result;
					
					if(result>0)
					{
						MyGlobalState.login_flag = true;
					}
					
				}
			}
		});
		
		AsyncStorage.getItem('cart_id',function(errs,result){
			if (!errs) {
				if (result !== null) {
					MyGlobalState.cart_id = result;
					
					if(result>0)
					{
						MyGlobalState.login_flag = true;
					}else{
						this.setGuestCart.bind(this);
					}
					
				}
			}
		});
		
		
	  
   }
  
  render() {
    return <TabNavigator style={styles.container}>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'tabhome'}
          title="Home"
          selectedTitleStyle={{color: "#3496f0"}}
          renderIcon={() => <Icon name="home" size={px2dp(22)} color="#666"/>}
          renderSelectedIcon={() => <Icon name="home" size={px2dp(22)} color="#3496f0"/>}
          //badgeText="1"
          onPress={() => this.setState({selectedTab: 'tabhome'})}>
          <TabHome/>
        </TabNavigator.Item>
		
		<TabNavigator.Item
          selected={this.state.selectedTab === 'tabkategori'}
          title="Categories"
          selectedTitleStyle={{color: "#3496f0"}}
          renderIcon={() => <Icon name="th" size={px2dp(22)} color="#666"/>}
          renderSelectedIcon={() => <Icon name="th" size={px2dp(22)} color="#3496f0"/>}
          onPress={() => this.setState({selectedTab: 'tabkategori'})}>
          <TabKategori/>
        </TabNavigator.Item>
		
		<TabNavigator.Item
          selected={this.state.selectedTab === 'mycart'}
          title="My Cart"
          selectedTitleStyle={{color: "#3496f0"}}
          renderIcon={() => <Icon name="shopping-cart" size={px2dp(22)} color="#666"/>}
          renderSelectedIcon={() => <Icon name="shopping-cart" size={px2dp(22)} color="#3496f0"/>}
          onPress={() => this.setState({selectedTab: 'mycart'})}>
          <MyCart iscartloading={this.state.iscartloading} ubahparam={this.updateAnsyoriParam} />
        </TabNavigator.Item>
		
        <TabNavigator.Item
          selected={this.state.selectedTab === 'tabprofile'}
          title="My Account"
          selectedTitleStyle={{color: "#3496f0"}}
          renderIcon={() => <Icon name="user" size={px2dp(22)} color="#666"/>}
          renderSelectedIcon={() => <Icon name="user" size={px2dp(22)} color="#3496f0"/>}
          onPress={() => this.setState({selectedTab: 'tabprofile'})}>
          <TabProfile/>
        </TabNavigator.Item>		
      </TabNavigator>;
  }
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
