angular.module("MyCarApp",["ngRoute","angular-jwt"]).config(config).run(run);

function config($routeProvider,$httpProvider,$locationProvider){
    $httpProvider.interceptors.push("AuthInterceptor");

    $routeProvider.when("/", {
        templateUrl:"angular-app/welcome/welcome.html",
        access:{resitricted:false}
    }).when("/cars",{
       // templateUrl:"angular-app/game-list/games.html",
        templateUrl:"angular-app/car-list/cars.html",
        controller:"CarsController",
        controllerAs:"vm",
        access:{resitricted:false}

    })
    .when("/car/:id",{
        templateUrl:"angular-app/car-display-controller/car.html",
        controller:"CarController",
        controllerAs:"vm",
        access:{resitricted:false}

    })
    .when("/deleteCar/:id",{
        templateUrl:"angular-app/car-delete/car_delete.html",
        controller:"DeleteCarController",
        controllerAs:"vm",
        access:{resitricted:false}
    })
    .when("/register",{
        templateUrl:"angular-app/register/register.html",
        controller:"RegisterController",
        controllerAs:"vm",
        access:{restricted:false}
    })
    .when("/profile",{
        templateUrl:"angular-app/profile/profile.html",
        controllerAs:"vm",
        access:{restricted:true}
    })
    .when("/login",{
        templateUrl:"angular-app/login/login.html",
        controller:"LoginController",
        controllerAs:"vm"
    })
    .otherwise({redirectTo:"/"});
}

function run($rootScope,$location,$window,AuthFactory){
    $rootScope.$on("$routeChangeStart",function(event,nextRoute,currentRoute){
        if(nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn){
            event.preventDefault();  // do not go to that path
            $location.path("/");     // Instead go to the root
        }
    });
}

