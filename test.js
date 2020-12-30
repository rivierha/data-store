// import DataStore class from app.js
var dataStore = require("./data-store");

// instantiate dataStore class to work with data-store
var ds = new dataStore();

var result; // variable to display result of operations

// create new key-value pair with no ttl property
result = ds.create("key1", { abc: 'def' });
console.log(result);

// create new key-value pair with ttl = 10sec
result = ds.create("key2", { xyz: 'uvw' }, 10000);
console.log(result);

// create new key-value pair with integer key value
result = ds.create(123, { abc: 'def' });
console.log(result);

// create new key-value pair with string value
result = ds.create("key3", "String");
console.log(result);

// create new key-value pair with key > 32chars
result = ds.create("pneumonoultramicroscopicsilicovolcanokoniosispneumonoultramicroscopicsilicovolcanokoniosis", { abc: 'def' });
console.log(result);

// create new key-value pair where key already exists
result = ds.create("key1", { abc: 'stu' });
console.log(result);


// read key value from store 
result = ds.read("key1");
console.log(result);

// read key value of expired key from store 
result = ds.read("key2");
console.log(result);

// read key value that do not exist in store 
result = ds.read("key3");
console.log(result);



// delete key from store 
result = ds.delete("key1");
console.log(result);

// delete expired key from store 
result = ds.delete("key2");
console.log(result);

// delete key value that do not exist in store 
result = ds.delete("key3");
console.log(result);
