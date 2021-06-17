import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest() as Request;
    const apiKey = this.config.get<string>('API_KEY');
    return (
      Buffer.from(apiKey, 'base64').toString('utf-8') ==
      request.headers['api_key']
    );
  }
}
