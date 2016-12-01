<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Example File Upload</title>
</head>
<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
<script src="input_upload.v1.js"></script>
<link href="input_upload.css" rel="stylesheet" type="text/css" />
<style>
*{
	margin:0;
	font-family:Arial, Helvetica, sans-serif;
	font-size:15px;
}

body,html{		
	width:100%; height:100%;
}
</style>
<body>
<div><input type="text" class='file' name='file' /></div>
<div style="clear:both"></div>
<div><input type="text" class='file' name='file1' /></div>



<script>
		$('.file').input_upload({ action:'upload.php',
								  dataType:'json',
								  choose: function( obj ){
					
									obj.val( 'Carregando...' )
									
								  },
								  after: function( data, obj ){
									
									if( data.success ){
										obj.val( data.file  )
										obj.parent().find('.image').remove()
										obj.parent().append( "<div style='clear:both' class='image'><img src='"+data.file+"' width='150'></div>" );
									}else{
										obj.val( data.msg  )
									}
									
								  },
								  show_frame : true								
								});
	//})
</script>
</body>
</html>