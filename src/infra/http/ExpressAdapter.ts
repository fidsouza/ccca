import express, { Request, Response } from 'express';
import Http from './Http';

export default class ExpressAdapter implements Http {
  readonly app: any;
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.all('*', function (req: any, res: any, next: any) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Methods',
        'PUT, GET, POST, DELETE, OPTIONS'
      );
      res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, x-access-token'
      );
      next();
    });
  }
  on(url: string, method: string, fn: any): void {
    this.app[method](url, async function (req: Request, res: Response) {
      const output = await fn(req.params, req.body);
      return res.json(output);
    });
  }
  listen(port: number): void {
    this.app.listen(port);
  }
}
