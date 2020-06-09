var provinces = {} || provinces
provinces.selectProvince = function () {
    $.ajax({
        url: url + 'json/province',
        method: 'GET',
        datatype: 'JSON',
        success: function (data) {
            $('#province').empty();
            $('#province').append(
                `<option value="">--Chọn tỉnh thành--</option>`
            )
            $.each(data, function (i, province) {
                $('#province').append(
                    `<option value="${province.id_province}">${province.province}</option>`
                )
            })
        }
    })

    $("#province").change(function () {
            var provinceId = $('#province').val();
            $.ajax({
                url: url + 'json/district/' + provinceId,
                method: 'GET',
                datatype: 'JSON',
                success: function (data) {
                    $('#district').empty();
                    $('#district').append(
                        `<option value="">--Chọn Quận / Huyện--</option>`
                    )
                    $.each(data, function (i, district) {
                            $('#district').append(
                                `<option value="${district.id_district}">${district.district}</option>`
                            )
                    })
                }
            })

            $("#district").change(function () {
                    var districtId = $('#district').val();
                    $.ajax({
                            url: url + 'json/ward/'+districtId,
                            method: 'GET',
                            datatype: 'JSON',
                            success: function (data) {
                                $('#ward').empty();
                                $('#ward').append(
                                    `<option value="">--Chọn Phường / Xã--</option>`
                                )
                                debugger;
                                $.each(data, function (i, ward) {

                                        $('#ward').append(
                                            `<option value="${ward.id_ward}">${ward.ward}</option>`
                                        )

                                })
                            }
                        }
                    )
                }
            )
        }
    )
}
