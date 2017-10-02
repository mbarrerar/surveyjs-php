function SurveyManager(baseUrl, accessKey) {
    var self = this;
    self.availableSurveys = ko.observableArray();

    self.loadSurveys = function () {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', baseUrl + '/getActive?surveyId=' + accessKey);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
            var result = xhr.response ? JSON.parse(xhr.response) : {};
            self.availableSurveys(Object.keys(result).map(function(key) {
                return {
                    id: key,
                    survey: result[key]
                }
            }));
        };
        xhr.send();
        }

    self.createSurvey = function(name, onCreate) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', baseUrl + '/api/MySurveys/create?accessKey=' + this.accessKey + "&name=" + name);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
            var result = xhr.response ? JSON.parse(xhr.response) : null
            !!onCreate && onCreate(xhr.status == 200, result, xhr.response);
        };
        xhr.send();
    }
    
    self.loadSurveys();
}

ko.applyBindings(new SurveyManager("http://localhost:8000"), document.getElementById("surveys-list"));