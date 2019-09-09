import * as React from 'react';
import { Text, Picker, KeyboardAvoidingView, View, Button, StyleSheet, FlatList, TouchableWithoutFeedback, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
// import { Icon } from 'react-native-vector-icons';
import { Constants } from 'expo';

import firebase from 'firebase';
import config from './db';
import styles from './styles/Styles';

export default class ListaEmprestimo extends React.Component {

  constructor(props){
    super(props);
    this.state = { usuarios : [], emprestimos : [], clienteSelecionado : ''}
  }

  componentDidMount(){

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

  selecionaCliente(itemValue, itemIndex) {
    console.log(itemValue);
    this.setState({ clienteSelecionado : itemValue});

    // buscando os pedidos do cliente selecionado
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }  
    firebase.database().ref('emprestimos')
    .orderByChild('idUsuarios')
    .equalTo(itemValue)
    .on('value', (snapshot)=> {
        var aEmprestimos = [];
        snapshot.forEach( (child) => {
          aEmprestimos.push ({
            dados : child.val(),
            chave : child.key
          });
        });
        this.setState({emprestimos : []});
        this.setState({emprestimos : aEmprestimos});

        console.log('X: ' + this.state.emprestimos.length);
        if(this.state.emprestimos.length === 0 )
          Alert.alert('Nenhum Emprestimo encontrado!');
    });
  }

  render() {

   const usuarios = this.state.usuarios;
   const emprestimos = this.state.emprestimos;

    return (
       <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
      <View style={styles.container2}>
            <Text style={styles.header}>Lista de Empréstimos</Text>
        <Picker
          selectedValue={this.state.clienteSelecionado}
          style={{ height: 50, width: 200 }}
          onValueChange = {this.selecionaCliente.bind(this)}
          >
            {usuarios.map( (item) => 
              (<Picker.Item label={item.dados.nome} value={item.chave}/>
            ))
            }
        </Picker>
        
        <FlatList
          data = {emprestimos}
          keyExtractor = { item => item.dados.id} 
          renderItem = {
            ({item}) =>
            <TouchableWithoutFeedback >
            <View style={styles.items}>
              <Text style={styles.titulo}>{item.dados.data}</Text>
            <Text>{item.dados.quantidade}-{item.dados.situacao}</Text>  
            </View>
            </TouchableWithoutFeedback>
          }
        />
        <TouchableOpacity style={styles.btn}>
              <Button 
                onPress={() => this.props.navigation.navigate('NovoEmprestimo', {'clienteSel' : this.state.clienteSelecionado})}
                style={styles.bt} title="Solicitar Empréstimo">
              </Button>
            </TouchableOpacity>
        
      </View>
      </KeyboardAvoidingView>
    );
  }
}