import { TransformService } from './transform.service';

describe('TransformService', () => {
  const service = new TransformService();

  it('should group by department correctly', () => {
    const users: any[] = [
      {
        firstName: 'John',
        lastName: 'Doe',
        age: 30,
        gender: 'male',
        hair: { color: 'Black' },
        address: { postalCode: '12345' },
        company: { department: 'Engineering' },
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        age: 25,
        gender: 'female',
        hair: { color: 'Blonde' },
        address: { postalCode: '54321' },
        company: { department: 'Engineering' },
      },
    ];

    const result = service.transform(users);

    expect(result['Engineering'].male).toBe(1);
    expect(result['Engineering'].female).toBe(1);
    expect(result['Engineering'].hair).toEqual({ Black: 1, Blonde: 1 });
    expect(result['Engineering'].ageRange).toBe('25-30');
  });
});
