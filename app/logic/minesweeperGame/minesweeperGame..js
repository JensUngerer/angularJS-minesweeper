function MinesweeperGame(_width, _height, _bombs) {
    var width = _width; 
    var height = _height;
    var bombs = _bombs;
    
    var fields = [];
    var revealedConter = 0;
    
    Object.defineProperties(this, {
       "fields": {
           get: function() {
             return fields;
           },
           set: function(_fields) {
               fields = _fields;
           }
       },
       "revealedCounter" : {
           get: function() {
               return revealedConter;
           }
       },
       "reset": {
           value: function() {
               var i,j;
               var column, field;
               for(i = 0; i < fields.length; i++){
                   var column = fields[i];
                   for(j = 0; j < column.length; j++) {
                       field = column[j];
                       field.reset();
                   } 
               }
               
               var remainingBombs = bombs;
               while (remainingBombs > 0) {
                   var x = Math.floor((Math.random() * width));
                   var y = Math.floor((Math.random() * height));
                   var randomField = this.fields[x][y];
                   if (randomField.value !== -1) {
                       randomField.value = -1;
                       randomField.neighbours.forEach(function(neighbourField) {
                           if (neighbourField.value !== -1){
                               neighbourField.value++;
                           }
                       });
                       
                       remainingBombs--;
                   }
               }
               this.revealedCounter = 0;
           }
       }
    });
    
    //constructor
    var i, j, column;
    for (i = 0; i < width; i++) {
        column = [];
        for (var j = 0; j < height; j++) {
         column.push(new MinesweeperField(i, j));
        }
        fields.push(column);
    }
    
    initNeighbours(fields);
    this.fields = fields;
    this.reset();
   
   
    function initNeighbours(_fields) {
        var neighbours;
        _fields.forEach(function(row, x) {
            row.forEach(function(field, y) {
               neighbours = [
                   getField(x - 1, y - 1), getField(x, y - 1), getField(x + 1, y - 1),
                   getField(x - 1, y), getField(x + 1, y),
                   getField(x - 1, y + 1), getField(x, y + 1), getField(x + 1, y + 1)
               ];
               var i = 0;
               while(i<neighbours.length){
               if (!neighbours[i]){
                   neighbours.splice(i,1);
                   i--;
               }
               i++;
               }
               field.neighbours = neighbours;			 
           });
        });
        
        
        function getField(x, y) {
           if (fields[x] && fields[x][y]) {
               return fields[x][y];
           } else {
             return undefined;
           }
        }
    }
   
   }
   