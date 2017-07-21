# ModuleBank API
Wrapper for [ModuleBank API](https://api.modulbank.ru/) for Node.js

[![NPM version][npm-image]][npm-url]

## Install
`npm i module-bank-api -S`

## Usage

#### Import
```javascript
{ModuleBankApi, ModuleBankPaymentCategory} = require('module-bank-api');
// or
import {ModuleBankApi, ModuleBankPaymentCategory} from 'module-bank-api';
```

#### API object

```javascript
let api = new ModuleBankApi(
    'sandboxtoken', // Auth token 
    true // true - sandbox mode, false - production mode
);
```

#### API methods

* `api.getAccountInfo(callback)` - returns user accounts <https://api.modulbank.ru/data/#_5>
* `api.getOperationHistory(bankAccountId, params, callback)` - returns operation history for the account <https://api.modulbank.ru/data/#_6>

Argument `params` is an Object with the followings fields:
```javascript
let query = {
	category: ModuleBankPaymentCategory.CREDIT, // ModuleBankPaymentCategory.CREDIT or ModuleBankPaymentCategory.DEBET
	skip: 2, // Skim records count
	records: 3, // Records limit
	from: from, // Select operation from this date (JS Date object)
	till: till, // Select operation till this date (JS Date object)
};
```
All fields are optional.
* `api.getBalance(bankAccountId, callback)` - returns balance of the account <https://api.modulbank.ru/data/#_7>
* `api.uploadOperation(operation1c, callback)` - uploads operations in 1C format <https://api.modulbank.ru/load/>

#### Callback signature

```javascript
function callback(error, response) {
    if (!error) {
        console.log(response);
    }
}
```

* `error` - error information or `null` if no error happens
* `response` - response data

#### ModuleBankPaymentCategory

* `ModuleBankPaymentCategory.DEBET` - debet category
* `ModuleBankPaymentCategory.CREDIT` - credit category

#### Example
[See demo](https://github.com/Deadly0/module-bank-api/blob/master/demo.js)


[npm-url]: https://www.npmjs.com/package/module-bank-api
[npm-image]: https://img.shields.io/npm/v/module-bank-api.svg
