describe('Qurvey Login and Signup', function() {

  var username = element(by.model('username'));
  var password = element(by.model('password'));
  var loginButton = element(by.id('login'));
  var signupButton = element(by.id('signup'));

  beforeEach(function() {
    // go to home page
    browser.get('http://127.0.0.1:3000');    
  });

  afterEach(function() {
    //delete cookies
    browser.manage().deleteAllCookies();
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Qurvey');
  });

  it('should go to /main/questions/top after successful login', function() {

    // input username
    username.sendKeys('admin');
    // input password
    password.sendKeys('1234');

    // click login button
    loginButton.click();

    expect(browser.getLocationAbsUrl()).toEqual('/main/questions/top');
  });

  it('should display error message for invalid login', function() {

    // input username
    username.sendKeys('admin');
    // input password
    password.sendKeys('1235');

    // click login button
    loginButton.click();

    expect(browser.getLocationAbsUrl()).toEqual('/');

  });

  it('should go to signup page when signup button is clicked', function() {
    // click signupButton
    signupButton.click();

    expect(browser.getLocationAbsUrl()).toEqual('/signup');
  });

  xit('', function() {
    var message = 'Feed Me, Seymour!';
    for (var i = 0; i < message.length; i++) {
      username.sendKeys(message[i]);
      browser.sleep(100);
    }
  });
});