import * as Docker from 'dockerode';

import { Injectable } from '@nestjs/common';

export interface RunOptions {
  command?: string[];
  env?: string[];
  labels?: { [key: string]: string };
}

@Injectable()
export class DockerService {
  constructor(private readonly docker: Docker) {}

  async ping() {
    return this.docker.ping();
  }

  async run(image, options?: RunOptions) {
    await this.docker.pull(image);
    return this.docker.run(image, options?.command, null, {
      Env: options?.env,
      Cmd: options?.command,
      Labels: options?.labels,
      HostConfig: { NetworkMode: 'host' },
    });
  }
}
