var emblemPlugin = require('../');
var should = require('should');
var gutil = require('gulp-util');
var os = require('os');
var fs = require('fs');
var path = require('path');
require('mocha');

var getFixture = function(filePath) {
  filePath = path.join('test', 'fixtures', filePath);

  return new gutil.File({
    path: filePath,
    cwd: path.join('test', 'fixtures'),
    base: path.dirname(filePath),
    contents: fs.readFileSync(filePath)
  });
};

var getExpectedString = function(filePath) {
  return fs.readFileSync(path.join('test', 'expected', filePath), 'utf8');
};

var fileMatchesExpected = function(file, expectedFileName) {
    String(file.contents).should.equal(getExpectedString(expectedFileName));
};

describe('gulp-emblem', function() {
  describe('emblemPlugin()', function() {

    it('should compile templates', function(done) {
      var stream = emblemPlugin();
      var basicTemplate = getFixture('Basic.hbs');

      stream.on('data', function(newFile) {
        var expectedString = '{"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {\n  return "Basic template";\n  },"useData":true}';
        should.exist(newFile);
        should.exist(newFile.contents);
        should(newFile.contents.toString()).equal(expectedString)
        done();
      });

      stream.write(basicTemplate);
      stream.end();
    });
  });
});
