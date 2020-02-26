angular
    .module('demo', ['dndLists'])
    .controller('DemoController', function ($scope) {
        function uuidv4(){
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
              var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
              return v.toString(16);
            });
        }

        $scope.models = {
            selected: null,
            parentContainer: null,
            templates: [
                {
                    type: "text",
                    label: 'Textbox',
                    name: 'Enter Text ',
                    isSubquestion: false
                }, {
                    type: "number",
                    label: 'Numbers ',
                    name: 'Enter No ',
                    min: '1',
                    isSubquestion: false
                }, {
                    type: "checkbox",
                    label: 'Checkbox',
                    name: 'CheckBox',
                    isSubquestion: false
                }, {
                    type: "checkboxList",
                    label: 'CheckboxList',
                    name: 'CheckBoxOption List',
                    layout: 'Vertical',
                    isSubquestion: false,
                    options: [
                        {
                            id: uuidv4(),
                            name: 'option'
                        }
                    ]
                }, {
                    type: "radio",
                    label: 'Radio',
                    name: 'RadioOption',
                    layout: 'Vertical',
                    isSubquestion: false,
                    isSkipLogicEnabled: false,
                    selectedRadio: null,
                    options: [
                        {
                            id: uuidv4(),
                            name: 'option',
                            skipLogicQuestion: []
                        }
                    ]
                }, {
                    type: "dropdown",
                    label: 'Drop-down List',
                    name: 'dropDownOption',
                    isSubquestion: false,
                    isSkipLogicEnabled: false,
                    selectedDropdown: null,
                    options: [
                        {
                            id: uuidv4(),
                            name: 'option',
                            skipLogicQuestion: []
                        }
                    ]
                }, {
                    type: "signature",
                    label: 'Signature ',
                    name: 'Sign ',
                    isSubquestion: false
                }, {
                    type: "longtext",
                    label: 'Long Text ',
                    name: 'Enter text ',
                    isSubquestion: false
                }, {
                    type: "file",
                    label: 'File Upload ',
                    name: 'Choose file ',
                    isSubquestion: false
                }, {

                    type: "dateTime",
                    label: 'dateTime',
                    name: 'Date/Time',
                    isSubquestion: false
                }, {
                    type: "container",
                    label: "container",
                    name: 'Container',
                    columns: [
                        []
                    ]
                }, {
                    type: "name",
                    label: 'Name',
                    name: 'Name ',
                    isSubquestion: false
                }, {
                    type: "address",
                    label: 'Address',
                    name: 'Address ',
                    isSubquestion: false
                }, {
                    type: "rating",
                    label: 'Rating',
                    name: 'Rating ',
                    isSubquestion: false
                }

            ],
            dropzones: {
                Form: [
                ]
            },
            isHidden: true,
            selectedSkipLogicOption: null,

            dropCallback: function (index, item, external, type) {
                var model = $scope.models.dropzones;
                for (var y in model.Form) {
                    for (var zz in model.Form[y].columns) {
                        if (Array.isArray(model.Form[y].columns[zz])) {
                            $scope.models.dropzones.Form[y].columns.splice(zz, 1);
                        }
                    }
                }
                item["id"] = uuidv4();
                return item;
            },

            deleteElement: function (elementId) {
                var form = $scope.models.dropzones.Form;
                for (var i = 0; i < form.length; i++) {
                    if (form[i].type === 'container' && form[i].id !== elementId) {
                        for (var j = 0; j < form[i].columns.length; j++) {
                            if (form[i].columns[j].id === elementId) {
                                form[i].columns.splice(j, 1);
                            }
                        }
                    } else if (form[i].id === elementId) {
                        form.splice(i, 1);
                    }

                }
                $scope.models.hideProperties();
            },

            showProperties: function () {
                $scope.models.isHidden = false;
            },

            hideProperties: function () {
                $scope.models.isHidden = true;
            },

            addCheckboxOption: function (checkboxOption) {
                checkboxOption.push({
                    id: uuidv4(),
                    name: 'option'
                });
            },

            removeCheckboxOption: function (checkboxOption) {
                checkboxOption.splice(0, 1);
            },

            addRadioOption: function (radioOption) {
                radioOption.push({
                    id: uuidv4(),
                    name: 'option',
                    skipLogicQuestion: []
                });
            },

            removeRadioOption: function (radioOption, selectedOption) {
                for (var i = 0; i < radioOption.length; i++) {
                    if (radioOption[i].id === selectedOption) {
                        radioOption.splice(i, 1);
                    }
                }
                // radioOption.splice(0,1);
            },

            setSelectedOption: function (option) {
                $scope.models.selectedSkipLogicOption = option;
            },

            adddropdownOption: function (dropdownOption) {
                dropdownOption.push({
                    id: uuidv4(),
                    name: 'option',
                    skipLogicQuestion: []
                });
            },

            removedropdownOption: function (dropdownOption) {
                dropdownOption.splice(0, 1);
            },

            submitForm: function (model) {
                alert($scope.modelAsJson);
            },

            attachQuestion: function (question) {
                if (question.isSubquestion) {
                    $scope.models.selectedSkipLogicOption.skipLogicQuestion.push(question);
                    $scope.models.selected.isSkipLogicEnabled = true;
                } else {
                    var currentIndex = $scope.models.selectedSkipLogicOption.skipLogicQuestion.indexOf(question);
                    $scope.models.selectedSkipLogicOption.skipLogicQuestion.splice(currentIndex, 1);
                    $scope.models.selected.isSkipLogicEnabled = false;
                }
            },
            setParentContainer(elementId) {
                for (var i in $scope.models.dropzones.Form) {
                    if (elementId == $scope.models.dropzones.Form[i].id) {
                        return false;
                    } else if ($scope.models.dropzones.Form[i].type == "container") {
                        for (var j in $scope.models.dropzones.Form[i].columns) {
                            if (elementId == $scope.models.dropzones.Form[i].columns[j].id) {
                                $scope.models.parentContainer = $scope.models.dropzones.Form[i];
                                return true;
                            }
                        }
                    }
                }
            },

            copyElement: function (element) {
                console.log(element);
                var form = $scope.models.dropzones.Form;
                eleObj = {
                    type: element.type,
                    id: uuidv4(),
                    name: element.name,
                    label: element.label,
                    isSubquestion: false
                };
                if(element.min) 
                    eleObj.min = '1';
                if(element.options) {
                    eleObj.options = [
                        {
                            id: uuidv4(),
                            name: 'option'
                        }
                    ];
                }
                if(element.layout)
                    eleObj.layout = 'Vertical';
                if(element.isSkipLogicEnabled)
                    eleObj.isSkipLogicEnabled = false;
                if(element.selectedRadio)
                    eleObj.selectedRadio= null;
                if(element.type == "radio" || element.type == "dropdown")
                    eleObj.options[0].skipLogicQuestion = []
                if(element.columns)
                    eleObj.columns = [[]]
                let addIndex = -1;
                for (var i = 0; i < form.length; i++) {
                    if (form[i].id == element.id) {
                        addIndex = i;
                    }
                }
                if(addIndex > -1)
                    form.splice(addIndex, 0, eleObj);
                console.log(form);
            }
              
        };



        $scope.$watch('models.dropzones', function (model) {
            $scope.modelAsJson = angular.toJson(model, true);
            console.log($scope.modelAsJson);
            console.log(uuidv4())
        }, true);


    });
