import { JsonController, Post, Get, Patch, UseBefore, Req, Res, Authorized, HttpError, Delete } from 'routing-controllers';
import { Service } from 'typedi';
import { Logger } from '../../../libs/logger';
import { MessageService } from '../services/message.service';
import { Request, Response } from 'express';
import {json as bodyParserJson} from 'body-parser';

@JsonController('/message')
@Service()
export class AuthController {
	constructor(public _messageService: MessageService) { }

	@Authorized()
	@Post()
	@UseBefore(bodyParserJson())
	public async create(@Req() req: Request, @Res() res: Response) {
		try {
			const resp = await this._messageService.create(req);
			Logger.info('Controller: Community', 'Response:' + JSON.stringify(resp));
			return res.json(resp);
		} catch (error) {
			Logger.error('Controller: Community', 'ErrorInfo:' + JSON.stringify(error));
			if (error instanceof HttpError) {
				res.status(error.httpCode).json(error);
			}
			return res.status(error);
		}
	}

	@Authorized()
	@Get('/all/:channelId')
	@UseBefore(bodyParserJson())
	public async all(@Req() req: Request, @Res() res: Response) {
		try {
			const resp = await this._messageService.read(req);
			Logger.info('Controller: Community', 'Response:' + JSON.stringify(resp));
			return res.send(resp);
		} catch (error) {
			Logger.error('Controller: Community', 'ErrorInfo:' + JSON.stringify(error));
			if (error instanceof HttpError) {
				res.status(error.httpCode).json(error);
			}
			return res.status(error);
		}
	}

	@Authorized()
	@Get('/:id')
	@UseBefore(bodyParserJson())
	public async read(@Req() req: Request, @Res() res: Response) {
		try {
			const resp = await this._messageService.read(req);
			Logger.info('Controller: Community', 'Response:' + JSON.stringify(resp));
			return res.send(resp);
		} catch (error) {
			Logger.error('Controller: Community', 'ErrorInfo:' + JSON.stringify(error));
			if (error instanceof HttpError) {
				res.status(error.httpCode).json(error);
			}
			return res.status(error);
		}
	}

	@Authorized()
	@Patch('/:id')
	@UseBefore(bodyParserJson())
	public async update(@Req() req, @Res() res) {
		try {
			const resp = await this._messageService.update(req);
			Logger.info('Controller: Auth', 'Response:' + JSON.stringify(resp));
			return res.json(resp);
		} catch (error) {
			Logger.error('Controller: Auth', 'ErrorInfo:' + JSON.stringify(error));
			if (error instanceof HttpError) {
				res.status(error.httpCode).json(error);
			}
			return res.status(error);
		}
	}

	@Authorized()
	@Delete('/:id')
	@UseBefore(bodyParserJson())
	public async delete(@Req() req, @Res() res) {
		try {
			const resp = await this._messageService.delete(req);
			Logger.info('Controller: Auth', 'Response:' + JSON.stringify(resp));
			return res.json(resp);
		} catch (error) {
			Logger.error('Controller: Auth', 'ErrorInfo:' + JSON.stringify(error));
			if (error instanceof HttpError) {
				res.status(error.httpCode).json(error);
			}
			return res.status(error);
		}
	}
}
