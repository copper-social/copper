import { JsonController, Post, UseBefore, Req, Res } from 'routing-controllers';
import { Service } from 'typedi';
import { Logger } from '../../../libs/logger';
import { AuthService } from '../services/auth.service';
import { Request, Response } from 'express';
import {json as bodyParserJson} from 'body-parser';

@JsonController('/auth')
@Service()
export class AuthController {
	constructor(public _authService: AuthService) { }

	@Post('/token')
	@UseBefore(bodyParserJson())
	public async token(@Req() req: Request, @Res() res: Response) {
		try {
			const resp = await this._authService.tokenExecutor(req.body);
			Logger.info('Controller: token', 'response:' + JSON.stringify(resp));
			return res.json({token: resp});
		} catch (error) {
			Logger.error('Controller: token', 'errorInfo:' + JSON.stringify(error));
			return res.json(error);
		}
	}
}