interface Emotion {
  id: string;
  name: string;
  color: string;
}

export class Emotions {
  emotions: Emotion[];

  constructor() {
    this.emotions = [
      { id: 'awesome', name: 'Awesome!', color: '#005fff' },
      { id: 'pretty-good', name: 'Good', color: '#00ad3b' },
      { id: 'meh', name: 'Meh', color: '#ffd800' },
      { id: 'not-great', name: 'Not Good', color: '#7908dd' },
      { id: 'terrible', name: 'Terrible', color: '#f50038' }
    ];
  }

  getData(value: string): String[] {
    return this.emotions.reduce((acc, emotion) => {
      acc = [...acc, emotion[value]];
      return acc;
    }, []);
  }
}
