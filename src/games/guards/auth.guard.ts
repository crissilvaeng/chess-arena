import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest() as Request;
    try {
      const token = request.headers['authorization'].split('Bearer ')[1];
      return (
        this.config.get<string>('API_KEY') ===
        Buffer.from(token, 'base64').toString('utf-8') 
      );
    } catch(err) {
      return false;
    }
  }
}
