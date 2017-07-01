$(document).on(function(){


});



$(document).ready(function(){
	"use strict";

	$(document).on('click','.horizontal_add2',function(){
			if(WT.status != 'delete'){
					console.log('inside horizontal_add2');
				  update_status('create');
			var proj_num = WT.project.length + 1;
			//alert(proj_num);
			var newcolunm_id = proj_num*100;
					$('div.blank').before("<!--one colunm-->");
			var newcolunm = document.createElement("DIV");
					newcolunm.className = 'colunm';
					newcolunm.id = newcolunm_id;
					newcolunm.sortable = 'true';
					$('div.blank').before(newcolunm);
			var newtitlebar = document.createElement("DIV");
					newtitlebar.className = 'title_bar';
					newtitlebar.id = newcolunm_id;
					$('#'+newcolunm_id+'.colunm').append(newtitlebar);
			var newtitlebarinput = document.createElement("INPUT");
					newtitlebarinput.className = 'title_bar_input';
					newtitlebarinput.id = newcolunm_id;
					newtitlebarinput.value = 'Add Project Name';
					newtitlebarinput.style = 'outline:none';
					newtitlebarinput.maxlength = '20';
					newtitlebarinput.disabled = true;
					$('#'+newcolunm_id+'.title_bar').append(newtitlebarinput);
			var newedittitlebar = document.createElement("DIV");
					newedittitlebar.className = 'edit_title_bar';
					newedittitlebar.id = newcolunm_id;
					$('#'+newcolunm_id+'.title_bar').append(newedittitlebar);
			var newimg = document.createElement("IMG");
					newimg.className = 'edit_title_bar_pencil';
					newimg.id = newcolunm_id;
					newimg.src = 'pics/pencil.png'
					$('#'+newcolunm_id+'.edit_title_bar').append(newimg);
			var newadd = document.createElement("DIV");
					newadd.className = 'horizontal_add';
					newadd.id = newcolunm_id;
					$('#'+newcolunm_id+'.colunm').append(newadd);
			var newaddplus = document.createElement("P");
					newaddplus.className = 'addplus';
					newaddplus.id = newcolunm_id;
			var newdelstar = document.createElement("P");
							newdelstar.className = 'delstar';
							newdelstar.id = newcolunm_id;
					$('#'+newcolunm_id+'.horizontal_add').append(newaddplus);
					$('#'+newcolunm_id+'.horizontal_add').append(newdelstar);
					$('#'+newcolunm_id+'.addplus').append("+");
					$('#'+newcolunm_id+'.delstar').append("&#8251;");
					$('div.blank').before("<!--one colunm end-->");
			new_project(proj_num,Date());
					$('#'+newcolunm_id+'.colunm').hide();
					$('#'+newcolunm_id+'.colunm').fadeIn();
					update_status('normal');
			} else {
					alert('Cannot add project in '+WT.status+' mode');
			}
	});

	$(document).on('click','.horizontal_del2',function(){
			console.log(WT.status);
			if(WT.status != 'delete'){
					$('.delstar').show();
					//$('.horizontal_add').css('opacity','1.0');
					//$('.blankcontent').css('opacity','1.0');
					update_status('delete');
			} else {
					$('.delstar').hide();
					$('.horizontal_del2').children().show();
					//$('.horizontal_add').css('opacity','0.2');
					//$('.blankcontent').css('opacity','0.2');
					update_status('normal');
			}
	});

	$(document).on('click','.delstar',function(){
			var temp_id = $(this).prop('id');
			if($(this).prop('id') != '-000'){
					$('#'+temp_id+'.colunm').fadeOut();
					var proj = parseInt($(this).attr("id"))/100 - 1;
					del_project(proj,Date());
			}
	});


	$(document).on('click','.addplus',function(){
		if($(this).id != '000'){
			console.log('inside verticle addplus')
			update_status('create');
		var proj = parseInt($(this).parent().attr("id"))/100 - 1;
		var newbox_id = ((proj+1)*100) + WT.inewbox[proj];
		var icon1=" <div class='setup_newbox' id='" + newbox_id + "' style='display: none'><img src='pics/gear-icon-png-2220.png'></img></div> ";
		var icon2=" <div class='delete_newbox' id='" + newbox_id + "' style='display: none'><img src='pics/dash.png'></div> ";
		var icon3=" <div class='edit_newbox' id='" + newbox_id + "' style='display: none'><img src='pics/pencil.png'></img></div> ";
		var icon4=" <div class='important_newbox' id='" + newbox_id + "' style='display: none'><img src='pics/important.png'></img></div> ";
		var input1=" <textarea class='newbox_text' id ='" + newbox_id + "' style='display: block; resize: none; outline: none;' type='text'></textarea> ";
		$(this).parent().before("<div class='newbox' id='" + newbox_id + "'> " + input1 + icon1 + icon2 + icon3 + icon4 + "</div>");
		$('#'+newbox_id+'.newbox').css("border","none");
		$('#'+newbox_id+'.newbox_text').focus();
		$('#'+newbox_id+'.newbox_text').css("z-index","9");
		var color =$('#'+(proj*100)+'.title_bar').css('background-color');
		new_progress(proj,WT.inewbox[proj],newbox_id,Date());
		if(WT.status=="alarm"){
			$('#'+newbox_id+'.newbox').css("background-color","grey");
			$('#'+newbox_id+'.important_newbox').css("width","0px");
			$('#'+newbox_id+'.important_newbox').children().css("width","0px");
		}
		$('#'+newbox_id+'.newbox').hide();
		$('#'+newbox_id+'.newbox').fadeIn();
		WT.inewbox[proj] += 1;
		update_status('normal');
	}
	});

	$('.horizontal_add').hover(
		function(){$('.addplus').css("transform","rotate( 0deg)");},
		function(){$('.addplus').css("transform","rotate( 0deg)");}
	);

  $(document).on('mouseenter', 'div.title_bar',function() {
			var k = $(this).attr("id");
			/*if($('#'+k+'.title_bar_input').prop('disabled')){
					$('#'+k+'.title_bar_input').css('cursor','initial');
			} else {
					$('#'+k+'.title_bar_input').css('cursor','text');
			}*/
			$('#'+k+'.edit_title_bar').show();
			$('#'+k+'.title_bar_input').css('color','rgb(66, 66, 66)');
	});
	$(document).on('mouseleave', 'div.title_bar',function() {
			var k = $(this).attr("id");
			$('#'+k+'.edit_title_bar').hide();
			$('#'+k+'.title_bar_input').css('color','white');
	});

	$(document).on('click', 'div.title_bar',function() {
			var k = $(this).attr("id");
			//
			var lolz = $('#'+k+'.title_bar_input').prop("value");
			if (lolz == 'Add Project Name'){
				$('#'+k+'.title_bar_input').prop('disabled',false);
				$('#'+k+'.title_bar_input').prop('value',"");
			}
			$('#'+k+'.title_bar_input').focus();
			/*$('#'+k+'.newbox_text').select();*/
			$('#'+k+'.edit_title_bar').hide();
		});

	$(document).on('click', 'div.edit_title_bar',function() {
				var k = $(this).attr("id");
				$('#'+k+'.title_bar_input').prop('disabled',false);
				$('#'+k+'.title_bar_input').focus();
				/*$('#'+k+'.newbox_text').select();*/
				$('#'+k+'.edit_title_bar').hide();
	});

	$(document).on('blur', 'input.title_bar_input',function() {
				var k = $(this).attr("id");
				/*prepare for update_title*/
				var proj = parseInt(parseInt($(this).attr("id"))/100 - 1);
				update_title($(this).prop("value"),proj)
				if($(this).val() === ""){
					$(this).val("Add Project Name");
				} else {
					$('#'+k+'.title_bar_input').prop('disabled',true);
				}
	});

	$(document).on('keydown','input.title_bar_input',function(event){
			if(event.which == 13){
				$(this).blur();
			};
	});


	$(document).on('mouseenter', 'div.newbox',function() {
			var k = $(this).attr("id");
			$('#'+k+'.setup_newbox').show();
		});

	$(document).on('mouseleave', 'div.newbox',function() {
			var k = $(this).attr("id");
			$('#'+k+'.setup_newbox').hide();
			$('#'+k+'.delete_newbox').hide();
			$('#'+k+'.edit_newbox').hide();
			$('#'+k+'.important_newbox').hide();
		});


	$(document).on('mouseenter', 'div.setup_newbox',function() {
			var k = $(this).attr("id");
			/*alert($('#'+k+'.delete_newbox').css("display"));*/
			if($('#'+k+'.delete_newbox').css("display") === "none"){
				$('#'+k+'.delete_newbox').show();
				$('#'+k+'.edit_newbox').show();
				$('#'+k+'.important_newbox').show();
			}else{
				//$('#'+k+'.delete_newbox').hide();
				//$('#'+k+'.edit_newbox').hide();
			}
		});

	$(document).on('mousedown', 'div.delete_newbox',function() {
			var k = $(this).attr("id");
			$('#'+k+'.newbox').fadeOut("fast");
			//$('#'+k+'.newbox').hide();
			/*prepare for update_progress*/
			var text = $('#'+k+'.newbox_text').prop('value');
			var proj = parseInt(parseInt($(this).attr("id"))/100 - 1);
			var stepnum = parseInt(k)%100;
			var active = Boolean(0);
			update_progress(text,proj,stepnum,parseInt(k),Date(),active);
		});

	$(document).on('click', 'div.edit_newbox',function() {
			var k = $(this).attr("id");
			$('#'+k+'.newbox_text').show();
			$('#'+k+'.newbox_text').prop('readOnly',false);
			$('#'+k+'.newbox_text').focus();
			/*$('#'+k+'.newbox_text').select();*/
			$('#'+k+'.newbox').css("border","none");
			$('#'+k+'.setup_newbox').hide();
			$('#'+k+'.delete_newbox').hide();
			$('#'+k+'.edit_newbox').hide();
			$('#'+k+'.newbox_text').css("z-index","9");
		});

	$(document).on('click', 'div.important_newbox',function() {
			var k = $(this).attr("id");
			var proj = parseInt(parseInt($(this).attr("id"))/100 - 1);
			var stepnum = parseInt(k)%100;
			if (WT.project[proj][stepnum].priority == 0) {
					$('.newbox').css("background-color","grey");
					$('#'+k+'.newbox').css("background-color","red");
					$('.important_newbox').css("width","0px");
					$('.important_newbox').children().css("width","0px");
					$('#'+k+'.important_newbox').css("width","20px");
					$('#'+k+'.important_newbox').children().css("width","14px");
					high_prior(proj,stepnum,k,Date(),1);
					update_status('alarm');
			}	else {
				$('.newbox').css("background-color","white");
				$('.important_newbox').css("width","20px");
				$('.important_newbox').children().css("width","14px");
				high_prior(proj,stepnum,k,Date(),0);
				update_status('normal');
			}
		});

	$(document).on('blur', 'textarea.newbox_text',function() {
			var k = $(this).attr("id");
			$('#'+k+'.newbox_text').prop('readOnly',true);
			$('#'+k+'.setup_newbox').hide();
			$('#'+k+'.delete_newbox').hide();
			$('#'+k+'.edit_newbox').hide();
			$('#'+k+'.newbox_text').css("z-index","7");
			/*prepare for update_progress*/
			var text = $('#'+k+'.newbox_text').prop('value');
			var proj = parseInt(parseInt($(this).attr("id"))/100 - 1);
			var stepnum = parseInt(k)%100;
			var active = Boolean(1);
			update_progress(text,proj,stepnum,parseInt(k),Date(),active);
	});

	$(document).on('click','#save_json', function() {
		//alert('here');
		var textToSave = JSON.stringify(WT);
				var filename = WT.username +'.json';
				download(textToSave, filename, 'application/json');
				//localStorage.removeItem("WorkThread_workspace");
			});

	$(document).on('click','#select_json', function() {
			if (confirm('Do you want to have all progresses deleted?')){
				localStorage.removeItem('WorkThread_workspace');
				location.reload();
			} else {}
	})

	$(document).on('click','#load_json', function() {
		/*$("input#upload").trigger("click");*/
		$('#myModal').show();
	})

	$(document).on('click','span.close', function() {
		/*$("input#upload").trigger("click");*/
		$('#myModal').hide();
	})

	$(document).on('click','div#choose_file', function(evt) {
		$("input#upload_i").trigger("click");
		setTimeout(function(){
				//console.log(typeof(kkk));
				if (!$('span.close').hasClass("exit_n_read")){
						$('span.close').addClass("exit_n_read");
				}
		},3000);
		/*console.dir(evt);
		var files = evt.dataTransfer.files; // FileList object.
		console.dir(files);

		// files is a FileList of File objects. List some properties.
		var output = [];
		for (var i = 0, f; f = files[i]; i++) {
				output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
				f.size, ' bytes, last modified: ',
				f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
				'</li>');
		}
		f = files[0];
		fff = f;
		reader = new FileReader();
		reader.onload = function(event) {
				window.open(reader.result);
		}*/
	})



	$(document).on('click','span.exit_n_read', function() {
			$('input.showhistory').click();
	});


	$(document).on('click','input.showhistory', function() {

			/*var mydata = JSON.parse(kkk);*/
		//alert('here')
		console.log("in input-show-history");
		update_status('loading');
		WT = kkk;
		var proj_totalnum = WT.project.length;
			for(i=0;i<proj_totalnum;i++){
				/*show title*/
				var proj_id = (i+1)*100;
				if (i > 0) {
					var proj_num = i + 1;
					//alert(proj_num);
					var newcolunm_id = proj_num*100;
							$('div.blank').before("<!--one colunm-->");
					var newcolunm = document.createElement("DIV");
							newcolunm.className = 'colunm';
							newcolunm.id = newcolunm_id;
							$('div.blank').before(newcolunm);
					var newtitlebar = document.createElement("DIV");
							newtitlebar.className = 'title_bar';
							newtitlebar.id = newcolunm_id;
							$('#'+newcolunm_id+'.colunm').append(newtitlebar);
					var newtitlebarinput = document.createElement("INPUT");
							newtitlebarinput.className = 'title_bar_input';
							newtitlebarinput.id = newcolunm_id;
							newtitlebarinput.value = 'Add Project Name';
							newtitlebarinput.style = 'outline:none';
							newtitlebarinput.maxlength = '20';
							newtitlebarinput.disabled = true;
							$('#'+newcolunm_id+'.title_bar').append(newtitlebarinput);
					var newedittitlebar = document.createElement("DIV");
							newedittitlebar.className = 'edit_title_bar';
							newedittitlebar.id = newcolunm_id;
							$('#'+newcolunm_id+'.title_bar').append(newedittitlebar);
					var newimg = document.createElement("IMG");
							newimg.className = 'edit_title_bar_pencil';
							newimg.id = newcolunm_id;
							newimg.src = 'pics/pencil.png'
							$('#'+newcolunm_id+'.edit_title_bar').append(newimg);
					var newadd = document.createElement("DIV");
							newadd.className = 'horizontal_add';
							newadd.id = newcolunm_id;
							$('#'+newcolunm_id+'.colunm').append(newadd);
					var newaddplus = document.createElement("P");
							newaddplus.className = 'addplus';
							newaddplus.id = newcolunm_id;
							var newdelstar = document.createElement("P");
											newdelstar.className = 'delstar';
											newdelstar.id = newcolunm_id;
									$('#'+newcolunm_id+'.horizontal_add').append(newaddplus);
									$('#'+newcolunm_id+'.horizontal_add').append(newdelstar);
									$('#'+newcolunm_id+'.addplus').append("+");
									$('#'+newcolunm_id+'.delstar').append("&#8251;");
							$('div.blank').before("<!--one colunm end-->");
				}
				var temp_title = WT.project[i][0].title;
				if (temp_title == ""){
					$('#'+ proj_id+'.title_bar_input').prop("value","Add Project Name");
				} else {
					$('#'+ proj_id+'.title_bar_input').prop("value",temp_title);
				}
				/*show box*/
				for(var j=1;j<WT.project[i].length;j++){
					var newbox_id = WT.project[i][j].boxid;
					var icon1=" <div class='setup_newbox' id='" + newbox_id + "' style='display: none'><img src='pics/gear-icon-png-2220.png'></img></div> ";
					var icon2=" <div class='delete_newbox' id='" + newbox_id + "' style='display: none'><img src='pics/dash.png'></div> ";
					var icon3=" <div class='edit_newbox' id='" + newbox_id + "' style='display: none'><img src='pics/pencil.png'></img></div> ";
					var icon4=" <div class='important_newbox' id='" + newbox_id + "' style='display: none'><img src='pics/important.png'></img></div> ";
					var input1=" <textarea class='newbox_text' id ='" + newbox_id + "' style='display: block; resize: none; outline: none;' type='text'></textarea> ";
					$('#' + proj_id + '.horizontal_add').before("<div class='newbox' id='" + newbox_id + "'> " + input1 + icon1 + icon2 + icon3 + icon4 +"</div>");
					$('#'+ newbox_id + '.newbox_text').prop('value',WT.project[i][j].text);
					$('#'+newbox_id+'.newbox').css("border","none");
					WT.inewbox[i] = WT.project[i][j].step + 1;
					if (WT.project[i][j].active){
						$('#'+ newbox_id + '.newbox').show();
					} else {
						$('#'+ newbox_id + '.newbox').hide();
					}
					if(WT.status=="alarm"){
						if(WT.project[i][j].priority == 0){
							$('#'+newbox_id+'.newbox').css("background-color","grey");
							$('#'+newbox_id+'.important_newbox').css("width","0px");
							$('#'+newbox_id+'.important_newbox').children().css("width","0px");
						}
						if(WT.project[i][j].priority == 1){
							$('#'+newbox_id+'.newbox').css("background-color","red");
						}
					}
				}
				if(WT.project[i][0].active == 0){
						$('#'+proj_id+'.colunm').hide();
				}
			}
			$(this).removeClass("exit_n_read");
			//localStorage.setItem("WorkThread_workspace",JSON.stringify(WT));
			console.log('previous WT status is ' + kkk.status)
			update_status('normal');
			console.log('out input-show-history')
	});


});
