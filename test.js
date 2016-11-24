var sphero = require("sphero"),
    bb8 = sphero("C2:64:01:11:C9:7C"); // change BLE address accordingly

console.log("Connexion en cours...");
bb8.connect(function() {
    console.log("Connexion établie !");
    var intcolor = 0;
    var color;
function getRandomColor() {
     var letters = '0123456789ABCDEF';
      var color = '#';
       for (var i = 0; i < 6; i++ ) {
                color += letters[Math.floor(Math.random() * 16)];
                 }
        return color;
}   
    setInterval(function(){
        color=getRandomColor();
        console.log("color: "+color);
        bb8.color(color);
    }, 500);
});
