export type LessonStatus = 'locked' | 'available' | 'complete' | 'mastered';
export type WorldTone = 'aqua' | 'blue' | 'grape' | 'gold';

export interface Lesson {
  id: string;
  icon: string;
  name: string;
  category: string;
  status: LessonStatus;
  explanation: string;
  objective: string;
  tips: string[];
  mastery: string;
  xp: number;
  badge: string;
  unlocks: string;
}

export interface World {
  id: string;
  title: string;
  tone: WorldTone;
  status?: 'complete' | 'in-progress';
  lessons?: Lesson[];
  isStroke?: boolean;
  unlockNote?: string;
}

export function getInitialWorlds(): World[] {
  return [
    {
      id: 'w1',
      title: 'Water Confidence',
      tone: 'aqua',
      status: 'complete',
      lessons: [
        {
          id: 'enter',
          icon: '🚶',
          name: 'Enter the Water Safely',
          category: 'Water Confidence',
          status: 'mastered',
          explanation: 'Learn to enter and exit the pool using the steps or ladder, without jumping or rushing.',
          objective: 'Enter and exit the pool safely, twice.',
          tips: [
            'Always enter feet-first if unsure of depth.',
            'Hold the rail or ladder on the way in and out.',
            'Never run on the pool deck.',
          ],
          mastery: 'Enter and exit safely and calmly across three separate sessions.',
          xp: 10,
          badge: 'First Splash',
          unlocks: 'Face in the Water',
        },
        {
          id: 'face',
          icon: '🫧',
          name: 'Face in the Water',
          category: 'Water Confidence',
          status: 'mastered',
          explanation: 'Get comfortable putting your face underwater in short, calm bursts.',
          objective: 'Put your face underwater for 3 seconds, five times.',
          tips: [
            'Exhale gently through your nose or mouth underwater.',
            'Start in shallow water where you can stand.',
            'Keep your eyes open if goggles are on.',
          ],
          mastery: 'Repeat comfortably with a relaxed face across three sessions.',
          xp: 10,
          badge: 'Face First',
          unlocks: 'Blow Bubbles',
        },
        {
          id: 'bubbles',
          icon: '💨',
          name: 'Blow Bubbles',
          category: 'Water Confidence',
          status: 'mastered',
          explanation: 'Practice steady underwater exhales — the foundation of swim breathing.',
          objective: 'Blow bubbles continuously for 5 seconds.',
          tips: [
            'Exhale slowly and steadily, not all at once.',
            'Keep your cheeks relaxed.',
            'Try humming underwater to feel a steady stream.',
          ],
          mastery: 'Hold a steady 8-second exhale across three sessions.',
          xp: 10,
          badge: 'Bubble Maker',
          unlocks: 'Bobbing',
        },
        {
          id: 'bobbing',
          icon: '⬇️',
          name: 'Bobbing',
          category: 'Water Confidence',
          status: 'mastered',
          explanation: 'Combine submerging, exhaling, and returning to standing in one smooth motion.',
          objective: 'Submerge, exhale, and return to standing 10 times.',
          tips: [
            'Bend your knees to submerge, push up through your feet to rise.',
            'Exhale on the way down, inhale at the surface.',
            'Keep a steady rhythm.',
          ],
          mastery: 'Complete 15 smooth, unhurried bobs in a row.',
          xp: 15,
          badge: 'Steady Bobber',
          unlocks: 'Front Float',
        },
      ],
    },
    {
      id: 'w2',
      title: 'Floating and Recovery',
      tone: 'blue',
      status: 'in-progress',
      lessons: [
        {
          id: 'front-float',
          icon: '🧘',
          name: 'Front Float',
          category: 'Floating and Recovery',
          status: 'mastered',
          explanation: 'Learn to float face-down, relaxed, and supported by the water.',
          objective: 'Float face-down for 10 seconds.',
          tips: [
            'Take a full breath before floating.',
            'Let your arms and legs relax and spread.',
            'Keep your head down, looking at the pool floor.',
          ],
          mastery: 'Float for 15 seconds across three separate sessions.',
          xp: 15,
          badge: 'Front Float',
          unlocks: 'Back Float',
        },
        {
          id: 'back-float',
          icon: '🛟',
          name: 'Back Float',
          category: 'Floating and Recovery',
          status: 'available',
          explanation: 'Float on your back, relaxed, with your ears in the water and eyes toward the sky.',
          objective: 'Float on your back for 20 seconds.',
          tips: [
            'Keep your ears in the water.',
            'Look upward, not at your feet.',
            'Relax your neck and let your head rest back.',
            'Push your hips toward the surface.',
          ],
          mastery: 'Float for 30 seconds across three separate sessions.',
          xp: 15,
          badge: 'Sky Watcher',
          unlocks: 'Starfish Float',
        },
        {
          id: 'starfish',
          icon: '⭐',
          name: 'Starfish Float',
          category: 'Floating and Recovery',
          status: 'locked',
          explanation: 'Hold a wide, stable float with arms and legs spread like a starfish.',
          objective: 'Hold a wide front or back float for 15 seconds.',
          tips: [
            'Spread your arms and legs as wide as feels stable.',
            'Keep breathing calm and steady.',
            'Relax your shoulders.',
          ],
          mastery: 'Hold the position for 20 seconds, unassisted.',
          xp: 15,
          badge: 'Starfish',
          unlocks: 'Roll and Recover',
        },
        {
          id: 'roll-recover',
          icon: '🔄',
          name: 'Roll and Recover',
          category: 'Floating and Recovery',
          status: 'locked',
          explanation:
            'Practice rolling from a front float to a back float and returning safely to standing — a key safety skill.',
          objective: 'Roll from front float to back float and return safely to standing.',
          tips: [
            'Lead the roll with your head and one arm.',
            'Keep movements slow and controlled.',
            'Use a back float to rest at any point.',
          ],
          mastery: 'Complete the sequence smoothly three times in a row.',
          xp: 20,
          badge: 'Glide Master',
          unlocks: 'Streamline Shape',
        },
      ],
    },
    {
      id: 'w3',
      title: 'Body Position and Movement',
      tone: 'grape',
      lessons: [
        {
          id: 'streamline',
          icon: '📐',
          name: 'Streamline Shape',
          category: 'Body Position and Movement',
          status: 'locked',
          explanation: 'Hold a long, narrow body shape that cuts through the water with the least resistance.',
          objective: 'Hold a long streamline body position for 5 seconds.',
          tips: [
            'Squeeze your arms tight against your ears.',
            'Point your fingers, not your palms, forward.',
            'Keep your body long and narrow, like an arrow.',
          ],
          mastery: 'Hold a steady streamline for 10 seconds, three sessions in a row.',
          xp: 15,
          badge: 'Streamline',
          unlocks: 'Wall Push and Glide',
        },
        {
          id: 'wall-push',
          icon: '🧱',
          name: 'Wall Push and Glide',
          category: 'Body Position and Movement',
          status: 'locked',
          explanation: 'Push off the wall in a streamline and glide across the water.',
          objective: 'Push from the wall and glide 3 metres.',
          tips: [
            'Bend your knees against the wall before pushing.',
            'Push off firmly and hold your streamline.',
            "Let the glide finish before you start kicking.",
          ],
          mastery: 'Glide 5 metres, three sessions in a row.',
          xp: 15,
          badge: 'Glide Starter',
          unlocks: 'Flutter Kick',
        },
        {
          id: 'flutter-kick',
          icon: '🦶',
          name: 'Flutter Kick',
          category: 'Body Position and Movement',
          status: 'locked',
          explanation: 'Learn a steady, relaxed flutter kick to power your streamline glide.',
          objective: 'Kick 5 metres using a board or support.',
          tips: [
            'Kick from your hips, not your knees.',
            'Keep your ankles loose and relaxed.',
            'Keep kicks small and steady, not big splashes.',
          ],
          mastery: 'Kick 10 metres with steady form, three sessions in a row.',
          xp: 15,
          badge: 'Kick Starter',
          unlocks: 'Back Kick',
        },
        {
          id: 'back-kick',
          icon: '🔙',
          name: 'Back Kick',
          category: 'Body Position and Movement',
          status: 'locked',
          explanation: 'Apply the same steady flutter kick while floating on your back.',
          objective: 'Kick on your back for 5 metres.',
          tips: ['Keep your hips near the surface.', 'Kick from the hips with relaxed ankles.', 'Keep your head still and look straight up.'],
          mastery: 'Kick 10 metres on your back with steady form.',
          xp: 20,
          badge: 'Back Kicker',
          unlocks: 'Bubble-to-Breath Rhythm',
        },
      ],
    },
    { id: 'freestyle', title: 'Freestyle Path', tone: 'gold', isStroke: true, unlockNote: 'Complete Foundations to unlock' },
  ];
}
