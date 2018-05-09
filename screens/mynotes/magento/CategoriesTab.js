import React, { Component } from 'react';
import {   View, Image,  ListView, ActivityIndicator, TouchableOpacity  } from 'react-native'; 
import { Container, Card, CardItem,  Content,  Button, Left,  Body,  Text, Thumbnail} from 'native-base';
import { StackNavigator } from 'react-navigation';
import ProdDetail from '../magento/ProductDetailScreen.js';
import { MyGlobalState } from './MyGlobalState.js';



class CatListScreen extends React.Component {
  static navigationOptions = {
    title: 'Categories',
  };

  /* parse data here start */
  
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

	componentDidMount() {
    return fetch(MyGlobalState.magento_url+'/react/index/cat')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.data),
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /* ----------------------- */

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
          navigate('ProdList', { name: `${rowData.name}`,myvar:'wahhh keren',catid:`${rowData.category_id}` })
        }
		> 
		  <CardItem>
		      <Left>
              <Thumbnail large  size={200} source={{ uri: rowData.category_image }} />
              </Left>
              <Left>
			     <Button full info>
                <Text style={{fontSize:20}}>{rowData.name}</Text>
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
}

class ProdListScreen extends React.Component {
	
	
	/* parse data here start */
  
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
	
	console.log('URL from constu HIT HAHA http://magereact.strangled.net/react/index/productlist?catid='+`${this.props.navigation.state.params.catid}`);
  }
  
	
	
	componentDidMount() {
    return fetch(MyGlobalState.magento_url+'/react/index/productlist?catid='+`${this.props.navigation.state.params.catid}`)
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
  
  /* ----------------------- */
  
  static navigationOptions = ({navigation}) => ({
    title: 'Products '+navigation.state.params.name,
  });
 
  
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


class ProdDetailScreen extends Component {
	
  constructor(props)
  {
	  super(props);
  }
  render() {
	MyGlobalState.active_pid = this.props.navigation.state.params.pid;
    return (
     <ProdDetail />
    );
  }
}



const KategoriApp = StackNavigator({
  CatList: {screen: CatListScreen},
  ProdList: {screen: ProdListScreen},
  ProdDetail: {screen: ProdDetailScreen},
  
});

export default class App extends Component {
  render() {
    return (
      <KategoriApp />
    );
  }
}

