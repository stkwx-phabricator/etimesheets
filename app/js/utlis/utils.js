define(['cookie'], function() {
    var cName = "app:Name",
            pCookie = (function() {
                return {
                    exist: function(cName) {
                        return $.cookie(cName) !== undefined ? true : false;
                    },
                    deleteCookie: function(cName) {
                        $.removeCookie(cName);
                    },
                    addCookie: function(params) {
                        $.cookie(params.name, params.value, params.expiration);
                    }
                };
            })();
    return{
        exist: function(cName) {
            return pCookie.exist(cName);
        },
        del: function(cName) {
            pCookie.deleteCookie(cName);
        },
        add: function(param) {
            pCookie.addCookie(param);
        }
    };
});