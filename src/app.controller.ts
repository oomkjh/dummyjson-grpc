import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('UsersService', 'GetTransformedUsers')
  async getTransformedUsers(_: any, __: any) {
    return { departments: await this.appService.transformUserData() };
  }
}
