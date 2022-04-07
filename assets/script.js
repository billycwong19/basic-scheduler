var home = document.querySelector(".home")
var timeBlockList = document.querySelector(".timeBlockList")
var currentTime = document.querySelector("#currentDay")
var dateAndTime = moment().format("MMMM Do YYYY");
currentTime.textContent = dateAndTime;
var currentHour = moment().hour();


var hoursOfTheDay = ["9", "10", "11", "12", "13", "14", "15", "16", "17", "18","19", "20", "21"]
var saveBtn;

function generator() {
    for (var i = hoursOfTheDay.length - 1; i >= 0; i--) {
        var timeBlock = $('<div>');
            timeBlock.addClass('container-fluid timeBlock vw-100 row')
            timeBlock.insertAfter(timeBlockList);
        var hour = $("<h3 class= " + hoursOfTheDay[i] + ">")
            hour.addClass('hour col-2')
            if (hoursOfTheDay[i] > 12){
                hour.text((hoursOfTheDay[i] - 12) + " PM");
            } else {
                hour.text(hoursOfTheDay[i] + " AM");
            }
            timeBlock.append(hour);
        var activity = $("<input type=text>")
        console.log(currentHour)
                if (currentHour > hoursOfTheDay[i]){
                    activity.addClass('activity col-8 past')
                } else if (currentHour < hoursOfTheDay[i]){
                    activity.addClass('activity col-8 future')
                } else {
                    activity.addClass('activity col-8 present')
                }  
            activity.insertAfter(hour)
        var saveBtn = $("<button>")
            saveBtn.addClass('saveBtn col-2')
            saveBtn.insertAfter(activity)
        var icon = $("<i>")
            icon.addClass("fas fa-save")
            saveBtn.append(icon)
        }
        compare();
    }

function save(){
    var activity = $('.activity')
    var input = activity.text();
    input = localStorage.setItem(JSON.stringify(right))
}
  
function init(){
    generator();
}

init();

$(".saveBtn").on("click", save)
