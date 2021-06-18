import * as Docker from 'dockerode';

import { Injectable, Logger } from '@nestjs/common';

export interface RunOptions {
  command?: string[];
  env?: string[];
  labels?: { [key: string]: string };
}

@Injectable()
export class DockerService {
  private readonly logger = new Logger(DockerService.name);

  constructor(private readonly docker: Docker) {}

  async ping() {
    return this.docker.ping();
  }

  async pull(image: string) {
    return new Promise((resolve, reject) => {
      this.docker.pull(image, (err, stream) => {
        this.docker.modem.followProgress(stream, onFinished);
        if (err) {
          return reject(err);
        }
        function onFinished(err, output) {
          if (err) {
            return reject(err);
          }
          return resolve(output);
        }
      });
    });
  }

  async run(image, options?: RunOptions) {
    await this.pull(image);
    await this.docker
      .run(image, options?.command, null, {
        Env: options?.env,
        Cmd: options?.command,
        Labels: options?.labels,
        HostConfig: { NetworkMode: 'host' },
      })
  }
}
