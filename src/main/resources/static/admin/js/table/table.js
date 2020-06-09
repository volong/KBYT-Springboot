var person = {} || person;
let id;
person.intTable = function () {
    $("#table-datatables").DataTable({
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
                    " <li class='col-sm-12'><span> (*) Được khai hộ</span></lic"
                )
            }
            $('#person').append(
                " <li class='col-sm-6 person'><span>Họ và tên: </span>" + data.fullName + "</li>" +
                " <li class='col-sm-6 person'><span>Số CMND: </span>" + data.passportNumber + "</li>" +
                " <li class='col-sm-6 person'><span>Giới tính: </span>" + data.gender + "</li>" +
                " <li class='col-sm-6 person'><span>Năm sinh: </span> " + data.yob + "</li>\n" +
                " <li class='col-sm-6 person'><span>Số điện thoại: </span>" + data.phoneNumber + "</li>" +
                " <li class='col-sm-6 person'><span>E-mail: </span>" + data.email + "</li>" +
                " <li class='col-sm-12 person' ><span>Địa chỉ: </span>" + data.street + ', ' + data.ward.ward + ', ' +
                data.district.district + ', ' + data.province.province + "</li>"
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
                    " <li><span> </span> Không có</li>"
                )
            } else {
                $.each(data, function (i, symptom) {
                    $('#symptom').append(
                        " <li> <span> </span> • " + symptom.listSymptom.symptom + "</li>"
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
                    " <li><span> </span> Không có</li>"
                )
            } else {
                $.each(data, function (i, contact) {
                    $('#contact').append(
                        " <li><span> </span> • " + contact.listContact.contact + "</li>"
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
                    " <li><span> </span> Không có</li>"
                )
            } else {
                $.each(data, function (i, sick) {
                    $('#sick').append(
                        " <li><span> </span> • " + sick.listSick.sick + "</li>"
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
