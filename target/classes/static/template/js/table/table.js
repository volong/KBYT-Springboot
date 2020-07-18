var person = {} || person;
let id;
person.intTable = function () {
    $("#table-datatables").DataTable({
        "scrollX": true,
        responsive: true,
        ajax: {
            url: url + 'json/table',
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

person.a = function () {
    person.get(document.getElementById('personId').value);
    person.symptom(document.getElementById('personId').value);
    person.contact(document.getElementById('personId').value);
    person.sick(document.getElementById('personId').value);

}
person.get = function (id) {
    $.ajax({
        url: url + 'json/person/' + id,
        method: 'GET',
        datatype: 'JSON',
        success: function (data) {
            $('#person').empty();
            if (data.khaiho === 1) {
                $('#person').append(
                    "<li><label>Được khai hộ (*)</label><hr></li>"
                )
            }
            $('#person').append(
                "<li><label> Họ và tên :</label> <a>" + data.fullName + "</a> <hr></li>" +
                "<li><label> Số CMND / Hộ  :</label> <a>" + data.passportNumber + "</a> <hr></li>" +
                "<li><label> Năm sinh :</label> <a> " + data.yob + "</a><hr></li>" +
                "<li><label> Giới tính :</label> <a>" + data.gender + "</a> <hr></li>" +
                "<li><label> Số điện thoại :</label> <a>" + data.phoneNumber + "</a> <hr></li>" +
                "<li><label> Email :</label> <a>" + data.email + "</a> <hr></li>" +
                "<li><label> Địa chỉ :</label> <a>" + data.street + ', ' + data.ward.ward + ', ' +
                data.district.district + ', ' + data.province.province + "</a> <hr></li>" +
                "<li><label>Hoạt động đáng chú ý trong vòng 14 ngày gần nhất:</label> <a>" + data.actIn14days + "</a> <hr></li>"

        )
        }
    })
}

person.symptom = function (id) {
    $.ajax({
        url: url + 'json/symptom/' + id,
        method: 'GET',
        datatype: 'JSON',
        success: function (data) {
            $('#symptom').empty();
            if (data.length === 0) {
                $('#symptom').append(
                "<li> Không có </li>"
                )
            } else {
                $.each(data, function (i, symptom) {
                    $('#symptom').append(
                    "<li>  • " + symptom.listSymptom.symptom + "</li>"

                )
                })
            }
        }
    })
}

person.contact = function (id) {
    $.ajax({
        url: url + 'json/contact/' + id,
        method: 'GET',
        datatype: 'JSON',
        success: function (data) {
            $('#contact').empty();
            if (data.length === 0) {
                $('#contact').append(
                    "<li> Không co  </li>"
                )
            } else {
                $.each(data, function (i, contact) {
                    $('#contact').append(
                    "<li>  • " +  contact.listContact.contact + "</li>"

                )
                })
            }
        }
    })
}

person.sick = function (id) {
    $.ajax({
        url: url + 'json/sick/' + id,
        method: 'GET',
        datatype: 'JSON',
        success: function (data) {
            $('#sick').empty();
            if (data.length === 0) {
                $('#sick').append(
                    "<li> Không có </li>"
                )
            } else {
                $.each(data, function (i, sick) {
                    $('#sick').append(
                    "<li>  • " +   sick.listSick.sick + "</li>"
                )
                })
            }
        }
    })
}

person.init = function () {
    person.intTable();
    person.a();
    person.get();
    person.symptom();
    person.contact();
    person.sick();
};

$(document).ready(function () {
    person.init();
});
