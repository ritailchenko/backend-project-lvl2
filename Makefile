install: 
	npm install

publish: 
	npm publish --dry-run

lint:
	npx eslint .

say:
	echo "Hello, $(Hello)!"

test:
	npx -n --experimental-vm-modules jest

test-coverage:
	npx -n --experimental-vm-modules jest -- --coverage --coverageProvider=v8
