$(document).ready(function() {

    // display current day in the header of the page
    let formattedDate = formatDate();
    $("#currentDay").text(formattedDate);

    let d = new Date();
    let currentHour = d.getHours();
    console.log(currentHour);

    // create the rows for the hours of the day, from 9 AM to 5PM
    for(let i = 9; i < 18; i++) {

        // create a div for the row, and three smaller divs for columns
        let newHour = $("<div>");
        let newTimeCol = $("<div>");
        let newActivityCol = $("<div>");
        let newTabCol = $("<div>");
        
        // add the appropriate classes and attributes so that the divs style correctly and can be interacted with
        $(newHour).addClass("row hour");
        $(newTimeCol).addClass("col-2 col-sm-1");
        $(newActivityCol).addClass("col-8 col-sm-10 activity");
        $(newActivityCol).attr("dataHour", i);
        let idString = "hour" + i;
        $(newActivityCol).attr("id", idString);
        $(newTabCol).attr("dataHour", i);
        $(newActivityCol).attr("contenteditable", "true");
        $(newTabCol).addClass("col-2 col-sm-1 saveBtn");

        
        // add styling based on whether hour is in the past, current, or future
        if(i < currentHour)
            $(newActivityCol).addClass("past");
        else if(i == currentHour) {
            $(newActivityCol).addClass("present");
            $(newActivityCol).text("Current hour");
        }
        else
            $(newActivityCol).addClass("future");

        // format AM/PM
        let time;
        if(i < 13)
            time = i + "AM";
        else
            time = (i - 12) + "PM";

        $(newTimeCol).text(time);
        
        // get text from localStorage, apply to activity
        let activityArray = JSON.parse(localStorage.getItem("activities") || "[]");
        
        console.log("activityArray = " + activityArray);
        if(activityArray[i] != undefined)
        {
            console.log("activityArray[i] = " + activityArray[i]);
            $(newActivityCol).text(activityArray[i]);
        }
        
        
        let newImg = $("<img>");
        newImg.attr("src", "./assets/images/lock.png");
        newImg.addClass("img-fluid lockimage");

        //        $(newTabCol).text("Button?");
        $(newTabCol).append(newImg);
        $(newHour).append(newTimeCol);
        $(newHour).append(newActivityCol);
        $(newHour).append(newTabCol);
        $("#timeblocks").append(newHour);



    }

    // formats the current date, returns it as a string
    function formatDate() {
        let d = new Date();
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
        console.log(d);
        let day = d.getDay();
        let month = d.getMonth();
        let date = d.getDate();
        let suffix;
        
        if (d > 3 && d < 21)
            suffix = "th";
        else {
            switch (d % 10) {
                case 1:  suffix = "st";
                case 2:  suffix = "nd";
                case 3:  suffix = "rd";
                default: suffix = "th";
            }
        }

        let dateStr = daysOfWeek[day] + ", " + months[month] + " " + date +suffix;
        
        return dateStr;
    }


    $(".saveBtn").on("click", function() {
        // let test = $(this).attr("dataHour");
        // alert("this is hour" + test);
        let activityArray = JSON.parse(localStorage.getItem("activities") || "[]");

        console.log(activityArray);

        let hour = $(this).attr("dataHour");

        let idString = "#hour" + hour;
        console.log(idString);
        console.log($(idString).text());

        activityArray[hour] = $(idString).text();
        localStorage.setItem("activities", JSON.stringify(activityArray));

        // for(let i = 9; i < 18; i++) {
        //     if(i == hour) {
        //         let idString = "#hour" + i;
        //         console.log($(idString).text());
        //     } else {

        //     }

        // }
    });












    // // MAJOR TASK #1: DYNAMICALLY CREATE BUTTONS
    // // =================================================================================

    // // 1. Create a for-loop to iterate through the letters array.

    // // Inside the loop...

    // // 2. Create a variable named "letterBtn" equal to $("<button>");

    // // 3. Then give each "letterBtn" the following classes: "letter-button" "letter" "letter-button-color".

    // // 4. Then give each "letterBtn" an attribute called "data-letter", with a value eqaual to "letters[i]"

    // // 5. Then give each "letterBtn" a text equal to "letters[i]".

    // // 6. Finally, append each "letterBtn" to the "#buttons" div (provided).

    // // Be sure to test that your code works for this major task, before proceeding to the next one!

    // // MAJOR TASK #2: ATTACH ON-CLICK EVENTS TO "LETTER" BUTTONS
    // // =================================================================================

    // // 7. Create an "on-click" event attached to the ".letter-button" class.

    // // Inside the on-click event...

    // // 8. Create a variable called "fridgeMagnet" and set the variable equal to a new div.

    // // 9. Give each "fridgeMagnet" the following classes: "letter fridge-color".

    // // 10. Then chain the following code onto the "fridgeMagnet" variable: .text($(this).attr("data-letter"))

    // // 11. Lastly append the fridgeMagnet variable to the "#display" div (provided);

    // // Be sure to test that your code works for this major task, before proceeding to the next one!

    // $(".letter-button").on("click", function() {
    //     let fridgeMagnet = $("<div>");
    //     $(fridgeMagnet).addClass("letter fridge-color");
    //     $(fridgeMagnet).text($(this).attr("data-letter"));
    //     $("#display").append(fridgeMagnet);
    // });


    // // MAJOR TASK #3: ATTACH ON-CLICK EVENTS TO "CLEAR" BUTTON
    // // =================================================================================

    // // 12. Create an "on-click" event attached to the "#clear" button id.

    // // Inside the on-click event...

    // // 13. Use the jQuery "empty()" method to clear the contents of the "#display" div.

    // $("#clear").on("click", function() {
    //     $("#display").empty();
    // });

});