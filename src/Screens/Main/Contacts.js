import {
  Image, 
  Linking, 
  PermissionsAndroid, 
  SectionList, 
  StyleSheet, 
  Text, 
  ToastAndroid, 
  TouchableOpacity, 
  View 
 } from 'react-native';
import React, { useEffect, useState } from 'react';
import Contacts from 'react-native-contacts';
import { Icon, SearchBar } from 'react-native-elements';
import { Colors, FontFamily } from '../../Constants/constants';
import SendSMS from 'react-native-sms';
import CustomLoader from '../../Components/CustomLoader';
import Header from '../../Components/Header';
import { UIStore } from '../../UIStore';
import GetLocation from 'react-native-get-location';
import axios from 'axios';
const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];



const ContactList = () => {
  let currentLocation = UIStore.useState(s=>s.lastLocation);
 let [contacts, setContacts] = useState([]);
 let [index, setindex] = useState([])
 let [count, setCount] = useState()
 const [searchText, setSearchText] = useState("")
 const [loader,setloader]=useState(false);
//  console.log("LAST",currentLocation);
 var locationLink=`https://www.google.com/maps/search/?api=1&query=${currentLocation?.latitude}%2C${currentLocation?.longitude}`


 var apiUrl='https://www.fast2sms.com/dev/bulkV2';
   var API_KEY ="wpculy0xX5bvnzGQANma6HeSYrigRU3EOfqK1L8DB4Z7oWt2MhoSpBbd52UyurDlEVma0csHZLi837TR"
 const sendMsg=(phone,name)=>{
   var phone_n= phone.split(" ").join("").replace("+91","");
   var phone_new= phone_n.charAt(0)==="0" ? phone_n.substring(1) : phone_n
   var SOS_SMS=`Alert! your friend in trouble now. Hi ${name}.It is a test sms send from Woman safety App.\nLast Location ${locationLink}\n🆘SMS SEND BY SUBRATA`
   var api_url=`${apiUrl}?authorization=${API_KEY}&message=${SOS_SMS}&language=english&route=q&numbers=${phone_n}`
   console.log(api_url)
   axios({
     method:'POST',
     url:apiUrl,
     data:{
      "route" : "v3",
      "sender_id" : "Cghpet",
      message : SOS_SMS,
      "language" : "english",
      "flash" : 0,
      "numbers" :phone_new,
      },
      headers:{
        "authorization":"wpculy0xX5bvnzGQANma6HeSYrigRU3EOfqK1L8DB4Z7oWt2MhoSpBbd52UyurDlEVma0csHZLi837TR",
        "Content-Type":"application/json"
        }
   }).then(res=>{
     console.log(res.data);
   }).catch(err=>console.log(err))
 }
 useEffect(() => {
     if (Platform.OS === 'android') {
         PermissionsAndroid.request(
             PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
             title: 'Contacts',
             message: 'This app would like to view your contacts.',
         }).then(() => {
             loadContacts();
         }
         );
     } else {
         loadContacts();
     }
     GetLocation.getCurrentPosition({
        enableHighAccuracy:true,
        timeout:15000
    }).then(location=>{
      UIStore.update(s=>{
        s.lastLocation = location
      })
    })
 }, []);
 const loadContacts = () => {
     Contacts.getAll()
         .then(contacts => {
             setContacts(contacts);

         })
         .catch(e => {

         });

     Contacts.getCount().then(count => {
         setCount(count)

     });

    //  Contacts.checkPermission();
 }
 const makeCall =(phone)=>{
     Linking.openURL(`tel:${phone}`)
 }
 const smsSend = (phone) => {
     SendSMS.send({
         body: `${SOS_SMS}`,
         recipients: [`${phone}`],
         successTypes: ['sent'],
     }, (completed, cancelled, error) => {

         console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
  
     });
 }
 const sendWPsms=(phone,name)=>{
  var SOS_SMS=`Alert! your friend in trouble now. Hi ${name}.It is a test sms send from Woman safety App.\nLast Location ${locationLink}\n🆘SMS SEND BY SUBRATA`
  var phone_n= phone.split(" ").join("").replace("+91","");
   var phone_new= phone_n.charAt(0)==="0" ? phone_n.substring(1) : phone_n
     Linking.openURL("whatsapp://send?text="+{SOS_SMS}.SOS_SMS+"&phone=91"+phone_new)
     .catch(err=>ToastAndroid.show("Can't Open Whatsapp.",ToastAndroid.SHORT,ToastAndroid.CENTER))
     // console.log("WP")
 }
 const data = alphabet.map(c => {
     let filtered = contacts.filter(i => i.displayName?.[0]?.toUpperCase() === c.toUpperCase())
     if (filtered.length === 0) {
         return null
     } else {
         return {
             title: c.toUpperCase(),
             data: filtered.map((i) => {
                 return { name: i.displayName, mobile: i.phoneNumbers[0]?.number, photo: i.thumbnailPath }
             })
         }
     }
 })
 const loadsearchContacts = () => {
     Contacts.getAll().then((res)=>{
         setContacts( res.filter(i=>i.displayName?.toLowerCase().indexOf(searchText.toLowerCase())===0))
         setloader(false)
     })
 };
 useEffect(()=>{
     if (searchText.length < 1){
         loadContacts()
     }else {
         loadsearchContacts()
         setloader(true)
     }
 },[searchText])
 const getColor =(index)=>{
     var color ='#'+Math.floor(Math.random()*index).toString(16).padStart(6,'0')
     return `${color}`
 }
