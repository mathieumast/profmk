build:
	npm install
	cp profmk.js test/profmk.js; cp node_modules/requirejs/require.js test/ext/require.js; cp node_modules/mocha/mocha.js test/ext/mocha.js; cp node_modules/mocha/mocha.css test/ext/mocha.css; cp node_modules/chai/chai.js test/ext/chai.js
	node_modules/mocha/bin/mocha test/test.js
	
	