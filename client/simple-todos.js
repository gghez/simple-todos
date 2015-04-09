
// At the top of our client code
Meteor.subscribe("tasks");

// Replace the existing Template.body.helpers
Template.body.helpers({
    tasks: function () {
        if (Session.get("hideCompleted")) {
            // If hide completed is checked, filter tasks
            return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
        } else {
            // Otherwise, return all of the tasks
            return Tasks.find({}, {sort: {createdAt: -1}});
        }
    },
    hideCompleted: function () {
        return Session.get("hideCompleted");
    },
    // Add to Template.body.helpers
    incompleteCount: function () {
        return Tasks.find({checked: {$ne: true}}).count();
    }
});

// Inside the if (Meteor.isClient) block, right after Template.body.helpers:
Template.body.events({
    "submit .new-task": function (event) {
        // This function is called when the new task form is submitted

        var text = event.target.text.value;

        Meteor.call('addTask', text);

        // Clear form
        event.target.text.value = "";

        // Prevent default form submit
        return false;
    },
    "change .hide-completed input": function (event) {
        Session.set("hideCompleted", event.target.checked);
    }
});


Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});