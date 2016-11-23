function loadStylesheet(url) {
	var link = document.createElement('link');
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = url;
	var entry = document.getElementsByTagName('script')[0];
	entry.parentNode.insertBefore(link, entry);
}

let btnHTMLConntent="<a href='#' id='BaP_BtnBookAnAppointment' class='btn_Style'>Book An Appointment<a>";
let formListDoctor='<div class="BaP_Doctors">'+
		'<a href="#" id="BaP_Doctors_BtnClose">X</a>'+
		'<div class="BaP_Doctor_Item">'+
			'<img src="http://0.soompi.io/wp-content/uploads/2016/05/27215011/YG-.jpg">'+	
			'<p class="BaP_Doctor_Item_Name">Dr. Ramesh</p>'+
			'<a href="#"  class="BaP_Doctor_Item_BtnBook btn_Style">Book An Appointment</a>'+
		'</div>'+
		'<div class="BaP_Doctor_Item">'+
			'<img src="http://0.soompi.io/wp-content/uploads/2016/05/27215011/YG-.jpg">'+		
			'<p class="BaP_Doctor_Item_Name">Dr. Suresh</p>'+
			'<a href="#"  class="BaP_Doctor_Item_BtnBook btn_Style">Book An Appointment</a>'+
		'</div>'+
		'<div class="BaP_Doctor_Item">'+
			'<img src="http://0.soompi.io/wp-content/uploads/2016/05/27215011/YG-.jpg">'+
			'<p class="BaP_Doctor_Item_Name">Dr. Vinayak</p>'+
			'<a href="#" class="BaP_Doctor_Item_BtnBook btn_Style">Book An Appointment</a>'+
		'</div>'+
	'</div>';
let formAppointment='<div class="BaP_Form_Book_Appointment">'+
	'<a href="#" id="BaP_Form_Book_Appointment_BtnClose">X</a>'+
	'<div class="BaP_Form_Book_Appointment_Left">'+
		'<div class="BaP_Form_Book_Appointment_Left_Row">'+
		'<p>Name:</p>'+
		'<input id="BaP_Form_Book_Appointment_Left_Name" type="text"/>'+
		'</div>'+
		'<div class="BaP_Form_Book_Appointment_Left_Row">'+
		'<p>Age:</p>'+
		'<input id="BaP_Form_Book_Appointment_Left_Age" type="text"/>'+
		'</div>'+
		'<div class="BaP_Form_Book_Appointment_Left_Row">'+
		'<p>Mobile:</p>'+
		'<input id="BaP_Form_Book_Appointment_Left_Mobile" type="text"/>'+
		'</div>'+
		'<div class="BaP_Form_Book_Appointment_Left_Row">'+
		'<p>Email:</p>'+
		'<input id="BaP_Form_Book_Appointment_Left_Email" type="text"/>'+
		'</div>'+
	'</div>'+
	'<div class="BaP_Form_Book_Appointment_Right">'+
		'<p id="BaP_Form_Book_Appointment_Right_DrName">'+
		'{{drName}}'+
		'</p>'+
		'<p id="BaP_Form_Book_Appointment_Right_Role">B.D.S'+
		'</p>'+
	'</div>'+
	'<div class="BaP_Form_Book_Appointment_Bottom">'+
		'<p>Appointment Date & Time</p>'+
		'<input id="BaP_Form_Book_Appointment_Bottom_DateTime"type="text"/>			'+
	'</div>'+
	'<button id="BaP_Form_Book_Appointment_BtnBook" class="btn_Style">Book</button>'+
'</div>';
function BookAnAppointment(){}
BookAnAppointment.prototype.init = function(){  
  loadStylesheet('http://localhost:85/BaPSDK/BaP.css');
  var BaP_PnlBookAnAppointment=document.createElement('div');
  BaP_PnlBookAnAppointment.innerHTML=btnHTMLConntent; 
  BaP_PnlBookAnAppointment.setAttribute("id", "BaP_PnlBookAnAppointment");
  document.body.appendChild(BaP_PnlBookAnAppointment); 
  $(document).on("click","#BaP_BtnBookAnAppointment",function()
  {
	$("#BaP_PnlBookAnAppointment").html(formListDoctor);
  });
 // add event for button BaP_Doctors_BtnClose 
 $(document).on("click","#BaP_Doctors_BtnClose",function()
  {
	$("#BaP_PnlBookAnAppointment").html(btnHTMLConntent);
  });
 // add event for button BaP_Doctor_Item_BtnBook
 $(document).on("click",".BaP_Doctor_Item_BtnBook",function()
 {	
	let drName=$(this).prev()[0].innerHTML;
	let formAppointmentChange=formAppointment;
	formAppointmentChange=formAppointmentChange.replace('{{drName}}',drName);
	$("#BaP_PnlBookAnAppointment").html(formAppointmentChange);
 });
 // add event for button BaP_Form_Book_Appointment_BtnClose 
  $(document).on("click","#BaP_Form_Book_Appointment_BtnClose", function()
 {
	$("#BaP_PnlBookAnAppointment").html(formListDoctor);
 });  
 // add event to book
  $(document).on("click","#BaP_Form_Book_Appointment_BtnBook",function()
  {
	alert("Book an appointment successful !");
	$("#BaP_PnlBookAnAppointment").html(btnHTMLConntent);
  });
}
$(document).on("focus","#BaP_Form_Book_Appointment_Bottom_DateTime", function()
{
	$('#BaP_Form_Book_Appointment_Bottom_DateTime').datetimepicker();
});

var BaP = new BookAnAppointment();


