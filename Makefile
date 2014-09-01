build:
	npm install
	cp src/profmk.js test/profmk.js; cp node_modules/requirejs/require.js test/ext/require.js; cp node_modules/mocha/mocha.js test/ext/mocha.js; cp node_modules/mocha/mocha.css test/ext/mocha.css; cp node_modules/chai/chai.js test/ext/chai.js
	node_modules/mocha/bin/mocha test/test.js
	rm -f dist/*
	uglifyjs src/profmk.js --beautify --comments '/Licensed/' --output dist/profmk.js
	uglifyjs src/profmk.js --compress --comments '/Licensed/' --output dist/profmk.min.js
	
	