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
        
        $(newTabCol).text("Hello");
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
        
        // figure out the correct suffix based on the day
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

    // save changes in the row where the saveBtn is clicked in the localStorage
    $(".saveBtn").on("click", function() {
        
        // get array from localStorage
        let activityArray = JSON.parse(localStorage.getItem("activities") || "[]");

        console.log(activityArray);

        // get the dataHour of the specific saveBtn that was clicked
        let hour = $(this).attr("dataHour");

        // build the String matching the activity div's id
        let idString = "#hour" + hour;
        console.log(idString);
        console.log($(idString).text());

        // retrieve the text in the activity div of the correct row, and set it to the correct index of the array
        activityArray[hour] = $(idString).text();
        localStorage.setItem("activities", JSON.stringify(activityArray));

    });

});