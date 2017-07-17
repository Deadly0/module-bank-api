let ModuleBankApi = require('./api');

let api = new ModuleBankApi(
	'sandboxtoken', // Токен авторизации, получаемый от банка. https://api.modulbank.ru/auth/
	true // true - песочница, false - боевой режим https://api.modulbank.ru/data/#_3
);


// Получение информации о компаниях и счетах компаний пользователя
api.getAccountInfo(function (error, accounts) {
	if (error) {
		console.error(error);
		return;
	}

	console.log(accounts);

	let bankAccountId = accounts[0].bankAccounts[0].id;

	// Получение списка операций по номеру счета
	api.getOperationHistory(bankAccountId, function (error, operations) {
		if (error) {
			console.error(error);
			return;
		}

		console.log(operations);
	});

	// Получение баланса по номеру счета
	api.getBalance(bankAccountId, function (error, balance) {
		if (error) {
			console.error(error);
			return;
		}

		console.log(balance);
	});
});


// Загрузка операции в формате 1с

let operation1c = `
1CClientBankExchange
ВерсияФормата=1.01
Кодировка=Windows
ДатаСоздания=23.08.2016
ВремяСоздания=09:50:53
ДатаНачала=24.07.2016
ДатаКонца=23.08.2016
РасчСчет=40802810670010011008
СекцияДокумент=Платежное поручение
Номер=994720
Дата=11.08.2016
Сумма=100.00
НазначениеПлатежа=Для теста
Плательщик1=Индивидуальный предприниматель Александров Александр Александрович
ПлательщикИНН=770400372208
ПлательщикСчет=40802810670010011008
ПлательщикКПП=0
ПолучательКПП=771543001
ПоказательКБК=
ОКАТО=
ПоказательОснования=
ПоказательПериода=
ПоказательНомера=
ПоказательДаты=
ПоказательТипа=
ПлательщикБанк1=МОСКОВСКИЙ ФИЛИАЛ АО КБ "МОДУЛЬБАНК"
ПлательщикБИК=044525092
ПлательщикКорсчет=30101810645250000092
Получатель1=МОСКОВСКИЙ ФИЛИАЛ АО КБ "МОДУЛЬБАНК"
ПолучательИНН=2204000595
ПолучательСчет=30102810675250000092
ВидОплаты=01
СрокПлатежа=
Очередность=5
ВидПлатежа=
ДатаСписано=12.08.2016
ПолучательБанк1=МОСКОВСКИЙ ФИЛИАЛ АО КБ "МОДУЛЬБАНК"
ПолучательБИК=044525092
ПолучательКорсчет=30102810675250000092
Код=
КонецДокумента
КонецФайла
`;

api.uploadOperation(operation1c, function (error, response) {
	if (error) {
		console.error(error);
		return;
	}

	console.log(response);
});
