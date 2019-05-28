import * as express from "express";
import { BookController } from "../controllers/bookController";

export class BookRoutes {

  public bookController: BookController = new BookController()

  public routes(app: express.Application): void {

    app.route('/')
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send({
          message: 'GET request successfulll!!!!'
        })
      })

    // Controller 
    app.route('/hello')
      .get(
        this.bookController.helloWorld
      );
  }
}