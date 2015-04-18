'use strict';
/**
 * @memberof CollaborativeMap
 * @fileOverview Directive which to handle feature properties. Allows adding/editing/deleting properties
 * @exports CollaborativeMap.FeaturePropertiesDirective *
 *
 * @requires  $compile
 * @requires ApiService
 * @requires MapHandler
 *
 * @author Dennis Wilhelm
 */
angular.module('CollaborativeMap')
    .directive('featurestats', ['$compile', 'MapHandler', 'ApiService' , '$http',
        function ($compile, MapHandler, ApiService, $http) {


            return {
                restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
                templateUrl: 'partials/featurestats',
                replace: true,
                link: function postLink($scope) {

                    $scope.prueba = "isma";



                    /**
                     * Toggles the visibility of the featureproprties view
                     */

                    function activateToolbox() {
                        if ($scope.views.tooflBarIn) {
                            $scope.toggleToolbar('statsView');
                            $scope.$apply();
                        } else if ($scope.views.toolsView) {
                            $scope.toggleToolbar('statsView');
                            $scope.$apply();
                        }

                    }



                    /**
                     * Cancel the edit mode if the toolbox window is closed.
                     */
                    $scope.$on('toolbox', function () {
                        if ($scope.views.statsView) {
                            MapHandler.removeEditHandler();
                        }
                    });



                    /**
                     * Remove selected category and preset from the scope
                     */

                    function cleanSelection() {
                        $scope.presets = undefined;
                        $scope.selectedCategory = undefined;
                        $scope.selectedPreset = undefined;
                    }






                }
            };
        }
    ]);
