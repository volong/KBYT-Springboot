

let chart = {} || chart

let arraySymptom1 = [];
let arraySymptom2 = [];
let arraySymptom3 = [];

let arrayContact1 = [];
let arrayContact2 = [];
let arrayContact3 = [];

let arrayPerson1 = [];
let arrayPerson2 = [];

let symptom = null;
let person = null;
let contact = null;
let datePerson;
let symptomId = null;
let contactId = null;
let start;
let end;
let checkSymptom;
let checkPerson;
let checkContact;


let startDate = new Date(new Date() - 86400000 * 14);
let endDate = new Date();
let start1 = startDate.getFullYear() + '-' + ((startDate.getMonth() > 8) ? (startDate.getMonth() + 1) : ('0' + (startDate.getMonth() + 1))) + '-' + ((startDate.getDate() > 9) ? startDate.getDate() : ('0' + startDate.getDate()));
let end1 = endDate.getFullYear() + '-' + ((endDate.getMonth() > 8) ? (endDate.getMonth() + 1) : ('0' + (endDate.getMonth() + 1))) + '-' + ((endDate.getDate() > 9) ? endDate.getDate() : ('0' + endDate.getDate()));
document.getElementById("endDate").value = end1 + "";
document.getElementById("startDate").value = start1 + "";


chart.getDate = function() {
    start = $("#startDate").val();
    end = $("#endDate").val();
}


chart.symptom = function () {
    if (symptom != null) {
        symptom.destroy();
    }

    $.ajax({
        url: url +'json/countsymptom/' + start + '/' + end,
        method: 'GET',
        datatype: 'JSON',
        success: function (data) {
            arraySymptom1 = [];
            arraySymptom2 = [];
            arraySymptom3 = [];
            $.each(data, function (i, symptom) {
                arraySymptom1.push(symptom.listSymptom);
                arraySymptom2.push(symptom.count);
                arraySymptom3.push(symptom.symptomId);
            })
            var ctx = document.getElementById('symptom').getContext('2d');
            symptom = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: arraySymptom1,
                    datasets: [{
                        label: 'số người có triệu chứng',
                        data: arraySymptom2,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    },
                    onClick:function(e) {
                        var activePoints = symptom.getElementsAtEvent(e);
                        var selectedIndex = activePoints[0]._index;
                        symptomId = arraySymptom3[selectedIndex]

                        var hidSymptom = document.getElementById("tableSymptom");
                        hidSymptom.style.display = "block";
                        var hidContact = document.getElementById("tableContact");
                        hidContact.style.display = "none";
                        var hidPerson = document.getElementById("tablePerson");
                        hidPerson.style.display = "none";

                        if(checkSymptom === 1) {
                            var table = $('#table-symptom').DataTable();
                            table.destroy();
                        }
                        chart.tableSymptom();
                        document.getElementById('table-symptom').scrollIntoView();
                        // window.location="https://kbyt.herokuapp.com/admin/symptomtable/" + start + '/' + end + '/' + symptomId;
                    }
                }
            });
        }
    })
}

chart.contact = function () {
    if (contact != null) {
        contact.destroy();
    }

    $.ajax({
        url: url + 'json/countcontact/' + start + '/' + end,
        method: 'GET',
        datatype: 'JSON',
        success: function (data) {
            arrayContact1 = [];
            arrayContact2 = [];
            arrayContact3 = [];
            $.each(data, function (i, contact) {
                arrayContact1.push(contact.listContact);
                arrayContact2.push(contact.count);
                arrayContact3.push(contact.contactId);
            })
            var ctx = document.getElementById('contact').getContext('2d');
            contact = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: arrayContact1,
                    datasets: [{
                        label: 'Biểu đồ về tiếp xúc ',
                        data: arrayContact2,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    },
                    onClick:function(e) {
                        var activePoints = contact.getElementsAtEvent(e);
                        var selectedIndex = activePoints[0]._index;
                        contactId = arrayContact3[selectedIndex];

                        var hidSymptom = document.getElementById("tableSymptom");
                        hidSymptom.style.display = "none";
                        var hidContact = document.getElementById("tableContact");
                        hidContact.style.display = "block";
                        var hidPerson = document.getElementById("tablePerson");
                        hidPerson.style.display = "none";

                        if(checkContact === 1) {
                            var table = $('#table-contact').DataTable();
                            table.destroy();
                        }
                        chart.tableContact();
                        document.getElementById('table-contact').scrollIntoView();
                    }
                }
            });
        }
    })
}




