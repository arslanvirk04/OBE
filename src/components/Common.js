// import $ from "jquery";


 export const BASE_URL ="http://localhost:4500"; // production
//  export var BaseUrlAPI = "http://localhost:8080/"; // staging


// export var RolesEnum = {
// 	Admin: 1,
// 	Student: 3,
// 	tech: 4,
// 	DistrictFieldSupervisor: 5,
// 	BHUUser: 6,
// 	RHCUser: 7,
// 	SRAdmin: 8,
// };


// export var genderEnum = {
// 	Male: 1,
// 	Female: 2,
// 	Other: 3,
// };

// export function encodeImgtoBase64(element, callback) {
// 	if ($("#" + element)[0].files && $("#" + element)[0].files[0]) {
// 		var FR = new FileReader();
// 		FR.addEventListener("load", (e) => {
// 			callback(e.target.result);
// 		});
// 		FR.readAsDataURL($("#" + element)[0].files[0]);
// 	} else {
// 		callback("");
// 	}
// }
// export function AddClassToMenueLink(linkId, IsChild = false, parentId = "") {
// 	$(".UserTopMenu").removeClass("ActiveUserOption");
// 	$(".mainlayoutlinks").removeClass("activemainlink");
// 	if (IsChild === false) {
// 		$("#" + linkId).addClass("activemainlink");
// 		$("#" + linkId + " > a > span.imageContainer > .basic_image").hide();
// 		$("#" + linkId + " > a > span.imageContainer > .active_image").show();
// 		// $("#"+linkId+" i").addClass("activemainlink")
// 	} else {
// 		$("#" + parentId).addClass("show");
// 		$("#" + linkId).addClass("activemainlink");
// 		$("#" + parentId + " > ul").addClass("show");
// 		$("#" + parentId + " > a > span.imageContainer > .basic_image").hide();
// 		$("#" + parentId + " > a > span.imageContainer > .active_image").show();
// 	}
// }
// export function ConvertToUtcDateTime(DateTimeObj) {
// 	const moment = require("moment-timezone");
// 	var tempDate = new Date(DateTimeObj);
// 	return moment(tempDate).utc().format("DD/MMM/YYYY HH:mm:ss ");
// }

// export function ConvertToUtcDateTimeNew(DateTimeObj) {
// 	const moment = require("moment-timezone");
// 	var tempDate = new Date(DateTimeObj);
// 	return moment(tempDate).format("DD/MMM/YYYY HH:mm:ss ");
// }
// export function getOnlyDate(dateObject) {
// 	// return timeZoneParameter
// 	var DateTemp = new Date(dateObject);
// 	var day = ("0" + DateTemp.getDate()).slice(-2);
// 	var month = ("0" + (DateTemp.getMonth() + 1)).slice(-2);
// 	return month + "/" + day + "/" + DateTemp.getFullYear();
// }

// export function ConvertToLocalDateTime(DateTimeObj) {
// 	if (DateTimeObj) {
// 		const moment = require("moment-timezone");
// 		var DateTimeMmoment = moment.utc(
// 			moment(DateTimeObj).format("DD/MMM/YYYY hh:mm:ss A")
// 		);
// 		DateTimeMmoment = DateTimeMmoment.local();
// 		return DateTimeMmoment.format("MMM DD, YYYY hh:mm A");
// 	}
// 	return "";
// }
// export function ToggleAccordian(e) {
// 	e.currentTarget.classList.toggle("active");
// 	var panel = e.currentTarget.nextElementSibling;
// 	if (panel.style.maxHeight) {
// 		panel.style.maxHeight = null;
// 	} else {
// 		panel.style.maxHeight = panel.scrollHeight + "px";
// 	}
// }
// export function parseJwt(token, ResponseFun) {
// 	var base64Url = token.split(".")[1];
// 	var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
// 	var jsonPayload = decodeURIComponent(
// 		atob(base64)
// 			.split("")
// 			.map(function (c) {
// 				return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
// 			})
// 			.join("")
// 	);

// 	ResponseFun(JSON.parse(jsonPayload));
// }
// export function GetUserPermissions(Permissions, ScreenName, Call_back) {
// 	var lst = [];
// 	for (var i = 0; i < Permissions.length; i++) {
// 		var array = Permissions[i].permissionName.split("-");
// 		if (array[0] === ScreenName) {
// 			lst.push(array[1]);
// 		}
// 	}
// 	Call_back(lst);
// }
// export function GetId() {
// 	var URL = window.location.href;
// 	// var URL = $(location).attr("href");
// 	var URL_ARRAY = URL.split("/");
// 	var Id = parseInt(URL_ARRAY[URL_ARRAY.length - 1]);

// 	return isNaN(Id) ? 0 : Id;
// }
// export function isEmptyUndef(str) {
// 	return !str || 0 === str.length;
// }
// export function getAge(date) {
// 	var now = new Date();
// 	var today = new Date(now.getYear(), now.getMonth(), now.getDate());

// 	var yearNow = now.getYear();
// 	var monthNow = now.getMonth();
// 	var dateNow = now.getDate();

