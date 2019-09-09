import * as React from 'react';

import { Text, View, Button, StyleSheet, FlatList, TouchableWithoutFeedback,ScrollView, TouchableOpacity } from 'react-native';
import { Icon,  SearchBar } from 'react-native-elements';
// import { Icon } from 'react-native-vector-icons';
import { Constants } from 'expo';

import firebase from 'firebase';
import config from './db';
import styles from './styles/Styles';

export default class ListaLivros extends React.Component {

  constructor(props){
    super(props);
    this.state = { livros : []}  
  }
  
  componentDidMount(){

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    } 

    firebase.database().ref('livros').on('value', (snapshot)=> {
        var aLivros = [];
        snapshot.forEach( (child) => {
          aLivros.push ({
            dados : child.val(),
            chave : child.key
          });
        });         
        this.setState({livros : aLivros});
    });

  }

  filtraLivros(text){
   
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    } 

    firebase.database().ref('livros').orderByChild('nome').startAt(text).on('value',    (snapshot)=> {
        var aLivros = [];
        snapshot.forEach( (child) => {
          aLivros.push ({
            dados : child.val(),
            chave : child.key
          });
        });         
        this.setState({livros : aLivros});
    });
  }

  render() {

   const LivrosDisponiveis = this.state.livros;

    return (
      <ScrollView  style={styles.container}>
        <Text style={styles.titulo}>Livros Disponiveis</Text>
        <View>
        <SearchBar
          onChangeText={this.filtraLivros.bind(this)}
          //onClear={someMethod}
          placeholder='Digite sua pesquisa' /></View>

        <FlatList
          data = {LivrosDisponiveis}
          keyExtractor = { item => item.dados.id} 
          renderItem = {
            ({item}) =>
            <TouchableWithoutFeedback >
            <View style={styles.items}>
              <Text>{item.dados.nome}</Text>
  
            </View>
            </TouchableWithoutFeedback>
          }
        />

      </ScrollView>
    );
  }
}