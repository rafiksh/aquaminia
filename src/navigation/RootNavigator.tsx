import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingLayout } from '../design-system';
import { DisclaimerScreen } from '../screens/DisclaimerScreen';
import { ChoiceScreen } from '../screens/ChoiceScreen';
import { AssessmentScreen } from '../screens/AssessmentScreen';
import { LessonScreen } from '../screens/LessonScreen';
import { useAppState } from '../state/AppState';
import { MainTabs } from './MainTabs';

export type RootStackParamList = {
  Disclaimer: undefined;
  Choice: undefined;
  Assessment: undefined;
  Main: undefined;
  Lesson: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { activeLesson, closeLesson, markComplete, setPathway } = useAppState();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Disclaimer">
      <Stack.Screen name="Disclaimer">
        {({ navigation }) => (
          <OnboardingLayout>
            <DisclaimerScreen onContinue={() => navigation.replace('Choice')} />
          </OnboardingLayout>
        )}
      </Stack.Screen>

      <Stack.Screen name="Choice">
        {({ navigation }) => (
          <OnboardingLayout>
            <ChoiceScreen
              onStartFromBeginning={() => {
                setPathway('Foundations: Water Confidence');
                navigation.replace('Main');
              }}
              onTakeAssessment={() => navigation.navigate('Assessment')}
            />
          </OnboardingLayout>
        )}
      </Stack.Screen>

      <Stack.Screen name="Assessment">
        {({ navigation }) => (
          <OnboardingLayout>
            <AssessmentScreen
              onExit={() => navigation.replace('Choice')}
              onComplete={(result) => {
                setPathway(result.title);
                navigation.replace('Main');
              }}
            />
          </OnboardingLayout>
        )}
      </Stack.Screen>

      <Stack.Screen name="Main" component={MainTabs} />

      <Stack.Screen name="Lesson" options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }}>
        {({ navigation }) =>
          activeLesson ? (
            <LessonScreen
              lesson={activeLesson}
              onExit={() => {
                closeLesson();
                navigation.goBack();
              }}
              onMarkComplete={(lesson) => {
                markComplete(lesson);
                navigation.goBack();
              }}
            />
          ) : null
        }
      </Stack.Screen>
    </Stack.Navigator>
  );
}
