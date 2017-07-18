"use strict";

let request = require('request');


module.exports = class ModuleBankApi {
	/**
	 * ModuleBankApi
	 * https://api.modulbank.ru/auth/
	 *
	 * @param token - токен авторизации
	 * @param sandbox - включить/выключить режим песочницы
	 */
	constructor(token, sandbox) {
		this.API_BASE_URL = 'https://api.modulbank.ru/v1/';

		this.token = token;
		this.sandbox = sandbox || false;
	}

	/**
	 * Получение информации о компаниях и счетах компаний пользователя
	 * https://api.modulbank.ru/data/#_5
	 *
	 * @param callback - результат запроса
	 */
	getAccountInfo(callback) {
		this.sendRequest('account-info', {}, callback);
	}

	/**
	 * Просмотр истории операций
	 * https://api.modulbank.ru/data/#_6
	 *
	 * @param bankAccountId - системный идентификатор счета
	 * @param callback - результат запроса
	 */
	getOperationHistory(bankAccountId, callback) {
		this.sendRequest('operation-history/' + bankAccountId, {}, callback);
	}

	/**
	 * Получение баланса по счету
	 * https://api.modulbank.ru/data/#_7
	 *
	 * @param bankAccountId - системный идентификатор счета
	 * @param callback - результат запроса
	 */
	getBalance(bankAccountId, callback) {
		this.sendRequest('account-info/balance/' + bankAccountId, {}, callback);
	}

	/**
	 * Импорт платежек в формате 1С (бета версия)
	 * https://api.modulbank.ru/load/
	 *
	 * @param document
	 * @param callback - результат запроса
	 */
	uploadOperation(document, callback) {
		this.sendRequest('operation-upload/1c', {document: document}, callback);
	}

	sendRequest(methodUrl, data, callback) {
		data = data || {};
		callback = callback || function () {};

		let options = {
			uri: this.API_BASE_URL + methodUrl,
			method: 'POST',
			json: data,
			auth: {'bearer': this.token},
		};

		if (this.sandbox) {
			options.headers = {sandbox: 'on'};
		}

		request(options, function (error, resp) {
			callback(error, resp && resp.body);
		});
	}
};
