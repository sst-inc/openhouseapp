import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  SafeAreaView,
  TextInput,
  Platform,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import Svg, {G, Path, Defs, ClipPath, Rect, Line} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainStream from './MainStream';
import CCA from './CCA';
import AppliedSub from './AppliedSub';
import AppliedDetails from './AppliedDetails';
import Special from './specialEvents';

const Stack = createNativeStackNavigator();

const BoothInfo = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={BoothInfoParentPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainStream"
        component={MainStream}
        options={{headerShown: false}}
      />
      <Stack.Screen name="CCA" component={CCA} options={{headerShown: false}} />
      <Stack.Screen
        name="AppliedSub"
        component={AppliedSub}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ADeets"
        component={AppliedDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SpecialEvents"
        component={Special}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const data = [
  {
    id: '1',
    type: 'CCA',
    header: 'Athletics',
    description:
      'SST Athletics offers focused training in long-distance and short-distance events, fostering athletic growth and excellence. Athletes gain resilience and sportsmanship through national competitions. Alongside physical training, they develop intellectual and interpersonal skills for their future.',
    location: 'Atrium',
    image: require('../assets/layoutPics/Atrium.png'),
    sstLoc: 'L1 Block A',
  },
  {
    id: '2',
    type: 'CCA',
    header: 'Fencing',
    description:
      "SST Fencing offers engaging sessions with dedicated teachers and coaches to learn fundamental fencing skills. We prepare fencers for lifelong excellence in the sport and provide opportunities for competition at Zonal and National levels. Fencing instils values like teamwork, respect, perseverance, and self-discipline. Contrary to misconceptions, fencing is a physically demanding sport akin to a fast-paced chess game. In Olympic fencing, movements are lightning-fast, requiring strength and quick thinking. If you're up for the challenge, join us and discover the intensity and skill of fencing!",
    location: 'Atrium',
    image: require('../assets/layoutPics/Atrium.png'),
    sstLoc: 'L1 Block A',
  },
  {
    id: '3',
    type: 'CCA',
    header: 'Astronomy',
    description:
      "The Astronomy Club, founded in 2013, has become a popular CCA at SST. It focuses on activities like talks, trips, competitions, and teaching to foster leadership and skills like collaboration, communication, curiosity, and critical, and creative thinking. 'Ad Astra' and 'See the BIG picture' embody the club's goals.",
    location: 'Atrium',
    image: require('../assets/layoutPics/Atrium.png'),
    sstLoc: 'L1 Block A',
  },
  {
    id: '4',
    type: 'CCA',
    header: 'Singapore Youth Flying Club',
    description:
      'The SYFC offers aviation programs to cultivate passion and develop members as problem-solvers and leaders in aviation. Despite COVID-19, sessions continued through eCCA and physical formats from 2020 to early 2022. Members honed Flight Simulation skills and participated in competitions like Flight Simulation@HQ, Singapore Amazing Flying Machine, and Drone Odyssey Challenge, adapting to the new normal.',
    location: 'Atrium',
    image: require('../assets/layoutPics/Atrium.png'),
    sstLoc: 'L1 Block A',
  },
  {
    id: '5',
    type: 'CCA',
    header: 'Media Club',
    description:
      'The SST Media Club is a vibrant platform for students passionate about multimedia. Explore journalism, photography, videography, and more. Develop skills through workshops, projects, and collaborations. Learn from experts and peers, honing camera work, editing, storytelling, and creativity. Whether experienced or new, the Media Club offers a space to grow in multimedia and technology. Join us to unleash your creativity and skills!',
    location: 'Atrium',
    image: require('../assets/layoutPics/Level3.png'),
    sstLoc: 'L1 Block A',
  },
  {
    id: '6',
    type: 'CCA',
    header: 'Robotics@APEX',
    description:
      'Robotics @APEX began in 2010, guided by Effective, Efficient, and Exemplary values. With dedicated students and staff, the club earned recognition in local and international robotics communities. Members work with LEGO, Arduino, and OpenCV systems, applying their skills in competitions like the First Lego League Cityshaper, iCooL Challenge, and IDE Robotics Challenge. Creative projects solve real-world issues. Competing and research develop resilience, critical thinking, communication, and project management skills for life.',
    location: 'Robotics room',
    image: require('../assets/layoutPics/Level3.png'),
    sstLoc: 'L3 Block C',
  },
  {
    id: '7',
    type: 'CCA',
    header: 'Scouts',
    description:
      "The Scout programme at SST focuses on aviation, outdoor education, and developing discipline, leadership, and teamwork. Scouts are empowered to take charge of their development using the Scout Method, becoming self-reliant, supportive, responsible, and committed. Activities encourage personal involvement and responsibility, supporting SST's values and character education.",
    location: 'Atrium',
    image: require('../assets/layoutPics/Atrium.png'),
    sstLoc: 'L1 Block A',
  },
  {
    id: '8',
    type: 'CCA',
    header: 'Guitar Ensemble',
    description:
      'Formed in 2010, the Guitar Ensemble is a full-fledged Niibori guitar ensemble comprising a close-knitted community of young, passionate musicians. Under the guidance of established guitar conductors, we work towards excellence and continue to be exposed to various song genres, from classical to jazz and modern music.',
    location: 'Atrium',
    image: require('../assets/layoutPics/Atrium.png'),
    sstLoc: 'L1 Block A',
  },
  {
    id: '9',
    type: 'CCA',
    header: 'Show Choir',
    description:
      'Show Choir and Dance, founded in 2011, became an official performing arts CCA in 2013. It comprises a show choir, blending choral singing with choreography, and a dance crew, focusing on street dance. Both arms collaborate on musical productions, earning peer recognition. Despite COVID-19, the group adapted with music video productions for events. With the return of live performances, members continue to develop artistic skills and confidence, fostering dynamic and unconventional leaders.',
    location: 'Atrium',
    image: require('../assets/layoutPics/Atrium.png'),
    sstLoc: 'L1 Block A',
  },
  {
    id: '10',
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
    id: '11',
    type: 'Applied Subjects',
    header: 'Electronics',
    description:
      'Electronics engineers solve problems and improve lives by applying their knowledge and skills in electronics. Their solutions often come in the form of electronic systems. Join our hands-on activity to experience the work of an electronic engineer! You will learn how a computer simulation is used in circuit design and build an automatic lighting system.',
    location: 'Engineering Lab',
    image: require('../assets/layoutPics/Level2.png'),
    sstLoc: 'L2 Block C',
  },
  {
    id: '12',
    type: 'Applied Subjects',
    header: 'Biotechnology',
    description:
      "Ever wondered how science and technology join forces to make the world a better place? Get ready to dive into the fascinating world of biotechnology! In this session, we'll uncover the secrets of genetic engineering and how it helps create genetically modified food. Plus, you won't want to miss our hands-on activity, where we'll explore agarose gel electrophoresis together. Join us for an unforgettable journey of discovery and fun!",
    location: 'Biotech Lab',
    image: require('../assets/layoutPics/Level1.png'),
    sstLoc: 'L1 Block C',
  },
  {
    id: '13',
    type: 'Applied Subjects',
    header: 'Design Studies',
    description:
      "The Design Studies Applied Subject explores design thinking and processes, focusing on visual communication, interior and exhibition space, and architectural design. Performance tasks foster awareness of design's connection to various disciplines. Through practical activities, students develop creative mindsets, critical thinking, and analytical skills. They also gain competencies in visual and oral communication, digital design techniques, project management, and time management, building confidence and purpose in resolving design briefs.",
    location: 'Maker Lab',
    image: require('../assets/layoutPics/MakerLab.png'),
    sstLoc: 'L3 Block C',
  },
  {
    id: '14',
    type: 'Mainstream Subjects',
    header: 'English',
    description:
      "Ready to embark on an exciting journey through the world of words and ignite your passion for English language and literature? Visit the English Language Department booth at the School of Science and Technology's Open House and discover the power of language! At our booth, you'll have the opportunity to explore the wonders of English language learning through engaging activities and interactive displays. Whether you're a budding wordsmith or just beginning your linguistic adventure, there are fun quizzes and games, as well as word puzzles for you to enjoy! Our friendly faculty members and student ambassadors will be on hand to answer any questions you may have about our English language programs, curriculum, and extracurricular activities. We look forward to welcoming you with open arms and sharing with you our innovative teaching methods and personalised approach to language learning. See you at the booth!",
    location: 'ADMT Studio',
    image: require('../assets/layoutPics/AdmtStudio.png'),
    sstLoc: 'Level 2 Block C',
  },
  {
    id: '15',
    type: 'Mainstream Subjects',
    header: 'Mother tongue language',
    description:
      'The Mother Tongue Languages (MTL) Department will showcase how interests are inculcated through immersive experiences like MTL Fortnight, where students engage in cultural workshops, multimedia projects, and language enrichment activities. Through collaborative projects and authentic learning experiences, students hone their language skills while exploring diverse perspectives and societal issues.',
    location: 'Multi-Purpose Room 4',
    image: require('../assets/layoutPics/Level3.png'),
    sstLoc: 'L3 Block C',
  },
  {
    id: '16',
    type: 'Mainstream Subjects',
    header: 'Physics',
    description:
      'Join our interactive workshop and learn the art of crafting a functional beam balance. Explore the concept of equilibrium in mechanics as you assemble this classic scientific instrument. Unleash your inner physicist through this hands-on learning experience!',
    location: 'Physics Lab',
    image: require('../assets/layoutPics/Level2.png'),
    sstLoc: 'L2 Block C',
  },
  {
    id: '17',
    type: 'Mainstream Subjects',
    header: 'Chemistry',
    description:
      'In SST, Chemistry is taught through Applied Learning with technology integration and varied assessments to understand interactions between matter. "Innovation with Colours", our booth’s theme highlights the significance of colours in chemical reactions. Explore creative and fun hands-on activities and experiments at Chemistry Lab 1. Join us to delve into colourful science!',
    location: 'Chemistry Lab',
    image: require('../assets/layoutPics/Level1.png'),
    sstLoc: 'L1 Block C',
  },
  {
    id: '18',
    type: 'Mainstream Subjects',
    header: 'Biology',
    description:
      'Biology is an academic discipline that enables us to comprehend the functioning, evolution, and interactions of various organisms within the living world, including humans. ',
    location: 'Biology Lab',
    image: require('../assets/layoutPics/Level1.png'),
    sstLoc: 'L1 Block C',
  },
  {
    id: '19',
    type: 'Mainstream Subjects',
    header: 'Science',
    description:
      'The SST Science curriculum is based on the philosophy of education through inquiry, experimentation, and discovery. Students are presented with a variety of learning experiences which pique their curiosity about the natural world and help cultivate habits of mind to be out-of-the-box innovators. The Science curriculum aims to develop students’ scientific knowledge and conceptual understanding; and Science process skills through the disciplines of Biology, Chemistry and Physics.',
    location: 'Research Lab',
    image: require('../assets/layoutPics/Level2.png'),
    sstLoc: 'L2 Block C',
  },
  {
    id: '20',
    type: 'Mainstream Subjects',
    header: 'Mathematics',
    description:
      'The SST Mathematics Programme strives to instill in students a love for Mathematics through a dynamic and innovative approach that integrates technology, authentic problem solving, mathematical modelling and computational thinking. By presenting students with performance tasks tied to real-world scenarios, students are taught to apply problem-solving skills and computational thinking to break down complex problems. The department places emphasis on the development of a Mathematical Mindset, fostering a belief that all students can excel in Mathematics. This approach encourages self-reflection, embracing mistakes, and productive struggles. The department also supports students who show aptitude and mathematical rigour through the SST Math Talent Development Programme (TDP), providing project showcases and competition opportunities.',
    location: 'ADMT Studio',
    image: require('../assets/layoutPics/AdmtStudio.png'),
    sstLoc: 'L2 Block C',
  },
  {
    id: '21',
    type: 'Mainstream Subjects',
    header: 'Humanities',
    description:
      'Through the lens of Applied Learning, the Humanities curriculum in SST is designed to cultivate a deeper understanding of people, places and modern phenomena by bridging the gap between theoretical knowledge and practical application. Explore the journey of source-based inquiry and map creation at our booth with the theme being, "Humanities in the Modern World: Illuminating Paths, Shaping Futures" ',
    location: 'ADMT Studio',
    image: require('../assets/layoutPics/AdmtStudio.png'),
    sstLoc: 'L2 Block C',
  },
  {
    id: '22',
    type: 'Mainstream Subjects',
    header: 'ADMT',
    description:
      'The Arts, Design, Media and Technology (ADMT) programme equip students with principles, knowledge and skills from prototyping to product design to interactive design media and video production. Boost your creative output at the ADMT booth to design and create a button badge of your own!',
    location: 'Maker Lab',
    image: require('../assets/layoutPics/MakerLab.png'),
    sstLoc: 'L2 Block C',
  },
  {
    id: '23',
    type: 'Mainstream Subjects',
    header: 'Informatics    ',
    description:
      'The Informatics Department comprises the lower secondary Information and Communication Technology (ICT) and upper secondary Computing+ subjects. Our mission is to inspire and enable our students to use technology as a force for good in the world. Technology has the power to solve some of the most pressing challenges our society faces. Our goal is to cultivate a community of students who are passionate about using their skills and knowledge to make a positive difference in the world. Through hands-on experiential learning and rigorous coursework, we aim to equip our students with the technical expertise and ethical grounding necessary to use technology to benefit humanity.',
    location: 'SST Inc HQ',
    image: require('../assets/layoutPics/Level3.png'),
    sstLoc: 'L3 Block C',
  },
  {
    id: '24',
    type: 'Mainstream Subjects',
    header: 'S&W',
    description:
      'The S&W curriculum is based on the philosophy of education through the physical; a multi-dimensional approach to develop students holistically through sports and games excellence. The curriculum engages students actively with relevant activities that help them learn experientially. Lessons are focused on acquiring games skills for sports recreation, uncovering games concepts for understanding, and promoting sportsmanship and sporting behaviour through authentic sports participation and competition. ',
    location: 'Outside Maker Lab',
    image: require('../assets/layoutPics/MakerLab.png'),
    sstLoc: 'L2 Block C',
  },
  {
    id: '24',
    type: 'Special',
    header: 'DSA booth',
    description:
      'Please approach us here if you have any questions regarding the DSA selection process!',
    location: 'Infohub',
    image: require('../assets/layoutPics/Level5.png'),
    sstLoc: 'L5 Block A',
  },
  {
    id: '25',
    type: 'Special',
    header: 'Academic panel',
    description:
      'Join our School Leaders and various academic staff in a conversation to find out more about the SST curriculum and opportunities that students are presented with!',
    location: 'Auditorium',
    image: require('../assets/layoutPics/Level4.png'),
    sstLoc: 'L4 Block A',
  },
  {
    id: '26',
    type: 'Special',
    header: 'Alumni panel',
    description:
      'Explore the post-secondary experience with our past students! Here, you can speak to our alumni who are at various stages of their post-secondary journey and find out more on how the SST experience has influenced them in the various pathways that they are currently on. ',
    location: 'MPR3',
    image: require('../assets/layoutPics/Level3.png'),
    sstLoc: 'L3 Block C',
  },
  {
    id: '27',
    type: 'Special',
    header: 'PforSST',
    description:
      'Hear about the SST experience from the perspective of a parent! Come and speak to our friendly PforSST members and join our panel discussion where you can gain some insights on various aspects of the school and have some of your questions answered!',
    location: 'LO1',
    image: require('../assets/layoutPics/Level3.png'),
    sstLoc: 'L3 Block C',
  },
  {
    id: '28',
    type: 'Special',
    header: 'Student life panel',
    description:
      'Take the chance to speak with and ask students about student life @ SST.',
    location: 'LO1',
    image: require('../assets/layoutPics/Level3.png'),
    sstLoc: 'L3 Block c',
  },
  {
    id: '29',
    type: 'Special',
    header: 'SST Inc',
    description:
      'SST Inc HQ. is part of SST’s technology talent development programme. It aims to be locally and globally recognised as an incubator that fosters a deep interest in Infocomm Technology among our students and nurtures their app development and entrepreneurship talents to impact their community positively.',
    location: 'SST Inc HQ',
    image: require('../assets/layoutPics/Level3.png'),
    sstLoc: 'L3 Block C',
  },
  {
    id: '30',
    type: 'Special',
    header: 'IDP',
    description:
      'The SST-Ngee Ann Polytechnic Integrated Diploma Programme (SST-NP IDP) offers a first-of-its-kind STEAM (Science, Technology, Engineering, Aesthetics, and Mathematics) - related through-train programme, providing Secondary Three students with a direct pathway to NP. This programme emphasises applied learning and engages students in a wide range of STEM fields via capstone projects with start-ups, industry partners and the community. Furthermore, students gain valuable 21st century skills, becoming innovative problem solvers and active contributors to society.',
    location: 'ADMT Studio',
    image: require('../assets/layoutPics/AdmtStudio.png'),
    sstLoc: 'L2 Block C',
  },
];
const boothInfoData = [
  {
    id: '1',
    header: 'Mainstream subjects',
    image: require('../assets/boothInfo/mainStream.png'),
  },
  {
    id: '2',
    header: 'Applied subjects',
    image: require('../assets/boothInfo/appliedSub.png'),
  },
  {
    id: '3',
    header: 'CCA',
    image: require('../assets/boothInfo/CCA.png'),
  },
  {
    id: '4',
    header: 'Special',
    image: require('../assets/boothInfo/special.jpeg'),
  },
];
const BoothInfoParentPage = ({navigation}) => {
  const [isSearchBarVisible, setSearchBarVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchAnim] = useState(new Animated.Value(-100)); // Initial position off the right of the screen
  const [displayItems, setDisplayItems] = useState([]);
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const handleChange = text => {
    setSearchTerm(text);
    const query = text.trim().toLowerCase();
    const filteredData = boothInfoData.filter(item =>
      item.header.toLowerCase().includes(query),
    );
    setDisplayItems(
      filteredData.map(item => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.header)}
          style={styles.entireBox}
          key={item.id}>
          <ImageBackground
            source={item.image}
            style={{width: '100%', height: '100%'}}>
            <View style={styles.box}>
              <View
                style={{
                  justifyContent: 'center',
                  flexDirection: 'row',
                  gap: width * 0.15,
                }}>
                <Text
                  allowFontScaling={false}
                  style={[styles.boxHeader, {flexShrink: 1}]}>
                  {item.header}
                </Text>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none">
                  <Path
                    d="M23.0613 17.0613L13.0613 27.0613C12.7795 27.343 12.3973 27.5014 11.9988 27.5014C11.6002 27.5014 11.218 27.343 10.9363 27.0613C10.6545 26.7795 10.4962 26.3973 10.4962 25.9988C10.4962 25.6002 10.6545 25.218 10.9363 24.9363L19.875 16L10.9388 7.06126C10.7992 6.92173 10.6885 6.75608 10.613 6.57378C10.5375 6.39147 10.4987 6.19608 10.4987 5.99876C10.4987 5.80143 10.5375 5.60604 10.613 5.42374C10.6885 5.24143 10.7992 5.07579 10.9388 4.93626C11.0783 4.79673 11.2439 4.68605 11.4262 4.61053C11.6085 4.53502 11.8039 4.49615 12.0013 4.49615C12.1986 4.49615 12.394 4.53502 12.5763 4.61053C12.7586 4.68605 12.9242 4.79673 13.0638 4.93626L23.0638 14.9363C23.2034 15.0758 23.3142 15.2415 23.3897 15.4239C23.4652 15.6063 23.5039 15.8019 23.5037 15.9993C23.5035 16.1967 23.4643 16.3921 23.3883 16.5744C23.3124 16.7566 23.2013 16.9221 23.0613 17.0613Z"
                    fill="#EBEBEF"
                  />
                </Svg>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      )),
    );
  };

  const handlePress = () => {
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
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/background.png')}
        style={styles.imageBackground}>
        <SafeAreaView style={{flex: 1}}>
          <ScrollView>
            <View style={{marginTop: '5%'}} />
            <View>
              <View style={styles.topSidebar}>
                <Text allowFontScaling={false} style={styles.header}>
                  Booth Info
                </Text>
                <TouchableOpacity onPress={handlePress}>
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
                <TouchableOpacity
                  style={styles.hamburgerIconPress}
                  onPress={() => navigation.openDrawer()}>
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    style={{marginTop: '15%'}}>
                    <Path
                      d="M42.5 24.25C42.5 24.8467 42.2629 25.419 41.841 25.841C41.419 26.2629 40.8467 26.5 40.25 26.5H7.25C6.65326 26.5 6.08097 26.2629 5.65901 25.841C5.23705 25.419 5 24.8467 5 24.25C5 23.6533 5.23705 23.081 5.65901 22.659C6.08097 22.2371 6.65326 22 7.25 22H40.25C40.8467 22 41.419 22.2371 41.841 22.659C42.2629 23.081 42.5 23.6533 42.5 24.25ZM7.25 14.5H40.25C40.8467 14.5 41.419 14.2629 41.841 13.841C42.2629 13.419 42.5 12.8467 42.5 12.25C42.5 11.6533 42.2629 11.081 41.841 10.659C41.419 10.2371 40.8467 10 40.25 10H7.25C6.65326 10 6.08097 10.2371 5.65901 10.659C5.23705 11.081 5 11.6533 5 12.25C5 12.8467 5.23705 13.419 5.65901 13.841C6.08097 14.2629 6.65326 14.5 7.25 14.5ZM40.25 34H7.25C6.65326 34 6.08097 34.2371 5.65901 34.659C5.23705 35.081 5 35.6533 5 36.25C5 36.8467 5.23705 37.419 5.65901 37.841C6.08097 38.2629 6.65326 38.5 7.25 38.5H40.25C40.8467 38.5 41.419 38.2629 41.841 37.841C42.2629 37.419 42.5 36.8467 42.5 36.25C42.5 35.6533 42.2629 35.081 41.841 34.659C41.419 34.2371 40.8467 34 40.25 34Z"
                      fill="#1C1C12"
                    />
                  </Svg>
                </TouchableOpacity>
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
              <View style={{margin: '30%'}} />
              <View style={{marginTop: '-49%'}}></View>
              {searchTerm === '' ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      console.log('Button pressed');
                      navigation.navigate('MainStream');
                    }}
                    style={styles.entireBox}>
                    <ImageBackground
                      source={require('../assets/boothInfo/mainStream.png')}
                      style={{width: '100%', height: '100%'}}>
                      <View style={styles.box}>
                        <View
                          style={{
                            justifyContent: 'center',
                            flexDirection: 'row',
                            gap: width * 0.2,
                          }}>
                          <Text
                            allowFontScaling={false}
                            style={styles.boxHeader}>
                            Mainstream subjects
                          </Text>
                          <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none">
                            <Path
                              d="M23.0613 17.0613L13.0613 27.0613C12.7795 27.343 12.3973 27.5014 11.9988 27.5014C11.6002 27.5014 11.218 27.343 10.9363 27.0613C10.6545 26.7795 10.4962 26.3973 10.4962 25.9988C10.4962 25.6002 10.6545 25.218 10.9363 24.9363L19.875 16L10.9388 7.06126C10.7992 6.92173 10.6885 6.75608 10.613 6.57378C10.5375 6.39147 10.4987 6.19608 10.4987 5.99876C10.4987 5.80143 10.5375 5.60604 10.613 5.42374C10.6885 5.24143 10.7992 5.07579 10.9388 4.93626C11.0783 4.79673 11.2439 4.68605 11.4262 4.61053C11.6085 4.53502 11.8039 4.49615 12.0013 4.49615C12.1986 4.49615 12.394 4.53502 12.5763 4.61053C12.7586 4.68605 12.9242 4.79673 13.0638 4.93626L23.0638 14.9363C23.2034 15.0758 23.3142 15.2415 23.3897 15.4239C23.4652 15.6063 23.5039 15.8019 23.5037 15.9993C23.5035 16.1967 23.4643 16.3921 23.3883 16.5744C23.3124 16.7566 23.2013 16.9221 23.0613 17.0613Z"
                              fill="#EBEBEF"
                            />
                          </Svg>
                        </View>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AppliedSub')}
                    style={styles.entireBox}>
                    <ImageBackground
                      source={require('../assets/boothInfo/appliedSub.png')}
                      style={{width: '100%', height: '100%'}}>
                      <View style={styles.box}>
                        <View
                          style={{
                            justifyContent: 'center',
                            flexDirection: 'row',
                            gap: width * 0.321,
                          }}>
                          <Text
                            allowFontScaling={false}
                            style={styles.boxHeader}>
                            Applied subjects
                          </Text>
                          <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none">
                            <Path
                              d="M23.0613 17.0613L13.0613 27.0613C12.7795 27.343 12.3973 27.5014 11.9988 27.5014C11.6002 27.5014 11.218 27.343 10.9363 27.0613C10.6545 26.7795 10.4962 26.3973 10.4962 25.9988C10.4962 25.6002 10.6545 25.218 10.9363 24.9363L19.875 16L10.9388 7.06126C10.7992 6.92173 10.6885 6.75608 10.613 6.57378C10.5375 6.39147 10.4987 6.19608 10.4987 5.99876C10.4987 5.80143 10.5375 5.60604 10.613 5.42374C10.6885 5.24143 10.7992 5.07579 10.9388 4.93626C11.0783 4.79673 11.2439 4.68605 11.4262 4.61053C11.6085 4.53502 11.8039 4.49615 12.0013 4.49615C12.1986 4.49615 12.394 4.53502 12.5763 4.61053C12.7586 4.68605 12.9242 4.79673 13.0638 4.93626L23.0638 14.9363C23.2034 15.0758 23.3142 15.2415 23.3897 15.4239C23.4652 15.6063 23.5039 15.8019 23.5037 15.9993C23.5035 16.1967 23.4643 16.3921 23.3883 16.5744C23.3124 16.7566 23.2013 16.9221 23.0613 17.0613Z"
                              fill="#EBEBEF"
                            />
                          </Svg>
                        </View>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('CCA')}
                    style={styles.entireBox}>
                    <ImageBackground
                      source={require('../assets/boothInfo/CCA.png')}
                      style={{width: '100%', height: '100%'}}>
                      <View style={styles.box}>
                        <View
                          style={{
                            justifyContent: 'center',
                            flexDirection: 'row',
                            gap: width * 0.65,
                          }}>
                          <Text
                            allowFontScaling={false}
                            style={styles.boxHeader}>
                            CCA
                          </Text>
                          <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none">
                            <Path
                              d="M23.0613 17.0613L13.0613 27.0613C12.7795 27.343 12.3973 27.5014 11.9988 27.5014C11.6002 27.5014 11.218 27.343 10.9363 27.0613C10.6545 26.7795 10.4962 26.3973 10.4962 25.9988C10.4962 25.6002 10.6545 25.218 10.9363 24.9363L19.875 16L10.9388 7.06126C10.7992 6.92173 10.6885 6.75608 10.613 6.57378C10.5375 6.39147 10.4987 6.19608 10.4987 5.99876C10.4987 5.80143 10.5375 5.60604 10.613 5.42374C10.6885 5.24143 10.7992 5.07579 10.9388 4.93626C11.0783 4.79673 11.2439 4.68605 11.4262 4.61053C11.6085 4.53502 11.8039 4.49615 12.0013 4.49615C12.1986 4.49615 12.394 4.53502 12.5763 4.61053C12.7586 4.68605 12.9242 4.79673 13.0638 4.93626L23.0638 14.9363C23.2034 15.0758 23.3142 15.2415 23.3897 15.4239C23.4652 15.6063 23.5039 15.8019 23.5037 15.9993C23.5035 16.1967 23.4643 16.3921 23.3883 16.5744C23.3124 16.7566 23.2013 16.9221 23.0613 17.0613Z"
                              fill="#EBEBEF"
                            />
                          </Svg>
                        </View>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('SpecialEvents')}
                    style={styles.entireBox}>
                    <ImageBackground
                      source={require('../assets/boothInfo/special.jpeg')}
                      style={{width: '100%', height: '100%'}}>
                      <View style={styles.box}>
                        <View
                          style={{
                            justifyContent: 'center',
                            flexDirection: 'row',
                            gap: width * 0.57,
                          }}>
                          <Text
                            allowFontScaling={false}
                            style={styles.boxHeader}>
                            Special
                          </Text>
                          <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none">
                            <Path
                              d="M23.0613 17.0613L13.0613 27.0613C12.7795 27.343 12.3973 27.5014 11.9988 27.5014C11.6002 27.5014 11.218 27.343 10.9363 27.0613C10.6545 26.7795 10.4962 26.3973 10.4962 25.9988C10.4962 25.6002 10.6545 25.218 10.9363 24.9363L19.875 16L10.9388 7.06126C10.7992 6.92173 10.6885 6.75608 10.613 6.57378C10.5375 6.39147 10.4987 6.19608 10.4987 5.99876C10.4987 5.80143 10.5375 5.60604 10.613 5.42374C10.6885 5.24143 10.7992 5.07579 10.9388 4.93626C11.0783 4.79673 11.2439 4.68605 11.4262 4.61053C11.6085 4.53502 11.8039 4.49615 12.0013 4.49615C12.1986 4.49615 12.394 4.53502 12.5763 4.61053C12.7586 4.68605 12.9242 4.79673 13.0638 4.93626L23.0638 14.9363C23.2034 15.0758 23.3142 15.2415 23.3897 15.4239C23.4652 15.6063 23.5039 15.8019 23.5037 15.9993C23.5035 16.1967 23.4643 16.3921 23.3883 16.5744C23.3124 16.7566 23.2013 16.9221 23.0613 17.0613Z"
                              fill="#EBEBEF"
                            />
                          </Svg>
                        </View>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                  <View style={{marginTop: '32%'}} />
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {displayItems}
                </View>
              )}
            </View>
          </ScrollView>
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
  box: {
    backgroundColor: 'rgba(28, 28, 18, 0.40)', // Set the background color
    shadowColor: 'rgba(28, 28, 18, 0.15)', // Set the shadow color
    shadowOffset: {width: 0, height: 0}, // Set the shadow offset
    shadowOpacity: 0.15, // Set the shadow opacity
    shadowRadius: 45, // Set the shadow radius
    elevation: 45, // for Android
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxHeader: {
    color: '#EBEBEF',
    fontFamily: 'Prototype',
    fontSize: 27,
    fontWeight: '400',
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

export {BoothInfo, data};
