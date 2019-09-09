import React from 'react';
import { View,
         Text,
         StyleSheet,
         TextInput,
         KeyboardAvoidingView,
         TouchableOpacity,
         AsyncStorage,
         Button
         
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import firebase from 'firebase';
import styles from './styles/Styles';

var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  };

export default class Login extends React.Component {
  
  constructor(props){
      super(props);
      this.state = {
        username : '',
        senha : '',
      }
  }
  
  componentDidMount (){
    this._loadInitialState().done();
  }
  
  _loadInitialState = async() =>{
    
    var value = await AsyncStorage.getItem('user');
    if ( value !== null){
      this.props.navigation.navigate('Profile');
    
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
        <View style={styles.container2}>
            <Text style={styles.header}>Login</Text>
            <TextInput style={styles.textInput} 
              placeholder='Usuario' 
              onChangeText={ (username) => this.setState ({username}) }
              underlineColorAndroid='transparent'
            />
            <TextInput style={styles.textInput} 
              placeholder='Senha' 
              onChangeText={ (senha) => this.setState ({senha}) }
              underlineColorAndroid='transparent'
            />
            <TouchableOpacity style={styles.btn} 
              onPress={this.login}>
              <Text style={styles.bt}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn}>
              <Button 
                onPress={this.cadastro}
                style={styles.bt} title="Cadastro">
              </Button>
            </TouchableOpacity>
            
        </View>
      </KeyboardAvoidingView>
    );
  }
  cadastro = () =>{
    this.props.navigation.navigate('Cadastrar');
  }

  login = () => {
      alert(this.state.username);
   
      fetch('http://192.168..:3000/users', {
          method: 'Post',
          headers:{
              'Accept': 'aplication/json',
              'Content-Type' : 'aplication/json',
          },
          body: JSON.stringify({
              username: this.state.username,
              senha: this.state.senha,
          })
             
      })
      .then((response) => response.json())
      .then((res) => {
        
          if(res.sucess === true){
              AsyncStorage.setItem('user',res.user);
              this.props.navigation.navigate('Profile');
          }
          else{
              alert(res.message);
          }
        
      })
      .done();
  }
  
}