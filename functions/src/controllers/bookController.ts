import { Request, Response } from 'express';

export class BookController {

  
  public helloWorld(req: Request, res: Response) {
    res.send({ message: "hello world"});
  }
}