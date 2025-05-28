import React, {useState, useEffect} from 'react';
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
  Animated,
  TextInput,
} from 'react-native';
import Svg, {
  G,
  Path,
  Defs,
  Filter,
  feFlood,
  feColorMatrix,
  feOffset,
  feGaussianBlur,
  feComposite,
  feBlend,
  Line,
} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {data} from './BoothInfo';

const appliedSubjectsData = [
  {
    id: '6',
    type: 'Academic',
    header: 'English Dept',
    description:
      "Ready to embark on an exciting journey through the world of words and ignite your passion for English language and literature? Visit the English Language Department booth at the School of Science and Technology's Open House, our friendly faculty members and student ambassadors will be on hand to answer any questions you may have about our English language programs, curriculum, and extracurricular activities. We look forward to welcoming you with open arms and sharing with you our innovative teaching methods and personalised approach to language learning. See you at the booth!",
    location: 'ADMT Studio',
    image: require('../assets/layoutPics/AdmtStudio.png'),
    sstLoc: 'L2 Block C',
  },
  {
    id: '7',
    type: 'Academic',
    header: 'MTL Dept',
    description:
      "Get ready to dive into the exciting world of language and culture with the Mother Tongue Languages (MTL) Department! We’re thrilled to showcase how passions come alive through immersive experiences like MTL Fortnight, where students embark on a journey of cultural workshops, multimedia projects, and fun-filled language enrichment activities. Through collaborative projects and hands-on learning, students not only sharpen their language skills but also gain fresh insights into diverse perspectives and important societal issues. From thrilling cultural immersion trips in the TDP programme to friendly competitions, in-house training, and even real-life exposure through emceeing – there's never a dull moment! Join us and experience language learning like never before!",
    location: 'MTL Room',
    image: require('../assets/layoutPics/Level5c.png'),
    sstLoc: 'L5 Block C',
  },
  {
    id: '8',
    type: 'Academic',
    header: 'Physics hands on',
    description:
      'Join our interactive workshop at Physics Lab 2 and learn the art of crafting a functional beam balance. Explore the concept of equilibrium in mechanics as you assemble this classic scientific instrument. Unleash your inner physicist through this hands-on learning experience!',
    location: 'Physics Lab 2',
    image: require('../assets/layoutPics/Level2.png'),
    sstLoc: 'L2 Block C',
  },
  {
    id: '9',
    type: 'Academic',
    header: 'Chemistry hands on',
    description:
      'In SST, Chemistry is taught through Applied Learning with technology integration and varied assessments to understand interactions between matter. "Innovation with Colours", our booth’s theme highlights the significance of colours in chemical reactions. Explore creative and fun hands-on activities and experiments at Chemistry Lab 2. Join us to delve into colourful science!',
    location: 'Chem Lab 2',
    image: require('../assets/layoutPics/Level1.png'),
    sstLoc: 'L1 Block C',
  },
  {
    id: '10',
    type: 'Academic',
    header: 'Biotechnology hands on',
    description:
      "Ever wondered how science and technology join forces to make the world a better place? Get ready to dive into the fascinating world of biotechnology! In this session, we'll uncover the secrets of genetic engineering and how it helps create genetically modified food. Plus, you won't want to miss our hands-on activity where we'll explore agarose gel electrophoresis together. Join us for an unforgettable journey of discovery and fun!",
    location: 'Biotech lab 1',
    image: require('../assets/layoutPics/Level1.png'),
    sstLoc: 'L1 Block C',
  },
  {
    id: '11',
    type: 'Academic',
    header: 'Electronics hands on',
    description:
      'Electronics  engineers  solve  problems and  improve  lives  by  applying  their knowledge and skills in electronics. Their solutions often come in the form of electronic systems. Join our hands-on activity to experience the work of an electronic engineer! You will learn how a computer simulation is used in circuit design and build an automatic lighting system.',
    location: 'Engineering Lab',
    image: require('../assets/layoutPics/Level2.png'),
    sstLoc: 'L2 Block C',
  },
  {
    id: '12',
    type: 'Academic',
    header: 'Biology hands on',
    description:
      'Biology is an academic discipline that enables us to comprehend the functioning, evolution, and interactions of various organisms within the living world, including humans. Learning from our natural environment, beyond the boundaries of our classroom, we will explore the rich diversity of the world of plants and how they evolved millions of years ago on the very grounds of SST. ',
    location: 'Bio Lab 1',
    image: require('../assets/layoutPics/Level1.png'),
    sstLoc: 'L1 Block C',
  },
  {
    id: '13',
    type: 'Academic',
    header: 'Environmental Education',
    description:
      'The Environmental Education committee is committed to cultivating environmentally conscious leaders who will drive positive change. We encourage students to actively engage in the 3As: \n Awareness: Understanding their responsibility towards the environment. \n Action: Taking concrete steps to create a positive environmental impact. \n Advocacy: Championing causes that promote sustainability and environmental well-being. \n Through our environmental programs, we aim to empower students to lead initiatives that benefit the environment and inspire others to do the same. Eco-ambassadors will showcase their learning experiences and demo to visitors on prepping compost and encourage this habit at home.',
    location: 'Physics Lab 1',
    image: require('../assets/layoutPics/Level2.png'),
    sstLoc: 'L2 Block C',
  },
  {
    id: '14',
    type: 'Academic',
    header: 'Science',
    description:
      'The SST Science curriculum is based on the philosophy of education through inquiry, experimentation, and discovery. Students are presented with a variety of learning experiences which pique their curiosity about the natural world and help cultivate habits of mind to be out-of-the-box innovators. The Science curriculum aims to develop students’ scientific knowledge and conceptual understanding; and Science process skills through the disciplines of Biology, Chemistry and Physics.',
    location: 'Research Lab',
    image: require('../assets/layoutPics/Level2.png'),
    sstLoc: 'L2 Block C',
  },
  {
    id: '15',
    type: 'Academic',
    header: 'IDP',
    description:
      'The SST-Ngee Ann Polytechnic Integrated Diploma Programme (SST-NP IDP) offers a first-of-its-kind STEAM (Science, Technology, Engineering, Aesthetics, and Mathematics) - related through-train programme, providing Secondary Three students with a direct pathway to NP. This programme emphasises applied learning and engages students in a wide range of STEM fields via capstone projects with start-ups, industry partners and the community. Furthermore, students gain valuable 21st century skills, becoming innovative problem solvers and active contributors to society.',
    location: 'ADMT Studio',
    image: require('../assets/layoutPics/AdmtStudio.png'),
    sstLoc: 'L2 Block C',
  },
  {
    id: '16',
    type: 'Academic',
    header: 'Mathematics Dept',
    description:
      'The SST Mathematics Programme strives to foster a love for Mathematics through a dynamic and innovative approach that emphasises applied and integrated learning. Real-world scenarios are presented as performance tasks, enabling students to apply their problem-solving and mathematical modeling skills. Our concept-focused curriculum is designed to ensure a deep understanding of core mathematical principles. With learner-centered assessments and technology-enabled experiences, students are empowered to explore, reflect, and apply their mathematical knowledge in meaningful ways — fostering both critical and computational thinking skills. \n The department also places a strong emphasis on cultivating a Mathematical Mindset community. We nurture the belief that all students can succeed in Mathematics, encouraging them to embrace mistakes as opportunities for growth and to approach challenges with resilience. Through self-reflection and productive struggle, students are empowered to take ownership of their learning and to pursue mathematical excellence with confidence. This mindset, coupled with opportunities for talented students through the SST Math Talent Development Programme (TDP), ensures that every learner can excel. The TDP provides students with avenues to explore advanced projects, participate in showcases, and engage in mathematics competitions — further igniting passion and nurturing excellence in the subject. \n The SST Mathematics Programme aims to not only ensures mastery of mathematical concepts but also prepares students to become critical thinkers and problem-solvers in an ever-evolving, technology-driven world.',
    location: 'ADMT Studio',
    image: require('../assets/layoutPics/AdmtStudio.png'),
    sstLoc: 'L2 Block C',
  },
  {
    id: '17',
    type: 'Academic',
    header: 'Humanities Dept',
    description:
      'Through the lens of Applied Learning, the Humanities curriculum in SST is designed to cultivate a deeper understanding of people, places and modern phenomena by bridging the gap between theoretical knowledge and practical application. Immerse yourselves in the realm of Humanities through source-based inquiry, strategic play and virtual fieldwork at our booth with the theme being, "Perspectives Unlocked: A Humanities Challenge"',
    location: 'Humanities Room',
    image: require('../assets/layoutPics/Level5c.png'),
    sstLoc: 'L5 Block C',
  },
];

const MainStream = () => {
  const [isSearchBarVisible, setSearchBarVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchAnim] = useState(new Animated.Value(-100)); // Initial position off the right of the screen
  const [displayItems, setDisplayItems] = useState([]);
  const lengthControl = [''];

  const handleChange = text => {
    setSearchTerm(text);
    const query = text.trim().toLowerCase();
    const filteredData = appliedSubjectsData.filter(item =>
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
                Academic
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
                data={appliedSubjectsData}
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

export default MainStream;
