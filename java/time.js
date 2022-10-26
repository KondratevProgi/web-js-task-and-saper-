function updateclock(){
    var now = new Date();
    var day = now.getDay(),
        month = now.getMonth(),
        daynum = now.getDate(),
        year = now.getFullYear(),
        hour = now.getHours(),
        minutes = now.getMinutes(),
        seconds = now.getSeconds();

        Number.prototype.pad = function(digits){
            for(var n = this.toString();n.length < digits; n = 0 + n);
            return n;
        }



        var months = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
        var week = ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"];
        var hr = ["day","month","daynum","year","hour","minutes","seconds"];
        var values = [week[day],months[month],daynum.pad(2),year,hour.pad(2),minutes.pad(2),seconds.pad(2)];

        for(var i = 0; i < hr.length; i++)
            document.getElementById(hr[i]).firstChild.nodeValue = values[i];
}

function initclock(){
    updateclock();
    window.setInterval("updateclock()",1)

}