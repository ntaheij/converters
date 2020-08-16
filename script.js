var input = document.getElementById("input");

if(getUrlVars()["input"] != null)
{
    var answer = decodeURIComponent(getUrlVars()["input"]);
    document.getElementById("input").value = answer.toString();
    update();
}

//Updater
function update()
{
    document.getElementById("rot13").innerHTML = "ROT13: " + textToROT13(input.value);
    document.getElementById("binary").innerHTML = "Binary: " + textToBinary(input.value);
    document.getElementById("base64").innerHTML = "Base64: " + textToBase64(input.value);
    document.getElementById("morsecode").innerHTML = "MorseCode: " + textToMorseCode(input.value);
    document.getElementById("nato").innerHTML = "NATO: " + textToNato(input.value);
}


function textToNato(text)
{
    var newline = ' / ';
    var results = '';
    
    text = text.toUpperCase();
    
    for (var i=0; i < text.length; i++)
    {
        switch (text.charAt(i))
        {
            case 'A': results = results + 'alfa '; break;
            case 'B': results = results + 'bravo '; break;
            case 'C': results = results + 'charlie '; break;
            case 'D': results = results + 'delta '; break;
            case 'E': results = results + 'echo '; break;
            case 'F': results = results + 'foxtrot '; break;
            case 'G': results = results + 'golf '; break;
            case 'H': results = results + 'hotel '; break;
            case 'I': results = results + 'india '; break;
            case 'J': results = results + 'juliett '; break;
            case 'K': results = results + 'kilo '; break;
            case 'L': results = results + 'lima '; break;
            case 'M': results = results + 'mike '; break;
            case 'N': results = results + 'november '; break;
            case 'O': results = results + 'oscar '; break;
            case 'P': results = results + 'papa '; break;
            case 'Q': results = results + 'quebec '; break;
            case 'R': results = results + 'romeo '; break;
            case 'S': results = results + 'sierra '; break;
            case 'T': results = results + 'tango '; break;
            case 'U': results = results + 'uniform '; break;
            case 'V': results = results + 'victor '; break;
            case 'W': results = results + 'whiskey '; break;
            case 'X': results = results + 'xray '; break;
            case 'Y': results = results + 'yankee '; break;
            case 'Z': results = results + 'zulu '; break;
            case ' ': results = results + '' + newline; break;
            default: results = results + text.charAt(i) + ' ';
        }
    }
    
    return results.toUpperCase() + "</br>";
}

function rot(t, u, v) {
    return String.fromCharCode( ( ( t - u + v ) % ( v * 2 ) ) + u );
}

function textToROT13(text) {
    var s = text;
    var b = [], c, i = s.length,
     a = 'a'.charCodeAt(), z = a + 26,
     A = 'A'.charCodeAt(), Z = A + 26;
    while(i--) {
     c = s.charCodeAt( i );
     if( c>=a && c<z ) { b[i] = rot( c, a, 13 ); }
     else if( c>=A && c<Z ) { b[i] = rot( c, A, 13 ); }
     else { b[i] = s.charAt( i ); }
    }
    return b.join( '' );
}

function textToBase64(text) {
    return btoa(text);
}

function textToMorseCode(text) {

    var letters = [ ' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0' ];
    var morseLetters = [ "/", ". ___", "___ . . .", "___ . ___ .", "___ . .", ".", ". . ___ .", "___ ___ .", ". . . .", ". .", ". ___ ___ ___", "___ . ___", ". ___ . .",  "___ ___", "___ .", "___ ___ ___", ". ___ ___ .", "___ ___ . ___", ". ___ .", ". . .", "_", ". . ___", ". . . ___", ". ___ ___", "___ . . ___", "___ . ___ ___", "___ ___ . .", ". ___ ___ ___ ___", ". . ___ ___ ___", ". . . ___ ___", ". . . . ___", ". . . . .", "___ . . . .", "___ ___ . . .", "___ ___ ___ . .", "___ ___ ___ ___ .", "___ ___ ___ ___ ___" ];

    var result = "";
    for (var i = 0; i < text.length; i++) {
        for (var j = 0; j < 37; j++) {
            if (text[i].toLowerCase() == letters[j]) {
                result += morseLetters[j];
                result += "\xa0\xa0\xa0";
                break;
            }    
        }
    }

    return result;
}

function textToBinary(text)
{
    return text.split('').map(function (char) { return char.charCodeAt(0).toString(2); }).join(' ');
}



//Event listener

document.querySelectorAll(".prompt")[0].addEventListener('keyup', function(event){
    update();
});

//Prevent tab reload

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      update();
    }
  });
  
  var form = document.getElementById("f");
  function handleForm(event) { event.preventDefault(); } 
  form.addEventListener('submit', handleForm);
  

//URI Getters

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
