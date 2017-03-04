$(document).ready(function() {

    //A variable to hold the questions along with their possible values
    //and which one is correct.
    var questions = [
        {        
            // question: "I'm Ron Burgundy?",
            truthValue: ["True", "False"],
            theAnswer: "False"
        },

        {
            // question: "Neo in the Matrix took the red pill.",
            truthValue: ["True", "False"],
            theAnswer: "True"
        },

        {
            // question: "Boxers are the best breed of dog ever.",
            truthValue: ["True", "False"],
            theAnswer: "True"
        }        
    ];

    //Some global variables
    var correctCount = 0, incorrectCount = 0, unansweredCount = questions.length;

    var index= 0;
    var timeRemaining = 15;
    var timer;

    //At first the form, the time holder, and the results are hidden.
    //After you click the start button, then the start button is hidden,
    //the form and time holder are revealed.
    $("#myForm, #timeHolder, #results, #replay").hide();
    $("#startButton").click(init);    
    $(".radio-inline").click(onceClicked);
    $("#doneButton").click(tearDown);

    //Counts down until it hits zero and tears the game down once it reaches zero
    function countDown() {
        timer = setTimeout(function() {

            $('#timeRemaining').text(timeRemaining);

            if (timeRemaining <= 0) {
                tearDown();
                return;
            } else {
                timeRemaining = timeRemaining - 1;
                countDown();
            }
        }, 1000);
    }

    //Called whenever you click an element with the radio-inline class attached to it.
    //It decrements unanswered count once called
    //It gets the text from the element clicked and compares it to the answers in the questions variable
    //Updates the counts according to correctness
    //Updates the index and then appends the counts to the four elements listed for the results

    /****BUG ALERT****/
    //If you click back and forth from true to false on the questions, this gets called every time
    //and decrements the unanswered count eventually to zero if clicked enough
    //and gives you incorrect results in the results div

    //Please only click one answer on each question one time and then click done, if you don't run
    //out of time.
    function onceClicked() {
        console.log("clicked");
        unansweredCount--;
        var selection = $(this).text();

        console.log("Selection: " + selection);
        console.log("The Current Answer at " + index + ": " + questions[index].theAnswer);

        if (selection === questions[index].theAnswer) {
            correctCount++;
        }
        else if(selection !== questions[index].theAnswer) {
            incorrectCount++;
        }

        console.log("Next Index: " + index);            
        index++;
        console.log("UA: " + unansweredCount);
        $(".totalQuestions").html("Total Questions Answered: " + index);
        $('.correct').html("Correct Answers: " + correctCount);
        $('.incorrect').html("Incorrect Answers: " + incorrectCount); 
        $(".nothing").html("Unanswered Questions: " + unansweredCount);       
    }

    //Shows an alert if nothing was answered
    //Hides my form and the time holder
    //Shows the replay button and the results
    function tearDown() {
        if(unansweredCount===questions.length){
            alert("You didn't answer any questions!! Please click Replay. :)");
        }      
        $("#myForm, #timeHolder").hide();
        $("#replay, #results").show();
    }

    //Let's the replay button reload the page if clicked
    $("#replay").on("click", function(e){
        location.reload();
    });        

    //Starts the game once the Start button has been clicked
    function init() {
        $("#start").hide();
        $("#myForm, #timeHolder").show();
        countDown();
    }

});
