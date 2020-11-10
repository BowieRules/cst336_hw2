var i = 0, shuffledArray, groupArray, string, displayCounter = 0, delay = 0, size = 0, number = 0;
var peopleArray = [["Erik Hill", "M"], ["Alicia Harding", "F"], ["Brian Thompson","M"], ["Casie Wallace", "F"],
 ["Chelsea Manning","F"], ["Clare Levy","F"],["Cody Baker", "M"], ["Jeanne West", "F"], ["Kaitlin Thompson","F"],
 ["Kelly Mills","F"], ["Michael Moore", "M"], ["Luke Walker", "M"], ["Mary Karr", "F"], ["Aaron Watson", "M"],
 ["Levi Darrel","M"], ["David Slavich","M"], ["Bob Cross","M"], ["Michelle Coder", "F"],["Tim Cosgrove", "M"],
 ["Mathias Brookes","M"], ["Bo Zuniga","F"], ["Miriam Forbes","F"], ["Anniyah Traynor","F"], ["Jaydon Frey","F"],
 ["Ashlyn Stafford","F"], ["Annabella Mcbride","F"], ["Nelly Avila","F"], ["Shelby Melia","F"], ["Britany Greig","F"],
 ["Carys Couch","F"], ["Kayson Gough","M"], ["Montgomery Maxwell","M"], ["Charlton Hagan","M"], ["Adeeb Gould","M"],
 ["Tariq Berry","M"], ["Jai Sutton","M"], ["Maksim Allman","M"], ["Kris Singh","M"], ["Luka Mcnamara","M"],
 ["Roman Savin","M"], ["Steve Dobson","M"], ["Terry Jackson","F"], ["Tracy Stone","F"], ["Vince Vaughn","M"]];

function shuffle(genderOpt, array){
    // Fisher-Yates shuffle courtesy of: http://bost.ocks.org/mike/shuffle/
    let filteredList = [];

    for (let i = 0; i < array.length; i++) {
      if (genderOpt == "option3" ||
          genderOpt == "option2" && array[i][1] == "M" ||
          genderOpt == "option1" && array[i][1] == "F")
          {
            filteredList.push(array[i]);
          }
    }

    // reshuffled array
    let newArray = filteredList.slice(0);
    // initializes m as our array iterator, t as a temporary storage for the 'card' we are taking out of the 'deck', i will be a random index where we will place our 'card'.
    var m = newArray.length, t, i;

    //shuffle array.length times
    while (m) {
        // Pick a random number 0-1, multiply by remaining element count, decrement remaining element count, round down to whole integer. Essentially, choose a random place to put the current array index m.
        i = Math.floor(Math.random() * m--);

        // Store current array index m value in t.
        t = newArray[m];
        // Store the randomly chosen index value into the currently iterating index space.
        newArray[m] = newArray[i];
        // store the original currently iterating index value into the randomly chosen index space.
        newArray[i] = t;
    }
    return newArray;
}

function groupByNumberAndSize(num, sz, arr){
    var newArray = [];
    // If only Number exists
    if (sz==0)
    {
        sz = Math.floor(arr.length/num);
    } else if(num==0)
    {
        num = Math.floor(arr.length/sz);
    }
    // Stop when you reach the end of the names though?
    // Create num arrays
    for(i = 0; i < num; i++){
        // Check for exhaustion of names array
        if(arr.length > 0) {
            newArray[i] = [];
        // Add sz names to each
            for (j = 0; j < sz; j++) {
                // Check for exhaustion of names array
                if (arr.length > 0) {
                    newArray[i].push(arr.shift());
                }
            }
        }
    }
    return newArray;
}

function display(arr){

    // Clear display if 2nd display.
    if(displayCounter!=0) {
        $('.results').fadeOut(2000);
        delay = 2000;
    }
    window.setTimeout(function () {
        $('.results').empty();
        // Write Group Columns
        for (i = 0; i < arr.length; i++) {
            string = "<div class = 'groupColumn'><strong>Team " + (i + 1) + ":</strong><br>";
            for (j = 0; j < arr[i].length; j++) {
                string += arr[i][j][0] +  " [" + arr[i][j][1] + "]<br>";
            }
            string += "</div>";
            $('.results').append(string);
        }
        $('.results').fadeIn(2000).css('display', 'inline-block');
    }, delay);
    displayCounter++;
}

$(document).ready(function(){

    // Generate button functionality
    $("#btnGenerate").on("click", processRequest);

    // dynamicly update image on submit button
    $("input:radio[type=radio]").click(function() {
        var value = $(this).val();
        if (value == "option3") {
            $('#showoption').html("<img src='img/unisex-icon-white.png' alt='unisex'>");
        }
        else if (value == "option2") {
            $('#showoption').html("<img src='img/male-icon-white.png' alt='male'>");
        }
        else {
          $('#showoption').html("<img src='img/female-icon-white.png' alt='female'>");
        }
    });

    function processRequest(){
        // Set number of teams variable
        number = $("#numTeams").val();
        // Set size variable
        size = $("#sizeTeams").val();
        // Set gender selection
        genderOption = $("input[name='genderRadios']:checked").val();

        if(!validateInput(number, size, genderOption)){
            document.getElementById("validation").innerHTML = "Please pick valid number of teams or the size of teams";
        } else {
            document.getElementById("validation").innerHTML = "";

            // Randomize original array, store in shuffledArray
            shuffledArray = shuffle(genderOption, peopleArray);
            // call groupArray function
            groupArray = groupByNumberAndSize(number,size,shuffledArray);
            // pass results to display method
            display(groupArray);
       }
    }

    // Validate the input
    function validateInput(nm, sz, gdr) {
          let isValid = true;
          // If numeric field is Not a Number or less than one or greater than 10
          if (isNaN(nm) || nm < 1 || nm > 10) {
            isValid = false;
          }
          if (isNaN(sz) || sz < 1 || sz > 10) {
            isValid = false;
          }
          return isValid;
    }
});
