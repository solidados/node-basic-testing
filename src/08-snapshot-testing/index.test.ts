import { generateLinkedList } from './index';

describe('generateLinkedList', (): void => {
  // Check match by expect(...).toStrictEqual(...)
  interface Actor {
    id: number;
    name: string;
    role: string;
  }

  const FifthElementLeadingActors: Actor[] = [
    { id: 1, name: 'Milla Jovovich', role: 'Leeloo' },
    { id: 2, name: 'Bruce Willis', role: 'Korben Dallas' },
    { id: 3, name: 'Gary Oldman', role: 'Jean Baptiste-Emanuelle Zorg' },
    { id: 4, name: 'Chris Tucker', role: 'Ruby Rhod' },
  ];
  const FifthElementSupportingActors: Actor[] = [
    { id: 5, name: 'Maiwenn', role: 'Diva Pavalaguna' },
    { id: 6, name: 'Ian Holm', role: 'Vito Cornelius' },
    { id: 7, name: 'Tommy Lister Jr', role: 'President Lindberg' },
    { id: 8, name: 'Brion James', role: 'General Munro' },
  ];

  const expectedLinkedList = {
    value: { id: 1, name: 'Milla Jovovich', role: 'Leeloo' },
    next: {
      value: { id: 2, name: 'Bruce Willis', role: 'Korben Dallas' },
      next: {
        value: {
          id: 3,
          name: 'Gary Oldman',
          role: 'Jean Baptiste-Emanuelle Zorg',
        },
        next: {
          value: { id: 4, name: 'Chris Tucker', role: 'Ruby Rhod' },
          next: {
            value: null,
            next: null,
          },
        },
      },
    },
  };

  test('should generate linked list from values 1', (): void => {
    expect(generateLinkedList(FifthElementLeadingActors)).toStrictEqual(
      expectedLinkedList,
    );
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(FifthElementSupportingActors)).toMatchSnapshot();
  });
});
