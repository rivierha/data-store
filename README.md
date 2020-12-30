<p align="center">
  <a href="https://nodejs.org/">
    <img
      alt="Node.js"
      src="https://nodejs.org/static/images/logo-light.svg"
      width="400"
    />
  </a>
</p>

Node.js is an open-source, cross-platform, JavaScript runtime environment. It
executes JavaScript code outside of a browser. For more information on using
Node.js, see the [Node.js Website][].

# data-store

A file based key-value data store that supports the basic CRD (create, read and delete) operations.

## Requirements

- Node 12
- Git
- Contentful CLI (only for write access)

This data store will work on most operating systems. This data store is meant to be used as a local storage for one single process on one
laptop. The data store is exposed as a library to clients that can instantiate a class and work
with the data store.

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/rivierha/data-store.git
cd data-store
```

```bash
npm install
```

## Functions

The data store support the following functions.

1. It can be initialized using an optional file path. If one is not provided, it will reliably
   create itself in a reasonable location on the laptop.

```bash
var dataStore = require("./data-store");
var ds = new dataStore();
```

2. A new key-value pair can be added to the data store using the Create operation. The key
   is always a string - capped at 32chars. The value is always a JSON object - capped at
   16KB.

```bash
ds.create("key1", { abc: 'def' });
```

3. A Read operation on a key can be performed by providing the key, and receiving the
   value in response, as a JSON object.

```bash
ds.read("key1");
```

4. A Delete operation can be performed by providing the key.

```bash
ds.delete("key1");
```

5. Every key supports setting a Time-To-Live property when it is created. This property is
   optional. If provided, it will be evaluated as an integer defining the number of seconds
   the key must be retained in the data store. Once the Time-To-Live for a key has expired,
   the key will no longer be available for Read or Delete operations.

```bash
ds.create("key2", { xyz: 'uvw' }, 10000);
```

5. The size of the file storing data never exceeds 1GB.
