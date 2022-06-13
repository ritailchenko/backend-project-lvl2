### Hexlet tests and linter status:

[![Actions Status](https://github.com/ritailchenko/backend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/ritailchenko/backend-project-lvl2/actions)

[![Maintainability](https://api.codeclimate.com/v1/badges/2a71187e86d393f47215/maintainability)](https://codeclimate.com/github/ritailchenko/backend-project-lvl2/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/2a71187e86d393f47215/test_coverage)](https://codeclimate.com/github/ritailchenko/backend-project-lvl2/test_coverage)

This is a CLI utility that perceives the difference between two data structures. This is a popular task for which there are many online services, such as http://www.jsondiff.com/. A similar mechanism is used when outputting tests or when automatically tracking changes in configuration files.

Utility features:

+ Support for different input formats: yaml, json
+ Report generation in the form of plain text, stylish and json

To start using please install nodejs-package with make command "instal". Linter might be installed with "lint" command.

Input format: gendiff file1 file2 --format [plain, json, stylish]. If no format were selected, stylish will be default format. 

Jest framework was used to write tests. To test program use "test" command. 

gendiff JSON-files format stylish, format plain, format JSON

[![asciicast](https://asciinema.org/a/VE6l9xtiq4Yu35UAGHZTFkL82.svg)](https://asciinema.org/a/VE6l9xtiq4Yu35UAGHZTFkL82)

gendiff YAML-files format stylish, format plain, format JSON

<a href="https://asciinema.org/a/OntR7jJ8inc2KP1rty9QDQ5Vl" target="_blank"><img src="https://asciinema.org/a/OntR7jJ8inc2KP1rty9QDQ5Vl.svg" /></a>




