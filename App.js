import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { ActivityIndicator, ImageBackground,  SafeAreaView, StyleSheet,Text,  TextInput, View } from 'react-native';

export default function App() {
  const[inputText,setTextInput]=useState('')
  const[dataSet,setDataSet]=useState(null)
  const[loading,setLoading]=useState(false)
  const api={
    baseUrl:'https://api.openweathermap.org/data/2.5/',
    key:'44c2cb02a68b0c6fd185c12325658e1a'
  }
  const fetchDataHandler = useCallback(() => {
    setLoading(true)
    setTextInput('');
  
    axios({
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?q=${inputText}&units=metric&appid=${api.key}`
    })
      .then(response => {
        // Handle successful response
        console.log(response.data);
        setDataSet(response.data)
        setLoading(false)
      })
      .catch(error => {
        // Handle error
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Server responded with an error:', error.response.data);
          console.error('Status code:', error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received from the server');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error during request setup:', error.message);
        }
      });
  }, [inputText, api.key]);
  
  return (
    <SafeAreaView style={styles.container}>
     <ImageBackground  source={require('./assets/bg.jpg')} resizeMode='cover' style={styles.image}>
     <View>
      <TextInput 
        style={styles.textInput}
        value={inputText}
        onChangeText={text=>setTextInput(text)}
        placeholder='Enter the City Name and Press Return'
        placeholderTextColor={'#000'}
        onSubmitEditing={fetchDataHandler}

        />
 
     </View>
     {loading && (
          <View>

            <ActivityIndicator size={'large'} color={'#fff'}/>
          </View>
        )}
        {dataSet !== null &&(
          <View style={styles.infoView}>
            <Text style={styles.cityCountryText}>{`${dataSet?.name},${dataSet?.sys?.country}`}</Text>
            <Text style={styles.dateText}>{new Date().toLocaleString()}</Text>
            <Text style={styles.tempText}>{`${Math.floor(dataSet?.main?.temp)}°C`}</Text>
            <Text style={styles.minandmaxText}>{`Min${ Math.floor(dataSet?.main?.temp_min)}°C / Max ${Math.floor(dataSet?.main?.temp_max)}°C`}</Text>
          </View>
        )}

     </ImageBackground>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  image:{
    flex:1,
    flexDirection:'column'
  
  },
  textInput:{
    padding:5,
    paddingVertical:20,
    borderBottomWidth:3,
    marginVertical:90,
    marginHorizontal:10,
    borderRadius:15,
    backgroundColor:'#fff',
    borderBottomColor:'#31304D'
  },
  infoView:{
    flex:1,
    
    alignItems:'center'
  },
  cityCountryText:{
    fontSize:40,
    color:'#fff'
  },
  dateText:{
    fontSize:22,
    color:'#fff',
    marginVertical:10
  },
  tempText:{
    fontSize:45,
    color:'#fff',
    marginVertical:10

  },
  minandmaxText:{
    fontSize:22,
    color:'#fff',
    marginVertical:10,
    fontWeight:'500'

  },

})

