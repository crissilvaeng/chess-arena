import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest() as Request;
    const apiKey = request.headers['api_key'];
    return (
      this.config.get<string>('API_KEY') ==
      Buffer.from(apiKey, 'base64').toString('utf-8') 
    );
  }
}
