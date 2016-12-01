<?php
foreach( $_FILES as $index=>$valor){
	
	if( $_FILES[$index]['tmp_name'] ){
		
		if( !strpos( " ".$_FILES[$index]['name'],'.php' ) ){
			
			$parte = explode('.',$_FILES[$index]['name']);			
			$ext = end( $parte );
			
			$destino = 'files/'.$index.'.'.$ext;
			$ok = @copy( $_FILES[$index]['tmp_name'], $destino ); 
			if( $ok ){
				$file = $destino;
				$msg = "<img src='".$destino."' width='20'>".$destino;
			}else{
				$msg = 'Erro Ao Gravar Arquivo';
			}
		
		}else{
			$msg = 'Extensão proibida!';
		}
		
		break;
		
	}

}


echo json_encode(array('msg'=>$msg,'file'=>$file,'success'=>$ok),true);


?>