var myApp=angular.module('myApp', ['dndLists']);
myApp.controller("myCtrl",['$scope','$http',function($scope,$http){
     
 $scope.models = {
        selected: null,
    };
    
     $scope.showModal = false;
    $scope.toggleModal = function(){
       //post call to server to fetch the order details using the orderId and opening them in a modal. 
        $scope.showModal = !$scope.showModal;
    };
    
$http.get('data.json').
  success(function(data, status, headers, config) {
    $scope.data=data.orders;
    console.log(data);
    // this callback will be called asynchronously
    // when the response is available
  }).
  error(function(data, status, headers, config) {
     alert('Failed to get order data');
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
    $scope.dropCallback = function(event, index, item, external, type, allowedType) {
        if (external) {
            if (allowedType === 'itemType' && !item.label) return false;
            if (allowedType === 'containerType' && !angular.isArray(item)) return false;
        }
        return item;
    };

}]);

myApp.directive('modal', function () {
    return {
      template: '<div class="modal fade">' + 
          '<div class="modal-dialog">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' + 
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                '<h4 class="modal-title">{{ title }}</h4>' + 
              '</div>' + 
              '<div class="modal-body" ng-transclude></div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });
