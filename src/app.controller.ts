import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('UsersService', 'GetTransformedUsers')
  async getTransformedUsers(_: any, __: any) {
    return {
      departments: await this.appService.transformUserData(),
    };
  }
}
