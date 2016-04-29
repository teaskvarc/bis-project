angular.module('app').directive('birthdateSelect', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
            ngModel:'='   //ta model lahko zunaj uporabljamo. two-way binding
		},
		templateUrl: 'directive/birthdate-select/birthdate-select.html',
		link: function(scope, element, attrs, fn) {

           scope.date = {
               year:1980,
               month:1,
               day:1
           };



            //ko spreminjamo mesec in leto, se posodobijo dnevi
            scope.onChange = function () {

                var numDays = daysInMonth(scope.date.month, scope.date.year);
                scope.days = [];

                var daysArray = [];

                for(var j=0; j<numDays; j++){
                    daysArray.push(j+1);
                }
                scope.days = daysArray;

                var newDate = new Date();

                newDate.setFullYear(scope.date.year);
                newDate.setDate(scope.date.day);
                newDate.setMonth(scope.date.month-1);

                scope.ngModel = newDate;

            };


            /*
            Setting the data for date values
             */

            var date = new Date();
            var year = date.getFullYear();

            var yearArray = [];

            for(var i=1900;i<=year;i++){
                yearArray.push(i);
            }

            scope.years = yearArray;

            //DAYS
            var numDays = daysInMonth(0, 1980);

            var daysArray = [];

            for(var j=0; j<numDays; j++){
                daysArray.push(j+1);
            }
            scope.days = daysArray;

            //MONTHS

            var monthsArray = [];

            for(var k=1;k<13;k++){
                monthsArray.push(k);
            }

            scope.months = monthsArray;

            //Month is 1 based
            function daysInMonth(month, year){
                return new Date(year, month, 0).getDate();
            }

		}
	};
});
