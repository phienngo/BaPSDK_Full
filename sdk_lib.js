//
let btnHTMLConntent="<a href='#' id='BaP_BtnBookAnAppointment' class='btn_Style'>Book An Appointment<a>";
let formListDoctor='<div class="BaP_Doctors">'+
		'<a href="#" id="BaP_Doctors_BtnClose">X</a>'+
		
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
 var DOCTORLIST_URI='http://localhost:85/BaPSDK/listdoctor.json';
 function GeneralDocsForm()
 {
	$("#BaP_PnlBookAnAppointment").html(formListDoctor);
	$.getJSON(DOCTORLIST_URI, function (dr){		
		dr.doctors.map(function(item,index){console.log(item);
		var doc='<div class="BaP_Doctor_Item">'+
				'<input type="hidden" value="'+item.doctor_key+'" class="doctor_key"/>'+
				'<input type="hidden" value="'+item.hopital_key+'" class="hopital_key"/>'+
				'<img src="http://0.soompi.io/wp-content/uploads/2016/05/27215011/YG-.jpg">'+	
				'<p class="BaP_Doctor_Item_Name">'+item.doctor_name+'</p>'+
				'<a href="#"  class="BaP_Doctor_Item_BtnBook btn_Style">Book An Appointment</a>'+
			'</div>';
		$('.BaP_Doctors').append(doc);
		})
	});
 }
// lib.js
(function(window, undefined) {
var BaP = window.BaP;
BaP.showWidget = function() {
	console.log("showWidget");
  let BaP_PnlBookAnAppointment=document.createElement('div');
  BaP_PnlBookAnAppointment.innerHTML=btnHTMLConntent; 
  BaP_PnlBookAnAppointment.setAttribute("id", "BaP_PnlBookAnAppointment");
  document.body.appendChild(BaP_PnlBookAnAppointment); 
  $(document).on("click","#BaP_BtnBookAnAppointment",function()
  {
	GeneralDocsForm();
  });
 // add event for button BaP_Doctors_BtnClose 
 $(document).on("click","#BaP_Doctors_BtnClose",function()
  {
	$("#BaP_PnlBookAnAppointment").html(btnHTMLConntent);
  });
 // add event for button BaP_Doctor_Item_BtnBook
 $(document).on("click",".BaP_Doctor_Item_BtnBook",function()
 {	
	 var $this=$(this);
	 var hospital_access_key = $this.parents('.BaP_Doctor_Item').children('.hopital_key').val();
     var doctor_access_key  = $this.parents('.BaP_Doctor_Item').children('.doctor_key').val();
	 var URI = 'http://localhost:85/BaPSDK/check_doctor_valid.json?hospital_access_key=' + hospital_access_key + '&doctor_access_key=' + doctor_access_key;
	  var URI_FAIL = 'http://localhost:85/BaPSDK/check_doctor_valid.json?hospital_access_key=' + hospital_access_key + '&doctor_access_key=' + doctor_access_key;
	 $.getJSON(URI, function (data) {
      console.log("check Doctor Is Valid " + data.code);
	  if(data.code == 1) {		
		let drName=$this.parents('.BaP_Doctor_Item').children('.BaP_Doctor_Item_Name').html(); 
	    let formAppointmentChange=formAppointment;
	    formAppointmentChange=formAppointmentChange.replace('{{drName}}',drName);
	    $("#BaP_PnlBookAnAppointment").html(formAppointmentChange);
	  } else {
		  alert ("Doctor is not available");
	  } 
      });
	
 });
 // add event for button BaP_Form_Book_Appointment_BtnClose 
  $(document).on("click","#BaP_Form_Book_Appointment_BtnClose", function()
 {	
	GeneralDocsForm();
 });  
 // add event to book
  $(document).on("click","#BaP_Form_Book_Appointment_BtnBook",function()
  {
	//let name=$('#BaP_Form_Book_Appointment_Left_Name').val();
	//let age=$('#BaP_Form_Book_Appointment_Left_Age').val();
	//let mobile=$('#BaP_Form_Book_Appointment_Left_Mobile').val();
	//let email=$('#BaP_Form_Book_Appointment_Left_Email').val();
	//let datetime=$('#BaP_Form_Book_Appointment_Bottom_DateTime').val();
	//alert("Book an appointment successful !"+name+":"+age+":"+mobile+":"+email+":"+datetime);
	bookAppointment();
	$("#BaP_PnlBookAnAppointment").html(btnHTMLConntent);
  });

};

$(document).on("focus","#BaP_Form_Book_Appointment_Bottom_DateTime", function()
{	
	$('#BaP_Form_Book_Appointment_Bottom_DateTime').datetimepicker();
});
//
var listeners = {};
BaP.listen = function(eventName, handler) {
	if (typeof listeners[eventName] === 'undefined') {
	listeners[eventName] = [];
	}
	listeners[eventName].push(handler);
};
//
BaP.unlisten = function(eventName, handler) {
	if (!listeners[eventName]) {
	return;
	}
	for (var i = 0; i < listeners[eventName].length; i++) {
	if (listeners[eventName][i] === handler) {
	listeners[eventName].splice(i, 1);
	break;
	}
	}
};
//
function broadcast(eventName) {
	if (!listeners[eventName]) {
	return;
	}
	for (var i = 0; i < listeners[eventName].length; i++) {
	listeners[eventName][i]();
	}
}

function initialJson() {
   var obj = new Object();
   var detail = new Object();
   detail.patient_name = $('#BaP_Form_Book_Appointment_Left_Name').val();
   detail.patient_age = $('#BaP_Form_Book_Appointment_Left_Age').val();
   detail.mobile_number = $('#BaP_Form_Book_Appointment_Left_Mobile').val();
   detail.email_id = $('#BaP_Form_Book_Appointment_Left_Email').val();
   detail.appointment_date = $('#BaP_Form_Book_Appointment_Bottom_DateTime').val();
   obj.hospital_access_key = 'hospital_access_key_A';
   obj.doctor_access_key  = 'doctor_access_key_A';
   obj.detail = detail;
   var jsonString= JSON.stringify(obj);
   console.log("jsonString " + jsonString);
   return jsonString;
}

function bookAppointment() {
	var URI = "book_appointment.json";
	var URI_FAIL = "book_appointment_fail.json";
	    $.ajax({
            type: 'post',
            url: URI,
            data: initialJson(),
            contentType: "application/json; charset=utf-8",
            traditional: true,
            success: function (data) {
			   console.log("Book Appointment successful " + data.code);
               alert (data.message);
            }
        });
}

})(this);