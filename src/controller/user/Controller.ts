// import { default as trainerRouter } from "./routes";
import { NextFunction, Request, Response } from 'express';
import successHandler from '../../libs/routes/successHandler';
import UserRepository from '../../repositories/user/UserRepository';

class Controller {
  public static getInstance() {
    if (!Controller.instance) {
      Controller.instance = new Controller();
    }
    return Controller.instance;
  }
  private static instance: Controller;

  public get(req: Request, res: Response) {
    const { GivenName, email, Role } = req.body.data;
    const data = [
      {
        Name: GivenName,
        // tslint:disable-next-line:object-literal-sort-keys
        Email: email,
        Role,
      },

    ];
    res.status(200).send(successHandler('status ok', data));
  }
  public create(req: Request, res: Response, next: NextFunction) {
    const { name, email, role } = req.body;
    UserRepository.create({name, email, role});
    res.status(200).send(successHandler(name, email));
  }

  public update(req: Request, res: Response, next: NextFunction) {
    const { id, dataToUpdate } = req.body;

    res.status(200).send(successHandler(id, dataToUpdate));
  }

  public delete(req: Request, res: Response, next: NextFunction) {
    const { name, id } = req.body;
    const value = req.params.id;
    if (value !== id) {
      next({ error: `${id} is not matched` });
    }
    // tslint:disable-next-line:no-null-keyword
    res.status(200).send(successHandler(null, 0));
  }
}

export default Controller.getInstance();
