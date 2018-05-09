import React, { Component } from 'react';
import { AsyncStorage,Alert, ActivityIndicator, View, StyleSheet, TouchableOpacity } from 'react-native'
import { StackNavigator } from 'react-navigation';
 // 1.0.0-beta.13

import { Card, CardItem,  Container,  Content, Button,  Right, Switch, Left, Icon, IconNB, Body, Text,  Item, Input, Form, CheckBox, List, ListItem } from 'native-base'
 // 2.3.3

import { MyGlobalState } from './MyGlobalState.js';
import LoadingScreen from '../magento/LoadingScreen.js';

class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: 'Register',
  };
  
  constructor(props){
    super(props)

    this.state = {
      username: '',
      password: '',
	  cpassword: '',	  
	  is_loading: false,
	  customer_id: '0',
	  loggedin:false,
	  firstname:'',
	  lastname:'',
	  email:'',
	  
	  
	  
    }
  }
  
  /* state = {
      'customer_id': '0',
	  'fist_name': '0',
	  'last_name': '0',
	  'email': '0',
	  'password': '0',	  
	  'is_loading' : false
	  
   }
   */
   setLoading = (value) =>{
	   this.setState({ 'is_loading': value });
   }
   
   validateEmail = (email) => {
	  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}
  
  sendPostData()
  {
	  if(this.state.firstname && this.state.lastname && this.state.email && this.state.password && this.state.cpassword)
	  {
		  
		  if(this.validateEmail(this.state.email)){
			  
			  if(this.state.password == this.state.cpassword)
			  {
				  this.setState({ 'is_loading': true });
			  fetch(MyGlobalState.magento_url+'/react/index/register', {
			  method: 'POST',
			  headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			  },
			  body: JSON.stringify({
				
				fist_name: this.state.firstname,
				last_name: this.state.lastname,
				email: this.state.email,
				password: this.state.password,
				
				
			  })
			}).then((response) => response.json())
			  .then((responseJson) => {
					console.log('SUCCESS RESPOND : '+JSON.stringify(responseJson));
					
					if(responseJson.data.status_flag)
					{
						AsyncStorage.setItem('customer_id', responseJson.data.customer_id);
						this.setState({ 'customer_id': responseJson.data.customer_id });
						
						//this.props.navigation('Login');
						
						Alert.alert('Register Success');
					}else
					{
						Alert.alert('Register Failed, Error : '+responseJson.data.error_message);
					}
					
					this.setLoading(false);
				
				  })
				  .catch((error) => {
					console.error('ERROR RESPOND : '+error);
				  });
			  }else{
				   Alert.alert('Password not same');
			  }
		  }else{
			  Alert.alert('Email not valid');
		  }
		  
		  
		  
	  }else
	  {
		  Alert.alert('Please input the form fields');
	  }

  }
  
  render() {

    const { navigate } = this.props.navigation;
	
	if(this.state.is_loading)
	{
		return <LoadingScreen loading={this.state.is_loading} />;
		
		
	}else{
    return (
		  <Container>		   
			<Content>
			  <Form>
				<Item>
				  <Input placeholder="First Name" onChangeText={(text) => this.setState({firstname:text})}  />
				</Item>
				<Item>
				  <Input placeholder="Last Name" onChangeText={(text) => this.setState({lastname:text})} />
				</Item>
				<Item>
				  <Input placeholder="Email Address" onChangeText={(text) => this.setState({email:text})} />
				</Item>

				<Item>
				  <Input placeholder="Password"  password={true} secureTextEntry={true} onChangeText={(text) => this.setState({password:text})}  />
				</Item>
				
				<Item>
				  <Input placeholder="Confirm Password"  password={true} secureTextEntry={true} onChangeText={(text) => this.setState({cpassword:text})}  />
				</Item>
				
				
			  </Form>
			  <Text />
			  <Button full onPress={() => this.sendPostData()}>
				<Text>Register</Text>
			  </Button>
			</Content>
		  </Container>
		  
		);
	}
  }
}

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };
  
 
  
  state = {
      'customer_id': '0',
	  'usernamedata': '',
	  'passworddata': '',
	  'is_loading' : false,
	  'customer_name':'',
	  'customer_email':'',
	  'customer_data':'',
	  'cart_id':'',
	  
	  
	  
   }
   
   
  
  constructor(props){
    super(props)

    this.state = {
      //username: '',
      //password: '',
	  isLoading: false,
	  customer_id: '0',
	  loggedin:false,
	
	 
	  
	  
    }
	
	
  }
  
  componentDidMount(){
	   
	   AsyncStorage.getItem('customer_id').then((value)=> this.setState({ customer_id: value }));
	   AsyncStorage.getItem('customer_name').then((value)=> this.setState({ customer_name: value }));
	   AsyncStorage.getItem('customer_email').then((value)=> this.setState({ customer_email: value }));
	   AsyncStorage.getItem('customer_data').then((value)=> this.setState({ customer_data: value }));
	   AsyncStorage.getItem('cart_id').then((value)=> this.setState({ cart_id: value }));
	   
	   AsyncStorage.getItem('usernamedata').then((value)=> this.setState({ usernamedata: value }));
	   AsyncStorage.getItem('passworddata').then((value)=> this.setState({ passworddata: value }));
	   
	   
	   
	  
   }
   
   setCID = (value) => {
      AsyncStorage.setItem('customer_id', value);
	  
	  console.log('Set Customer id on AsyncStorage : '+value);
	  
      this.setState({ 'customer_id': value });
   }
   
   setCName = (value) => {
      AsyncStorage.setItem('customer_name', value);
      this.setState({ 'customer_name': value });
   }
   
   setCEmail = (value) => {
      AsyncStorage.setItem('customer_email', value);
      this.setState({ 'customer_email': value });
   }
   
   setCData = (value) => {
      AsyncStorage.setItem('customer_data', value);
      this.setState({ 'customer_data': value });
   }
   
    setCartid = (value) => {
      AsyncStorage.setItem('cart_id', value);
      this.setState({ 'cart_id': value });
   }
   
   
   setStateData = (attribute,value) => {
      AsyncStorage.setItem(attribute, value);
      this.setState({ attribute: value });
   }
   
   setUsername = (value) =>{
	   
	  AsyncStorage.setItem('usernamedata', value);
      this.setState({ 'usernamedata': value });
	   
   }
   
   setPassword = (value) =>{
	   
	  AsyncStorage.setItem('passworddata', value);
      this.setState({ 'passworddata': value });
	   
   }
   
   setLoading = (value) =>{
	   this.setState({ 'is_loading': value });
   }
  
  kirimPostData()
  {
	  
	  if(this.state.usernamedata && this.state.passworddata){
		  
		  this.setLoading(true);
		  
	  fetch(MyGlobalState.magento_url+'/react/index/login', {
	  method: 'POST',
	  headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	  },
	  body: JSON.stringify({
		
		nama: this.state.usernamedata,
		katasandi: this.state.passworddata
		
	  })
	}).then((response) => response.json())
      .then((responseJson) => {
		console.log('SUCCESS RESPOND : '+JSON.stringify(responseJson));
		
		this.setLoading(false);
		
		if(responseJson.data.status_flag == 1)
		{
			this.setCID(responseJson.data.customer_id);
			
			this.setCName(responseJson.data.customer_name);
			this.setCEmail(responseJson.data.customer_email);
			this.setCartid(responseJson.data.cart_id);
			this.setCData(JSON.stringify(responseJson.data.customer_data));
			
			MyGlobalState.login_flag = true;
			MyGlobalState.reload_cart = true;
			MyGlobalState.loading_cart = false;
			
			MyGlobalState.cart_id = responseJson.data.cart_id;
			MyGlobalState.cust_id = responseJson.data.customer_id;
			
			
			console.log('login, refresh cart : '+MyGlobalState.loading_cart);
			
			
			
	  
		}else{
			Alert.alert('Login Failed, incorrect username or password');
		}
		
		  })
		  .catch((error) => {
			console.error('ERROR RESPOND : '+error);
		  });
	  }else{
		  
		  Alert.alert('Please insert username/email and password');
	  }
	  

  }
  
  doLogout(){
	  this.setState({ customer_id: '' });
	  AsyncStorage.setItem('customer_id', '');
	  
	  this.setState({ cart_id: '' });
	  AsyncStorage.setItem('cart_id', '');
	  
	  MyGlobalState.loading_cart = true;
			
	  console.log('logout, refresh cart : '+MyGlobalState.loading_cart);
	  
	  
  }
  
  logout(){
	  Alert.alert(
		  'Logout',
		  'Are you sure?',
		  [
			
			{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
			{text: 'OK', onPress: () => this.doLogout() }
		  ]
		)
	  
	 // navigate('Login', { name: 'Jane',myvar:'wahhh keren' });
	 
  }

  
  render() {
    const { navigate } = this.props.navigation;
	
	if(this.state.is_loading)
	{
		return(
			<View style = {styles.container}>
            <ActivityIndicator
               animating = {this.state.is_loading}
               color = '#bc2b78'
               size = "large"
              style = {styles.activityIndicator} />
			</View>
		);
		
	}else{
		if(this.state.customer_id)
	{
		
		/* set login flag */
		MyGlobalState.login_flag = true;
		
		
		return (
		
	<Container>
	   <Content>
		  <Card>
			 <CardItem>
				<Container>
				   <Content>
					  <List>
						 <ListItem icon>
							<Left>
							   <Icon name="person" />
							</Left>
							<Body>
							   <Text>Customer Id</Text>
							</Body>
							<Right>
							   <Text>{this.state.customer_id}</Text>
							</Right>
						 </ListItem>
						 
						 <ListItem icon>
							<Left>
							   <Icon name="person" />
							</Left>
							<Body>
							   <Text>Cart Id</Text>
							</Body>
							<Right>
							   <Text>{this.state.cart_id}</Text>
							</Right>
						 </ListItem>
						 
						 <ListItem icon>
							<Left>
							   <Icon name="person" />
							</Left>
							<Body>
							   <Text>Name</Text>
							</Body>
							<Right>
							   <Text>{this.state.customer_name}</Text>
							   
							</Right>
						 </ListItem>
						 <ListItem icon>
							<Left>
							   <Icon name="person" />
							</Left>
							<Body>
							   <Text>Email</Text>
							</Body>
							<Right>
							    <Text>{this.state.customer_email}</Text>
							  
							</Right>
						 </ListItem>
						 <ListItem icon>
							<Left>
							   <TouchableOpacity onPress={this.logout.bind(this)}>
							   <Icon name="settings" />
							   </TouchableOpacity>
							</Left>
							<Body>
							<TouchableOpacity onPress={this.logout.bind(this)}>
							   <Text>Logout</Text>
							</TouchableOpacity>
							</Body>
							<Right>
							   <TouchableOpacity onPress={this.logout.bind(this)}>
							   <Icon name="arrow-forward" />
							   </TouchableOpacity>
							</Right>
						 </ListItem>
						 
						 <ListItem>
							<Text>{this.state.customer_data}</Text>
						 </ListItem>
					  </List>
				   </Content>
				</Container>
			 </CardItem>
		  </Card>
	   </Content>
	</Container>
		);
	}else{
		
		/* set not login flag */
		MyGlobalState.login_flag = false;
		
		return (
		  <Container>
		   
			<Content>
			  <Form>
				<Item>
				  <Input placeholder="Username or Email" 
					defaultValue={this.state.usernamedata}
					onChangeText={(text) => this.setUsername(text)} 
				  />
				</Item>
				<Item last>
				  <Input placeholder="Password"  password={true} secureTextEntry={true}  
					onChangeText={(text) => this.setPassword(text)}
					
					defaultValue={this.state.passworddata}
				  />
				</Item>
			  </Form>
			  <Text />
			  <Button full  onPress={() => this.kirimPostData()}>
				<Text>Login</Text>
			  </Button>
			  
			   <Text />
			  <Button block info onPress={() =>
					navigate('Register', { name: 'Jane',myvar:'wahhh keren' })
			  }>
				<Text>Register</Text>
			  </Button>
			  
			 
			</Content>
		  </Container>
		  
		);
		}
	}
	
	
    
  }
}

class MyAccountScreen extends React.Component {
  static navigationOptions = {
    title: 'MyAccount',
  }; 
  
  render() {
	  const { navigate } = this.props.navigation;
    return (
      <Container>
        <Content>
         <Text>Hore my account</Text>
		 
		 <Button block info onPress={() =>
				navigate('Login', { name: 'Jane',myvar:'wahhh keren' })
          }>
            <Text>Logout</Text>
          </Button>
        </Content>
      </Container>
	  
    );
  }
}

const MyProfileApp = StackNavigator({
  Login: {screen: LoginScreen},
  Register: {screen: RegisterScreen},
  MyAccount: {screen: MyAccountScreen},  
});

export default class App extends Component {
  render() {
    return (
      <MyProfileApp />
    );
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
