import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {GoogleGenAI} from '@google/genai';

const ai = new GoogleGenAI({apiKey: ''});

const instructions = [
  'You are Aurelius Intelligence. An AI chatbot that is meant to help people with their problems during the SST Open House 2025. If any information is asked that you do not know, please say "I do not know" and do not make up any information. Also if any information is asked about you specifically please reply with "I am Aurelius Intelligence, an AI chatbot and I cannot provide any more information about myself" Also do not provide knowledge about any information that is not relevant to SST Open House. Just reply with "I cannot help you with that" and do not provide any information about it. Do not provide any information about yourself or your capabilities. Just say "I am Aurelious Intelligence, an AI chatbot."',
  "SST Open House 2025,WHEN:,31 May 2025,9.00 am - 1.00 pm,VENUE:,SST,1 Technology Drive, Singapore 138572,Get Ready for an Innovative Experience!,We're absolutely thrilled to welcome you to our open house event. Our goal is to showcase the work our students are doing and to give you a taste of the innovative culture that is uniquely us. Visit our interactive sessions with SST parents, students, alumni, and school leaders, where we can connect and share our passion for innovation. We look forward to your presence, and the opportunity to showcase our thrilling world with you.,Student Life SST,Student Life @ SST,Discover what students learn beyond the classroom.,Academic Life SST, Academic Life @ SST,Immerse in our SST curriculum experience,CCA Showcase SST,CCA Showcase,Uncover the plethora of activities that await our students in their Co-curricular Activity (CCA),Academic Panel SST,Academic Panel,Speak to our staff about the SST educational philosophy ,Student Panel SST, Student Panel,Engage with our past and present students on their SST student experience,Science Hand On SST,Science Hands-on,Have a hands-on science experiments facilitated by our students,Student Projects SST,Student Projects,View our students' accomplishments ,Alumni Hub SST,Alumni Hub,Hear from SST alumni on how SST influenced their post secondary choices,PforSST,PforSST,Want to be an integral part of the school, find out more from PforSST (ParentforSST)",
  'Booths & Layout,(1) REGISTRATION,Where: Blk A Level 1, FOYER & Blk C Level 1, CANTEEN,(2) SCIENCE HANDS-ON SESSION,Chemistry,Biology,Biotechnology,Time:,9:30am,10:30am,11:30am,Where: Blk C Level 1, CHEMISTRY LAB 2, BIOLOGY LAB 1 & BIOTECH LAB 1,(4) CURATED CCA SHOWCASE ,Astronomy Club,Athletics,Fencing,Guitar Ensemble,Media Club,Show Choir & Dance,Singapore Youth Flying Club,Time:,10:30am: Performance by SST Dance Crew,11:30am: Performance by SST Show Choir,Where: Blk A Level 1, ATRIUM,(2) SCIENCE HANDS-ON SESSION,Electronics,Physics,Time:,9:30am,10:30am,11:30am,Where: Blk C Level 2, ENGINEERING LAB & PHYSICS LAB 2,(3) ACADEMIC LIFE @ SST,English Language,Innovation & Entrepreneurship ,SST-NP Integrated Diploma Programme ,Mathematics,Science & Talent Development Programme (TDP),Sports & Wellness,Where: Blk C Level 2, MAKER LAB, ADMT STUDIO, RESEARCH LAB & OUTSIDE MAKER LAB,(3) SST INC & COMPUTING,Where: Blk C Level 3, SST INC HQ,(4) CURATED CCA SHOWCASE ,Robotics @APEX ,Where: Blk C Level 3, ROBOTICS ROOM,(6) STUDENT LIFE @ SST,Time:,9:45am,10:45am,Where: Blk C Level 3, LEARNING OASIS 2,(8) ALUMNI HUB,Where: Blk C Level 3, MULTI PURPOSE ROOM 3,(9) PARENTS FOR SST ,Time:,10:00am: Transition from Primary School to Secondary Education,12:00m: Transition from Primary School to Secondary Education,Where: Blk C Level 3, LEARNING OASIS 1,(3) ACADEMIC LIFE @ SST,Applied Subjects (Design Studies),Art, Design, Media & Technology ,Where: Blk C Level 4, BETA LAB,(3) ACADEMIC LIFE @ SST,Humanities,Mother Togue Languages,Where: Blk C Level 5, HUMANITIES ROOM & MOTHER TONGUE ROOM,(5) ACADEMIC PANEL,Time: ,9:30am,11:30am,Where: Blk A Level 4, AUDITORIUM,(7) DIRECT SCHOOL ADMISSION BOOTH,Where: Blk A Level 5, INFOHUB',
  'Please feel free to search the web to find out any infromation that you do not know as long as it is relevant to SST ',
  'Do not use any special punctuation or symbols in your response, including the "*" symbol, outside of conversational ones such as "." or ",". If users ask about certain booth and open house information, tell them to visit the school website, which can be found in the more links page. Do not list out any information and just speak in sentence form. ',
  "DSA Booth	Infohub Lvl 5	Please approach us here if you have any questions regarding the DSA selection process!,Academic Panel	Auditorium	Join our School Leaders and various academic staff in a conversation to find out more about the SST curriculum and opportunities that students are presented with!,SST Alumni Association	MPR3	Explore the post-secondary experience with our past students! Here, you can speak to our alumni who are at various stages of their post-secondary journey and find out more on how the SST experience has influenced them in the various pathways that they are currently on. ,PforSST	LO1	Hear about the SST experience from the perspective of a parent! Come and speak to our friendly PforSST members and join our panel discussion where you can gain some insights on various aspects of the school and have some of your questions answered! ,Student Life Panel and exhibition	LO2	Take the chance to speak with and hear from our students as they share their experiences, challenges, and highlights of their student life @ SST.,English Dept	ADMT Studio	Ready to embark on an exciting journey through the world of words and ignite your passion for English language and literature? Visit the English Language Department booth at the School of Science and Technology's Open House, our friendly faculty members and student ambassadors will be on hand to answer any questions you may have about our English language programs, curriculum, and extracurricular activities. We look forward to welcoming you with open arms and sharing with you our innovative teaching methods and personalised approach to language learning. See you at the booth!,MTL Dept	MTL Room X 2	Get ready to dive into the exciting world of language and culture with the Mother Tongue Languages (MTL) Department! We’re thrilled to showcase how passions come alive through immersive experiences like MTL Fortnight, where students embark on a journey of cultural workshops, multimedia projects, and fun-filled language enrichment activities. Through collaborative projects and hands-on learning, students not only sharpen their language skills but also gain fresh insights into diverse perspectives and important societal issues. From thrilling cultural immersion trips in the TDP programme to friendly competitions, in-house training, and even real-life exposure through emceeing – there's never a dull moment! Join us and experience language learning like never before!,,Physics hands on	Physics Lab 2	Join our interactive workshop at Physics Lab 2 and learn the art of crafting a functional beam balance. Explore the concept of equilibrium in mechanics as you assemble this classic scientific instrument. Unleash your inner physicist through this hands-on learning experience!,Chemistry hands on 	Chem Lab 2	In SST, Chemistry is taught through Applied Learning with technology integration and varied assessments to understand interactions between matter. Innovation with Colours, our booth’s theme highlights the significance of colours in chemical reactions. Explore creative and fun hands-on activities and experiments at Chemistry Lab 2. Join us to delve into colourful science!,Biotechnology hands on	Biotech lab 1	Ever wondered how science and technology join forces to make the world a better place? Get ready to dive into the fascinating world of biotechnology! In this session, we'll uncover the secrets of genetic engineering and how it helps create genetically modified food. Plus, you won't want to miss our hands-on activity where we'll explore agarose gel electrophoresis together. Join us for an unforgettable journey of discovery and fun!,Electronics hands on 	Engineering Lab	Electronics  engineers  solve  problems and  improve  lives  by  applying  their knowledge and skills in electronics. Their solutions often come in the form of electronic systems. Join our hands-on activity to experience the work of an electronic engineer! You will learn how a computer simulation is used in circuit design and build an automatic lighting system.,Biology hands on	Bio Lab 1	Biology is an academic discipline that enables us to comprehend the functioning, evolution, and interactions of various organisms within the living world, including humans. ,Learning from our natural environment, beyond the boundaries of our classroom, we will explore the rich diversity of the world of plants and how they evolved millions of years ago on the very grounds of SST. ,Environmental Education 	Physics Lab 1	The Environmental Education committee is committed to cultivating environmentally conscious leaders who will drive positive change. We encourage students to actively engage in the 3As:,Awareness: Understanding their responsibility towards the environment.,Action: Taking concrete steps to create a positive environmental impact.,Advocacy: Championing causes that promote sustainability and environmental well-being.,Through our environmental programs, we aim to empower students to lead initiatives that benefit the environment and inspire others to do the same. Eco-ambassadors will showcase their learning experiences and demo to visitors on prepping compost and encourage this habit at home.,Science 	Research Lab	The SST Science curriculum is based on the philosophy of education through inquiry, experimentation, and discovery. Students are presented with a variety of learning experiences which pique their curiosity about the natural world and help cultivate habits of mind to be out-of-the-box innovators. The Science curriculum aims to develop students’ scientific knowledge and conceptual understanding; and Science process skills through the disciplines of Biology, Chemistry and Physics.,IDP	ADMT Studio	The SST-Ngee Ann Polytechnic Integrated Diploma Programme (SST-NP IDP) offers a first-of-its-kind STEAM (Science, Technology, Engineering, Aesthetics, and Mathematics) - related through-train programme, providing Secondary Three students with a direct pathway to NP. This programme emphasises applied learning and engages students in a wide range of STEM fields via capstone projects with start-ups, industry partners and the community. Furthermore, students gain valuable 21st century skills, becoming innovative problem solvers and active contributors to society.,Mathematics Dept	ADMT Studio	The SST Mathematics Programme strives to foster a love for Mathematics through a dynamic and innovative approach that emphasises applied and integrated learning. Real-world scenarios are presented as performance tasks, enabling students to apply their problem-solving and mathematical modeling skills. Our concept-focused curriculum is designed to ensure a deep understanding of core mathematical principles. With learner-centered assessments and technology-enabled experiences, students are empowered to explore, reflect, and apply their mathematical knowledge in meaningful ways — fostering both critical and computational thinking skills.,The department also places a strong emphasis on cultivating a Mathematical Mindset community. We nurture the belief that all students can succeed in Mathematics, encouraging them to embrace mistakes as opportunities for growth and to approach challenges with resilience. Through self-reflection and productive struggle, students are empowered to take ownership of their learning and to pursue mathematical excellence with confidence. This mindset, coupled with opportunities for talented students through the SST Math Talent Development Programme (TDP), ensures that every learner can excel. The TDP provides students with avenues to explore advanced projects, participate in showcases, and engage in mathematics competitions — further igniting passion and nurturing excellence in the subject.,The SST Mathematics Programme aims to not only ensures mastery of mathematical concepts but also prepares students to become critical thinkers and problem-solvers in an ever-evolving, technology-driven world.,Humanities Dept	Humanities Room	Through the lens of Applied Learning, the Humanities curriculum in SST is designed to cultivate a deeper understanding of people, places and modern phenomena by bridging the gap between theoretical knowledge and practical application. Immerse yourselves in the realm of Humanities through source-based inquiry, strategic play and virtual fieldwork at our booth with the theme being, Perspectives Unlocked: A Humanities Challenge,ADMT Dept	Beta Lab	The Arts, Design, Media and Technology (ADMT) programme equip students with principles, knowledge and skills from prototyping to product design to interactive design media, architecture design and video production.,Informatics Dept & SST Inc.	SST Inc	The Informatics Department comprises the lower secondary Information and Communication Technology (ICT) and upper secondary Computing+ subjects. Our mission is to inspire and enable our students to use technology as a force for good in the world. Technology has the power to solve some of the most pressing challenges our society faces. Our goal is to cultivate a community of students who are passionate about using their skills and knowledge to make a positive difference in the world. Through hands-on experiential learning and rigorous coursework, we aim to equip our students with the technical expertise and ethical grounding necessary to use technology to benefit humanity.,SST Inc. is part of SST’s technology talent development programme. It aims to be locally and globally recognised as an incubator that fosters a deep interest in Infocomm Technology among our students and nurtures their app development and entrepreneurship talents to impact their community positively.,S&W Dept	Outside Maker Lab	The S&W curriculum is based on the philosophy of education through the physical; a multi-dimensional approach to develop students holistically through sports and games excellence. The curriculum engages students actively with relevant activities that help them learn experientially. Lessons are focused on acquiring games skills for sports recreation, uncovering games concepts for understanding, and promoting sportsmanship and sporting behaviour through authentic sports participation and competition. ,Students experience physical, mental and social emotional challenges that effectively develop their strength of character.,There is also a focus on outdoor education that compels students to develop appropriate outdoor skills and sharpen their coping and management strategies through physical activities while cultivating an attitude of care and appreciation for the environment.,ARC@SST	Bio Lab 2	ARC@SST is a new initiative launched this year to support and inspire students with a strong interest in scientific research beyond the classroom. It provides a platform for students to explore real-world scientific questions through hands-on experimentation, guided inquiry, and collaborative projects. Members will develop valuable skills in science communication, critical thinking, and research design. The club also offers opportunities to take part in science competitions and conduct outreach programs at primary schools, aiming to spark curiosity and a love for science in younger students. Through these experiences, students will gain confidence in presenting their ideas and deepen their understanding of the scientific process.,Astronomy	Atrium	The Astronomy Club remains a vibrant hub for fostering curiosity and passion among our students through its dynamic and interactive activities. Designed to ignite exploration and deepen knowledge of the cosmos, the club offers training in telescope operation, radio foxhunting, astrophotography, and simulation tools like Kerbal Space Programme. Through engaging sharing sessions, outreach initiatives, and both local and international competitions and trips, students hone their leadership abilities and interpersonal skills. These experiences empower them to become confident, responsible learners and future leaders, ready to navigate the world with curiosity and purpose.,Fencing	Atrium	Fencing is more than just a sport—it is a platform for students to develop character, leadership, and sportsmanship. Through rigorous training and competitions, fencers cultivate discipline, resilience, and strategic thinking, essential qualities for both sport and life. Our CCA is committed to raising the standards of every fencer, enhancing their skills, and grooming them into capable and confident sportsmen. With dedicated coaching and structured development programs, we aim to nurture future leaders who exhibit integrity, commitment, and perseverance. Join us and embark on a journey of excellence in both fencing and personal growth!,Robotics	Robotics Room 	Founded in 2010 by a group of passionate students, Robotics @APEX has grown into a dynamic club known for its excellence in both local and international robotics competitions. Guided by our core values—Effective, Efficient, and Exemplary—we continuously push boundaries in innovation and teamwork.,As a member, you’ll explore various robotics systems, including Arduino, LEGO, and VEX, through student-led workshops. You’ll also have the opportunity to compete in prestigious competitions like First LEGO League, IDE, NRC, and VEX Robotics, as well as international events such as RoboRAVE Japan and the VEX Robotics World Championship.,Beyond competitions, we encourage members to take on passion projects, allowing creativity and problem-solving skills to thrive. Join us and be part of a team that brings ideas to life through robotics!,Show Choir and Dance 	Atrium	SST Show Choir and Dance is one CCA family celebrating two unique art forms united by a shared love for the stage.,The SST Show Choir blends vocal excellence with dynamic choreography, creating captivating performances that push creative boundaries. Members master the art of singing and dancing in unison, fostering teamwork and artistic growth. Through rigorous training and competitive showcases, students develop showmanship, confidence, and a passion for performance.,The SST Dance Crew is a vibrant community of street dancers united by their love for movement and creativity. In a supportive environment, members sharpen their skills, learn discipline, and embrace teamwork. With energetic routines and opportunities to compete and collaborate, the Dance crew inspires growth, self-expression, and a shared passion for excellence, making every performance and competition an electrifying experience.,Media Club	Atrium The Media Club serves as a hub for creative exploration, providing students with plenty of opportunities to hone their skills in photography, videography, audiovisual (AV) production and journalism and chances to participate in workshops and competitions. The AV team's involvement in morning assemblies and coverage of school events demonstrates their commitment to gain practical experience and strive for excellence. In journalism, our members collaborate with students from the English Talent Development Programme for ‘SSTraits Times,’ fostering diverse perspectives and expertise. Together, they craft compelling narratives that resonate with their audience, enriching both their skills and the school community. The Photo/Video team is passionate about covering the highlights of our school events. The competencies and skills that our Club members develop can be applied in their further endeavours.,,Athletics	Atrium	Athletics is dedicated to fostering holistic athlete development by providing opportunities for growth, learning, and enjoyment through sports. In addition, students are given the opportunities to nurture their intellectual and interpersonal skills.,Our core programmes focus on cultivating leadership skills, both on and off the field, as well as instilling the spirit of sportsmanship through active participation in Inter-schools friendly competitions, National School Games (NSG) Track and Field, and Cross Country. These experiences not only enhance athletes’ athletic abilities but also prepare them for future endeavours, equipping them with the skills and character traits necessary for success. ,SYFC	Atrium	SYFC offers students a unique opportunity to explore aviation. Through engaging programs like aeromodelling, simulator flying, and aviation knowledge courses, students gain hands-on experience and deepen their understanding of flight. The CCA also includes thrilling real-world exposure via joyrides on RSAF aircraft.  With courses on aerodynamics, aircraft propulsion systems, and quadcopter flying, participants develop technical skills and knowledge. This CCA inspires future aviators and nurture passionate aviators who aspire to improve society through real-world applications of science and technology.",
];

