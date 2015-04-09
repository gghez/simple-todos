// Define a helper to check if the current user is the task owner
Template.task.helpers({
    isOwner: function () {
        return this.owner === Meteor.userId();
    }
});

// In the client code, below everything else
Template.task.events({
    "click .toggle-checked": function () {
        Meteor.call('setChecked', this._id, !this.checked);
    },
    "click .delete": function () {
        Meteor.call('deleteTask', this._id);
    },
    // Add an event for the new button to Template.task.events
    "click .toggle-private": function () {
        Meteor.call("setPrivate", this._id, !this.private);
    }
});

