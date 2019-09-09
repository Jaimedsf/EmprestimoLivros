import * as React from 'react';
import { Text, View,ScrollView, Button, StyleSheet, FlatList, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
// import { Icon } from 'react-native-vector-icons';
import { Constants } from 'expo';
import ListaEmprestimo from './ListaPedido';
import firebase from 'firebase';
import config from './db';
import styles from './styles/Styles';


export default class ListaUsuario extends React.Component {

  constructor(props){
    super(props);
    this.state = { usuarios : [], clienteSelecionado: ''}
  }

  componentDidMount(){
    this.buscaClientes();
  }

  buscaClientes() {
    console.log('Consultando ...');
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    } 

    firebase.database().ref('usuarios').on('value', (snapshot)=> {
        var aUsuarios = [];
        snapshot.forEach( (child) => {
          aUsuarios.push ({
            dados : child.val(),
            chave : child.key
          });
        });         
        this.setState({usuarios : aUsuarios});
    });
  }

  filtraClientes(text){

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    } 

    if(text.length > 0) {
      firebase.database().ref('usuarios')
      .orderByChild('nome')
      .equalTo(text)
      .on('value', (snapshot)=> {
          var aUsuarios = [];
          snapshot.forEach( (child) => {
            aUsuarios.push ({
              dados : child.val(),
              chave : child.key
            });
          });         
          this.setState({usuarios : aUsuarios});
      });
    }
    else {
      this.buscaClientes();
    }

    
  }

  render() {

   const usuarios = this.state.usuarios;

    return (
      <View  style={styles.container}>
      <ScrollView>
        <Text style={styles.titulo}>Usuarios</Text>
        <Button onPress={this.props.navigation.navigate('Emprestimo')} title = 'Realizar Emprestimo'>
        </Button>
        <SearchBar
          lightTheme
          ref={search => this.search = search}
          onChangeText={this.filtraClientes.bind(this)}
          placeholder='Type Here...' />

        <FlatList
          data = {usuarios}
          keyExtractor = { item => item.dados.id} 
          renderItem = {
            ({item}) =>
            <TouchableWithoutFeedback >
            <View style={styles.items}>
              <Text>{item.dados.nome}</Text>
            <Text>{item.dados.cidade}-{item.dados.estado}</Text>  
            </View>
            </TouchableWithoutFeedback>
          }
        />
          
        </ScrollView>
      </View>
    );
  }
}