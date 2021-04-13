({
    closeCase : function(component, event, helper) {
        var flow=component.find('flowData');
        flow.startFlow("Close_case_flow");

    }
})