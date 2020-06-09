var symptoms = {} || symptoms
symptoms.selectSymptom = function () {
    $.ajax({
        url: url + 'json/list/symptom',
        method: 'GET',
        datatype: 'JSON',
        success: function (data) {
            $('#symptom').empty();
            $.each(data, function (i, symptom) {
                $('#symptom').append(
                    ` <tr>
                            <td>${symptom.symptom}</td>
                            <td class="text-center">
                                <input type="checkbox" class="style-radio" value="${symptom.id_symptom}" name="symptom">
                            </td>
                        </tr>`
                )
            })
        }
    })
}

var contacts = {} || contacts
contacts.selectContact = function () {
    $.ajax({
        url: url + 'json/list/contact',
        method: 'GET',
        datatype: 'JSON',
        success: function (data) {
            $('#contact').empty();
            $.each(data, function (i, contact) {
                $('#contact').append(
                    ` <tr>
                            <td>${contact.contact}</td>
                             <td class="text-center">
                                <input type="checkbox"  value="${contact.id_contact}" name="contact">
                            </td>
                        </tr>`
                )
            })
        }
    })
}

var sicks = {} || sicks
sicks.selectSick = function () {
    $.ajax({
        url: url +'/json/list/sick',
        method: 'GET',
        datatype: 'JSON',
        success: function (data) {
            $('#sick').empty();
            $.each(data, function (i, sick) {
                $('#sick').append(
                    ` <tr>
                            <td>${sick.sick}</td>
                            <td class="text-center">
                                <input type="checkbox" class="style-radio" value="${sick.id_sick}" name="sick">
                            </td>
                        </tr>`
                )
            });
        }
    })
}
