import { Injectable } from '@nestjs/common';

interface User {
  firstName: string;
  lastName: string;
  age: number;
  gender: 'male' | 'female';
  hair: { color: string };
  address: { postalCode: string };
  company: { department: string };
}

@Injectable()
export class TransformService {
  transform(users: User[]) {
    const result: any = {};

    for (const user of users) {
      const { department } = user.company;
      if (!result[department]) {
        result[department] = {
          male: 0,
          female: 0,
          ages: [],
          hair: {},
          addressUser: {},
        };
      }

      const dept = result[department];

      user.gender === 'male' ? dept.male++ : dept.female++;

      dept.ages.push(user.age);

      const color = user.hair.color;
      dept.hair[color] = (dept.hair[color] || 0) + 1;

      const name = `${user.firstName}${user.lastName}`;
      dept.addressUser[name] = user.address.postalCode;
    }

    for (const deptKey in result) {
      const ages = result[deptKey].ages;
      const minAge = Math.min(...ages);
      const maxAge = Math.max(...ages);
      result[deptKey].ageRange = `${minAge}-${maxAge}`;
      delete result[deptKey].ages;
    }

    return result;
  }
}
