
   var eventsProxy = function(http, q, window){

       this.getNgHyderabadEvents = function(){
           var deferred = q.defer();

           function formatResult(response){
               var apiResult = (response && response.result && response.result.events)? response.result.events: {}
               if(_.isArray(apiResult.results)) {
                   var result = [];

                   for (var i = 0; i < apiResult.results.length; i++) {
                       result.push({
                           id: apiResult.results[i].id || -1,
                           title: apiResult.results[i].name || "",
                           description: apiResult.results[i].description || "",
                           attendeeCount: apiResult.results[i].yes_rsvp_count || -1,
                           primaryImage: 'img/sample.png',
                           images: ['img/logo.png', 'img/sample.png']
                       });
                   }
                   return result;
               }
               return;
           }

           getEvents()
               .then(function(data){
                   var result = formatResult(data);
                   if(result){
                     deferred.resolve({
                         events: result,
                         isCached: data.isCached,
                         dateTimeObtained: (data && data.result)? data.result.dateTimeObtained: {}
                     });
                   }else{
                       deferred.reject("Incorrect response object");
                   }

               }, function(error){
                   deferred.reject(error);
               });

           return deferred.promise;

       };

       this.getSessionById = function(givenId){
           var deferred = q.defer();

           var apiResult = getEventsFromCache();
           var results = (apiResult && apiResult.events && apiResult.events.results)?apiResult.events.results:{};

           if(_.isArray(results)) {
               var result =  _.findWhere(results, {id:givenId});
               deferred.resolve( {
                   id:result.id || -1,
                   title: result.name || "",
                   description: result.description || "",
                   attendeeCount: result.yes_rsvp_count || -1,
                   primaryImage: 'img/sample.png',
                   images: ['img/logo.png', 'img/sample.png']
               });
           }else{
               deferred.reject({error:"result format incorrect"});
           }

           return deferred.promise;
       }

       var getEvents = function(){
           var deferred = q.defer();

           getEventsFromSource().then(function(result){
               var resultObject = {
                   dateTimeObtained: (new Date()).toLocaleString(),
                   events: result
               };
               saveEventsToCache(resultObject);
               deferred.resolve({
                   result: resultObject,
                   isCached: false
               });
           }, function(error){
              deferred.resolve({
                  result: getEventsFromCache(),
                  error: error,
                  isCached: true
              });
           });

           return deferred.promise;
       }

       var getEventsFromSource = function(){

           var deferred = q.defer();

           http.get('https://api.meetup.com/2/events?&sign=true&photo-host=public&group_urlname=ngHyderabad&status=proposed&page=20&key=32c1922324d801c264c29715164859#results/0/description').success(function(result){
               deferred.resolve(result);
           }).error(function(error){
               deferred.reject(error);
           });

           return deferred.promise;

       };

       var getEventsFromCache = function(){
           return JSON.parse(window.localStorage.getItem("events"));
       };

       var saveEventsToCache = function(eventsObject){
           window.localStorage.setItem("events", JSON.stringify(eventsObject));
       }
   }

    eventsProxy.$inject = ["$http", "$q", "$window"];

