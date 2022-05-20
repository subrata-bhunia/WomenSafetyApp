import React from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {Icon, Image} from 'react-native-elements';
import Header from '../../Components/Header';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {Colors, FontFamily, Sizes} from '../../Constants/constants';
import Button from '../../Components/Button';
import Modal from 'react-native-modal';
import {TextInput} from 'react-native-paper';
import {
  createCircle,
  createPerson,
  deleteCircle,
  getAllCircle,
} from '../../api/sos';
import {UIStore} from '../../UIStore';
import CustomModel from '../../Components/CustomModel';
const data = [
  {
    h1: 'Cillum nostrud',
    sub: 'Eiusmod anim quis fugiat aliquip fugiat aute irure pariatur.',
    image: 'https://cdn-icons-png.flaticon.com/512/6531/6531475.png',
  },
  {
    h1: 'desert secret bow army',
    sub: 'offer cry hundred stone foot angle stomach market direction star pond fireplace press yourself wa',
    image: 'https://cdn-icons-png.flaticon.com/512/488/488716.png',
  },
  {
    h1: 'catch off theory rubbed',
    sub: 'swim tell obtain chance week welcome complex white basic here fact instrument handle.',
    image:
      'https://cdn-icons.flaticon.com/png/512/1165/premium/1165725.png?token=exp=1649043447~hmac=353db4b90d97243aea82ef13763e32d4',
  },
];

