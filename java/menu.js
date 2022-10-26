let flag = false;
$('ul').click(function () {
    if(!flag) {
        $('.menu-elem').slideDown();
    }else{
        $('.menu-elem').slideUp();
    }
    flag = !flag;
});