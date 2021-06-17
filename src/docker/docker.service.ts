import * as Docker from 'dockerode';

import { Injectable } from '@nestjs/common';

@Injectable()
export class DockerService {
  constructor(private readonly docker: Docker) {}

  async ping() {
    return this.docker.ping();
  }
}