return (
 <View style={{flex:1}}>
   <Header backBtn={true} name="Contacts" />
     <View>
         <SearchBar
          inputContainerStyle={{
              backgroundColor:"#fff",
              borderWidth:2,
              width:"80%",
              height:50,
              borderRadius:20,
              alignSelf:'center',
              elevation:5
          }}
          containerStyle={{
              backgroundColor:'transparent',
              borderWidth:0,
              padding:10,

          }}
          platform="android"
          value={searchText}
          onChangeText={(text)=>{
              setSearchText(text)
         }}
          showLoading={loader}
          placeholder={"Search Contacts ...."}
          placeholderTextColor="#999"
          />
     </View>
     {
         contacts.length < 1 ? (
             <CustomLoader header={true} loaderStyle={{height:100,width:100}} /> 
         ) : (
             <SectionList 
                 sections={data.filter(i => i)}
                 keyboardDismissMode="interactive"
                 initialNumToRender={100}
                 keyExtractor={(item, index) => item + index}
                 renderItem={({ item, index }) =>
                 <View style={styles.container}>
                     <View style={{
                          flexDirection:'row',
                          alignItems:'center',
                          width:"40%"
                 }}>
                     {
                         item?.photo ? (
                             <Image source={{uri:item?.photo}} style={{height:50,width:50,borderRadius:25,marginHorizontal:7}} />
                         ) : (
                             <Icon name="person-outline" type="ionicon" reverse color={"#f99f00"} />
                         )
                     }
                     <View>
                         <Text style={{fontFamily:FontFamily.semi_bold,color:Colors.TextColor}}>{item.name}</Text>
                         <Text style={{fontFamily:FontFamily.default,color:Colors.TextColor}}>{item?.mobile}</Text>
                     </View>
                     </View>
                     <View style={{}}>
                     <View style={{flexDirection:'row',justifyContent:'space-around',width:'50%',alignSelf:'flex-end'}}>
                         <TouchableOpacity disabled={item.mobile === undefined ?true :false} onPress={()=>sendWPsms(item.mobile,item.name)}>
                             <Icon name="logo-whatsapp" type="ionicon" color={Colors.color1}/>
                         </TouchableOpacity>
                         <TouchableOpacity disabled={item.mobile === undefined ?true :false} onPress={()=>makeCall(item.mobile)}>
                             <Icon name="phone" color={Colors.color1}/>
                         </TouchableOpacity>
                         <TouchableOpacity disabled={item.mobile === undefined ?true :false} onPress={()=>sendMsg(item.mobile,item.name)}>
                             <Icon name="sms" color={Colors.color1}/>
                         </TouchableOpacity>
                     </View>
                     </View>
                 </View>
                 }
                 renderSectionHeader={({ section: { title } }) => (
                     <View style={{paddingHorizontal:10,backgroundColor:'white'}}>
                         <Text style={{fontFamily:FontFamily.bold,fontSize:20,color:Colors.color1}}>{title}</Text>
                     </View>
                 )}
                 />
         )
     }
 </View>
);
};

export default ContactList;

const styles = StyleSheet.create({
 container:{
     padding:10,
     flexDirection:'row',
     alignItems:'center',
     justifyContent:'space-between'
 }
});