// 	var dob = new Date(date);
// 	var yearDob = dob.getYear();
// 	var monthDob = dob.getMonth();
// 	var dateDob = dob.getDate();
// 	var age = {};
// 	var ageString = "";
// 	var yearString = "";
// 	var monthString = "";
// 	var dayString = "";

// 	var yearAge = yearNow - yearDob;

// 	if (monthNow >= monthDob) var monthAge = monthNow - monthDob;
// 	else {
// 		yearAge--;
// 		var monthAge = 12 + monthNow - monthDob;
// 	}

// 	if (dateNow >= dateDob) var dateAge = dateNow - dateDob;
// 	else {
// 		monthAge--;
// 		var dateAge = 31 + dateNow - dateDob;

// 		if (monthAge < 0) {
// 			monthAge = 11;
// 			yearAge--;
// 		}
// 	}

// 	age = {
// 		years: yearAge,
// 		months: monthAge,
// 		days: dateAge,
// 	};

// 	if (age.years > 1) yearString = " years";
// 	else yearString = " year";
// 	if (age.months > 1) monthString = " months";
// 	else monthString = " month";
// 	if (age.days > 1) dayString = " days";
// 	else dayString = " day";

// 	if (age.years > 0 && age.months > 0 && age.days > 0)
// 		ageString =
// 			age.years +
// 			yearString +
// 			", " +
// 			age.months +
// 			monthString +
// 			" and " +
// 			age.days +
// 			dayString +
// 			" old";
// 	else if (age.years === 0 && age.months === 0 && age.days > 0)
// 		ageString = age.days + dayString + " old";
// 	else if (age.years > 0 && age.months === 0 && age.days === 0)
// 		ageString = age.years + yearString + " old";
// 	else if (age.years > 0 && age.months > 0 && age.days === 0)
// 		ageString =
// 			age.years + yearString + " and " + age.months + monthString + " old";
// 	else if (age.years === 0 && age.months > 0 && age.days > 0)
// 		ageString =
// 			age.months + monthString + " and " + age.days + dayString + " old";
// 	else if (age.years > 0 && age.months === 0 && age.days > 0)
// 		ageString =
// 			age.years + yearString + " and " + age.days + dayString + " old";
// 	else if (age.years === 0 && age.months > 0 && age.days === 0)
// 		ageString = age.months + monthString + " old";
// 	else ageString = "Oops! Could not calculate age!";

// 	// return ageString ;

// 	var CategoyRange = "";
// 	if (age.years === 0 || (age.years > 0 && age.years <= 5))
// 		CategoyRange = "0-5";
// 	else if (age.years >= 6 && age.years <= 12) CategoyRange = "6-12";
// 	else if (age.years >= 13 && age.years <= 17) CategoyRange = "13-17";
// 	else if (age.years >= 18) CategoyRange = "Above 18";

// 	return { Age: ageString, AgeCategory: CategoyRange };
// }
// export function ProcessDataInArray(lst, fieldName = "id") {
// 	var tempLst = [];
// 	for (var i in lst) {
// 		tempLst[lst[i][fieldName]] = lst[i];
// 	}
// 	return tempLst;
// }
// export function paginate(array, page_size, page_number) {
// 	return array.slice((page_number - 1) , page_number );
// }
// export function convertToCommaString(array, AttributeName) {
// 	var temp = "";
// 	for (var i = 0; i < array.length; i++) {
// 		temp += "," + array[i][AttributeName];
// 	}
// 	return temp.substr(1);
// }
// export function Print(ContainerId) {

// 	var newWin = window.open(
// 		"",
// 		"Print Page",
// 		"width=" + 800 + ", height=" + 2000 + ""
// 	);
// 	newWin.document.write($("#" + ContainerId).html());
// 	newWin.document.close();
// 	setTimeout(function () {
// 		newWin.print();
// 		newWin.close();
// 	}, 250);
// 	//}
// }
// export const APILinks = {
// 	Login: BaseUrlAPI + "api/auth/login",
// 	ValidateSignUp: BaseUrlAPI + "api/auth/signup",
	
// };
// export function Ajax(
// 	Token,
// 	type,
// 	isFormData,
// 	url,
// 	parameter,
// 	success_callback,
// 	error_callback
// ) {
// 	$.ajax({
// 		type: type,
// 		url: url,
// 		headers: { Authorization: "Bearer " + Token },
// 		async: true,
// 		data: parameter,
// 		contentType: isFormData ? false : "application/json",
// 		processData: !isFormData,
// 		success: (resp) => {
// 			if (success_callback && typeof success_callback === "function")
// 				success_callback(resp);
// 		},
// 		error: (error) => {
// 			// if (error_callback && typeof error_callback === "function")
// 			// error_callback(error);
// 		},
// 	});
// }

