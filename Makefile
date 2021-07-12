install: 
	npm install

publish: 
	npm publish --dry-run

lint:
	npx eslint .

say:
	echo "Hello, $(Hello)!"

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8