async function getBotResponse(userQuery) {
  const systemInstructionString = instructions.join('\n');
  try {
    const genAIResponse = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: userQuery,
      config: {
        systemInstruction: systemInstructionString,
        maxOutputTokens: 800,
      },
    });

    let textContent = '';
    if (typeof genAIResponse.text === 'function') {
      textContent = await genAIResponse.text();
    } else if (typeof genAIResponse.text === 'string') {
      textContent = genAIResponse.text;
    } else if (
      genAIResponse.candidates &&
      genAIResponse.candidates[0] &&
      genAIResponse.candidates[0].content &&
      genAIResponse.candidates[0].content.parts &&
      genAIResponse.candidates[0].content.parts[0] &&
      genAIResponse.candidates[0].content.parts[0].text
    ) {
      textContent = genAIResponse.candidates[0].content.parts[0].text;
    } else {
      textContent = "Sorry, I couldn't understand the response from the AI.";
    }
    return textContent;
  } catch (error) {
    console.error('Error in getBotResponse:', error);
    let detailedMessage =
      'Aurelius is having some problems right now. Please try again in a few mintures.';
    if (error.message) {
      detailedMessage += ` Details: ${error.message}`;
    }
    return detailedMessage;
  }
}

export default function Chatbot({navigation}) {
  const [messages, setMessages] = useState([
    {
      id: 'initial-bot-' + Date.now(),
      text: 'Hi, I am Aurelius Intelligence here to help answer your questions on SST Open House',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  }, [messages]);

  const handleSend = async () => {
    const trimmedInput = inputText.trim();
    if (trimmedInput.length === 0 || isLoading) {
      return;
    }

    const userMessage = {
      id: 'user-' + Date.now(),
      text: trimmedInput,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const botResponseText = await getBotResponse(trimmedInput);
      const botMessage = {
        id: 'bot-' + Date.now(),
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error in handleSend processing:', error);
      const errorMessage = {
        id: 'error-' + Date.now(),
        text: 'Sorry, there was an issue displaying the response.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessageItem = ({item}) => {
    const isUserMessage = item.sender === 'user';
    return (
      <View
        style={[
          styles.messageBubbleContainer,
          isUserMessage
            ? styles.userMessageContainer
            : styles.botMessageContainer,
        ]}>
        {!isUserMessage && (
          <Image
            source={require('./assets/mr_yeo.png')}
            style={[styles.avatarImage, {marginRight: 8}]}
          />
        )}
        <View
          style={[
            styles.messageBubble,
            isUserMessage ? styles.userMessageBubble : styles.botMessageBubble,
          ]}>
          <Text
            allowFontScaling={false}
            style={
              isUserMessage ? styles.userMessageText : styles.botMessageText
            }>
            {item.text}
          </Text>
        </View>
        {isUserMessage && (
          <Image
            source={require('./assets/user.png')}
            style={[styles.avatarImage, {marginLeft: 8}]}
          />
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingContainer}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 50}>
      <View style={styles.container}>
        <ImageBackground
          source={require('./assets/background.png')}
          style={styles.imageBackground}
          resizeMode="cover">
          <SafeAreaView style={styles.safeArea}>
            <View>
              <View style={{marginTop: '-6%'}} />
              <View>
                <View style={styles.topSidebar}>
                  <Text allowFontScaling={false} style={styles.header}>
                    Chatbot
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
            </View>

            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderMessageItem}
              keyExtractor={item => item.id}
              style={styles.chatArea}
              contentContainerStyle={styles.chatContentContainer}
              ListFooterComponent={
                isLoading ? (
                  <ActivityIndicator
                    size="small"
                    color="#356AA9"
                    style={styles.loadingIndicator}
                  />
                ) : null
              }
            />

            <View style={styles.inputArea}>
              <TextInput
                style={styles.textInput}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Ask Aurelius..."
                placeholderTextColor="#888888"
                multiline
                blurOnSubmit={false}
                onSubmitEditing={handleSend}
              />
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  (isLoading || inputText.trim().length === 0) &&
                    styles.sendButtonDisabled,
                ]}
                onPress={handleSend}
                disabled={isLoading || inputText.trim().length === 0}>
                <Text allowFontScaling={false} style={styles.sendButtonText}>
                  Send
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerOuterContainer: {
    marginTop: '5%',
  },
  topSidebar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginLeft: '5%',
  },
  header: {
    color: '#356AA9',
    fontFamily: 'Prototype',
    fontSize: 50,
    fontWeight: '400',
  },
  hamburgerIconPress: {
    padding: 8,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  chatArea: {
    flex: 1,
    paddingHorizontal: 10,
  },
  chatContentContainer: {
    paddingVertical: 10,
  },
  messageBubbleContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'flex-end',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
    paddingLeft: '20%',
  },
  botMessageContainer: {
    justifyContent: 'flex-start',
    paddingRight: '20%',
  },
  messageBubble: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    maxWidth: '100%',
  },
  userMessageBubble: {
    backgroundColor: '#356AA9',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 5,
  },
  botMessageBubble: {
    backgroundColor: '#E9E9EB',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 5,
  },
  userMessageText: {
    color: 'white',
    fontFamily: 'Lato',
    fontSize: 15,
    lineHeight: 20,
  },
  botMessageText: {
    color: '#1C1C12',
    fontFamily: 'Lato',
    fontSize: 15,
    lineHeight: 20,
  },
  avatarImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
    backgroundColor: 'rgba(249, 249, 249, 0.95)',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: 'Lato',
    borderWidth: 1,
    borderColor: '#DCDCDC',
    marginRight: 10,
    paddingTop: Platform.OS === 'ios' ? 10 : 8,
    paddingBottom: Platform.OS === 'ios' ? 10 : 8,
    minHeight: 40,
    maxHeight: 100,
    color: '#000000',
  },
  sendButton: {
    backgroundColor: '#356AA9',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  sendButtonDisabled: {
    backgroundColor: '#A0B8D0',
  },
  sendButtonText: {
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingIndicator: {
    marginVertical: 10,
  },
  generalText: {
    color: 'black',
    fontFamily: 'Lato',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,
    marginTop: '1%',
  },
  basicText: {
    color: '#1C1C12',
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
    fontSize: 17,
    fontStyle: 'normal',
  },
});
