import React from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Linking,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Pressable,
} from 'react-native';
import Svg, {Circle, Path, Line, G} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const QuickLinks = ({navigation}) => {
  const data = [
    {
      id: 4,
      title: 'Post-Event Survey Form',
      url: 'https://docs.google.com/forms/d/e/1FAIpQLSeE28VqM37eeiZ_QsxxlRisBQ9CD5yHMz8rmN9iunXqsTYXyg/closedform',
    },
    {
      id: 1,
      title: 'MOE DSA Page',
      url: 'https://www.moe.gov.sg/secondary/dsa/application',
    },
    {
      id: 2,
      title: 'SST DSA Page',
      url: 'https://www.sst.edu.sg/student-admission/dsa-selection-criteria/',
    },
    {
      id: 3,
      title: 'SST Open House Website',
      url: 'https://sites.google.com/sst.edu.sg/2025sstopenhouse/open-house-programmes?authuser=0',
    },
    {
      id: 5,
      title: 'SST Inc HQ Website',
      url: 'https://www.sstinc.org/',
    },
    {
      id: 6,
      title: 'SST Instagram',
      url: 'https://www.instagram.com/sst_edu_sg/?hl=en',
    },
    {
      id: 7,
      title: 'SST Facebook',
      url: 'https://www.facebook.com/ssts.1technologydrive/',
    },
    {
      id: 8,
      title: 'SST Corporate video',
      url: 'https://www.youtube.com/watch?v=mVQkRxVNfL8&t=1s',
    },
  ];

  const handleLinkPress = url => {
    Linking.openURL(url);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.subContainer}
      onPress={() => Linking.openURL(item.url)}>
      <View style={{flexDirection: 'column'}}>
        <Text allowFontScaling={false} style={styles.subjectHeader}>
          {item.title}
        </Text>
      </View>
      <View style={{marginRight: 25}}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none">
          <Path
            d="M22.5301 16.53L12.5301 26.53C12.3879 26.6625 12.1999 26.7346 12.0056 26.7312C11.8113 26.7278 11.6259 26.6491 11.4885 26.5117C11.3511 26.3742 11.2723 26.1889 11.2689 25.9946C11.2655 25.8003 11.3376 25.6122 11.4701 25.47L20.9388 16L11.4701 6.53003C11.3376 6.38785 11.2655 6.19981 11.2689 6.00551C11.2723 5.81121 11.3511 5.62582 11.4885 5.48841C11.6259 5.35099 11.8113 5.27228 12.0056 5.26885C12.1999 5.26543 12.3879 5.33755 12.5301 5.47003L22.5301 15.47C22.6705 15.6107 22.7494 15.8013 22.7494 16C22.7494 16.1988 22.6705 16.3894 22.5301 16.53Z"
            fill="#EBEBEF"
            fill-opacity="0.7"
          />
        </Svg>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/background.png')}
        style={styles.imageBackground}
        resizeMode="cover">
        <SafeAreaView style={{flex: 1}}>
          <View style={{marginTop: '5%'}} />
          <View>
            <View style={styles.topSidebar}>
              <Text allowFontScaling={false} style={styles.header}>
                Quick Links
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
          </View>
          <View style={{marginTop: '10%'}} />
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <FlatList
              data={data}
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
    gap: 5,
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
  sectionHeader: {
    color: 'rgba(235, 235, 239, 0.70)',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    fontWeight: '400',
  },
  subContainer: {
    width: '95%',
    height: 75,
    backgroundColor: '#4F90DD',
    marginBottom: '5%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
    flex: 1,
  },
  subjectHeader: {
    color: '#EBEBEF',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    marginBottom: '0.1%',
  },
  locationText: {
    color: '#EBEBEF',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    fontWeight: '400',
  },
  redirectText: {
    color: '#ABABED',
    textAlign: 'center',
    fontFamily: 'Lato',
    fontSize: 16,
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
});
export default QuickLinks;
