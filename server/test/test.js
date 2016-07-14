var expect = require('chai').expect;
var server = require('../server.js');
var supertest = require('supertest');
var User = require('../users/usersModel.js');
var Answer = require('../answers/answersModel.js');
var Question = require('../questions/questionsModel.js');


// this will handle our HTTP requests
var request = supertest.agent(server);

describe("server", function() {
  // main / route
  describe("GET /", function() {
    it("should return the content of index.html", function(done) {
      // just assume that if it contains an <div> tag its index.html
      request
        .get('/')
        .expect(200, /<div/, done);
    });
  });

  // auth routes
  describe("POST /auth/login", function() {
    it("should return user object", function(done) {
      var loginInfo = {
        username: 'Mario',
        password: '1234'
      };
      request
        .post('/auth/login')
        .send(loginInfo)
        .expect(function(res) {
          res.username = 'Mario';
        })
        .expect(200, done);
    });
  });

  describe("POST /auth/signup", function() {

    // delete test user after it is created
    after(function() {
      User.findOneAndRemove({username: 'test'}, function(err) {
        if (err) {
          console.error(err);
        } else {
          console.log('test user deleted');
        }
      });
    });

    it("should return newUser object", function(done) {
      // create test user
      var user = {
        username: "test",
        password: 1234,
        traits: ['happy', 'sad', 'shy', 'outgoing']
      };
      request
        .post('/auth/signup')
        .send(user)
        .expect(function(res) {
          res.body.username = user.username;
          res.body.password = 1234;
          res.body.traits = ['happy', 'sad', 'shy', 'outgoing'];
        })
        .expect(201, done);
    });
  });

  // questions routes
  describe("GET /api/questions", function() {

    // get number of questions before test
    var count = 0;
    before(function () {

      Question.count({})
      .exec(function(err, questionCount) {
        if (err) {
          console.error(err);
        } else {
          count = questionCount;
        }
      });
    });

    it("should return all questions", function(done) {
      request
        .get('/api/questions')
        .expect(function(res) {
          res.body.length = count;
        })
        .expect(200, done);
    });
  });

  describe("POST /api/questions/ask", function() {

    // make test user to create question
    var userId = 0;
    before(function() {
      var user = {
        username: "test",
        password: 1234,
        traits: ['happy', 'sad', 'shy', 'outgoing']
      };
      var testUser = new User(user);
      testUser.save(function(err, testUser) {
        if (err) {
          console.error(err);
        } else {
          userId = testUser._id;
          console.log('test user created');
        }
      });
    });

    // delete test question and test user after test
    after(function() {
      Question.findOneAndRemove({question: 'test'}, function(err) {
        if (err) {
          console.error(err);
        } else {
          console.log('test question deleted');
        }
      });
      User.findOneAndRemove({username: 'test'}, function(err) {
        if (err) {
          console.error(err);
        } else {
          console.log('test user deleted');
        }
      });

    });

    it("should return newQuestion object", function(done) {

      // create test question
      var newQuestion = {
        question: 'test',
        answers: {
          a: 'Yes',
          b: 'No',
          c: 'Maybe?'
        },
        user: userId
      };

      request
        .post('/api/questions/ask')
        .send(newQuestion)
        .expect(function(res) {
          res.body.question = 'test';
        })
        .expect(201, done);
    });
  });

  describe("POST /api/answers", function() {

    // add test user and question to answer
    var questionId = 0;
    var userId = 0;
    before(function() {
      var user = {
        username: "test",
        password: 1234,
        traits: ['happy', 'sad', 'shy', 'outgoing']
      };
      var testUser = new User(user);
      testUser.save(function(err, testUser) {
        if (err) {
          console.error(err);
        } else {
          userId = testUser._id;
          console.log('test user created');
          var testQuestion = new Question({
            question: 'test',
            answers: {
              a: 'Yes',
              b: 'No',
              c: 'Maybe?'
            },
            user: userId
          });
          testQuestion.save(function(err, newQuestion) {
            if (err) {
              console.error(err);
            } else {
              questionId = newQuestion._id;
              console.log('test question created');
            }
          });
        }
      });
    });

    // delete test answer, test question, and test user after test
    after(function () {
      Answer.findOneAndRemove({question: questionId}, function(err, answer) {
        if (err) {
          console.error(err);
        } else {
          console.log(answer);
          console.log('test answer deleted');
        }
      });
      Question.findOneAndRemove({question: 'test'}, function(err, question) {
        if (err) {
          console.error(err);
        } else {
          console.log('test question deleted', question);
        }
      });
      User.findOneAndRemove({username: 'test'}, function(err, user) {
        if (err) {
          console.error(err);
        } else {
          console.log(user);
          console.log('test user deleted');
        }
      });
    });

    it("should return newAnswer object", function(done) {

      var newAnswer = {
        text: 'Yes',
        responseIndex: 'a',
        question: questionId,
        user: userId
      };
      request
        .post('/api/answers')
        .send(newAnswer)
        .expect(function(res) {
          res.body.text = 'Yes';
          res.body.responseIndex = 'a';
          res.body.question._id = questionId;
          res.body.user._id = userId;
        })
        .expect(201, done);
    });

    it("should increment response counter of question", function(done) {
      var count = 0;
      //get question
      Question.findOne({_id: questionId})
      .exec(function(err, q) {
        if (err) {
          console.error(err);
        } else {
          count = q.responses.a;
          expect(count).to.equal(1);
          done();
        }
      });
    });
  });
});