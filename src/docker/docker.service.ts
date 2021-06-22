import Dockerode, * as Docker from 'dockerode';

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

  async pull(image: string) {
    return new Promise((resolve, reject) => {
      this.docker.pull(image, (err, stream) => {
        if (err) {
          return reject(err);
        }
        this.docker.modem.followProgress(stream, onFinished);
        function onFinished(err, output) {
          if (err) {
            return reject(err);
          }
          return resolve(output);
        }
      });
    });
  }

  async run(image, options?: RunOptions): Promise<Dockerode.Container> {
    await this.pull(image);
    return new Promise((resolve, reject) => {
      this.docker.createContainer(
        {
          Image: image,
          Tty: true,
          Cmd: ['yarn', 'start:prod'],
          Labels: options?.labels,
          HostConfig: { NetworkMode: 'host' },
          Env: options?.env,
        },
        (err, container) => {
          container.start({}, (err, data) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(container);
          });
        },
      );
    });
  }
}
