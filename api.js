"use strict";

let request = require('request');


class ModuleBankApi {
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
	 * @param params - {
	 *  category: ModuleBankPaymentCategory.DEBET,
	 *  from: new Date(),
	 *  till: new Date(),
	 *  skip: 0,
	 *  records: 10
	 * }
	 * @param callback - результат запроса
	 */
	getOperationHistory(bankAccountId, params={}, callback) {
		let query = {};

		if (params.category !== undefined) {
			query.category = params.category;
		}

		if (params.from !== undefined) {
			query.from = this.formatDate(params.from);
		}

		if (params.till !== undefined) {
			query.till = this.formatDate(params.till);
		}

		if (params.skip !== undefined) {
			query.skip = params.skip;
		}

		if (params.records !== undefined) {
			query.records = params.records;
		}

		this.sendRequest('operation-history/' + bankAccountId, query, callback);
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

	formatDate(date) {
		return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
	}
}


let ModuleBankPaymentCategory = {
	DEBET: 'Debet',
	CREDIT: 'Credit',
};


module.exports = {
	ModuleBankApi: ModuleBankApi,
	ModuleBankPaymentCategory: ModuleBankPaymentCategory,
};
