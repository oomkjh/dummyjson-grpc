import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { TransformService } from './transform/transform.service';

@Injectable()
export class AppService {
  constructor(private readonly transformService: TransformService) {}

  async transformUserData() {
    const url = process.env.URL ?? 'https://dummyjson.com/users';
    const { data } = await axios.get(url);
    return this.transformService.transform(data.users);
  }
}
