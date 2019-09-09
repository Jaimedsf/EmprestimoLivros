import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({ 

  /* Estilos de CadastroEmprestimo.js , ListaLivros.js , ListaUsuario */

    container : {
      flex : 0,
      // flexDirection : 'row',
      backgroundColor : '#00ffff',
      alignItems: 'center',
      justifyContent: 'center'
    }, 
    items: {
        flex: 1,
        margin : 5,
        padding : 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor : '#ffff00'
    },
    titulo : {
      fontSize : 32
    },
    botao : {
       borderWidth:1,
           borderColor:'rgba(0,0,0,0.2)',
           alignItems:'center',
           justifyContent:'center',
           width:70,
           position: 'absolute',
           bottom: 10,
           right: 10,
           height:70,
           backgroundColor:'#fff',
           borderRadius:100,
    },
    
    /* Estilos de CadastroUsuario.js , ListaEmprestimos , Login */

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
  
  export default styles;
