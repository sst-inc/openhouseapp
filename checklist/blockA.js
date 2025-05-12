import React, {useState, useEffect, useRef, createContext} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import Svg, {Circle, Path, Line, G, Rect} from 'react-native-svg';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {data as boothInfoData} from '../boothScreens/BoothInfo';

export default function BlockA({navigation, route}) {
  const [checkedBooths, setCheckedBooths] = useState({});
  const blockheader = route?.params?.option || 'Block A';
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const storedBooths = await AsyncStorage.getItem('checkedBooths');
        if (storedBooths) {
          setCheckedBooths(JSON.parse(storedBooths));
        }
      } catch (error) {
        console.error('Error loading checked booths:', error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(
          'checkedBooths',
          JSON.stringify(checkedBooths),
        );
      } catch (error) {
        console.error('Error saving checked booths:', error);
      }
    })();
  }, [checkedBooths]);

  const boothsByLocation = {
    'Block A': {
      'Level 1': [
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
          id: '23',
          type: 'CCA',
          header: 'Fencing',
          description:
            'Fencing is more than just a sport—it is a platform for students to develop character, leadership, and sportsmanship. Through rigorous training and competitions, fencers cultivate discipline, resilience, and strategic thinking, essential qualities for both sport and life. Our CCA is committed to raising the standards of every fencer, enhancing their skills, and grooming them into capable and confident sportsmen. With dedicated coaching and structured development programs, we aim to nurture future leaders who exhibit integrity, commitment, and perseverance. Join us and embark on a journey of excellence in both fencing and personal growth!',
          location: 'Atrium',
          image: require('../assets/layoutPics/Atrium.png'),
          sstLoc: 'L1 Block A',
        },
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
          id: '28',
          type: 'CCA',
          header: 'Singapore Youth Flying Club',
          description:
            'SYFC offers students a unique opportunity to explore aviation. Through engaging programs like aeromodelling, simulator flying, and aviation knowledge courses, students gain hands-on experience and deepen their understanding of flight. The CCA also includes thrilling real-world exposure via joyrides on RSAF aircraft.  With courses on aerodynamics, aircraft propulsion systems, and quadcopter flying, participants develop technical skills and knowledge. This CCA inspires future aviators and nurture passionate aviators who aspire to improve society through real-world applications of science and technology.',
          location: 'Atrium',
          image: require('../assets/layoutPics/Atrium.png'),
          sstLoc: 'L1 Block A',
        },
      ],
      'Level 5': [
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
      ],
    },
    'Block C': {
      'Level 1': [
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
          id: '12',
          type: 'Academic',
          header: 'Biology hands on',
          description:
            'Biology is an academic discipline that enables us to comprehend the functioning, evolution, and interactions of various organisms within the living world, including humans. Learning from our natural environment, beyond the boundaries of our classroom, we will explore the rich diversity of the world of plants and how they evolved millions of years ago on the very grounds of SST. ',
          location: 'Bio Lab 1',
          image: require('../assets/layoutPics/Level1.png'),
          sstLoc: 'L1 Block C',
        },
      ],
      'Level 2': [
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
          id: '13',
          type: 'Environmental Education',
          header: ' ',
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
      ],
      'Level 3': [
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
          header: 'Student Life Panel \n and exhibition ',
          description:
            'Take the chance to speak with and hear from our students as they share their experiences, challenges, and highlights of their student life @ SST.',
          location: 'LO2',
          image: require('../assets/layoutPics/Level3.png'),
          sstLoc: 'L3 Block C',
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
          id: '24',
          type: 'CCA',
          header: 'Robotics',
          description:
            'Founded in 2010 by a group of passionate students, Robotics @APEX has grown into a dynamic club known for its excellence in both local and international robotics competitions. Guided by our core values—Effective, Efficient, and Exemplary—we continuously push boundaries in innovation and teamwork. \n As a member, you’ll explore various robotics systems, including Arduino, LEGO, and VEX, through student-led workshops. You’ll also have the opportunity to compete in prestigious competitions like First LEGO League, IDE, NRC, and VEX Robotics, as well as international events such as RoboRAVE Japan and the VEX Robotics World Championship. \n Beyond competitions, we encourage members to take on passion projects, allowing creativity and problem-solving skills to thrive. Join us and be part of a team that brings ideas to life through robotics!',
          location: 'Robotics Room',
          image: require('../assets/layoutPics/Level3.png'),
          sstLoc: 'L3 Block C',
        },
      ],
      'Level 4': [
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
      ],
      'Level 5': [
        {
          id: '8',
          type: 'Special',
          header: 'Physics hands on',
          description:
            'Join our interactive workshop at Physics Lab 2 and learn the art of crafting a functional beam balance. Explore the concept of equilibrium in mechanics as you assemble this classic scientific instrument. Unleash your inner physicist through this hands-on learning experience!',
          location: 'Physics Lab 2',
          image: require('../assets/layoutPics/Level5c.png'),
          sstLoc: 'L5 Block C',
        },
        {
          id: '7',
          type: 'Academic',
          header: 'MTL Dept',
          description:
            "Get ready to dive into the exciting world of language and culture with the Mother Tongue Languages (MTL) Department! We’re thrilled to showcase how passions come alive through immersive experiences like MTL Fortnight, where students embark on a journey of cultural workshops, multimedia projects, and fun-filled language enrichment activities. Through collaborative projects and hands-on learning, students not only sharpen their language skills but also gain fresh insights into diverse perspectives and important societal issues. From thrilling cultural immersion trips in the TDP programme to friendly competitions, in-house training, and even real-life exposure through emceeing – there's never a dull moment! Join us and experience language learning like never before!",
          location: 'MTL Room',
          image: require('../assets/layoutPics/Level5c.png'),
          sstLoc: 'L5 Block C ',
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
      ],
    },
  };

  const toggleBooth = boothId => {
    setCheckedBooths(prev => ({
      ...prev,
      [boothId]: !prev[boothId],
    }));
  };

  const handleSearch = text => {
    setSearchTerm(text);
    const query = text.trim().toLowerCase();
    if (query === '') {
      setSearchResults([]);
      return;
    }
    const results = Object.values(boothsByLocation['Block A'])
      .flat()
      .filter(
        booth => booth.header && booth.header.toLowerCase().includes(query),
      );
    setSearchResults(results);
  };

  const blockFloors = boothsByLocation[blockheader] || {};

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/background.png')}
        style={{flex: 1, width: '100%', height: '100%'}}>
        <SafeAreaView style={{flex: 1}}>
          {/* Arrow row */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 18,
              marginBottom: 0,
              paddingHorizontal: 18,
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.arrowBackBtn}>
              <Image
                source={require('../assets/boothInfo/arrow.png')}
                style={{width: 36, height: 36}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
              paddingHorizontal: 18,
            }}>
            <Text
              style={[
                styles.detailedBlockTitle,
                {textAlign: 'left', marginLeft: 0},
              ]}>
              Block {blockheader.slice(-1)}
            </Text>
            <TouchableOpacity
              style={styles.hamburgerIconPress}
              onPress={() => navigation.openDrawer()}>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 48 48"
                fill="none">
                <Path
                  d="M42.5 24.25C42.5 24.8467 42.2629 25.419 41.841 25.841C41.419 26.2629 40.8467 26.5 40.25 26.5H7.25C6.65326 26.5 6.08097 26.2629 5.65901 25.841C5.23705 25.419 5 24.8467 5 24.25C5 23.6533 5.23705 23.081 5.65901 22.659C6.08097 22.2371 6.65326 22 7.25 22H40.25C40.8467 22 41.419 22.2371 41.841 22.659C42.2629 23.081 42.5 23.6533 42.5 24.25ZM7.25 14.5H40.25C40.8467 14.5 41.419 14.2629 41.841 13.841C42.2629 13.419 42.5 12.8467 42.5 12.25C42.5 11.6533 42.2629 11.081 41.841 10.659C41.419 10.2371 40.8467 10 40.25 10H7.25C6.65326 10 6.08097 10.2371 5.65901 10.659C5.23705 11.081 5 11.6533 5 12.25C5 12.8467 5.23705 13.419 5.65901 13.841C6.08097 14.2629 6.65326 14.5 7.25 14.5ZM40.25 34H7.25C6.65326 34 6.08097 34.2371 5.65901 34.659C5.23705 35.081 5 35.6533 5 36.25C5 36.8467 5.23705 37.419 5.65901 37.841C6.08097 38.2629 6.65326 38.5 7.25 38.5H40.25C40.8467 38.5 41.419 38.2629 41.841 37.841C42.2629 37.419 42.5 36.8467 42.5 36.25C42.5 35.6533 42.2629 35.081 41.841 34.659C41.419 34.2371 40.8467 34 40.25 34Z"
                  fill="#1C1C12"
                />
              </Svg>
            </TouchableOpacity>
          </View>
          {/* Search Bar */}
          <View
            style={{paddingHorizontal: 18, marginTop: 10, marginBottom: 10}}>
            <TextInput
              style={{
                backgroundColor: '#E3E3E8',
                borderRadius: 16,
                paddingHorizontal: 20,
                height: 48,
                fontSize: 18,
                color: '#1C1C12',
              }}
              placeholder="Search booths..."
              placeholderTextColor="#979797"
              value={searchTerm}
              onChangeText={handleSearch}
              returnKeyType="search"
            />
          </View>
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={{paddingBottom: 40}}>
            {searchTerm && searchResults.length > 0
              ? searchResults.map(booth => (
                  <View key={booth.id} style={styles.detailedBoothRow}>
                    <TouchableOpacity
                      style={{flex: 1}}
                      onPress={() =>
                        navigation.navigate('BoothDetail', {item: booth})
                      }>
                      <Text style={styles.detailedBoothheader}>
                        {booth.header}
                      </Text>
                      <Text style={styles.detailedBoothLocation}>
                        {booth.location}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => toggleBooth(booth.id)}
                      style={styles.stampCheckboxContainer}>
                      {checkedBooths[booth.id] ? (
                        <Svg
                          width={32}
                          height={32}
                          viewBox="0 0 32 32"
                          fill="none">
                          <Circle cx={16} cy={16} r={16} fill="#356AA9" />
                          <Path
                            d="M10 17l4 4 8-8"
                            stroke="#fff"
                            strokeWidth={3}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </Svg>
                      ) : (
                        <Svg
                          width={32}
                          height={32}
                          viewBox="0 0 32 32"
                          fill="none">
                          <Circle
                            cx={16}
                            cy={16}
                            r={15}
                            stroke="#356AA9"
                            strokeWidth={2}
                            fill="#fff"
                          />
                        </Svg>
                      )}
                    </TouchableOpacity>
                  </View>
                ))
              : Object.entries(blockFloors).map(([level, item]) => (
                  <View key={level} style={{marginBottom: 24}}>
                    <Text style={styles.levelHeader}>{level}</Text>
                    {item.map(booth => (
                      <View key={booth.id} style={styles.detailedBoothRow}>
                        <TouchableOpacity
                          style={{flex: 1}}
                          onPress={() =>
                            navigation.navigate('BoothDetail', {item: booth})
                          }>
                          <Text style={styles.detailedBoothheader}>
                            {booth.header}
                          </Text>
                          <Text style={styles.detailedBoothLocation}>
                            {booth.location}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => toggleBooth(booth.id)}
                          style={styles.stampCheckboxContainer}>
                          {checkedBooths[booth.id] ? (
                            <Svg
                              width={32}
                              height={32}
                              viewBox="0 0 32 32"
                              fill="none">
                              <Circle cx={16} cy={16} r={16} fill="#356AA9" />
                              <Path
                                d="M10 17l4 4 8-8"
                                stroke="#fff"
                                strokeWidth={3}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </Svg>
                          ) : (
                            <Svg
                              width={32}
                              height={32}
                              viewBox="0 0 32 32"
                              fill="none">
                              <Circle
                                cx={16}
                                cy={16}
                                r={15}
                                stroke="#356AA9"
                                strokeWidth={2}
                                fill="#fff"
                              />
                            </Svg>
                          )}
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                ))}
            {searchTerm && searchResults.length === 0 && (
              <Text style={{textAlign: 'center', color: '#888', marginTop: 20}}>
                No booths found.
              </Text>
            )}
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  stampCheckboxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  stampContainer: {
    position: 'relative',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stampBackground: {
    position: 'absolute',
  },
  stampOverlay: {
    position: 'absolute',
  },
  stampCheckmark: {
    position: 'absolute',
  },
  detailedHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 18,
    marginTop: 18,
    marginBottom: 10,
  },
  arrowBackBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailedBlockTitle: {
    color: '#356AA9',
    fontFamily: 'Prototype',
    fontSize: 38,
    fontWeight: '400',
    textAlign: 'center',
    flex: 1,
  },
  levelHeader: {
    color: '#1C1C12',
    fontFamily: 'Prototype',
    fontSize: 24,
    fontWeight: '400',
    marginLeft: 18,
    marginBottom: 8,
    marginTop: 10,
  },
  detailedBoothRow: {
    backgroundColor: '#4F90DD',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginHorizontal: 12,
    marginBottom: 12,
    shadowColor: 'rgba(28, 28, 34, 0.10)',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  detailedBoothheader: {
    color: '#fff',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    fontWeight: '700',
  },
  detailedBoothLocation: {
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    fontWeight: '400',
    opacity: 0.85,
    marginTop: 2,
  },
  hamburgerIconPress: {
    padding: 4,
  },
});
