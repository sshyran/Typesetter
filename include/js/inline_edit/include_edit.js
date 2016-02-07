
/**
 * Inline Editing of Galleries
 *
 */

	function gp_init_inline_edit(area_id,section_object){

		var cache_value		= '';
		var save_path		= gp_editing.get_path(area_id);
		var edit_div		= gp_editing.get_edit_area(area_id);

		if( edit_div == false || save_path == false ){
			return;
		}


		gp_editor = {
			save_path: save_path,

			checkDirty:function(){
				var curr_val = gp_editor.gp_saveData();
				console.log('cache value',cache_value,'curr_val',curr_val);
				if( curr_val != cache_value ){
					return true;
				}
				return false;
			},

			gp_saveData:function(){
				return $('#gp_include_form').serialize();
			},
			resetDirty:function(){
				cache_value = gp_editor.gp_saveData();
			}
		}

		gp_editing.editor_tools();
		LoadDialog();


		function LoadDialog(){
			var edit_path = save_path+'&cmd=include_dialog';
			$gp.jGoTo(edit_path);
		}


		gpresponse.gp_include_dialog = function(data){
			$('#ckeditor_top').html(data.CONTENT);

			gp_editor.resetDirty();
		}


		gplinks.gp_include_preview = function(){

			$gp.loading();

			var path = gp_editor.save_path;
			path = strip_from(path,'#');

			var data = '';
			if( path.indexOf('?') > 0 ){
				data = strip_to(path,'?')+'&';
			}
			data += gp_editor.gp_saveData();
			data += '&cmd=preview';

			$gp.postC( path, data);
		}

		/**
		 * Replace the area with the new include data
		 */
		gpresponse.gp_include_content = function(obj){
			edit_div.html(obj.CONTENT);
		}

	}
