import { AssessmentConfig } from '../types';

export const assessmentConfigs: AssessmentConfig[] = [
  {
    type: 'anxiety',
    title: 'SCA Children Anxiety Scale',
    description: 'Assessment to measure anxiety levels in children and adolescents',
    maxScore: 120,
    questions: [
      {
        id: 'anx1',
        question: 'I worry about things',
        options: [
          { text: 'Never', score: 0 },
          { text: 'Sometimes', score: 1 },
          { text: 'Often', score: 2 },
          { text: 'Always', score: 3 }
        ]
      },
      {
        id: 'anx2',
        question: 'I am scared of dogs',
        options: [
          { text: 'Never', score: 0 },
          { text: 'Sometimes', score: 1 },
          { text: 'Often', score: 2 },
          { text: 'Always', score: 3 }
        ]
      },
      {
        id: 'anx3',
        question: 'I have trouble going to school in the mornings because I feel sick',
        options: [
          { text: 'Never', score: 0 },
          { text: 'Sometimes', score: 1 },
          { text: 'Often', score: 2 },
          { text: 'Always', score: 3 }
        ]
      },
      {
        id: 'anx4',
        question: 'I worry when I think I have done poorly at something',
        options: [
          { text: 'Never', score: 0 },
          { text: 'Sometimes', score: 1 },
          { text: 'Often', score: 2 },
          { text: 'Always', score: 3 }
        ]
      },
      {
        id: 'anx5',
        question: 'I would feel afraid of being on my own at home',
        options: [
          { text: 'Never', score: 0 },
          { text: 'Sometimes', score: 1 },
          { text: 'Often', score: 2 },
          { text: 'Always', score: 3 }
        ]
      },
      {
        id: 'anx6',
        question: 'I feel scared when I have to take a test',
        options: [
          { text: 'Never', score: 0 },
          { text: 'Sometimes', score: 1 },
          { text: 'Often', score: 2 },
          { text: 'Always', score: 3 }
        ]
      },
      {
        id: 'anx7',
        question: 'I feel afraid if I have to use public toilets',
        options: [
          { text: 'Never', score: 0 },
          { text: 'Sometimes', score: 1 },
          { text: 'Often', score: 2 },
          { text: 'Always', score: 3 }
        ]
      },
      {
        id: 'anx8',
        question: 'I worry about being away from my parents',
        options: [
          { text: 'Never', score: 0 },
          { text: 'Sometimes', score: 1 },
          { text: 'Often', score: 2 },
          { text: 'Always', score: 3 }
        ]
      },
      {
        id: 'anx9',
        question: 'I feel worried when I go to bed at night',
        options: [
          { text: 'Never', score: 0 },
          { text: 'Sometimes', score: 1 },
          { text: 'Often', score: 2 },
          { text: 'Always', score: 3 }
        ]
      },
      {
        id: 'anx10',
        question: 'I worry that I will do badly at my school work',
        options: [
          { text: 'Never', score: 0 },
          { text: 'Sometimes', score: 1 },
          { text: 'Often', score: 2 },
          { text: 'Always', score: 3 }
        ]
      }
    ]
  },
  {
    type: 'peer-pressure',
    title: 'Peer Pressure Questionnaire',
    description: 'Assessment to measure susceptibility to peer pressure',
    maxScore: 80,
    questions: [
      {
        id: 'pp1',
        question: 'I often do things just to be accepted by my friends',
        options: [
          { text: 'Strongly Disagree', score: 0 },
          { text: 'Disagree', score: 1 },
          { text: 'Agree', score: 2 },
          { text: 'Strongly Agree', score: 3 }
        ]
      },
      {
        id: 'pp2',
        question: 'It is important for me to fit in with my peer group',
        options: [
          { text: 'Strongly Disagree', score: 0 },
          { text: 'Disagree', score: 1 },
          { text: 'Agree', score: 2 },
          { text: 'Strongly Agree', score: 3 }
        ]
      },
      {
        id: 'pp3',
        question: 'I sometimes do things I do not want to do because my friends want me to',
        options: [
          { text: 'Strongly Disagree', score: 0 },
          { text: 'Disagree', score: 1 },
          { text: 'Agree', score: 2 },
          { text: 'Strongly Agree', score: 3 }
        ]
      },
      {
        id: 'pp4',
        question: 'I worry about what my friends think of me',
        options: [
          { text: 'Strongly Disagree', score: 0 },
          { text: 'Disagree', score: 1 },
          { text: 'Agree', score: 2 },
          { text: 'Strongly Agree', score: 3 }
        ]
      },
      {
        id: 'pp5',
        question: 'I change my behavior to please my friends',
        options: [
          { text: 'Strongly Disagree', score: 0 },
          { text: 'Disagree', score: 1 },
          { text: 'Agree', score: 2 },
          { text: 'Strongly Agree', score: 3 }
        ]
      },
      {
        id: 'pp6',
        question: 'I feel pressure to act like my friends',
        options: [
          { text: 'Strongly Disagree', score: 0 },
          { text: 'Disagree', score: 1 },
          { text: 'Agree', score: 2 },
          { text: 'Strongly Agree', score: 3 }
        ]
      },
      {
        id: 'pp7',
        question: 'I find it hard to say no when my friends ask me to do something',
        options: [
          { text: 'Strongly Disagree', score: 0 },
          { text: 'Disagree', score: 1 },
          { text: 'Agree', score: 2 },
          { text: 'Strongly Agree', score: 3 }
        ]
      },
      {
        id: 'pp8',
        question: 'I go along with my friends even when I disagree with them',
        options: [
          { text: 'Strongly Disagree', score: 0 },
          { text: 'Disagree', score: 1 },
          { text: 'Agree', score: 2 },
          { text: 'Strongly Agree', score: 3 }
        ]
      }
    ]
  },
  {
    type: 'depression-anxiety',
    title: 'Depression & Anxiety Assessment',
    description: 'Assessment to measure depression and anxiety symptoms',
    maxScore: 24,
    questions: [
      {
        id: 'da1',
        question: 'Little interest or pleasure in doing things',
        options: [
          { text: 'Not at all', score: 0 },
          { text: 'Several days', score: 1 },
          { text: 'More than half the days', score: 2 },
          { text: 'Nearly every day', score: 3 }
        ]
      },
      {
        id: 'da2',
        question: 'Feeling down, depressed, or hopeless',
        options: [
          { text: 'Not at all', score: 0 },
          { text: 'Several days', score: 1 },
          { text: 'More than half the days', score: 2 },
          { text: 'Nearly every day', score: 3 }
        ]
      },
      {
        id: 'da3',
        question: 'Trouble falling or staying asleep, or sleeping too much',
        options: [
          { text: 'Not at all', score: 0 },
          { text: 'Several days', score: 1 },
          { text: 'More than half the days', score: 2 },
          { text: 'Nearly every day', score: 3 }
        ]
      },
      {
        id: 'da4',
        question: 'Poor appetite or overeating',
        options: [
          { text: 'Not at all', score: 0 },
          { text: 'Several days', score: 1 },
          { text: 'More than half the days', score: 2 },
          { text: 'Nearly every day', score: 3 }
        ]
      },
      {
        id: 'da5',
        question: 'Feeling bad about yourself or feeling like a failure',
        options: [
          { text: 'Not at all', score: 0 },
          { text: 'Several days', score: 1 },
          { text: 'More than half the days', score: 2 },
          { text: 'Nearly every day', score: 3 }
        ]
      },
      {
        id: 'da6',
        question: 'Trouble concentrating',
        options: [
          { text: 'Not at all', score: 0 },
          { text: 'Several days', score: 1 },
          { text: 'More than half the days', score: 2 },
          { text: 'Nearly every day', score: 3 }
        ]
      },
      {
        id: 'da7',
        question: 'Restlessness or slowness in movement',
        options: [
          { text: 'Not at all', score: 0 },
          { text: 'Several days', score: 1 },
          { text: 'More than half the days', score: 2 },
          { text: 'Nearly every day', score: 3 }
        ]
      },
      {
        id: 'da8',
        question: 'Thoughts of self-harm or death',
        options: [
          { text: 'Not at all', score: 0 },
          { text: 'Several days', score: 1 },
          { text: 'More than half the days', score: 2 },
          { text: 'Nearly every day', score: 3 }
        ]
      }
    ]
  }
];