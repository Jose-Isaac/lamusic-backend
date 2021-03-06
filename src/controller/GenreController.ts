import { Request, Response } from 'express';
import { GenreBusiness } from '../business/GenreBusiness';
import { BaseDatabase } from '../data/BaseDatabase';

export class GenreController {
  async create(request: Request, response: Response) {
    try {
      const { name } = request.body;

      const genreBusiness = new GenreBusiness();
      const genre = await genreBusiness.create(name);

      response.json({ message: 'Success', genre });
    } catch (error) {
      response
        .status(error.code || 500)
        .json({ message: error.sqlMessage || error.message });
    }

    await BaseDatabase.destroyConnection();
  }

  async getAll(request: Request, response: Response) {
    try {
      const genreBusiness = new GenreBusiness();
      const genres = await genreBusiness.getAll();

      response.json({ message: 'Success', genres });
    } catch (error) {
      response
        .status(error.code || 500)
        .json({ message: error.sqlMessage || error.message });
    }

    await BaseDatabase.destroyConnection();
  }
}
