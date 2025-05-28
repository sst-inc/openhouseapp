import React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Platform,
  Image,
  Animated,
  TextInput,
} from 'react-native';
import Svg, {G, Path, Defs, ClipPath, Rect, Line} from 'react-native-svg';
import {data} from './BoothInfo';
import {useNavigation} from '@react-navigation/native';
import {LogBox} from 'react-native';

const specialData = [
  {
    id: '1',
    type: 'Special',
    header: 'DSA Booth',
    description:
      'Please approach us here if you have any questions regarding the DSA selection process!',
    location: 'InfoHub',
    image: require('../assets/layoutPics/Level5.png'),
    sstLoc: 'L5 Block A',
  },
  {
    id: '2',
    type: 'Special',
    header: 'Academic Panel',
    description:
      'Join our School Leaders and various academic staff in a conversation to find out more about the SST curriculum and opportunities that students are presented with!',
    location: 'Auditorium',
    image: require('../assets/layoutPics/Level5.png'),
    sstLoc: 'L5 Block A',
  },
  {
    id: '3',
    type: 'Special',
    header: ' SSTAA Liaison',
    description:
      'Explore the post-secondary experience with our past students! Here, you can speak to our alumni who are at various stages of their post-secondary journey and find out more on how the SST experience has influenced them in the various pathways that they are currently on. ',
    location: 'MPR3',
    image: require('../assets/layoutPics/Level3.png'),
    sstLoc: 'L3 Block C',
  },
  {
    id: '4',
    type: 'Special',
    header: 'PforSST Liaison',
    description:
      'Hear about the SST experience from the perspective of a parent! Come and speak to our friendly PforSST members and join our panel discussion where you can gain some insights on various aspects of the school and have some of your questions answered! ',
    location: 'LO1',
    image: require('../assets/layoutPics/Level3.png'),
    sstLoc: 'L3 Block C',
  },
  {
    id: '5',
    type: 'Special',
    header: 'Student Life Panel and exhibition',
    description:
      'Take the chance to speak with and hear from our students as they share their experiences, challenges, and highlights of their student life @ SST.',
    location: 'LO2',
    image: require('../assets/layoutPics/Level3.png'),
    sstLoc: 'L3 Block C',
  },
  {
    id: '18',
    type: 'Special',
    header: 'ADMT Dept',
    description:
      'The Arts, Design, Media and Technology (ADMT) programme equip students with principles, knowledge and skills from prototyping to product design to interactive design media, architecture design and video production.',
    location: 'Beta Lab',
    image: require('../assets/layoutPics/Level4c.png'),
    sstLoc: 'L4 Block C',
  },
  {
    id: '19',
    type: 'Special',
    header: 'SST Inc',
    description:
      '"The Informatics Department comprises the lower secondary Information and Communication Technology (ICT) and upper secondary Computing+ subjects. Our mission is to inspire and enable our students to use technology as a force for good in the world. Technology has the power to solve some of the most pressing challenges our society faces. Our goal is to cultivate a community of students who are passionate about using their skills and knowledge to make a positive difference in the world. Through hands-on experiential learning and rigorous coursework, we aim to equip our students with the technical expertise and ethical grounding necessary to use technology to benefit humanity. \n SST Inc. is part of SST’s technology talent development programme. It aims to be locally and globally recognised as an incubator that fosters a deep interest in Infocomm Technology among our students and nurtures their app development and entrepreneurship talents to impact their community positively."',
    location: 'SST Inc HQ',
    image: require('../assets/layoutPics/Level3.png'),
    sstLoc: 'L3 Block C',
  },
  {
    id: '20',
    type: 'Special',
    header: 'S&W Dept',
    description:
      'The S&W curriculum is based on the philosophy of education through the physical; a multi-dimensional approach to develop students holistically through sports and games excellence. The curriculum engages students actively with relevant activities that help them learn experientially. Lessons are focused on acquiring games skills for sports recreation, uncovering games concepts for understanding, and promoting sportsmanship and sporting behaviour through authentic sports participation and competition.  \n Students experience physical, mental and social emotional challenges that effectively develop their strength of character. \n There is also a focus on outdoor education that compels students to develop appropriate outdoor skills and sharpen their coping and management strategies through physical activities while cultivating an attitude of care and appreciation for the environment.',
    location: 'Outside Makers Lab',
    image: require('../assets/layoutPics/Level2.png'),
    sstLoc: 'L2 Block C',
  },
  {
    id: '21',
    type: 'Special',
    header: 'ARC@SST',
    description:
      'ARC@SST is a new initiative launched this year to support and inspire students with a strong interest in scientific research beyond the classroom. It provides a platform for students to explore real-world scientific questions through hands-on experimentation, guided inquiry, and collaborative projects. Members will develop valuable skills in science communication, critical thinking, and research design. The club also offers opportunities to take part in science competitions and conduct outreach programs at primary schools, aiming to spark curiosity and a love for science in younger students. Through these experiences, students will gain confidence in presenting their ideas and deepen their understanding of the scientific process.',
    location: 'Bio Lab 2',
    image: require('../assets/layoutPics/Level1.png'),
    sstLoc: 'L1 Block C',
  },
];

