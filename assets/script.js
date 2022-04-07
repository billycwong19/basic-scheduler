var home = document.querySelector(".home")
var timeBlockList = document.querySelector(".timeBlockList")
var currentTime = document.querySelector("#currentDay")
var dateAndTime = moment().format("MMMM Do YYYY");
currentTime.textContent = dateAndTime;

var hoursOfTheDay = ["9am", "10am", "11am", "12am", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm","7pm", "8pm", "9pm"]
var saveBtn;

function generator() {
    for (var i = hoursOfTheDay.length - 1; i >= 0; i--) {
        var timeBlock = $('<div>');
            timeBlock.addClass('container-fluid timeBlock vw-100 row')
            timeBlock.insertAfter(timeBlockList);
        var hour = $("<h3>")
            hour.addClass('hour col-3 col-md-2 col-lg-1')
            hour.text(hoursOfTheDay[i]);
            timeBlock.append(hour);
        var activity = $("<input type=text>")
            activity.addClass('activity col-6 col-md-8 col-lg-10 bg-info')
            activity.insertAfter(hour)
        var saveBtn = $("<button>")
            saveBtn.addClass('saveBtn col-3 col-md-2 col-lg-1 bg-dark')
            saveBtn.insertAfter(activity)
        var icon = $("<i>")
            icon.addClass("fas fa-save")
            saveBtn.append(icon)
      }
      saveBtn.on("click", save)
    }
function save(){
    var input = $("activity").value
    console.log(input)
}
function init(){
    generator();
}
init();

