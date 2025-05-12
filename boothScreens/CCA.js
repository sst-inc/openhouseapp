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
  Dimensions,
  Image,
  Animated,
  TextInput,
} from 'react-native';
import Svg, {G, Path, Defs, ClipPath, Rect, Line} from 'react-native-svg';
import {data} from './BoothInfo';
import {useNavigation} from '@react-navigation/native';
import {LogBox} from 'react-native';

const sportsCCAData = [
  {
    id: '27',
    type: 'CCA',
    header: 'Athletics',
    description:
      'Athletics is dedicated to fostering holistic athlete development by providing opportunities for growth, learning, and enjoyment through sports. In addition, students are given the opportunities to nurture their intellectual and interpersonal skills. \n Our core programmes focus on cultivating leadership skills, both on and off the field, as well as instilling the spirit of sportsmanship through active participation in Inter-schools friendly competitions, National School Games (NSG) Track and Field, and Cross Country. These experiences not only enhance athletes’ athletic abilities but also prepare them for future endeavours, equipping them with the skills and character traits necessary for success.',
    location: 'Atrium',
    image: require('../assets/layoutPics/Atrium.png'),
    sstLoc: 'L1 Block A',
  },
  {
    id: '23',
    type: 'CCA',
    header: 'Fencing',
    description:
      'Fencing is more than just a sport—it is a platform for students to develop character, leadership, and sportsmanship. Through rigorous training and competitions, fencers cultivate discipline, resilience, and strategic thinking, essential qualities for both sport and life. Our CCA is committed to raising the standards of every fencer, enhancing their skills, and grooming them into capable and confident sportsmen. With dedicated coaching and structured development programs, we aim to nurture future leaders who exhibit integrity, commitment, and perseverance. Join us and embark on a journey of excellence in both fencing and personal growth!',
    location: 'Atrium',
    image: require('../assets/layoutPics/Atrium.png'),
    sstLoc: 'L1 Block A',
  },
];

const clubCCAData = [
  {
    id: '26',
    type: 'CCA',
    header: 'Media Club',
    description:
      "The Media Club serves as a hub for creative exploration, providing students with plenty of opportunities to hone their skills in photography, videography, audiovisual (AV) production and journalism and chances to participate in workshops and competitions. The AV team's involvement in morning assemblies and coverage of school events demonstrates their commitment to gain practical experience and strive for excellence. In journalism, our members collaborate with students from the English Talent Development Programme for ‘SSTraits Times,’ fostering diverse perspectives and expertise. Together, they craft compelling narratives that resonate with their audience, enriching both their skills and the school community. The Photo/Video team is passionate about covering the highlights of our school events. The competencies and skills that our Club members develop can be applied in their further endeavours.",
    location: 'Atrium',
    image: require('../assets/layoutPics/Atrium.png'),
    sstLoc: 'L1 Block A',
  },

  {
    id: '28',
    type: 'CCA',
    header: 'Singapore Youth Flying Club',
    description:
      'SYFC offers students a unique opportunity to explore aviation. Through engaging programs like aeromodelling, simulator flying, and aviation knowledge courses, students gain hands-on experience and deepen their understanding of flight. The CCA also includes thrilling real-world exposure via joyrides on RSAF aircraft.  With courses on aerodynamics, aircraft propulsion systems, and quadcopter flying, participants develop technical skills and knowledge. This CCA inspires future aviators and nurture passionate aviators who aspire to improve society through real-world applications of science and technology.',
    location: 'Atrium',
    image: require('../assets/layoutPics/Atrium.png'),
    sstLoc: 'L1 Block A',
  },
  {
    id: '22',
    type: 'CCA',
    header: 'Astronomy',
    description:
      'The Astronomy Club remains a vibrant hub for fostering curiosity and passion among our students through its dynamic and interactive activities. Designed to ignite exploration and deepen knowledge of the cosmos, the club offers training in telescope operation, radio foxhunting, astrophotography, and simulation tools like Kerbal Space Programme. Through engaging sharing sessions, outreach initiatives, and both local and international competitions and trips, students hone their leadership abilities and interpersonal skills. These experiences empower them to become confident, responsible learners and future leaders, ready to navigate the world with curiosity and purpose.',
    location: 'Atrium',
    image: require('../assets/layoutPics/Atrium.png'),
    sstLoc: 'L1 Block A',
  },

  {
    id: '24',
    type: 'CCA',
    header: 'Robotics',
    description:
      'Founded in 2010 by a group of passionate students, Robotics @APEX has grown into a dynamic club known for its excellence in both local and international robotics competitions. Guided by our core values—Effective, Efficient, and Exemplary—we continuously push boundaries in innovation and teamwork. \n As a member, you’ll explore various robotics systems, including Arduino, LEGO, and VEX, through student-led workshops. You’ll also have the opportunity to compete in prestigious competitions like First LEGO League, IDE, NRC, and VEX Robotics, as well as international events such as RoboRAVE Japan and the VEX Robotics World Championship. \n Beyond competitions, we encourage members to take on passion projects, allowing creativity and problem-solving skills to thrive. Join us and be part of a team that brings ideas to life through robotics!',
    location: 'Robotics Room',
    image: require('../assets/layoutPics/Level3.png'),
    sstLoc: 'L3 Block C',
  },
];

