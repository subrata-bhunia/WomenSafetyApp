import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Colors, FontFamily, Sizes } from '../../Constants/constants'
import Header from '../../Components/Header';
import { SearchBar } from 'react-native-elements';
import { Accordion } from 'galio-framework';
import dummyFaq from '../../Data/dummy.faq';
import CustomLoader from '../../Components/CustomLoader';
const About = () => {
  const [searchText, setSearchText] = useState("")
 const [loader,setloader]=useState(false);
 const [query,setQuery]=useState([])


  const loadsearchQuery = () => {
        setQuery( dummyFaq.filter(i=>i.title?.toLowerCase().indexOf(searchText.toLowerCase())>-1 || i.content?.toLowerCase().indexOf(searchText.toLowerCase())>-1))
        setloader(false)
    }
    useEffect(()=>{
      if (searchText.length < 1){
          setQuery(dummyFaq)
          setloader(false)
      }else {
          loadsearchQuery()
          setloader(true)
      }
  },[searchText])
    return (
        <View style={styles.container}>
            <Header headerHeight={300} name="FAQ & SUPPORT" backColor={Colors.color2}/>
            <SearchBar
              inputContainerStyle={{
                  backgroundColor:"#fff",
                  borderWidth:2,
                  width:"90%",
                  height:50,
                  borderRadius:20,
                  alignSelf:'center',
                  elevation:5
              }}
              containerStyle={{
                  backgroundColor:'transparent',
                  borderWidth:0,
                  padding:10,
                  position:'absolute',
                  top:100,
                  width:'100%'
              }}
              platform="android"
              value={searchText}
              onChangeText={(text)=>{
                  setSearchText(text)
              }}
              showLoading={loader}
              placeholder={"Search Your Querys ...."}
              placeholderTextColor="#999"
              spellCheck
              />
            <View style={{
              backgroundColor:Colors.color5,
              borderTopStartRadius:30,
              borderTopEndRadius:30,
              marginTop:-Sizes.ScreenHeight/10,
              flex:1.2,
              paddingHorizontal:10,
              // paddingVertical:17
              }}>
              <Text style={{
                fontFamily:FontFamily.bold,
                color:Colors.TextColor,
                letterSpacing:1.7,
                marginVertical:15,
                paddingTop:17
              }}>SELECT A TOPIC</Text>
              <View style={{flex:1}}>
                {
                  query.length < 1 ? (
                    <CustomLoader loaderStyle={{height:100,width:100}} header={true} hdhg={300} />
                  ) : (
                    <Accordion
                        dataArray={query} 
                        style={{backgroundColor:Colors.color5,width:'100%',flex:1}}
                        listStyle={{
                          flex:1
                        }}
                        contentStyle={{
                          fontFamily:FontFamily.default,
                          color:Colors.TextColor
                        }}
                        titleStyle={{
                          fontFamily:FontFamily.semi_bold,
                          color:Colors.TextColor
                        }}
                        />
                  )
                }
              </View>
            </View>
        </View>
    )
}

export default About

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})
