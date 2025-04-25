import React, {useState} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Platform,
  Dimensions,
} from 'react-native';
import Svg, {G, Path, Defs, ClipPath, Rect, Line} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const sigmas = [
  {
    id: 1,
    name: 'Arth Aggarwal',
    position: 'Developer',
  },
  {
    id: 2,
    name: 'Goh Min Wen, Ted',
    position: 'Developer',
  },
  {
    id: 3,
    name: 'Chace Tan Boon Keong',
    position: 'Admin',
  },
  {
    id: 4,
    name: 'Darryan Lim Yuan Sheng',
    position: 'Designer',
  },
  {
    id: 6,
    name: 'Chay Yu Hung Tristan',
    position: 'Consultant',
  },
  {
    id: 6,
    name: 'Aathithya Jegatheesan',
    position: 'Consultant',
  },
];

const Credits = ({navigation}) => {
  const renderItem = ({item}) => {
    return (
      <View style={styles.box}>
        <Text allowFontScaling={false} style={styles.stampHeader}>
          {item.name}
        </Text>
        <Text allowFontScaling={false} style={styles.stampHeader}>
          {item.position}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/background.png')}
        style={{width: '100%', height: '100%'}}>
        <SafeAreaView style={{flex: 1}}>
          <View style={{marginTop: '5%'}}>
            <View style={styles.topSidebar}>
              <Text allowFontScaling={false} style={styles.header}>
                Credits
              </Text>
              <TouchableOpacity
                style={styles.hamburgerIconPress}
                onPress={() => navigation.openDrawer()}>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  style={{marginTop: '28%'}}>
                  <Path
                    d="M42.5 24.25C42.5 24.8467 42.2629 25.419 41.841 25.841C41.419 26.2629 40.8467 26.5 40.25 26.5H7.25C6.65326 26.5 6.08097 26.2629 5.65901 25.841C5.23705 25.419 5 24.8467 5 24.25C5 23.6533 5.23705 23.081 5.65901 22.659C6.08097 22.2371 6.65326 22 7.25 22H40.25C40.8467 22 41.419 22.2371 41.841 22.659C42.2629 23.081 42.5 23.6533 42.5 24.25ZM7.25 14.5H40.25C40.8467 14.5 41.419 14.2629 41.841 13.841C42.2629 13.419 42.5 12.8467 42.5 12.25C42.5 11.6533 42.2629 11.081 41.841 10.659C41.419 10.2371 40.8467 10 40.25 10H7.25C6.65326 10 6.08097 10.2371 5.65901 10.659C5.23705 11.081 5 11.6533 5 12.25C5 12.8467 5.23705 13.419 5.65901 13.841C6.08097 14.2629 6.65326 14.5 7.25 14.5ZM40.25 34H7.25C6.65326 34 6.08097 34.2371 5.65901 34.659C5.23705 35.081 5 35.6533 5 36.25C5 36.8467 5.23705 37.419 5.65901 37.841C6.08097 38.2629 6.65326 38.5 7.25 38.5H40.25C40.8467 38.5 41.419 38.2629 41.841 37.841C42.2629 37.419 42.5 36.8467 42.5 36.25C42.5 35.6533 42.2629 35.081 41.841 34.659C41.419 34.2371 40.8467 34 40.25 34Z"
                    fill="#1C1C12"
                  />
                </Svg>
              </TouchableOpacity>
            </View>
            <View style={{marginBottom: 20}} />
            <View style={{marginLeft: '5%'}}></View>
            <View style={{marginTop: 35, flex: 1}} />
            <FlatList
              data={sigmas}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topSidebar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginLeft: '5%',
    marginTop: '1%',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  header: {
    color: '#356AA9',
    fontFamily: 'Prototype',
    fontSize: 50,
    fontWeight: '400',
  },
  boxHeader: {
    color: '#1C1C12',
    fontFamily: 'Prototype',
    fontSize: 27,
    fontWeight: '400',
    marginLeft: '5%',
    marginTop: '20%',
  },
  moreInfoText: {
    color: 'rgba(235, 235, 239, 0.70)',
    fontFamily: 'Lato',
    fontSize: 16,
    fontStyle: 'normal',
    padding: 10,
    marginLeft: '1%',
  },
  entireBox: {
    width: '100%',
    height: 175,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '7%',
  },
  button: {
    width: '90%',
    height: height * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '7%',
    backgroundColor: '#356AA9', // Add this line
    shadowColor: 'rgba(28, 28, 34, 0.30)', // Add this line
    shadowOffset: {width: 4, height: 4}, // Add this line
    shadowOpacity: 0.3, // Add this line
    shadowRadius: 32, // Add this line
  },
  box: {
    backgroundColor: '#4F90DD',
    width: '90%',
    height: height * 0.1,
    marginLeft: '5%',
    marginBottom: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  centeredText: {
    color: '#1C1C12',
    textAlign: 'center',
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 19.2, // You need to specify a numeric value for lineHeight
    marginLeft: '5%',
    marginRight: '5%',
  },
  stampHeader: {
    color: '#EBEBEF',
    fontFamily: 'Prototype',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
  },
  stampBody: {
    color: '#EBEBEF',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 19.2,
  },
});

export default Credits;
