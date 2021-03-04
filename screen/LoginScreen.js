import React from 'react';
import { Text, View,ScrollView,TouchableOpacity,StyleSheet,FlatList, TextInput} from 'react-native';
import {SearchBar,Header} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default class LoginScreen extends React.Component{
    constructor(){
        super()
        this.state={
            email:'',
            password:''
        }
    }
    SignIN = async(email,password)=>{
        if(email,password){
            try{
                const response = await firebase.auth().signInWithEmailAndPassword(email,password)
                if(response){
                  this.props.navigation.navigate('Write')
                }
            } catch(error){
                switch(error.code){
                  case 'auth/user-not-found':Alert.alert("User dosen't exist")
                  break;
                  case 'auth/invalid-email':Alert.alert("Incorrect Email or Password")
                  break;
                  default:break;
                }
            }
        }else {
              Alert.alert("Enter Email and Password");
            }    
        
    }
    
    render() {
        return (
          <View>
           <Header 
            backgroundColor={'pink'}
            centerComponent={{
            text:'Login',
            style:{fontSize:25,color:'black'}
            }}/>
            <TextInput 
            styles={[styles.input,{marginTop:60}]}
            onChangeText={(text)=>{this.setState({email:text})}}
            placeholder={"Enter email here"}
            keyboardType={'email-address'}/>
            
            <TextInput 
            styles={[styles.input,{marginTop:60}]}
            onChangeText={(text)=>{this.setState({password:text})}}
            placeholder={"Enter password here"}
            secureTextEntry={true}/>

            <TouchableOpacity
            style={styles.button}
            onPress={()=>{this.SignIN(this.state.email,this.state.password)}}><Text>Submit</Text></TouchableOpacity>

          </View>
        );
      }
}

const styles = StyleSheet.create({
    input:{
        width:200,
        height:20,
        borderColor:'black',
        color:'black',
        alignContent:'center',
        justifyContent:'center',
        alignSelf:'center',
        alignItems:'center',
        borderWidth:1.5
    },
    button:{
        marginTop:15,
        alignSelf:'center',
        width:70,
        height:30,
        backgroundColor:'red',
        color:'green'
      }
})