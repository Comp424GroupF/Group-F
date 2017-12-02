 $(document).on('click','.get-data', function(){
        var $item = $(this).closest('tr').find('td');
        $.each($item, function(i, value){
        	if(i === 1){
        		$('#subject').val($(value).text());
        	}
        	else if(i === 2){
        		$('#details').val($(value).text());
        	}
        	else if(i === 4) {
        		$('#id').val($(value).text());
        	}
        });
 });