/*(function() {
  angular
    .module('app.recipes')
    // This directive creates a star rating widget.
    .directive('starRating', starRatingDirective);

  function starRatingDirective() {
    return {
      restrict: 'E',
      templateUrl: 'viewComponents/star-rating/star-rating.ejs',
      scope: {
        ratingValue: '=ngModel',
        ngChange: '&',
        max: '=?', // optional (default is 5)
        //onRatingSelect: '&?',
        readonly: '=?'
      },
      link: function(scope, element, attributes) {
        if (scope.max == undefined) {
          scope.max = 5;
        }
        function updateStars() {
          scope.stars = [];
          for (var i = 0; i < scope.max; i++) {
            scope.stars.push({
              filled: i < scope.ratingValue
            });
          }
        };
        scope.toggle = function(index) {
          if (scope.readonly == undefined || scope.readonly === false){
            scope.ratingValue = index + 1;
            scope.ngChange();
          }
        };
        scope.$watch('ratingValue', function(oldValue, newValue) {
          if (newValue || newValue === 0) {
            updateStars();
          }
        });
      }
    };
  }

})();*/
