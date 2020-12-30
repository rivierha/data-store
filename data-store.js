
/* object-sizeof to get size of JavaScript object in bytes*/
var sizeof = require('object-sizeof');

// DataStore class 
class DataStore{

    constructor() {
        this.map = new Map();                                           // map data-structure to store key-value pair
        this.size = 0;                                                  // keep check on size of store
        this.maxSize = 1024 * 1024 * 1024;                              // max data store limit i.e. 1GB
        console.log("New data store created.");
    }

    // valid JSON object
    #isValidJSON = function (text){
        try {
            const x = JSON.parse(text);
            if (typeof (x) != "object")
                return false;
            return true;
        }
        catch (error){
            return false;
        }
    }
g
    // add new key-value pair in store
    create(key, value, ttl) {
        try {

        // validating arguments
            // *1* Time-to-Live
            if (ttl == undefined)
                ttl == 0;
            else if (ttl < 0)                           // time-to-live should be positive integer value
                return { message: "Time-To-Live value must be non negative integer. Enter a valid value." };
            
            // *2* value
            if (!this.#isValidJSON(JSON.stringify(value))) {    // value should be valid JSON object
                return { message: "Value must be a JSON object." };
            }
            else if (sizeof(value) > 16*1024)           // size of JSON object should not exceed 16Kb
                return { message: "Size of value string must not exceed 16KB." }
            
            // *3* key
            if (typeof (key) != "string")               // key must be string
                return {message: "Key must be a string."}
            else if (key.length > 32)                   // string length should not exceed 32 charcters
                return { message: "Key length should not exceed 32 characters. Please enter a valid key string." };
            
            // key exits in store
            if (this.map.has(key))
                return { message: "Key already exists." };
            
            // store size < 1gb
            var objSize = sizeof(key) + sizeof(value);
            if (this.size + objSize >= this.maxSize)
                return "Memory Limit of data store reached. Please try deleting some keys to free up space."
            this.size += objSize;      
        

            this.map.set(key, { value, status: "active" });

            // after ttl expires update key status to expired
            if (ttl > 0)
                setTimeout(() => {
                    this.map.set(key, { value, status: "expired" });  
                }, ttl);
            
            return { message: "Key added succesfully." };

        } catch (error) {
            console.log(error);
            return { error: "Something went wrong. Please try again"};
        }
    }

    // read key from store 
    read(key) {
        try {
            if (!this.map.has(key))
                return { message: "Key not found! Please enter a valid key."};
            else {
                const result = this.map.get(key);
                if (result.status == "expired")
                    return { message: "Key has expired." }
                return key + " : " + JSON.stringify(result.value);
            }
                
        } catch (error) {
            console.log(error);
            return { error: "Something went wrong. Please try again"};
        }
    }

    // remove key-value pair from store
    delete(key) {
        try {
            if (!this.map.has(key))
                return { message: "Key not found! Please enter a valid key." };
            
            const result = this.map.get(key);
            if (result.status == "expired")
                return { message: "Key has expired." };
            
            this.size -= (sizeof(key) + sizeof(result)); 

            this.map.delete(key);

            return { message: "Succesfully deleted " + key };
            
        } catch (error) {
            console.log(error);
            return { error: "Something went wrong. Please try again"};
        }
    }
}

module.exports = DataStore;