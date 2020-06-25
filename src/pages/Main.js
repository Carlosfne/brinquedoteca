import React, { useState, useEffect } from 'react';
import { 
  View, 
  KeyboardAvoidingView, 
  Image,
  TextInput, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  Animated,
  Keyboard,
  ToastAndroid
 } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { onSignIn } from "../service/auth";

import api from '../service/api';

export default function Main({navigation}) {
const [ offset] = useState(new Animated.ValueXY({x: 0, y:80}))
const [ opacity] = useState(new Animated.Value(0));
const [ logo] = useState(new Animated.ValueXY({x:360, y:255}))

const [ email , setEmail ] = useState('');
const [ senha , setSenha ] = useState('');


useEffect(()=>{
  keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
  keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);


  Animated.parallel([
    Animated.spring(offset.y, {
      toValue: 0,
      speed: 4,
      bounciness:30
    }),
    Animated.timing(opacity, {
      toValue:1,
      duration:500,
    })

  ]).start();
},[])

function keyboardDidShow(){
  Animated.parallel([
    Animated.timing(logo.x,{
      toValue:155,
      duration:200
    }),
    Animated.timing(logo.y,{
      toValue:165,
      duration:200
    }),

  ])
}
function keyboardDidHide(){
  Animated.parallel([
    Animated.timing(logo.x,{
      toValue:230,
      duration:200
    }),
    Animated.timing(logo.y,{
      toValue:255,
      duration:200
    }),

  ])
}
async function Login(){
  console.log(email)
  console.log(senha)
  var data = {
    acesso:'entregador',
    email: email,
    senha:senha
  }
  await api.post('/api/v1/Acesso',data)
  .then(response => {
    console.log(response.data)
    navigation.navigate('Home')
    ToastAndroid.show(`Login efetuado com sucesso! Seja bem vindo ${response.data.nome}!`, ToastAndroid.SHORT)
  })
  .catch(error=> {
    console.log(error.response.data.mensagem)
    ToastAndroid.show(`${error.response.data.mensagem}`, ToastAndroid.SHORT)
  })
}
  return (
    // <LinearGradient
    //   colors={['#ed529b', '#f78b72', '#fdb258']}   
    //   style={{
    //     position: 'absolute',
    //     left: 0,
    //     right: 0,
    //     top: 0,
    //     height: '100%',
    //     width: '100%'

    //   }}    
    // >
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Animated.Image 
          source={require('../../assets/logo.png')}
          style={{
            width:logo.x,
            height:logo.y
          }}
        />
      </View>

      <Animated.View 
      style={[
        styles.container,
        {
          opacity:opacity,
          transform: [
            { translateY: offset.y }
          ]
        }
      ]}
      >
        <TextInput
        style={styles.input}
        placeholder="Informe seu email"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
        />

        <TextInput
        style={styles.input}
        placeholder="Informe sua senha"
        value={senha}
        autoCorrect={false}
        onChangeText={setSenha}
        secureTextEntry={true}
        />

        <TouchableOpacity 
          style={styles.btnSubmit}
          onPress={() =>{
            // Login().then(()=> navigation.navigate('Home'))
            Login()

          }}
        >
          <Text style={styles.btnSubmitTxt}> Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btnCadastro}
          onPress={() =>{
            navigation.navigate('Cadastro')
          }}
        >
          <Text style={styles.registerTxt}> Criar conta gratuita</Text>
        </TouchableOpacity>

      </Animated.View>

    </KeyboardAvoidingView>
    // </LinearGradient>
  )
}

const styles = StyleSheet.create({
  background:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#000'
  },
  imgLogin:{
    width:250,
    height:250
  },
  containerLogo:{
    flex:1,
    justifyContent:'center'
  },
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    width:'90%',
    paddingBottom:50,
    // backgroundColor:'#fff',
    // borderRadius:12
  },
  input:{
    backgroundColor:'#fff',
    width:'90%',
    height:60,
    marginBottom:15,
    color:'orange',
    fontSize:18,
    fontWeight:'bold',
    borderRadius:7,
    padding:10,
    textAlign:'center'
  },
  btnSubmit:{
    backgroundColor:'orange',
    width:'90%',
    height:45,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:7

  },
  btnSubmitTxt:{
    color:'#fff',
    fontSize:18
  },
  btnCadastro:{
    width: '90%',
    height: 45,
    // backgroundColor: '#fff',
    padding: 10,
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  registerTxt:{
    color:'#000'
  }
})