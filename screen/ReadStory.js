import React from 'react';
import { Text, View,ScrollView,TouchableOpacity,StyleSheet,FlatList} from 'react-native';
import {SearchBar,Header} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import {SafeAreaProvider} from 'react-native-safe-area-context';


export default class Searchscreen extends React.Component {
    constructor(){
      super()
      this.state={
          allStories:[],
          dataStories:"",
          search:"",
          lastStory:null
                 
      }
    }
    retrieveStories = async(text)=>{
      const query = await db.collection("Story").where("Author","==",text).limit(10).get()
      query.docs.map((doc)=>{
        this.setState({
          allStories:[...this.state.allStories,doc.data()],
          lastStory:doc
        })
      })
    }
    moreStories = async()=>{
        var text = this.state.search
        const query = await db.collection("Story").where("Author","==",text).startAfter(this.state.lastStory).limit(10).get()
        query.docs.map((doc)=>{
            this.setState({
                allStories:[...this.state.allStories,doc.data()],
                lastStory:doc
            })
        })
    }
    componentDidMount = async()=>{
        const query = await db.collection("Story").limit(10).get();
        query.docs.map((doc)=>{
          this.setState({
            allStories:[],
            lastStory:doc
          })
        })
      }
    render() {
      return (
        <View>
         <Header 
        backgroundColor={'pink'}
        centerComponent={{
          text:'Story Hub',
          style:{fontSize:25,color:'black'}
        }}/>
          <SearchBar 
          style={{fontSize:15}}
          placeholder={"Author Name"}
          onChangeText={(text)=>{this.setState({search:text})}}
          value={this.state.search}
          />
          <TouchableOpacity style={styles.touch}
          onPress={()=>{this.retrieveStories(this.state.search)}}><Text styles={styles.text}>OK</Text></TouchableOpacity>
          <FlatList
          data={this.state.allStories}
          renderItem={({item})=>(
            <View style={styles.view}>
              <Text style={styles.tex}>{"Author:" + item.Author} </Text>
              <Text style={styles.tex}>{"Title:" + item.StoryTitle} </Text>
              <Text style={styles.tex}>{"Story:" + item.Story} </Text>
            </View>
            )
          }
          keyExtractor={(item,index)=>{index.toString()}}
          onEndReached={this.moreStories}
          onEndReachedThreshold={0.7}      
          />
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    touch:{
      color:"red",
      backgroundColor:'red',
      width:50,
      height:50,
      marginLeft:10,
      marginTop:10,
      justifyContent:'center',
      alignItems:'center'
    },
    vis:{
      flexDirection:"row",
      marginTop:30
    },
    text:{
      justifyContent:'center',
      alignSelf:'center'
    },
    view:{
        borderWidth:1,
        marginTop:10,
        borderColor:'black'
    },
    tex:{
        fontSize:20
    }
  })