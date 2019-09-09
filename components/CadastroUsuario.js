import React from 'react';
import { View,
        ScrollView,
         Text,
         Alert,
         StyleSheet,
         TextInput,
         KeyboardAvoidingView,
         TouchableOpacity,
         AsyncStorage
         
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import firebase from 'firebase';
import config from './db';
import styles from './styles/Styles';


export default class CadastroUsuario extends React.Component {
  
  constructor(props){
      super(props);
      this.state = {
        usuarios : [],
        nome: '',
        idade: '',
        cidade: '',
        estado: '',
        username : '',
        senha : '',
      }
  }
  
 componentDidMount(){

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }  
    firebase.database().ref('usuarios').on('value', (snapshot)=> {
        var aCadastro = [];
        snapshot.forEach( (child) => {
          aCadastro.push ({
            dados : child.val(),
            chave : child.key
          });
        });
        this.setState({usuarios : aCadastro});
    });

  }

  cadastrar(){
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    let usuario = {
      idCliente : this.state.usuarios,
      nome: this.state.nome,
      idade: this.state.idade,
      cidade: this.state.cidade,
      estado: this.state.estado,
      username: this.state.username,
      senha: this.state.senha
    };

    firebase.database().ref('usuarios').push(usuario)
    Alert.alert('Cadastro Realizado Com Sucesso');
    //this.props.navigation.goBack();
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
        <ScrollView style={styles.container2}>
            <Text style={styles.header}>Cadastro de Usuário</Text>
            <Text>Nome:</Text>
            <TextInput 
              style={styles.textInput} 
              maxLength = "100"
              placeholder='Nome' 
              onChangeText={ (nome) => this.setState ({nome}) }
              underlineColorAndroid='transparent'
            />
            <Text>Idade:</Text>
            <TextInput 
              style={styles.textInput} 
              keyboardType='numeric'
              maxLength = "2"
              placeholder='Idade' 
              onChangeText={ (idade) => this.setState ({idade}) }
              underlineColorAndroid='transparent'
            />
            <Text>Cidade:</Text>
            <TextInput
              maxLength = "50"
              style={styles.textInput} 
              placeholder='Cidade' 
              onChangeText={ (cidade) => this.setState ({cidade}) }
              underlineColorAndroid='transparent'
            />
            <Text>Estado:</Text>
            <TextInput 
              maxLength = "30"
              style={styles.textInput} 
              placeholder='Estado' 
              onChangeText={ (estado) => this.setState ({estado}) }
              underlineColorAndroid='transparent'
            />
            <Text>Email:</Text>
            <TextInput 
              maxLength = "100"
              style={styles.textInput} 
              placeholder='Exemplo@exemplo.com' 
              onChangeText={ (username) => this.setState ({username}) }
              underlineColorAndroid='transparent'
            />
            <Text>Senha:</Text>
            <TextInput 
              maxLength = "8"
              style={styles.textInput} 
              placeholder='xxxxxxxx' 
              onChangeText={ (senha) => this.setState ({senha}) }
              underlineColorAndroid='transparent'
            />

            <TouchableOpacity style={styles.btn} 
              onPress={this.cadastrar.bind(this)}>
              <Text style={styles.bt}>Confirmar</Text>
            </TouchableOpacity>
          
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({ 
wrapper: {
  flex: 1,
},
container2 : {
  flex : 1,
  justifyContent: 'center',
  backgroundColor : '#2896d3',
  paddingLeft: 40,
  paddingRight: 40,
  
},
header:{
  fontSize: 24,
  marginBottom: 60,
  color: '#fff',
  fontWeight : 'bold',
  textAlign: 'center',
},
textInput : {
  alingSelf: 'stretch',
  padding : 16,
  marginBottom : 20,
  backgroundColor : '#fff', 
  borderRadius: 10
},
btn : {
  alingSelf: 'stretch',
  padding : 20,
  backgroundColor : '#01c853',
  alingItems: 'center',
  margin: 10,
  borderRadius: 10,
  
},
bt : {
  textAlign: 'center',
},

});  
