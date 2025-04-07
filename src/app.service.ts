import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  async transformUserData(): Promise<Record<string, any>> {
    const url = process.env.URL ?? 'https://dummyjson.com/users';
    const { data } = await axios.get(url);
    const users = data.users;
    const departments: Record<string, any> = {};

    for (const user of users) {
      const dept = user.company.department;
      if (!departments[dept]) {
        departments[dept] = {
          male: 0,
          female: 0,
          ages: [],
          hair: {},
          addressUser: {},
        };
      }

      const d = departments[dept];
      d[user.gender] += 1;
      d.ages.push(user.age);
      const hairColor = user.hair.color;
      d.hair[hairColor] = (d.hair[hairColor] || 0) + 1;
      d.addressUser[`${user.firstName}${user.lastName}`] =
        user.address.postalCode;
    }

    for (const dept in departments) {
      const ages = departments[dept].ages;
      departments[dept].ageRange = `${Math.min(...ages)}-${Math.max(...ages)}`;
      delete departments[dept].ages;
    }

    return departments;
  }
}
