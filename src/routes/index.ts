import express, {NextFunction, Request, Response, Router} from 'express';

const router: Router = express.Router();

router.get('/', function (req: Request, res: Response, next: NextFunction): void {
    res.render('index', {title: 'Express'});
});

module.exports = router;
