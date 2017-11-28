
var title = document.title;
$(function(){
    
    $('nav ul li').each(function(){
    
        // if the current path is like this link, make it active
        if($(this).attr('id') == title){
            $(this).addClass('active');
        }
    })
})