chart.person = function () {
    if (person != null) {
        person.destroy();
    }

    $.ajax({
        url: url + 'json/countperson/' + start + '/' + end,
        method: 'GET',
        datatype: 'JSON',
        success: function (data) {
            arrayPerson1 = [];
            arrayPerson2 = [];
            $.each(data, function (i, person) {
                arrayPerson1.push(person.date);
                arrayPerson2.push(person.count);
            })
            var ctx = document.getElementById('person').getContext('2d');
            person = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: arrayPerson1,
                    datasets: [{
                        label: 'số người khai báo trong ngày',
                        data: arrayPerson2,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    },
                    onClick:function(e) {
                        var activePoints = person.getElementsAtEvent(e);
                        var selectedIndex = activePoints[0]._index;
                        datePerson = this.data.labels[selectedIndex];
                        var hidSymptom = document.getElementById("tableSymptom");
                        hidSymptom.style.display = "none";
                        var hidContact = document.getElementById("tableContact");
                        hidContact.style.display = "none";
                        var hidPerson = document.getElementById("tablePerson");
                        hidPerson.style.display = "block";


                        if(checkPerson === 1) {
                            var table = $('#table-person').DataTable();
                            table.destroy();
                        }
                        chart.tablePerson();
                        document.getElementById('table-person').scrollIntoView();
                    }
                }
            });
        }
    })
}



chart.tableSymptom = function () {
    checkSymptom = 1;
    $("#table-symptom").DataTable({

        retrieve: true,
        ajax: {
            url: url +'json/symptomtable/' + start + "/" + end + "/" + symptomId,
            method: "GET",
            datatype: "json",
            dataSrc: "",
        },
        columns: [
            {
                data: 'id_person', "visible": false, "render": function (data, type, row, meta) {
                    id = data;
                    return null;
                }
            },
            {
                data: "fullName", name: "fullName", title: "HỌ TÊN", "render": function (data, type, row, meta) {
                    if (type === 'display') {
                        data = '<a href="personal/' + id + '">' + data + '</a>';
                    }
                    return data;
                }
            },
            {data: "passportNumber", name: "passportNumber", title: "SỐ CMND / HỘ KHẨU"},
            {data: "yob", name: "yob", title: "NĂM SINH"},
            {data: "gender", name: "gender", title: "GIỚI TÍNH"},
            {data: "province.province", name: "Province", title: "TỈNH THÀNH"},
            {data: "district.district", name: "District", title: "QUẬN/HUYỆN"},
            {data: "ward.ward", name: "Ward", title: "XÃ / PHƯỜNG"},
            {data: "date", name: "Date", title: "NGÀY KHAI BÁO",'render': function(data){
                    date= new Date(data);
                    return  ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate()))+'/'+((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1)))+'/'+date.getFullYear();
                }},
        ]
    })
}



chart.tableContact = function () {
    checkContact = 1;
    $("#table-contact").DataTable({
        retrieve: true,
        ajax: {
            url: url + 'json/contacttable/' + start + "/" + end + "/" + contactId,
            method: "GET",
            datatype: "json",
            dataSrc: "",
        },
        columns: [
            {
                data: 'id_person', "visible": false, "render": function (data, type, row, meta) {
                    id = data;
                    return null;
                }
            },
            {
                data: "fullName", name: "fullName", title: "HỌ TÊN", "render": function (data, type, row, meta) {
                    if (type === 'display') {
                        data = '<a href="personal/' + id + '">' + data + '</a>';
                    }
                    return data;
                }
            },
            {data: "passportNumber", name: "passportNumber", title: "SỐ CMND / HỘ KHẨU"},
            {data: "yob", name: "yob", title: "NĂM SINH"},
            {data: "gender", name: "gender", title: "GIỚI TÍNH"},
            {data: "province.province", name: "Province", title: "TỈNH THÀNH"},
            {data: "district.district", name: "District", title: "QUẬN/HUYỆN"},
            {data: "ward.ward", name: "Ward", title: "XÃ / PHƯỜNG"},
            {data: "date", name: "Date", title: "NGÀY KHAI BÁO",'render': function(data){
                    date= new Date(data);
                    return  ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate()))+'/'+((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1)))+'/'+date.getFullYear();
                }},
        ]
    })
}



let id;

chart.tablePerson = function () {
    checkPerson = 1;
    $("#table-person").DataTable({
        retrieve: true,
        ajax: {
            url: url + 'json/personchart/' + datePerson,
            method: "GET",
            datatype: "json",
            dataSrc: "",
        },
        columns: [
            {
                data: 'id_person', "visible": false, "render": function (data, type, row, meta) {
                    id = data;
                    return null;
                }
            },
            {
                data: "fullName", name: "fullName", title: "HỌ TÊN", "render": function (data, type, row, meta) {
                    if (type === 'display') {
                        data = '<a href="personal/' + id + '">' + data + '</a>';
                    }
                    return data;
                }
            },
            {data: "passportNumber", name: "passportNumber", title: "SỐ CMND / HỘ KHẨU"},
            {data: "yob", name: "yob", title: "NĂM SINH"},
            {data: "gender", name: "gender", title: "GIỚI TÍNH"},
            {data: "province.province", name: "Province", title: "TỈNH THÀNH"},
            {data: "district.district", name: "District", title: "QUẬN/HUYỆN"},
            {data: "ward.ward", name: "Ward", title: "XÃ / PHƯỜNG"},
            {data: "date", name: "Date", title: "NGÀY KHAI BÁO",'render': function(data){
                    date= new Date(data);
                    return  ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate()))+'/'+((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1)))+'/'+date.getFullYear();
                }},
        ]
    })
}


$(document).ready(function () {
    chart.init();
})





