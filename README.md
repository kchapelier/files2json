# files2json

A simple cli tool to concat multiple files into a single json file.

The json string is directly sent to the standard output.

## Installation

```npm i -g files2json```

## Usage

```files2json glob-pattern [OPTIONS]...```

### Options

- **-r, --relative :** Specify the directory to use as relative path. By default it is the current working directory.

## Examples

```files2json "./data/**/*"```

Output the json containing all the files in the data directory to the standard output.

```files2json "./data/**/*.{txt,json}" > output.json```

Write the json containing all the txt and json files in the data directory to the output.json file.

### Output example

#### For the following structure

```
./fixtures/dirEmpty/
./fixtures/dirWithFiles/csvFiles/
./fixtures/dirWithFiles/csvFiles/test.csv
./fixtures/dirWithFiles/jsonFiles/
./fixtures/dirWithFiles/jsonFiles/test.json
./fixtures/dirWithFiles/test.txt
```

#### Command

```
files2json "./fixtures/**/*"
```

#### Output

```json
{
    "fixtures/dirWithFiles/csvFiles/test.csv": [
        [
            "column 1",
            "column 2"
        ],
        [
            "1",
            "2"
        ],
        [
            "3",
            "4"
        ]
    ],
    "fixtures/dirWithFiles/jsonFiles/test.json": {
        "name": "A test file",
        "parameter1": 1,
        "parameter2": 2
    },
    "fixtures/dirWithFiles/test.txt": "A text file...\nHow surprising.\n"
}
```

#### Command with relative path

```
files2json "./fixtures/**/*" -r ./fixtures/dirWithFiles
```

#### Output

```json
{
    "csvFiles/test.csv": [
        [
            "column 1",
            "column 2"
        ],
        [
            "1",
            "2"
        ],
        [
            "3",
            "4"
        ]
    ],
    "jsonFiles/test.json": {
        "name": "A test file",
        "parameter1": 1,
        "parameter2": 2
    },
    "test.txt": "A text file...\nHow surprising.\n"
}
```

## Notes

 * All the files are treated as utf8 text files, except for the json and csv files.
 * The csv and json files are parsed before being added to the output.
 * Currently the csv parsing is hardcoded to use comma as separators and double quote as enclosures.

## History

### 0.2.0 (2015.11.18)

 * Add the relative path option.
 * Update dependencies.

### 0.1.0 (2015.09.11)

 * First release.
