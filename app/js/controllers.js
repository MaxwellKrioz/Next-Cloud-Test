'use strict';

/* Controllers */

var examApp = angular.module('examApp', [
    'ngStorage'
]);

examApp.controller('testCtrl', function($scope, $http,$localStorage) {
	
	if(!$localStorage.cart){
		$scope.cart=[];
		$localStorage.cart=$scope.cart;
	}else{
		$scope.cart = $localStorage.cart;
	}
	
	
	$scope.goCart=false;
	$scope.Show_mod=false;
	$scope.product_quant = {};
	$scope.quantity=0;
	
	
   $http.get('http://api-ecommerce-aws.next-cloud.mx/v1.0/bekko.next-cloud.mx/products').
        success(function(data) {
            $scope.products = data;
        });	
	$scope.sorting = function(){
		$scope.reverse = !$scope.reverse;
	}
	
	$scope.add2cart = function(sku){
		var quantity = $scope.product_quant[sku];
		if (!quantity){
			//Do Somthing
		}
		var obj = $scope.products.filter(function ( obj ) {
			return obj.sku === sku;
		})[0];
		
		var index = getIndexOf($scope.cart, sku, 'sku');
		
		console.log(index);
		if(index!=null){
			$scope.cart[index].quantity=parseInt($scope.cart[index].quantity)+parseInt(quantity);
			alert("Product Updated");
		}else{	
			var car_product = {'sku':sku,'description':obj.description,'image':obj.image,'price':obj.price,'quantity':quantity};
			
			$scope.cart.push(car_product);
			alert("Product Added");
		}
	}
	
	$scope.removeCart = function(indx){
		$scope.cart.splice(indx,1);
	}
	
	$scope.cart_go= function(){
		$scope.goCart=!$scope.goCart;
		alert("hi: "+$scope.goCart);
	}
	
	$scope.getTotal = function(){
    var total = 0;
    for(var i = 0; i < $scope.cart.length; i++){
        var product = $scope.cart[i];
        total += (product.price * product.quantity);
    }
    return total;
	}
	
	
	
	$scope.addOne = function(index){
		$scope.cart[index].quantity++;
	}
	
	$scope.subOne = function(index){
		if($scope.cart[index].quantity > 1){
			$scope.cart[index].quantity--;
		}
	}
	
	$scope.$watch(function() {
         return angular.toJson($localStorage);
	  }, function() {
		  $scope.cart = $localStorage.cart;
	});
});


examApp.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
});


function getIndexOf(arr, val, prop) {
      var l = arr.length,
        k = 0;
      for (k = 0; k < l; k = k + 1) {
        if (arr[k][prop] === val) {
          return k;
        }
      }
      return null;
    }
	

	

/*
		
		
		
*/