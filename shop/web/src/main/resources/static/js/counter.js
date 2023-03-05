jQuery(($) => {

    // Уменьшаем на 1
    $(document).on("click", ".input-number-minus", function () {
        let total = $(this).next();
        if (total.val() > 0) {
            total.val(+total.val() - 1);
        }
    });

    // Увеличиваем на 1
    $(document).on("click", ".input-number-plus", function () {
        let total = $(this).prev();
        total.val(+total.val() + 1);
    });

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