const Special = () => {
  const [isSearchBarVisible, setSearchBarVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchAnim] = useState(new Animated.Value(-100)); // Initial position off the right of the screen
  const [displayItems, setDisplayItems] = useState([]);
  const lengthControl = [''];

  const handleChange = text => {
    setSearchTerm(text);
    const query = text.trim().toLowerCase();
    const filteredData = specialData.filter(item =>
      item.header.toLowerCase().includes(query),
    );
    setDisplayItems(
      filteredData.map(item => (
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
      )),
    );
  };

  const handlePress1 = () => {
    setSearchBarVisible(!isSearchBarVisible);
  };

  const search = query => {
    const trimmedQuery = query.trim().toLowerCase();

    if (['applied', 'applied subjects'].includes(trimmedQuery)) {
      navigation.navigate('AppliedSub');
    } else if (['mainstream', 'mainstream subjects'].includes(trimmedQuery)) {
      navigation.navigate('MainStream');
    } else if (
      ['cca', 'co-curricular activities', 'co curricular activities'].includes(
        trimmedQuery,
      )
    ) {
      navigation.navigate('CCA');
    } else {
      const results = data.filter(item => {
        return (
          item.header &&
          String(item.header).toLowerCase().includes(trimmedQuery)
        );
      });

      if (results.length > 0) {
        navigation.navigate('ADeets', {item: results[0]});
      }
    }
  };
  useEffect(() => {
    if (isSearchBarVisible) {
      // Animate the SearchBar to slide in when it becomes visible
      Animated.timing(searchAnim, {
        toValue: 0, // Move to the right side of the screen
        duration: 500, // Duration of the animation
        useNativeDriver: true, // Use native driver for better performance
      }).start();
    } else {
      // Animate the SearchBar to slide out when it becomes hidden
      Animated.timing(searchAnim, {
        toValue: -1000, // Move off the right side of the screen
        duration: 500, // Duration of the animation
        useNativeDriver: true, // Use native driver for better performance
      }).start();
    }
  }, [isSearchBarVisible]);
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
                Special
              </Text>
              <TouchableOpacity onPress={handlePress1}>
                <Svg
                  width="40"
                  height="40"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{marginTop: '20%'}}>
                  <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                  <G
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"></G>
                  <G id="SVGRepo_iconCarrier">
                    <Path
                      d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"></Path>
                  </G>
                </Svg>
              </TouchableOpacity>
            </View>
            <View style={{marginLeft: '5%'}}>
              <Text allowFontScaling={false} style={styles.sectionHeader}>
                {' '}
                Mainstream Subjects
              </Text>
            </View>
            {isSearchBarVisible && (
              <Animated.View style={{transform: [{translateX: searchAnim}]}}>
                <View style={styles.customSearchBarContainer}>
                  <TextInput
                    style={styles.customSearchBarInput}
                    placeholder="Search"
                    placeholderTextColor="#979797"
                    value={searchTerm}
                    onChangeText={handleChange}
                    onSubmitEditing={() => search(searchTerm)}
                    returnKeyType="search"
                    autoFocus
                  />
                  {searchTerm.length > 0 && (
                    <TouchableOpacity
                      onPress={() => setSearchTerm('')}
                      style={styles.clearIconContainer}>
                      <Svg
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none">
                        <Path
                          d="M7 7L21 21M21 7L7 21"
                          stroke="#979797"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </Svg>
                    </TouchableOpacity>
                  )}
                </View>
              </Animated.View>
            )}
            <View style={{marginTop: 35, flex: 1}} />
            {searchTerm === '' ? (
              <FlatList
                data={specialData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={{paddingBottom: 200}} // Add bottom padding here
              />
            ) : (
              <FlatList
                data={lengthControl}
                renderItem={() => displayItems}
                keyExtractor={item => item.id}
                contentContainerStyle={{paddingBottom: 200}} // Add bottom padding here
              />
            )}
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
  customSearchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3E3E8',
    borderRadius: 16,
    paddingHorizontal: 20,
    height: 56,
    width: '90%',
    marginLeft: '5%',
    marginTop: 20,
    position: 'relative',
  },
  customSearchBarInput: {
    flex: 1,
    fontSize: 28,
    fontWeight: '600',
    color: '#979797',
    fontFamily: 'Prototype',
    backgroundColor: 'transparent',
    paddingVertical: 0,
  },
  clearIconContainer: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Special;