const perfromingCCAData = [
  {
    id: '25',
    type: 'CCA',
    header: 'Show Choir and Dance ',
    description:
      'SST Show Choir and Dance is one CCA family celebrating two unique art forms united by a shared love for the stage. \n The SST Show Choir blends vocal excellence with dynamic choreography, creating captivating performances that push creative boundaries. Members master the art of singing and dancing in unison, fostering teamwork and artistic growth. Through rigorous training and competitive showcases, students develop showmanship, confidence, and a passion for performance. \n The SST Dance Crew is a vibrant community of street dancers united by their love for movement and creativity. In a supportive environment, members sharpen their skills, learn discipline, and embrace teamwork. With energetic routines and opportunities to compete and collaborate, the Dance crew inspires growth, self-expression, and a shared passion for excellence, making every performance and competition an electrifying experience.',
    location: 'Atrium',
    image: require('../assets/layoutPics/Atrium.png'),
    sstLoc: 'L1 Block A',
  },
];
// collated list of all the data, starting from Sports, Clubs, Uniformed Groups then Performing Arts
const ccaData = sportsCCAData.concat(
  clubCCAData,
  sportsCCAData,
  perfromingCCAData,
);

const CCA = () => {
  const [isSearchBarVisible, setSearchBarVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchAnim] = useState(new Animated.Value(-100)); // Initial position off the right of the screen
  const [displayItems, setDisplayItems] = useState([]);
  const lengthControl = [''];
  const handleChange = text => {
    setSearchTerm(text);
    const query = text.trim().toLowerCase();
    const filteredData = ccaData.filter(item =>
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
  LogBox.ignoreAllLogs();
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
                CCAS
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
                CCAS
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
            <View
              style={{
                width: '100%',
                height: '7%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text allowFontScaling={false} style={styles.normalText}>
                All CCA's (except Robotics) are located at
              </Text>
              <View style={{flexDirection: 'row', marginTop: 3}}>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none">
                  <Path
                    d="M10 5C9.38193 5 8.77775 5.18328 8.26384 5.52666C7.74994 5.87004 7.3494 6.3581 7.11288 6.92911C6.87635 7.50013 6.81447 8.12847 6.93505 8.73466C7.05562 9.34085 7.35325 9.89767 7.79029 10.3347C8.22733 10.7717 8.78415 11.0694 9.39034 11.19C9.99653 11.3105 10.6249 11.2486 11.1959 11.0121C11.7669 10.7756 12.255 10.3751 12.5983 9.86116C12.9417 9.34725 13.125 8.74307 13.125 8.125C13.125 7.2962 12.7958 6.50134 12.2097 5.91529C11.6237 5.32924 10.8288 5 10 5ZM10 10C9.62916 10 9.26665 9.89003 8.95831 9.68401C8.64996 9.47798 8.40964 9.18514 8.26773 8.84253C8.12581 8.49992 8.08868 8.12292 8.16103 7.75921C8.23337 7.39549 8.41195 7.0614 8.67417 6.79917C8.9364 6.53695 9.27049 6.35837 9.63421 6.28603C9.99792 6.21368 10.3749 6.25081 10.7175 6.39273C11.0601 6.53464 11.353 6.77496 11.559 7.08331C11.765 7.39165 11.875 7.75416 11.875 8.125C11.875 8.62228 11.6775 9.09919 11.3258 9.45083C10.9742 9.80246 10.4973 10 10 10ZM10 1.25C8.17727 1.25207 6.42979 1.97706 5.14092 3.26592C3.85206 4.55479 3.12707 6.30227 3.125 8.125C3.125 10.5781 4.25859 13.1781 6.40625 15.6445C7.37127 16.759 8.45739 17.7626 9.64453 18.6367C9.74962 18.7103 9.87482 18.7498 10.0031 18.7498C10.1314 18.7498 10.2566 18.7103 10.3617 18.6367C11.5467 17.7623 12.6307 16.7587 13.5938 15.6445C15.7383 13.1781 16.875 10.5781 16.875 8.125C16.8729 6.30227 16.1479 4.55479 14.8591 3.26592C13.5702 1.97706 11.8227 1.25207 10 1.25ZM10 17.3438C8.70859 16.3281 4.375 12.5977 4.375 8.125C4.375 6.63316 4.96763 5.20242 6.02252 4.14752C7.07742 3.09263 8.50816 2.5 10 2.5C11.4918 2.5 12.9226 3.09263 13.9775 4.14752C15.0324 5.20242 15.625 6.63316 15.625 8.125C15.625 12.5961 11.2914 16.3281 10 17.3438Z"
                    fill="#1C1C12"
                  />
                </Svg>
                <Text
                  allowFontScaling={false}
                  style={{...styles.normalText, fontWeight: '600'}}>
                  {' '}
                  Atrium, L1 Block A
                </Text>
              </View>
            </View>
            <ScrollView style={{marginBottom: 1000, height: '78%'}}>
              {searchTerm === '' ? (
                <View>
                  <Text allowFontScaling={false} style={styles.ccaTypeHeader}>
                    Sports
                  </Text>
                  <FlatList
                    data={sportsCCAData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    nestedScrollEnabled={false}
                  />
                  <Text allowFontScaling={false} style={styles.ccaTypeHeader}>
                    Clubs
                  </Text>
                  <FlatList
                    data={clubCCAData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    nestedScrollEnabled={false}
                  />
                  <Text allowFontScaling={false} style={styles.ccaTypeHeader}>
                    Performing Arts
                  </Text>
                  <FlatList
                    data={perfromingCCAData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    nestedScrollEnabled={false}
                  />
                </View>
              ) : (
                <FlatList
                  data={lengthControl}
                  renderItem={() => displayItems}
                  keyExtractor={item => item.header}
                  nestedScrollEnabled={false}
                />
              )}
            </ScrollView>
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
    gap: 10,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  header: {
    color: '#EBEBEF',
    textAlign: 'center',
    fontFamily: 'Lato',
    fontSize: 40,
    fontWeight: 'normal',
  },
  sectionHeader: {
    color: 'rgba(235, 235, 239, 0.70)',
    fontFamily: 'Lato',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'left',
    marginLeft: '5%',
  },
  normalText: {
    color: '#1C1C12',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    fontWeight: '300',
    lineHeight: 19,
  },
  locationText: {
    color: '#1C1C12',
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
  },
  ccaContainer: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EBEBEF',
    backgroundColor: 'rgba(235, 235, 239, 0.10)',
    width: '90%',
    height: 70,
    marginBottom: 20,
  },
  ccaTypeHeader: {
    color: '#EBEBEF',
    fontFamily: 'Lato',
    fontSize: 24,
    fontWeight: '400',
    marginLeft: '5%',
    marginBottom: 20,
  },
  ccaTypeHeader: {
    color: '#1C1C12',
    fontFamily: 'Prototype',
    fontSize: 25,
    lineHeight: 24,
    marginLeft: '5%',
    marginBottom: '3%',
  },
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

export default CCA;
