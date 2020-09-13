import { Router } from 'express';
import basicAuth from 'express-basic-auth';
import agendash from 'agendash';
import { Container } from 'typedi';
import config from '../../config';
import Agenda from 'agenda';

export default (app: Router) => {
	const agendaInstance: Agenda = Container.get('agendaInstance');

	app.use(
		'/dash',
		basicAuth({
			users: {
				[config.agendash.user]: config.agendash.password,
			},
			challenge: true,
		}),
		agendash(agendaInstance),
	);

	app.use('/scheduleMail', async (req, res) => {
		agendaInstance.define('print', async job => {
			console.log('I print a report!');
		});
		agendaInstance.schedule('2020-08-01T10:15', 'print');
		res.send('done');
		// get Date & Time from this element <input type="datetime-local" id="birthdaytime" name="birthdaytime">
	});
};
