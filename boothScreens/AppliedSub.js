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
  Image,
} from 'react-native';
import Svg, {G, Path, Defs, ClipPath, Rect, Line} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {data} from './BoothInfo';
import SearchBar from 'react-native-search-bar';

const appliedSubjectsData = [
  {
    id: '1',
    type: 'Applied Subjects',
    header: 'Computing+',
    description:
      "SST's Computing+ course teaches computational thinking for problem-solving and creativity. Students develop programs to tackle complex issues using analysis, pattern finding, abstraction, and algorithms. These skills are applicable across subjects and in real-world scenarios. They also learn data handling and ethics in computing. The " +
      ' modules expose students to current tech trends, preparing them for advanced studies in Informatics.',
    location: 'SST Inc HQ',
    image: require('../assets/layoutPics/Level3.png'),
    sstLoc: 'L3 Block C',
  },
  {
    id: '2',
    type: 'Applied Subjects',
    header: 'Electronics',
    description:
      'Electronics engineers solve problems and improve lives by applying their knowledge and skills in electronics. Their solutions often come in the form of electronic systems. Join our hands-on activity to experience the work of an electronic engineer! You will learn how a computer simulation is used in circuit design and build an automatic lighting system.',
    location: 'Engineering Lab',
    image: require('../assets/layoutPics/Level2.png'),
    sstLoc: 'L2 Block C',
  },
  {
    id: '3',
    type: 'Applied Subjects',
    header: 'Biotechnology',
    description:
      "Ever wondered how science and technology join forces to make the world a better place? Get ready to dive into the fascinating world of biotechnology! In this session, we'll uncover the secrets of genetic engineering and how it helps create genetically modified food. Plus, you won't want to miss our hands-on activity, where we'll explore agarose gel electrophoresis together. Join us for an unforgettable journey of discovery and fun!",
    location: 'Biotech Lab',
    image: require('../assets/layoutPics/Level1.png'),
    sstLoc: 'L1 Block C',
  },
];

const AppliedSub = () => {
  const navigation = useNavigation();
  const renderItem = ({item}) => {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <TouchableOpacity
          style={styles.subContainer}
          onPress={() => handlePress(item)}>
          <View style={{flexDirection: 'column'}}>
            <Text allowFontScaling={false} style={styles.subjectHeader}>
              {item.header}
            </Text>
            <Text allowFontScaling={false} style={styles.locationText}>
              @ {item.location}
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
      </View>
    );
  };
  const handlePress = item => {
    navigation.navigate('ADeets', {item});
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/background.png')}
        style={{width: '100%', height: '100%'}}>
        <SafeAreaView style={{flex: 1}}>
          <View style={{marginTop: '5%'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={{marginLeft: '5%'}}>
                <Image
                  source={require('../assets/boothInfo/arrow.png')}
                  style={{width: 48, height: 48}}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.topSidebar}>
              <Text allowFontScaling={false} style={styles.header}>
                Applied
              </Text>
            </View>
            <View style={{marginLeft: '5%'}}>
              <Text allowFontScaling={false} style={styles.sectionHeader}>
                {' '}
                Applied Subjects
              </Text>
            </View>
            <View style={{marginTop: 35, flex: 1}} />
            <FlatList
              data={appliedSubjectsData}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              contentContainerStyle={{paddingBottom: 200}} // Add bottom padding here
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
    width: '90%',
    height: 80,
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

export default AppliedSub;
