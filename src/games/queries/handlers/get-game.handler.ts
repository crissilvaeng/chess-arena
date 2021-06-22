import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GameRepository } from 'src/games/repository/game.repository';
import { GetGameQuery } from '../get-game.query';

@QueryHandler(GetGameQuery)
export class GetGameQueryHandler implements IQueryHandler<GetGameQuery> {
  constructor(private readonly repository: GameRepository) {}

  async execute(query: GetGameQuery) {
    const { id } = query;
    return await this.repository.findById(id);
  }
}
