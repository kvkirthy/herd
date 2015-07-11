function alertService(dialog){
    this.alertUser = function(message){
        var basicError = dialog
            .alert()
            .title("Oh! Sorry")
            .content(message)
            .ok("Okay")
        dialog.show(basicError);
    };
}

alertService.$inject = ["$mdDialog"];