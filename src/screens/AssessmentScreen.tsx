import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Button, Icon, IconButton, theme } from '../design-system';

interface Question {
  key: string;
  text: string;
  options: string[];
}

const ASSESSMENT_QUESTIONS: Question[] = [
  { key: 'face', text: 'Can you comfortably put your face underwater?', options: ['Not yet', 'A little', 'Yes'] },
  { key: 'float', text: 'Can you float on your back for 20 seconds?', options: ['Not yet', 'With help', 'Yes'] },
  { key: 'move', text: 'Can you move forward in the water for 5 metres?', options: ['Not yet', 'With support', 'Yes'] },
  { key: 'tread', text: 'Can you tread water for 15 seconds?', options: ['Not yet', 'Almost', 'Yes'] },
  { key: 'goal', text: 'What do you want to learn?', options: ['Freestyle', 'Backstroke', 'Breaststroke', 'Butterfly', 'Not sure'] },
];

export interface AssessmentResult {
  title: string;
  desc: string;
}

function placeUser(answers: Record<string, string>): AssessmentResult {
  const basics = ['face', 'float', 'move', 'tread'].map((k) => answers[k]);
  const noviceCount = basics.filter((a) => a === 'Not yet').length;
  const confidentCount = basics.filter((a) => a === 'Yes').length;

  if (noviceCount >= 3) {
    return { title: 'Foundations: Water Confidence', desc: "We'll start with the basics — getting comfortable in the water." };
  }
  if (noviceCount >= 1) {
    return { title: 'Foundations: Floating and Recovery', desc: "You're comfortable in the water — next is floating with confidence." };
  }
  if (confidentCount < 4) {
    return { title: 'Foundations: Movement and Breathing', desc: 'Solid basics — time to work on body position and breathing.' };
  }
  if (answers.goal === 'Freestyle') return { title: 'Freestyle Path', desc: "You're ready — let's build your freestyle stroke." };
  if (answers.goal === 'Backstroke') return { title: 'Backstroke Path', desc: "You're ready — let's build your backstroke." };
  if (answers.goal === 'Breaststroke') return { title: 'Breaststroke Path', desc: "You're ready — let's build your breaststroke." };
  if (answers.goal === 'Butterfly') {
    return { title: 'Advanced Stroke Preparation', desc: 'Butterfly takes strong fundamentals first — starting with prep work.' };
  }
  return { title: 'Foundations: Movement and Breathing', desc: "You're off to a strong start — let's refine your fundamentals." };
}

export interface AssessmentScreenProps {
  onComplete: (result: AssessmentResult) => void;
  onExit: () => void;
}

export function AssessmentScreen({ onComplete, onExit }: AssessmentScreenProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const q = ASSESSMENT_QUESTIONS[step];
  const selected = answers[q?.key];

  function selectOption(opt: string) {
    setAnswers((a) => ({ ...a, [q.key]: opt }));
  }

  function next() {
    if (step < ASSESSMENT_QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setResult(placeUser({ ...answers }));
    }
  }

  if (result) {
    return (
      <View style={styles.resultRoot}>
        <View style={styles.resultCenter}>
          <Icon name="target" size={40} color={theme.color.aqua600} />
          <Text style={[theme.type.labelCaps, { color: theme.color.aqua600 }]}>YOUR STARTING POINT</Text>
          <Text style={[theme.type.displayMd, { color: theme.color.ink800 }]}>{result.title}</Text>
          <Text style={[theme.type.bodyMd, { color: theme.color.ink600 }]}>{result.desc}</Text>
        </View>
        <Button tone="primary" size="lg" fullWidth onPress={() => onComplete(result)}>
          See my roadmap
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <IconButton icon="close" tone="neutral" size={36} onPress={onExit} ariaLabel="Exit assessment" />
        <View style={styles.progressRow}>
          {ASSESSMENT_QUESTIONS.map((_, i) => (
            <View
              key={i}
              style={[styles.progressDot, { backgroundColor: i <= step ? theme.color.aqua500 : theme.color.border }]}
            />
          ))}
        </View>
      </View>

      <Text style={[theme.type.displaySm, styles.question]}>{q.text}</Text>

      <View style={styles.options}>
        {q.options.map((opt) => {
          const isSelected = selected === opt;
          return (
            <Pressable
              key={opt}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
              onPress={() => selectOption(opt)}
              style={[
                styles.option,
                {
                  backgroundColor: isSelected ? theme.color.aqua100 : theme.color.surface,
                  borderColor: isSelected ? theme.color.aqua500 : theme.color.border,
                  borderBottomWidth: isSelected ? 4 : 2,
                  borderBottomColor: isSelected ? theme.color.aqua500 : theme.color.border,
                },
              ]}
            >
              <Text style={[theme.type.bodyMd, { color: theme.color.ink800 }]}>{opt}</Text>
            </Pressable>
          );
        })}
      </View>

      <Button tone="primary" size="lg" fullWidth disabled={!selected} onPress={next}>
        {step < ASSESSMENT_QUESTIONS.length - 1 ? 'Continue' : 'See my results'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: theme.space[6], paddingTop: theme.space[6], paddingBottom: theme.space[8] },
  resultRoot: { flex: 1, padding: theme.space[6], paddingTop: theme.space[12], paddingBottom: theme.space[8], justifyContent: 'space-between' },
  resultCenter: { flex: 1, justifyContent: 'center', gap: theme.space[4] },
  header: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: theme.space[6] },
  progressRow: { flexDirection: 'row', gap: 6, flex: 1 },
  progressDot: { flex: 1, height: 8, borderRadius: theme.radius.pill },
  question: { color: theme.color.ink800, marginBottom: theme.space[6] },
  options: { flex: 1, gap: 12 },
  option: { padding: 16, borderRadius: theme.radius.md, borderWidth: 2 },
});
