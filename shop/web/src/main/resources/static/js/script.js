$(document).ready(function () {
    checkCookie();

    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        document.getElementById('close').click();
        setCookieValue();
    }

    function getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function checkCookie() {
        let location = getCookie("location");
        if (location != "") {
            setCookieValue();
        } else {
            document.getElementById('btnLocation').click();
        }
    }

    function setCookieValue() {
        let location = getCookie("location");
        let el = document.getElementById('local');

        if (typeof el.textContent !== "undefined") {
            el.textContent = location;
        } else {
            el.innerText = location;
        }
    }

    $("#save").on("click", function (e) {
        e.preventDefault();
        let location = document.getElementById('city').value;
        setCookie("location", location, 365);

    });

    var sendAjax = function(sort) {
      var keyword = $('#keyword').val();
        $.ajax({url: "products?keyword=" + keyword + "&sort=" + sort})
            .done(function (data) {
                    var $content = $('table.table', $(data));
                    $('table.table').html($content);
            }
            );
    };

    $("#btnSortByUpperPrice").on("click", function (e) {
        e.preventDefault();
        sendAjax("SortByUpperPrice");

    });

    $("#btnSortByLowerPrice").on("click", function (e) {
        e.preventDefault();
        sendAjax("SortByLowerPrice");
    });

    $("#mySearch").on("click", function (e) {
        e.preventDefault();
        sendAjax("no");
    });
});