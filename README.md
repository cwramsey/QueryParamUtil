# QueryParamUtil

- **Written in TypeScript with ES6**
- No dependencies
- TypeScript typings for public methods
- Supports arrays *(ex. `thing[]=one&thing[]=two`)*

### Install

`$ npm i QueryParamUtil`

### Tests

`$ cd __path_to_project__ && mocha`

### Usage

`const qp = require('QueryParamUtil').QueryParamUtil;`

### Public Methods

#### find(name, default_val, query_string?) 

Finds a specific key and returns it's value
If not set, will return a default value

**Parameters**

**name**: `string`, Finds a specific key and returns it's value
If not set, will return a default value

**default_val**: `any`, Finds a specific key and returns it's value
If not set, will return a default value

**query_string?**: , Finds a specific key and returns it's value
If not set, will return a default value

**Returns**: string[]|string


#### all(query_string) 

Fills an object with all key/val pairs from a query string
defaults to window.location.search if not specified

**Parameters**

**query_string**: `string`, Fills an object with all key/val pairs from a query string
defaults to window.location.search if not specified

**Returns**: Object


#### set(values) 

Takes an object of key/vals and returns an encoded url param string

**Parameters**

**values**: `Object`, Takes an object of key/vals and returns an encoded url param string

**Returns**: `string`