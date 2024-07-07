import express, {NextFunction, Request, Response, Router} from 'express';

const router: Router = express.Router();

/* GET users listing. */
router.get('/', function (req: Request, res: Response, next: NextFunction): void {
    res.send('respond with a resource');
});

module.exports = router;
