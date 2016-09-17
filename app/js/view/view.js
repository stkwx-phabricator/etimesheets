define([
    'backbone'
], function(Backbone) {
    Backbone.View.prototype.close = function() {
        this.undelegateEvents();
        this.off();
        this.stopListening();
        if (this.onClose) {
            this.onClose();
        }
    };
});