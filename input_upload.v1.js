// JavaScript Document

var inst = 0;

(function($){

	$.fn.input_upload = function(settings){
		
		var config = {
			action 	: '',
			choose 	: '',
			after 	: '',
			dataType: '',
			display : '...',
			data	: '',
			nostyle : '',
			nobutton:'',
			show_frame:'',
			only: '',
			event_click : 'click',
			size: {width:'100px',height: '100px'},
			delete : function(){},
			loaded : function(){}
		};
		
		if (settings){$.extend(config, settings);}

			
		return this.each( function( ){
			
			var inst = Math.round( Math.random() * 100000 )
			
			var target = $(this);
            //target.addClass('input-file-upload').addClass('void')
			target.hide();		
			target.attr('readonly',true);
			
			var pai = target.parent();		
			var name = target.attr('name');	
			if( !name ){
				name = 'file_'+inst;
			}
			
			var prefix = "frame_"+name+"_";
			var box_name = prefix+inst;
			
			$("div[prefix='"+prefix+"']").remove();
			
			if( !config.init ) config.init = config.display;
			
		
			var name_frame = 'frame_'+inst;
			
			var htmlFile = '';
			
			var display = 'none';
			if( config.show_frame ){
				display = 'block';
			}
			
			$('.iframe-file-upload, .input-file-upload ').remove();

			htmlFile += "<div style='display:"+display+";position:absolute;z-index:9999' id='"+box_name+"' class='iframe-file-upload'>";
				htmlFile += "<form action='"+ config.action +"' target='"+name_frame+"'  method='post' enctype='multipart/form-data'>";
					if(target.attr('extension')){
						htmlFile += "<input type='hidden' name='extension' value='"+target.attr('extension')+"'>";
					}
					htmlFile += "<input type='file' name='"+name+"'>";
					if( config.data ){
						var parans = config.data.split('&');
						var vals = '';
						for( var i in parans ){
							vals = parans[i].split('=')
							htmlFile += "<input type='hidden' name='"+vals[0]+"' value='"+vals[1]+"'>";
						}
					}
					
				htmlFile += "</form>";
				htmlFile += "<iframe name='"+ name_frame +"' id='"+ name_frame +"' ></iframe>";
			htmlFile += "</div>";

			if( !config.nostyle ){
				//target.css( style )
			}

			var new_input = '';
			new_input += "<div class='input-file-upload "+name+" void'><div class='ifu-background'></div><ul class='ifu-buttons'><li class='ifu-item up'>Upload</li><li class='ifu-item del'>Apagar</li></ul></div></div>";
			target.after( new_input );
			
			/*pai.find('.item').css( css_item )		*/
			btnUpload = pai.find('.input-file-upload').css( config.size )
			//target.click( function(){ btnUpload.click() } )
			
			btnUpload.hover(function(e){
				$(this).find('.ifu-buttons').stop(true).animate({bottom:'0px'},500);
			}, function( e ){
				var h = $(this).find('.ifu-buttons').height();
				$(this).find('.ifu-buttons').stop(true).animate({bottom: -h+'px'},500);
			})	

			$('body').after( htmlFile )
			//target.after( htmlFile )
			var box = $('#'+box_name)
			box.attr('prefix',prefix);
			
			btnUpload.find('.ifu-buttons .ifu-item.del').unbind('click').click(function(){
				config.delete( target )
			})

			//btnUpload.on( config.event_click ,function(e){
			btnUpload.find('.ifu-buttons .ifu-item.up').unbind('click').click(function(e){
				//e.preventDefault();
				
				var fieldFile = box.find("[type='file']:eq(0)");
				var formX = box.find("form:eq(0)");
				formX.attr('action',btnUpload.attr('action'))
				var iframe = box.find("iframe");

				iframe.unbind('load')
				iframe.load(function(){
					pai.find('.input-file-upload').removeClass('loading')
					var ready_iframe = true;
					var ret = '';
					
					if( formX.attr('action').indexOf('http://') != -1 ){
						var host = location.host;
						var url_ = config.action.replace(/http:\/\//gi,'')
						var ar_h = url_.split('/');
						var host_url = ar_h[0];
						ready_iframe = ( host == host_url); 
					}

					if( ready_iframe ){
						//retorno
						var str = $(this).contents().find("body").html();
					}else{
						str = '';
					}					
					
					if( config.dataType == 'json' ){
						if(str) {
							ret = JSON.parse(str);
						}
					}else{
						ret = str;
					}					
					
					if( config.after ){
						config.after( ret, target);
					}
				})
				
				fieldFile.click();
				
				fieldFile.unbind('change')
				fieldFile.change(function(e){
					
					//e.preventDefault();
					
					if( config.choose ){
						config.choose( target, formX );
					}
					
					$(this).parents('form:eq(0)').submit()
					
				})	
				
				
			})			
			
			config.loaded( target );

			function setDisplay(str){
				pai.find('.iu > .col.name').html( str )	
			}
		
		});
		
		
	}
})(jQuery);