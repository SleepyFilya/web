jQuery(($) => {

    // Уменьшаем на 1
    $(document).on("click", ".input-number-minus", function () {
        //Конкретно нажатая кнопка
        var $this = $(this);

        let total = $(this).next();
        var product_id = $(this).val().toString();
        var param = "?product_id=" + product_id + "&action=0";

        // sendAjax(param, "-");
        $.ajax({
            type: "POST",
            url: '/change_basket' + param,
            dataType: "text",
            success: function (result) {
                // $(".counter").text(result);
                let array = result.split(' ');
                $(".counter").text(array[0]);
                $("#total-price").text(array[1]);
                if (total.val() > 0)
                    total.val(+total.val() - 1);

                //Отключение видимости "-"
                if (total.val() == 0)
                    $this.attr('disabled', true);
            }
        });
    });

    // Увеличиваем на 1
    $(document).on("click", ".input-number-plus", function () {
        let total = $(this).prev();
        let minus = total.prev();
        var product_id = $(this).val().toString();
        var param = "?product_id=" + product_id + "&action=1";

        // sendAjax(param, "+");
        $.ajax({
            type: "POST",
            url: '/change_basket' + param,
            dataType: "text",
            success: function (result) {
                let array = result.split(' ');
                // $(".counter").text(result);
                console.log(array[0]);
                $(".counter").text(array[0]);
                $("#total-price").text(array[1]);

                total.val(+total.val() + 1);

                //Видимость "-"
                if(total.val()>0)
                    minus.attr('disabled', false);

            }
        });
    });

    // var sendAjax = function (param, action)
    // {
    //     $.ajax({type: "POST",
    //         url: '/add_to_basket' + param,
    //         dataType: "text",
    //         success: function (result) {
    //             $(".counter").text(result);
    //             if(action == "+")
    //                 total.val(+total.val() + 1);
    //             if(action == "-")
    //             {
    //                 if (total.val() > 0)
    //                     total.val(+total.val() - 1);
    //             }
    //         }
    //     });
    // }

    // Запрещаем ввод текста
    document.querySelectorAll('.input-number-input').forEach(function (el) {
        el.addEventListener('keydown', function (event) {
            // Разрешаем: backspace, delete, tab
            if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 ||
                // Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) ||
                // ← →
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                return;
            } else {
                // Только цифры
                if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                    event.preventDefault();
                }
            }

        });
    });
});
