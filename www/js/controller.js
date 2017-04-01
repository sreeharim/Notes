app.controller("myController",function($scope,$log,DateService){
				   	$scope.order = ['primary','success','info','warning','danger'];
                    $scope.cards = [];
                    $scope.times=[];
                    $scope.count = 0;
                    $scope.showEditArea = false;
                    $scope.updateMode = false;
                    $scope.currUpdateId = '';
                    $scope.currentText ='';
                    $scope.store = Lawnchair({adapter: 'dom',name: 'db' }, function(e){
                            console.log('Storage open');
                            });
                      $scope.showEdit = function(){
                        $scope.showEditArea = true;
                      
                      }

                    $scope.save = function(){
                        if($scope.updateMode)
                            $scope.updateCard();
                        else{
                            var time = DateService.getFormattedTime();
                            $scope.times[$scope.count]=time;
                            $scope.classSelector = $scope.count%5;
                            $scope.cards.unshift(new Card($scope.count,$scope.currentText));
                            $scope.showEditArea = false; 
                            var obj = {
                                'id':$scope.count,
                                'header':time,
                                'content':$scope.currentText
                            }
                            $scope.store.save({ value: obj });
                            $scope.currentText='';
                            $scope.count++;
                        }
                        
                        }
                    $scope.cancel = function(){
                        $scope.showEditArea = false;  
                        $scope.updateMode = false;
                        $scope.currUpdateId = '';
                        $scope.currentText ='';
                        }
                    $scope.init = function(){
                        $scope.store.each(function(record, index) {
                             console.log(record.value.header);
                              $scope.classSelector = $scope.count%5;
                              $scope.times[$scope.count]=record.value.header;
                              record.value.id = $scope.count;
                              $scope.cards.unshift(new Card($scope.count,record.value.content));
                              $scope.store.save({key:record.key,value:record.value})
                              $scope.count++;
                        })
                        
                    }
                    $scope.reset =function(){
                        $scope.cards = [];
                        $scope.times=[];
                        $scope.count = 0;
                        $scope.currentText ='';
                    }
                    $scope.editCard = function(id){
                        $scope.updateMode = true;
                        $scope.currUpdateId = id;
                        $scope.showEditArea = true;
                        for(var i in $scope.cards)
                            if($scope.cards[i].id==id){
                                $scope.currentText = $scope.cards[i].text;
                                break;
                            }
                    }
                    $scope.updateCard = function(){
                        
                        for(var i in $scope.cards)
                            if($scope.cards[i].id==$scope.currUpdateId){
                                $scope.cards[i].text = $scope.currentText;
                                break;
                            }
                        $scope.store.each(function(record, index) {
                                  if($scope.currUpdateId == record.value.id){
                                     record.value.content=$scope.currentText;
                                     $scope.store.save({key:record.key,value:record.value});
                                  }
                                                           
                        })
                     
                        $scope.updateMode = false;
                        $scope.currUpdateId = '';
                        $scope.showEditArea = false;
                        $scope.currentText ='';
                    }                
                    $scope.deleteCard = function(id){
                        var index = -1;
                        for(var i in $scope.cards)
                            if($scope.cards[i].id==id){
                                index=i;
                                break;
                            }
                            if(index!=-1){
                                $scope.cards.splice(index,1);

                            }
                              
                        $scope.store.each(function(record, index) {
                                  console.log('id : '+id+' record id : '+record.value.id);
                                  if(id == record.value.id)
                                     $scope.store.remove(record.key);
                                                           
                        })
                    }

                    
                    $scope.deleteAll = function(){
                        $scope.store.keys( function(key) {
                            console.log('Removed '+key);
                            $scope.store.remove(key);});
                         $scope.store.each(function(record, index) {
                                  
                                     $scope.store.remove(record.key);
                                                           
                        })
                    }
                   // $scope.deleteAll();
                    $scope.init();
                    })
    .directive("myCard",function(){
        return{
            restrict: "A",
            scope:true,
            link: function(scope){
                console.log("Called directive");
                scope.myTemplate  = 'templates/card-'+scope.order[scope.card.id%5]+ '.html';
                },
           template:'<div ng-include="myTemplate"></div>'
         }
    });

      function Card(id,text) {
            this.id = id;
            this.text = text;
        }