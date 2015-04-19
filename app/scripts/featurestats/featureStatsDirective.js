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
                templateUrl: 'partials/featureproperties',
                replace: true,
                link: function postLink($scope) {


                    $scope.selectedExpiration = '1h';

                    $scope.$on('toolbox', function (e, view, hidden) {
                        if (view === 'statsView' && !hidden) {
                            $scope.toggleToolbar('statsView');

                            console.log("cargado");

                        }


                    });

                    /**
                     * Toggles the visibility of the featureproprties view
                     */
                    /**
                     * Loads zone type property
                     * @returns {string}
                     *
                     *
                     */










                    /**
                     * Calls the MapHandler functions to revert/cancel the current editing
                     */
                    $scope.cancelEditMode = function () {
                        MapHandler.removeEditHandler();
                        hideStopEditingBtn();
                    };
                    7
                    /**
                     * Deletes the currently selected feature
                     */
                    $scope.deleteFeature = function () {
                        MapHandler.deleteFeature();
                        $scope.selectedFeature = undefined;
                        $scope.toggleToolbar('statsView');

                    };


                    $scope.expirationChanged = function () {

                        // console.log($scope.selectedFeature.properties);

                        var i = -1;
                        var found = false;
                        $scope.selectedFeature.properties.forEach(function (aux) {
                            i++;


                            console.log(i);
                            if(aux.key  == "expiration"){
                                $scope.selectedFeature.properties[i].value = $scope.selectedExpiration;
                                console.log("DONE!: " + $scope.selectedFeature.properties[i].value);
                                found = true;
                            }


                        });
                        if(found==false){
                            $scope.selectedFeature.properties.push({
                                'key':'expiration',
                                'value' : $scope.selectedExpiration
                            });
                        }

                        $scope.propertyChanged();

                    };



                    /**
                     * Añade la nueva propiedad a la layer y llama a la funcion de actualizar.
                     */
                    function updateFeature() {
                        //Añade la propiedad a los datos de la feature
                        $scope.selectedFeature.properties.forEach(function (prop) {
                            //¿está copiando?
                            $scope.selectedFeature.feature.properties[prop.key] = prop.value;
                        });
                        //Actualiza la propiedad indicada
                        MapHandler.updateOnlyProperties($scope.selectedFeature);
                    }

                    /**
                     * Adds a new property to the feature.
                     * @param {Number} key key code of the ng-key event
                     */


                    $scope.updateMail = function(){
                        var i = -1;
                        var found = false;
                        $scope.selectedFeature.properties.forEach(function (aux) {
                            i++;


                            console.log(i);
                            if(aux.key  == "email"){
                                $scope.selectedFeature.properties[i].value = $scope.email;

                                found = true;
                            }


                        });
                        if(found==false){
                            $scope.selectedFeature.properties.push({
                                'key':'email',
                                'value' : $scope.email
                            });
                        }

                        $scope.propertyChanged();

                    };

                    $scope.newProperty = function (key) {
                        var newProp = function () {
                            if ($scope.newKey && $scope.newValue) {
                                $scope.selectedFeature.properties.push({
                                    'key': $scope.newKey,
                                    'value': $scope.newValue
                                });
                                $scope.newKey = '';
                                $scope.newValue = '';
                                updateFeature();
                            }
                        };

                        if (key && key.keyCode === 13) {
                            newProp();
                        } else if (!key) {
                            newProp();
                        }
                    };

                    /**
                     * Loads image property
                     * @returns {string}
                     */
                    $scope.loadImage = function(){
                        var i = -1;
                        var found = false;
                        var result = "";
                        $scope.selectedFeature.properties.forEach(function (aux) {
                            i++;


                            if(aux.key  == "image"){
                                result = $scope.selectedFeature.properties[i].value;

                            }

                        });

                        return result;
                    };

                    /** Loads mail property **/
                    $scope.loadMail = function(){
                        var i = -1;
                        var found = false;
                        var result = "";
                        $scope.selectedFeature.properties.forEach(function (aux) {
                            i++;


                            if(aux.key  == "email"){
                                result = $scope.selectedFeature.properties[i].value;

                            }

                        });

                        return result;
                    };




                    $scope.isEvent = function(){
                        var i = -1;
                        var found = false;

                        $scope.zoneType="event";


                        setTimeout(function () {
                            $('#presetSelect')[0].selectedIndex = 1;

                        }, 40);

                        $scope.selectedCategory="category-catastrophe";
                        $scope.selectedExpiration='1h';
                        $scope.selectPresets();



                        $scope.selectedFeature.properties.forEach(function (aux) {
                            i++;

                            console.log(i);
                            if(aux.key  == "zoneType"){
                                $scope.selectedFeature.properties[i].value = 'event';
                                found = true;
                            }

                        });
                        if(found==false){
                            console.log("No encontrada la propieada");
                            $scope.selectedFeature.properties.push({
                                'key':'zoneType',
                                'value' : 'event'
                            });
                        }
                        $scope.propertyChanged();
                    };

                    $scope.isCrop= function(){
                        var i = -1;
                        var found = false;
                        $scope.zoneType="crop";
                        //$scope.email = $scope.tmpGeoJSON.properties.email;
                        //Current category is crop
                        $scope.selectedCategory="category-crop";
                        $scope.selectPresets();






                        $scope.selectedFeature.properties.forEach(function (aux) {
                            i++;

                            console.log(i);
                            if(aux.key  == "zoneType"){
                                $scope.selectedFeature.properties[i].value = 'crop';
                                found = true;
                            }

                        });
                        if(found==false){
                            console.log("No encontrada la propieada");
                            $scope.selectedFeature.properties.push({
                                'key':'zoneType',
                                'value' : 'crop'
                            });
                        }
                        $scope.propertyChanged();
                    };

                    $scope.isSubscription = function(){
                        var i = -1;
                        var found = false;


                        $scope.zoneType="subscription";
                        $scope.selectedCategory="category-sub";
                        $scope.selectPresets();
                        $scope.selectedFeature.properties.forEach(function (aux) {
                            i++;

                            console.log(i);
                            if(aux.key  == "zoneType"){
                                $scope.selectedFeature.properties[i].value = 'subscription';
                                found = true;
                            }

                        });
                        if(found==false){
                            console.log("No encontrada la propieada");
                            $scope.selectedFeature.properties.push({
                                'key':'zoneType',
                                'value' : 'subscription'
                            });
                        }
                        $scope.propertyChanged();
                    };



                    $scope.newEmail = function() {
                        var i = -1;
                        var found = false;
                        $scope.selectedFeature.properties.forEach(function (aux) {
                            i++;

                            console.log(i);
                            if(aux.key  == "email"){
                                $scope.selectedFeature.properties[i].value = $scope.selectedMail;
                                found = true;
                            }

                        });
                        if(found==false){
                            console.log("No encontrada la propieada");
                            $scope.selectedFeature.properties.push({
                                'key':'email',
                                'value' : $scope.selectedMail
                            });
                        }

                        console.log("Guardando mail");
                        $scope.propertyChanged();
                    }

                    $scope.newImage = function() {
                        var i = -1;
                        var found = false;
                        $scope.selectedFeature.properties.forEach(function (aux) {
                            i++;

                            console.log(i);
                            if(aux.key  == "image"){
                                $scope.selectedFeature.properties[i].value = $scope.selectedImage;
                                found = true;
                            }

                        });
                        if(found==false){
                            $scope.selectedFeature.properties.push({
                                'key':'image',
                                'value' : $scope.selectedImage
                            });
                        }

                        $scope.propertyChanged();
                    }
                    /**
                     * Adds a new property to the feature.
                     * @param {String} type the property type
                     */

                    function addNewPropertyType(type) {
                        $scope.selectedFeature.properties.push({
                            'key': type,
                            'value': ''
                        });
                        updateFeature();
                    }

                    function removePropertyType(type) {
                        for (var i = $scope.selectedFeature.properties.length - 1; i >= 0; i--) {
                            if ($scope.selectedFeature.properties[i].key === type) {
                                $scope.selectedFeature.properties.splice(i, 1);
                            }
                        }
                        delete $scope.selectedFeature.feature.properties[type];
                    }

                    //Variable used to controle the 'hide' class via ng-class
                    $scope.hideNewProperty = true;

                    /**
                     * Show the GUI form to create new properties
                     * @param {Object} e html button
                     */
                    $scope.addNewProperty = function (e) {
                        var element = e.currentTarget;
                        if (element.value.indexOf('Add') > -1) {
                            element.value = 'Hide new Property';
                        } else {
                            element.value = 'Add new Property';
                        }
                        $scope.hideNewProperty = !$scope.hideNewProperty;
                    };


                    /**
                     * Show the button to stop the edit mode
                     */

                    function showStopEditingBtn() {
                        if ($('#stopEditBtn').length > 0) {
                            var newClassName = replaceAll(' hidden', '', $('#stopEditBtn')[0].className);
                            $('#stopEditBtn')[0].className = newClassName;

                        }
                    }

                    function replaceAll(find, replace, str) {
                        return str.replace(new RegExp(find, 'g'), replace);
                    }

                    /**
                     * Hide the button to stop the edit mode
                     */

                    function hideStopEditingBtn() {
                        $('#stopEditBtn')[0].className += ' hidden';
                    }

                    /**
                     * Listen to the editHandler events to show or hide the "Stop Editing" button
                     */
                    $scope.$on('editHandler', function (e, eventValue) {
                        if (!eventValue) {
                            hideStopEditingBtn();
                        } else {
                            showStopEditingBtn();
                        }
                    });

                    /**
                     * Remove a given property from the feature. Updates the feature afterwards.
                     * @param {Number} i index of the properties Array
                     */
                    $scope.removeProperty = function (i) {
                        var remKey = $scope.selectedFeature.properties[i].key;
                        delete $scope.selectedFeature.feature.properties[remKey];
                        $scope.selectedFeature.properties.splice(i, 1);
                        updateFeature();
                    };

                    /**
                     * Cancel the edit mode if the toolbox window is closed.
                     */
                    $scope.$on('toolbox', function () {
                        if ($scope.views.statsView) {
                            MapHandler.removeEditHandler();
                        }
                    });


                    //NEW CATEGORIES SYSTEM
                    var presets;
                    var fields;
                    var categories;

                    /**
                     * Select the suitable categories for the given feature based on the geometry type.
                     * Put the selection in the scope variable for the GUI
                     * @param  {Object} layer selected feature
                     */

                    function selectCategoriesForGeomType(layer) {
                        var geomType = MapHandler.getLayerType(layer);
                        $scope.categories = {};
                        $scope.categories_to_show = {};

                        for (var key in categories) {
                            if (categories[key].geometry.indexOf(geomType) > -1) {
                                if(key!='category-crop' && key!='category-sub'){
                                    $scope.categories_to_show[key] = categories[key];
                                }
                                $scope.categories[key] = categories[key];
                            }
                        }
                    }

                    /**
                     * Remove selected category and preset from the scope
                     */

                    function cleanSelection() {
                        $scope.presets = undefined;
                        $scope.selectedCategory = undefined;
                        $scope.selectedPreset = undefined;
                    }

                    /**
                     * GET request to load the category/preset and fields information from the server.
                     * Stores the categories in the scope for the select box.
                     * Fields and presets will be used as soon as a category has been chosen.
                     */

                    function getPresetData() {

                        ApiService.getPresetData().then(function (result) {
                            if (result && result.length === 3) {
                                categories = result[0];
                                fields = result[1];
                                presets = result[2];
                            }
                        });
                    }

                    /**
                     * If a category is selected, append the sub categories (presets) to a second select box.
                     * Saves the category in the feature and call the update function to sync the feature.
                     */
                    $scope.selectPresets = function () {
                        $scope.cancelEditMode();
                        $scope.fields = [];
                        $scope.selectedExpiration = "";
                        $scope.selectedMail = "";
                        $scope.selectedImage = "";
                        $scope.selectedPreset = undefined;
                        //$scope.email = $scope.selectedFeature.properties.email;
                        var selCategory = $scope.selectedCategory;

                        if (selCategory) {
                            //Update the feature
                            $scope.selectedFeature.feature.properties.category = selCategory;
                            setStyleFromCategory(selCategory);
                            MapHandler.updateOnlyProperties($scope.selectedFeature);
                            //if(selCategory=Cyclone){
                            //  console.log("blurulu");
                            //}

                            //Set to scope array
                            setPresetsInScope(selCategory);

                        }
                    };

                    /**
                     * Removes existing simplestyle properties and sets the new ones
                     * based on the configured category styles.
                     * @param {Object} category the chosen osm category
                     */

                    function setStyleFromCategory(category) {
                        var style = categories[category].style;
                        var selFeature = $scope.selectedFeature.feature;
                        removeExistingStyle(selFeature);
                        for (var key in style) {
                            selFeature.properties[key] = style[key];
                        }
                    }

                    /**
                     * Removes existing simplestyle properties from the given feature
                     * @param  {Object} feature the GeoJSON feature
                     */

                    function removeExistingStyle(feature) {
                        var simpleStyleKeys = [
                            'marker-size',
                            'marker-symbol',
                            'marker-color',
                            'stroke',
                            'stroke-opacity',
                            'stroke-width',
                            'fill',
                            'fill-opacity'
                        ];
                        simpleStyleKeys.forEach(function (styleKey) {
                            delete feature.properties[styleKey];
                        });
                    }

                    /**
                     * Append the presets to the scope variable to fill the select box.
                     */

                    function setPresetsInScope(category) {
                        $scope.presets = [];
                        $scope.presets = [];
                        //Get the member of the chosen category = presets
                        var members = categories[category].members || [];
                        members.forEach(function (member) {
                            $scope.presets.push(presets[member]);
                        });


                    }


                    /**
                     * Returns the index of a preset in the categories member array
                     * @param  {String} presetKey object key
                     * @return {String}           Key of the categories member array
                     */

                    function getPresetIndex(presetKey) {
                        var members = categories[$scope.selectedCategory].members;
                        for (var key in members) {
                            if (presetKey === members[key]) {
                                return key;
                            }
                        }
                    }

                    /**
                     * Called if the preset is selected.
                     * Updates the feature and cally update to sync.
                     *
                     * Checks if the preset is associated with fields and adds new ones to the properties.
                     */
                    $scope.selectFields = function () {
                        $scope.cancelEditMode();

                        var members;
                        $scope.fields = [];
                        if ($scope.selectedPreset) {
                            //Update the feature
                            var oldPreset = $scope.selectedFeature.feature.properties.preset;
                            $scope.selectedFeature.feature.properties.preset = getSelectedPresetName($scope.selectedPreset);
                            MapHandler.updateOnlyProperties($scope.selectedFeature);


                            members = $scope.presets[$scope.selectedPreset].fields || [];

                            //Remove the fields of older presets from the feature
                            if (oldPreset) {
                                var oldMembers = presets[oldPreset].fields || [];
                                if (oldMembers) {
                                    oldMembers.forEach(function (member) {
                                        //only delete members if they aren't used by the new preset
                                        if (members.indexOf(member) === -1) {
                                            var index = $scope.fields.indexOf(fields[member]);
                                            if (index > -1) {
                                                $scope.fields.splice(index, 1);
                                            }
                                            removePropertyType(fields[member].label);
                                        }
                                    });
                                }
                            }


                            //Get the fields of the preset
                            members = $scope.presets[$scope.selectedPreset].fields || [];
                            members.forEach(function (member) {
                                var newKey = fields[member].label;
                                //Only append if not already existing
                                if (!$scope.selectedFeature.feature.properties.hasOwnProperty(newKey)) {
                                    addNewPropertyType(newKey);
                                }
                                //Scope array for the GUI
                                $scope.fields.push(fields[member]);
                            });

                        }

                    };

                    /**
                     * Returns the key of the selected preset (sub-category)
                     * @param  {String} index the key of the categories member object
                     * @return {String}       preset name
                     */

                    function getSelectedPresetName(index) {
                        if (index && $scope.categories[$scope.selectedCategory] && $scope.categories[$scope.selectedCategory].members && $scope.categories[$scope.selectedCategory].members[index]) {
                            return $scope.categories[$scope.selectedCategory].members[index];
                        }
                    }

                    getPresetData();


                }
            };
        }
    ]);
