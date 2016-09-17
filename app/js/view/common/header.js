define([
    'backbone',
    'text!tmpl/common/header.html'
], function(Backbone, headerTemplate) {
    return Backbone.View.extend({
        'isMobile': /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        'events': {
        },
        'initialize': function() {
            this.setElement('#header');
            this.render();
            this.bindDropdownEvents();
            this.$el.find('.navbar .collapse').collapse();
        },
        'render': function() {
            this.$el.html(headerTemplate);
            this.addCarets();
        },
        'bindDropdownEvents': function() {
            if (this.isMobile) {
                this.$el.find('.dropdown a').on('click', function() {
                    $(this).closest('.dropdown').toggleClass('show');
                });
            } else {
                this.$el.find('.dropdown a').hover(function() {
                    $(this).closest('.dropdown').toggleClass('show');
                });
            }
        },
        'addCarets': function() {
            this.$el.find('.dropdown').not('.header-search-form').find('> a').append('<i class="icon-angle-down"></i>');
            this.$el.find('.dropdown > a').prepend('<div class="nav-caret-square"><span></span></div>');
        }
    });
});