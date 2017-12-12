 $(document).on('click','.get-req-data', function(){
        var $item = $(this).closest('tr').find('td');
        $.each($item, function(i, value){
        	if(i === 1){
        		$('#aptno').val($(value).text());
        	}
                else if(i === 2){
                        $('#servicetype').val($(value).text());
                }
        	else if(i === 3){
        		$('#message').val($(value).text());
        	}
                else if(i === 4){
                        $('#status').val($(value).text());
                }
        	else if(i === 6) {
        		$('#id').val($(value).text());
        	}
        });
 });