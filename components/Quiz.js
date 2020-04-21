import React, { PureComponent } from 'react';
import { View, Text, TouchableWithoutFeedback, Animated, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { red , white } from '../utils/colors';
import { setLocalNotification, clearLocalNotification } from '../utils/notifications';
import Button from './Button';
import LighterButton from './LighterButton';

const NoCards = () => (
  <View style={styles.noCards}>
    <Text style={styles.noCardsText}>Please add cards to this deck.</Text>
  </View>
);

const Results = (props) => (
  <View style={styles.resultCard}>
    <Text style={styles.resultCardText}>Total Answered: {props.totalAnswered}</Text>
    <Text style={styles.resultCardText}>Correct Answers: {props.correct}</Text>
    <View style={{marginTop:50}}>
      <LighterButton onPress={props.restart}><Text style={{ fontWeight: 'bold' }}>Play the quiz again!</Text></LighterButton>
    </View>
    <View style={{ marginTop: 10 }}>
      <Button onPress={props.goBack}><Text style={{ fontWeight: 'bold' }}>Return to the deck</Text></Button>
    </View>
  </View>
);

const QorAView = (props) => (
  <TouchableWithoutFeedback onPress={props.toggle}>
    <View style={styles.showText} >
      {
        props.current == 'question'
          ? <Text style={styles.showText}>Reveal the correct answer</Text>
          : <Text style={styles.showText}>Go back to the question</Text>
      }
    </View>
  </TouchableWithoutFeedback>
)

class Quiz extends PureComponent {

  showQorA = () => {
    const show = (this.state.show) === 'question'
      ? 'answer'
      : 'question'
  
    this.setState({ show });


    this.flip();
  }
  
  theAnswer(answer) {
    if (answer === 'correct') {
      this.setState({ correctAnswers: this.state.correctAnswers + 1});
    }
    
    if (this.state.currentQuestion === this.props.questions.length - 1) {
      this.setState({ showResults: true });
    } else {
      this.setState({ currentQuestion: this.state.currentQuestion + 1 });
    }

    if (this.state.show === "answer") {
      this.setState({ show: 'question' });
      this.flip();
    }

  }
  
  restartQuiz = () => {
 
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => { this.value = value })
    
    this.setState({
      currentQuestion: 0,
      correctAnswers: 0,
      show: 'question',
      showResults: false
    });

    clearLocalNotification()
      .then(setLocalNotification)
    
  }

  goBack = () => {
    this.props.navigation.goBack();
  }

  constructor(props) {
    super(props)
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => { this.value = value })
    this.state = {
      currentQuestion: 0,
      correctAnswers: 0,
      show: 'question',
      showResults: false
      
    }

  }

  frontCard() {
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    })

    const frontAnimatedStyle = {
      transform: [{ rotateY: this.frontInterpolate }]
    }

    return frontAnimatedStyle
  }

  backCard() {
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })

    const backAnimatedStyle = { transform: [{ rotateY: this.backInterpolate }] }
    return backAnimatedStyle
  }

  flip() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else if (this.value < 90) {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }
  }

  render() {

    if (this.props.questions.length === 0) {
      return <NoCards />
    }

    if (this.state.showResults) {
      return (
        <Results
          totalAnswered={this.props.questions.length}
          correct={this.state.correctAnswers}
          restart={this.restartQuiz}
          goBack={this.goBack}
        />
      );
    }
    
    const viewCard = this.props.questions[this.state.currentQuestion];
 
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.quizQNumber} >
          <Text style={{fontWeight:'bold',fontSize:16,color:white, textAlign:'center'}}>Card {this.state.currentQuestion + 1}/{this.props.questions.length}</Text>
        </View>

        {/* Front of card */}
        <Animated.View style={[styles.quizCard, this.frontCard(), { display: (this.state.show === "question" ? 'flex' : 'none') }]}>
          {
            this.state.show == 'question'
              ? <Text style={styles.questionText}>{viewCard.question}</Text>
              : <Text style={styles.answerText}>{viewCard.answer}</Text>
          }
          <QorAView
            toggle={this.showQorA}
            current={this.state.show}
          />
          <View>
            <View>
              <LighterButton onPress={() => this.theAnswer('correct')}><Text style={{ fontWeight: 'bold' }}>I knew it</Text></LighterButton>
            </View>
            <View style={{ marginTop: 10 }}>
              <Button onPress={() => this.theAnswer('incorrect')}><Text style={{ fontWeight: 'bold' }}>I didn't know it</Text></Button>
            </View>
           
          </View>
        </Animated.View>

        {/* Back of Card */}
        <Animated.View style={[styles.quizCard, this.backCard(), styles.flipCardBack, { display: (this.state.show==="answer"?'flex':'none')}]}>
          {
            this.state.show == 'question'
              ? <Text style={styles.questionText}>{viewCard.question}</Text>
              : <Text style={styles.answerText}>{viewCard.answer}</Text>
          }
          <QorAView
            toggle={this.showQorA}
            current={this.state.show}
          />
         
          <View>
            <View>
              <LighterButton onPress={() => this.theAnswer('correct')}><Text style={{ fontWeight: 'bold' }}>I knew it</Text></LighterButton>
            </View>
            <View style={{ marginTop: 10 }}>
              <Button onPress={() => this.theAnswer('incorrect')}><Text style={{ fontWeight: 'bold' }}>I didn't know it</Text></Button>
            </View>

          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  noCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 25,
    marginTop: 40,
    marginBottom: 40,
    padding: 25,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,1)',
    elevation: 25,
    shadowRadius: 3,
    shadowOpacity: 0.95,
    shadowColor: 'rgba(0,0,0,0.8)',
    shadowOffset: {
      width: 0,
      height: 3
    } 
  },
  noCardsText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  resultCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 25,
    marginTop: 60,
    marginBottom: 60,
    padding: 25,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,1)',
    elevation: 25,
    shadowRadius: 3,
    shadowOpacity: 0.95,
    shadowColor: 'rgba(0,0,0,0.8)',
    shadowOffset: {
      width: 0,
      height: 3
    } 
  },
  resultCardText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  quizQNumber: {
    padding: 8,
    backgroundColor: 'blue',
    marginTop: 10,
    color:white
  },
  quizCard: {
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 25,
    flex:1,
    marginTop: 40,
    marginBottom:40,
    padding: 25,
    borderRadius:10,
    backgroundColor: 'rgba(255,255,255,1)',
    elevation: 25,
    shadowRadius: 3,
    shadowOpacity: 0.95,
    shadowColor: 'rgba(0,0,0,0.8)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  questionText: {
    fontSize: 22,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  answerText: {
    fontSize: 26,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgb(230, 23, 23)'
  },
  showText: {
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.6)',

  },

  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  flipCardBack: {
    position: "relative",
    top: 0,
  },
});

function mapStateToProps(state, ownProps) {
  return { questions: state[ownProps.route.params.deckTitle].questions };
}

export default connect(mapStateToProps)(Quiz);