const Circles = () => {
  const renderItems = ({item}) => {
    // console.log(item);
    return (
      <View
        style={{
          height: Sizes.ScreenHeight * 0.23,
          width: Sizes.ScreenWidth * 1,
        }}>
        <View
          style={{
            // flex: 0.1,
            backgroundColor: 'white',
            alignSelf: 'center',
            borderRadius: 10,
            flexDirection: 'row',
            padding: 20,
            alignItems: 'center',
            // height: '100%',
            width: '90%',
          }}>
          <Image
            style={{resizeMode: 'contain', height: 50, width: 70}}
            source={{uri: item.image}}
          />
          <View style={{width: '73%', alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: FontFamily.semi_bold,
                color: '#000',
                // textAlign: 'center',
                textTransform: 'capitalize',
              }}>
              {item.h1}
            </Text>
            <Text
              style={{
                fontFamily: FontFamily.default,
                color: '#000',
                // textAlign: 'center',
                textTransform: 'capitalize',
              }}>
              {item.sub}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const user_id = UIStore.useState(s => s.userId);
  const [circleadd, setcircleadd] = React.useState(false);
  const [personadd, setpersonadd] = React.useState(false);
  const [circleName, setcircleName] = React.useState('');
  const [personName, setpersonName] = React.useState('');
  const [personPhone, setpersonPhone] = React.useState('');
  const [relation, setrelation] = React.useState('');
  const [name, setname] = React.useState('');
  const [eee, seteee] = React.useState('');
  const [circleList, setCircleList] = React.useState([]);
  const [modal, setmodal] = React.useState(false);
  const [lastselectCircleID, setlastselectCircleID] = React.useState('');
  const getAllCircles = () => {
    getAllCircle(user_id)
      .then(res => {
        if (res.data?.success == 1) {
          setCircleList(res.data?.data);
        } else {
          console.log('API ERROR');
        }
      })
      .catch(err => {
        getAllCircles();
      });
  };
  React.useEffect(() => {
    getAllCircles();
  }, [personadd]);

  const addCircle = () => {
    var data = {
      name: name,
    };
    if (name.length > 0) {
      createCircle(data, user_id)
        .then(res => {
          if (res.data?.success == 1) {
            ToastAndroid.show(res.data.data, ToastAndroid.SHORT);
            getAllCircles();
            setcircleadd(false);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      seteee('Please enter Circle Name');
    }
  };

  const deleteCircles = circle_id => {
    deleteCircle({
      user_id: user_id,
      circle_id: `${circle_id}`,
    })
      .then(res => {
        if (res.data?.success == 1) {
          getAllCircles();
          ToastAndroid.show(res.data?.data, ToastAndroid.SHORT);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const addPerson = circle_id => {
    if (
      personName.length > 1 &&
      personPhone.length == 10 &&
      relation.length > 1
    ) {
      createPerson({
        user_id: user_id,
        circle_id: circle_id,
        name: personName,
        phone: personPhone,
        relation: relation,
      })
        .then(res => {
          if (res.data.success == 1) {
            ToastAndroid.show(res.data.data, ToastAndroid.SHORT);
            setpersonadd(false);
            console.log(res.data);
          }
        })
        .catch(err => console.log(err));
    } else {
      seteee('Please Fill Everything.');
    }
  };
  // console.log('USERID', user_id);
  return (
    <View style={styles.container}>
      <Header backBtn={true} name="Circles" />
      <View>
        <SwiperFlatList
          autoplay
          autoplayDelay={7}
          autoplayLoop
          index={0}
          showPagination
          renderItem={renderItems}
          data={data}
          paginationActiveColor={Colors.color1}
          paginationDefaultColor={'rgba(0,0,0,0.2)'} // rgb(2, 20, 100)
          paginationStyle={{
            // bottom: -35,
            bottom: 0,
          }}
          directionalLockEnabled
        />
      </View>
      <Text
        style={{
          padding: 10,
          fontFamily: FontFamily.bold,
          color: '#000',
          fontSize: 18,
        }}>
        My Circle
      </Text>
      <FlatList
        data={circleList}
        renderItem={({item}) => {
          const randomBetween = (min, max) =>
            min + Math.floor(Math.random() * (max - min + 1));
          var r = randomBetween(0, 255);
          var g = randomBetween(0, 255);
          var b = randomBetween(0, 255);
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '90%',
                alignSelf: 'center',
                marginVertical: 5,
              }}>
              {/* Letter */}
              <View
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 60,
                  backgroundColor: `rgba(${r},${g},${b},0.3)`,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 2,
                  borderColor: '#fff',
                }}>
                <Text
                  style={{
                    fontFamily: FontFamily.bold,
                    fontSize: 20,
                    color: `rgba(${r},${g},${b},1)`,
                  }}>
                  {item.name.charAt(0)}
                </Text>
              </View>
              {/* Name & Count */}
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{fontFamily: FontFamily.semi_bold, marginBottom: 7}}>
                  {item.name}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderRadius: 20,
                    width: 80,
                    height: 35,
                    padding: 3,
                    borderColor: '#999',
                    // justifyContent: 'space-between',
                  }}>
                  <Icon name="addusergroup" type="antdesign" size={20} />
                  <Text
                    style={{
                      fontFamily: FontFamily.semi_bold,
                      fontSize: 17,
                      marginHorizontal: 2,
                    }}>
                    {item.count}
                  </Text>
                </View>
                <Pressable
                  style={{
                    position: 'absolute',
                    right: -15,
                    top: 16,
                  }}
                  onPress={() => {
                    setpersonadd(true);
                    setcircleName(item.name);
                    setlastselectCircleID(item.id);
                  }}>
                  <Icon
                    name="plus"
                    type="antdesign"
                    color={'#000'}
                    raised
                    size={18}
                  />
                </Pressable>
              </View>
              {/* Cross */}
              <Pressable
                style={{elevation: 5}}
                onPress={() => {
                  setlastselectCircleID(item.id);
                  setmodal(true);
                }}>
                <Icon
                  name="cross"
                  type="entypo"
                  reverse
                  reverseColor="#000"
                  color={'white'}
                  style={{
                    elevation: 2,
                  }}
                />
              </Pressable>
            </View>
          );
        }}
        keyExtractor={item => item.id}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                height: 50,
                justifyContent: 'center',
              }}>
              <Text
                style={{fontFamily: FontFamily.semi_bold, textAlign: 'center'}}>
                No Circle Found
              </Text>
            </View>
          );
        }}
      />
      <Button
        onPress={() => {
          setcircleadd(true);
        }}
        btnStyle={{
          height: 60,
          width: Sizes.ScreenWidth * 0.7,
          borderRadius: 50,
          backgroundColor: Colors.color4,
          marginBottom: 20,
        }}
        textStyle={{
          fontFamily: FontFamily.semi_bold,
          color: Colors.TextColor,
        }}
        btnName="Add Circle"
      />
      <Modal
        isVisible={circleadd}
        animationIn="bounceIn"
        animationOut="bounceOut">
        <View
          style={{
            backgroundColor: Colors.color4,
            padding: 20,
            borderRadius: 20,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: FontFamily.bold,
              color: Colors.TextColor,
              fontSize: 20,
            }}>
            Add Circle
          </Text>
          <TextInput
            label={'Circle Name*'}
            activeUnderlineColor={Colors.color2}
            activeOutlineColor={Colors.color1}
            placeholder="Enter Circle Name"
            onChangeText={txt => setname(txt)}
            style={{
              marginVertical: 20,
              borderRadius: 10,
              fontFamily: FontFamily.semi_bold,
              fontSize: 18,
              width: '95%',
              alignSelf: 'center',
            }}
            l
          />
          <Button
            btnStyle={{
              height: 60,
              width: Sizes.ScreenWidth * 0.7,
              borderRadius: 50,
              backgroundColor: Colors.color4,
              marginBottom: 20,
            }}
            textStyle={{
              fontFamily: FontFamily.semi_bold,
              color: Colors.TextColor,
            }}
            btnName="Add Circle"
            onPress={() => {
              addCircle();
              // setcircleadd(false);
            }}
          />
          <Button
            onPress={() => {
              setcircleadd(false);
            }}
            btnStyle={{
              height: 60,
              width: Sizes.ScreenWidth * 0.7,
              borderRadius: 50,
              backgroundColor: Colors.color4,
              marginBottom: 20,
            }}
            textStyle={{
              fontFamily: FontFamily.semi_bold,
              color: Colors.TextColor,
            }}
            btnName="Cancel"
          />
          <Text
            style={{
              textAlign: 'center',
              fontFamily: FontFamily.bold,
              color: Colors.color1,
            }}>
            {eee}
          </Text>
        </View>
      </Modal>
      <Modal
        isVisible={personadd}
        animationIn="bounceIn"
        animationOut="bounceOut">
        <View
          style={{
            backgroundColor: Colors.color4,
            padding: 20,
            borderRadius: 20,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: FontFamily.bold,
              color: Colors.TextColor,
              fontSize: 20,
            }}>
            {circleName}
          </Text>
          <TextInput
            label={'Name'}
            activeUnderlineColor={Colors.color2}
            activeOutlineColor={Colors.color1}
            placeholder="Enter Name"
            value={personName}
            onChangeText={txt => setpersonName(txt)}
            style={{
              // borderWidth: 1,
              marginVertical: 20,
              borderRadius: 10,
              fontFamily: FontFamily.semi_bold,
              fontSize: 18,
              width: '95%',
              alignSelf: 'center',
            }}
          />
          <TextInput
            label={'Phone No'}
            activeUnderlineColor={Colors.color2}
            activeOutlineColor={Colors.color1}
            placeholder="Enter Phone Name"
            value={personPhone}
            onChangeText={txt => setpersonPhone(txt)}
            style={{
              // borderWidth: 1,
              marginVertical: 20,
              borderRadius: 10,
              fontFamily: FontFamily.semi_bold,
              fontSize: 18,
              width: '95%',
              alignSelf: 'center',
            }}
          />
          <TextInput
            label={'Relation'}
            activeUnderlineColor={Colors.color2}
            activeOutlineColor={Colors.color1}
            placeholder="Enter Relationship with"
            onChangeText={txt => setrelation(txt)}
            value={relation}
            style={{
              // borderWidth: 1,
              marginVertical: 20,
              borderRadius: 10,
              fontFamily: FontFamily.semi_bold,
              fontSize: 18,
              width: '95%',
              alignSelf: 'center',
            }}
          />
          <Button
            btnStyle={{
              height: 60,
              width: Sizes.ScreenWidth * 0.7,
              borderRadius: 50,
              backgroundColor: Colors.color4,
              marginBottom: 20,
            }}
            textStyle={{
              fontFamily: FontFamily.semi_bold,
              color: Colors.TextColor,
            }}
            btnName="Add Contact"
            onPress={() => addPerson(lastselectCircleID)}
          />
          <Button
            onPress={() => {
              setpersonadd(false);
            }}
            btnStyle={{
              height: 60,
              width: Sizes.ScreenWidth * 0.7,
              borderRadius: 50,
              backgroundColor: Colors.color4,
              marginBottom: 20,
            }}
            textStyle={{
              fontFamily: FontFamily.semi_bold,
              color: Colors.TextColor,
            }}
            btnName="Cancel"
          />
          <Text
            style={{
              textAlign: 'center',
              fontFamily: FontFamily.bold,
              color: Colors.color1,
            }}>
            {eee}
          </Text>
        </View>
      </Modal>
      <CustomModel
        open={modal}
        setopen={setmodal}
        h1="Are you want delete circle?"
        yes={{
          name: 'Delete',
          onPress: () => {
            deleteCircles(lastselectCircleID);
            setmodal(false);
          },
        }}
        no={{
          name: 'Cancel',
        }}
      />
    </View>
  );
};

export default Circles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  child: {width: Sizes.ScreenWidth, justifyContent: 'center'},
  text: {fontSize: Sizes.ScreenWidth * 0.1, textAlign: 'center'},
});
