define([
    'backbone',
    'text!tmpl/common/footer.html'
], function(Backbone, footerTemplate) {
    return Backbone.View.extend({
        'events': {
            'click .more': 'more'
        },
        'initialize': function() {
            this.setElement('#footer');
            this.render();
        },
        'render': function() {
            this.$el.html(footerTemplate);
            this.initLightBoxGoogleMaps();
            this.initToolTip();
        },
        'initLightBoxGoogleMaps': function() {},
        'initToolTip': function() {
            // Tooltip
            $('[data-toggle="tooltip"]').tooltip();

            // Popover on click
            $('[data-toggle="popover"]').popover({
                html: true,
                placement: 'top' // Popover Position (top, right, bottom, left)
            });

            // Popover on hover
            $('[data-toggle="popover-hover"]').popover({
                html: true,
                placement: 'top',
                trigger: 'hover' // Popover Position (top, right, bottom, left)
            });
        },
        'more': function() {
             $('html,body').animate({scrollTop: 0}, 800);
        }
    });
});