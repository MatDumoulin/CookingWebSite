
// Prevents any user from typing 'e' in input number fields.
/*(function() {

  angular.module('app.recipes')
         .directive("plainnumbersonly", onlyAllowPlainNumbers );


  function onlyAllowPlainNumbers() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {

          element.on('keypress', function(event) {

            if ( !isIntegerChar() )
              event.preventDefault();

            function isIntegerChar() {
              return /[0-9]|\.|-/.test(
                String.fromCharCode(event.which))
            }

          });
        }
      };
  }

})();*/