// export function makecurrencyformate(e) {
// 	var a = $("#" + e)
// 		.val()
// 		.toString()
// 		.replace(/,/g, "")
// 		.trim();
// 	$("#" + e).val(a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
// }
// export function TryParseFloat(str, defaultValue) {
// 	var retValue = defaultValue === undefined ? 0 : defaultValue;
// 	if (str != null) str = str.toString().replace(/,/g, "").trim();
// 	if (isNaN(parseFloat(str)) === false) {
// 		retValue = parseFloat(str);
// 	}
// 	return retValue;
// }
// export function TryParseInt(str, defaultValue) {
// 	var retValue = defaultValue === undefined ? 0 : defaultValue;
// 	if (str != null) str = str.toString().replace(/,/g, "").trim();
// 	if (isNaN(parseFloat(str)) === false) {
// 		retValue = parseInt(str);
// 	}
// 	return retValue;
// }
// export function handlCustomeSimpleTabClick(e) {
// 	$(".Custome_simpleTabs_list li a").removeClass("active");
// 	$(".Custome_simpleTabs_list li a").removeClass("show");
// 	$(e.currentTarget).children().addClass("active show");
// }
// export function ConvertToCommaSplitArray(list, fieldId) {
// 	var temp = [];
// 	for (var i in list) {
// 		temp.push(list[i][fieldId]);
// 	}
// 	return temp;
// }
// export function GetIdsLabelString(
// 	listString,
// 	ProcessedArr,
// 	NameField = "name"
// ) {
// 	let IdList = listString.split(",");
// 	IdList.shift();
// 	IdList.pop();
// 	let NameString = "";
// 	for (var i = 0; i < IdList.length; i++) {
// 		if (ProcessedArr[IdList[i]] !== undefined)
// 			NameString =
// 				NameString === ""
// 					? ProcessedArr[IdList[i]][NameField]
// 					: NameString + "," + ProcessedArr[IdList[i]][NameField];
// 	}
// 	let NamesList = NameString.split(",");
// 	if (NamesList.length > 2) {
// 		NameString =
// 			NamesList[0] + "," + NamesList[1] + " ... +" + (NamesList.length - 2);
// 	}

// 	return NameString;
// }
// export function compare(a, b) {
// 	if (a.name < b.name) {
// 		return -1;
// 	}
// 	if (a.name > b.name) {
// 		return 1;
// 	}
// 	return 0;
// }

// export function GetIdsCompleteLabelString(
// 	listString,
// 	ProcessedArr,
// 	NameField = "name"
// ) {
// 	let IdList = listString.split(",");
// 	IdList.shift();
// 	IdList.pop();
// 	let NameString = "";
// 	for (var i = 0; i < IdList.length; i++) {
// 		if (ProcessedArr[IdList[i]] !== undefined)
// 			NameString =
// 				NameString === ""
// 					? ProcessedArr[IdList[i]][NameField]
// 					: NameString + "," + ProcessedArr[IdList[i]][NameField];
// 	}
// 	return NameString;
// }
// // export function GetPastSubtractedDate(dateVal, days) {
// // 	var date = new Date(dateVal);
// // 	var last = new Date(date.getTime() - days  24  60  60  1000);
// // 	var day = last.getDate();
// // 	var month = last.getMonth() + 1;
// // 	var year = last.getFullYear();
// // 	return new Date(month + "/" + day + "/" + year);
// // }
// export function GetWeekDaysDate(d, day) {
// 	let arr = {
// 		Sunday: 0,
// 		Monday: 1,
// 		Tuesday: 2,
// 		Wednesday: 3,
// 		Thursday: 4,
// 		Friday: 5,
// 		Saturday: 6,
// 	};
// 	var curr = new Date(d); // get current date
// 	var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
// 	var last = first + arr[day]; // last day is the first day + 6
// 	var caldate = new Date(curr.setDate(last));
// 	return new Date(new Date(caldate).setHours(0, 0, 0, 0));
// }
// export function GetDateMonthViewDate(date) {
// 	const monthNames = [
// 		"January",
// 		"February",
// 		"March",
// 		"April",
// 		"May",
// 		"June",
// 		"July",
// 		"August",
// 		"September",
// 		"October",
// 		"November",
// 		"December",
// 	];
// 	var DateTemp = new Date(date);
// 	var day = ("0" + DateTemp.getDate()).slice(-2);
// 	var monthlabel = monthNames[DateTemp.getMonth()];
// 	return day + " " + monthlabel;
// }
// export function get24hrtime(time) {
// 	var time = time;
// 	var hours = Number(time.match(/^(\d+)/)[1]);
// 	var minutes = Number(time.match(/:(\d+)/)[1]);
// 	var AMPM = time.match(/\s(.*)$/)[1];
// 	if (AMPM === "PM" && hours < 12) hours = hours + 12;
// 	if (AMPM === "AM" && hours === 12) hours = hours - 12;
// 	var sHours = hours.toString();
// 	var sMinutes = minutes.toString();
// 	if (hours < 10) sHours = "0" + sHours;
// 	if (minutes < 10) sMinutes = "0" + sMinutes;
// 	return sHours + ":" + sMinutes;
// }

// export function get12hrTime(time) {
// 	// Check correct time format and split into components
// 	time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
// 		time,
// 	];

// 	if (time.length > 1) {
// 		// If time format correct
// 		time = time.slice(1); // Remove full string match value
// 		time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
// 		time[0] = +time[0] % 12 || 12; // Adjust hours
// 	}
// 	return time.join(""); // return adjusted time or original string
// }
