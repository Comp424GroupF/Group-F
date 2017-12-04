 $(document).on('click','.get-profile-data', function(){
        var $item = $(this).closest('tr').find('td');
        $.each($item, function(i, value){
        	if(i === 1){
        		$('#name').val($(value).text());
        	}
                else if(i === 2){
                        $('#aptno').val($(value).text());
                }
        	else if(i === 3){
        		$('#apttype').val($(value).text());
        	}
                else if(i === 4){
                        $('#email').val($(value).text());
                }
        	else if(i === 6) {
        		$('#id').val($(value).text());
        	}
        });
 });