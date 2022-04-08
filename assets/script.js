// defined variables the generated elements live in timeBlockList and created an array to compare against the currentHour variable 
var timeBlockList = document.querySelector(".timeBlockList")
var currentTime = document.querySelector("#currentDay")
var dateAndTime = moment().format("MMMM Do YYYY");
currentTime.textContent = dateAndTime;
var currentHour = moment().hour();
var hoursOfTheDay = ["9", "10", "11", "12", "13", "14", "15", "16", "17", "18","19", "20", "21"]

// this big boy generates the daily calendar on the screen. bootstrap classes were added to resemble the mock up
function generator() {
    for (var i = hoursOfTheDay.length - 1; i >= 0; i--) {
        var timeBlock = $('<div>');
            timeBlock.addClass('container-fluid timeBlock vw-100 row d-flex')
            timeBlock.insertAfter(timeBlockList);
        // the hour section. loops through and if the hour is below noon it add the AM suffix and the PM if noon or later. 
        var hour = $("<h3 class= " + hoursOfTheDay[i] + ">")
            hour.addClass('hour col-2')
                if (hoursOfTheDay[i] > 12){
                    hour.text((hoursOfTheDay[i] - 12) + " PM");
                } else {
                    hour.text(hoursOfTheDay[i] + " AM");
                }
            timeBlock.append(hour);
        // the activity section. this also includes the getItem method from local storage to display what is stored in the key at i and displayed as the value attribue's value. it also loops through and compares the location of the activity in the hoursOfTheDay to the currentHour of the day and adds the class to modulate its css properties. 
        var activity = $("<input type=text>")
            for (let i = 0; i < hoursOfTheDay.length; i++){}
                var activityText = JSON.parse(localStorage.getItem(hoursOfTheDay[i]));
                    activity.value = activityText
                if (currentHour > hoursOfTheDay[i]){
                    activity.addClass('activity col-8 past')
                    activity.attr('value', activityText)
                } else if (currentHour < hoursOfTheDay[i]){
                    activity.addClass('activity col-8 future')
                    activity.attr('value', activityText)
                } else {
                    activity.addClass('activity col-8 present')
                    activity.attr('value', activityText)
                }  
            activity.insertAfter(hour)
        // the save button with the iccon nested inside with the append() method rather than the insertAfter() method. 
        var saveBtn = $("<button>")
            saveBtn.addClass('saveBtn col-2')
            saveBtn.attr('value', hoursOfTheDay[i])
            saveBtn.insertAfter(activity)
        
        var icon = $("<i>")
            icon.addClass("fas fa-save")
            saveBtn.append(icon)
        }
    }
// used the JSON stringify method to store the input data in the activity text box as a value of the key. 
function store(){
    var activity = $('.activity')
    for (let i = 0; i < hoursOfTheDay.length; i++){
        var storageValue = activity[i].value;
        var storageKey = hoursOfTheDay[i]
        localStorage.setItem(storageKey, JSON.stringify(storageValue))
    }
}
// retrieves recently stored data in local storage passes that and passes on the data at the key requested by the click location of the event to the scheduleAlert function. is that right? lol sounds right but kinda confusing at the same time
function retrieve(event){
    let target = event.target;
    var getValue = JSON.parse(localStorage.getItem(target.value))
    scheduleAlert(getValue, target);
}
// takes the arguments to display a message based on the saveBtn location and the activity saved.  
function scheduleAlert(getValue, target){
    var storedAlert = $('<p>');
        storedAlert.addClass('flashAlert position-fixed sticky-top bg-info text-warning')
        if (target.value > 12) {
            storedAlert.text("You have scheduled to " + getValue + " for " + (target.value - 12) + " PM.");
        } else { 
            storedAlert.text("You have scheduled to " + getValue + " for " + target.value + " AM.");
        }
        storedAlert.insertAfter(currentTime); // this might be unnecessary since its position is fixed but it displays it to the screen so i guess it could really be insterted anywhere
        removeElement()     
}
// this was taken off of stackoverflow by an amazing user who i can remember! IM SORRY!
// this function is called after the scheduleAlert message displays. it animates its slow fade out
function removeElement() {
    $('.flashAlert').animate({
      opacity: "-=1"
    }, 1500, function() {
      this.remove();
    });
  }
// initializes the page by calling generator
function init(){
    generator();
}

init();
// event listeners. this one calls the store function to store the input text into local storage and the second one calls the retrieve function which takes the same click that saved the info to retrieve and then it displays the message on the screen
document.addEventListener("click", function(event) {
    let target = event.target.tagName;
    if (target === "BUTTON")
    store();
})

document.addEventListener("click", function(event) {
    let target = event.target.tagName;
    if (target === "BUTTON")
    retrieve(event)
})
