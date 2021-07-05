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
