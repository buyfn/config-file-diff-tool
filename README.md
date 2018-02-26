[![Build Status](https://travis-ci.org/buyfn/project-lvl2-s221.svg?branch=master)](https://travis-ci.org/buyfn/project-lvl2-s221)
[![Maintainability](https://api.codeclimate.com/v1/badges/657b679af6837c399ab8/maintainability)](https://codeclimate.com/github/buyfn/project-lvl2-s221/maintainability)
# About
Compares two files, shows how they differ.

# Installation
```bash
> npm install -g compare-files
```

# Usage
Let's say you have two json files:
## file1.json
```json
{
    "host": "hexlet.io",
    "timeout": 50,
    "proxy": "123.234.53.22"
}
```
## file2.json
```json
{
    "timeout": 20,
    "verbose": true,
    "host": "hexlet.io"
}
```

To find out the differences between those two files, run `gendiff` in the terminal with paths to the files. For example:
```bash
> gendiff file1.json file2.json --format plain
Property 'timeout' was updated from '50' to '20'
Property 'proxy' was removed
Property 'verbose' was added with 'true'
```

## Supported formats
- json,
- yaml,
- ini.

## Output formats
- plain text,
- json