// home of 'common' methods for use with selenium / chromedriver


module.exports = {

  cookieInjector: (args) => {
    console.log("ARGS>>> ", args);
    var aCookie = args[0];
    document.cookie = aCookie;
    var x = window.open('');
    x.document.cookie = aCookie;
    x.document.write('<script>console.log("I was Injected")</script>');
    return document;
  },
















};