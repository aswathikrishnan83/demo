({
    doInit: function(component, event, helper) {
        component.set('v.columns', [
            { label: 'Library Name', fieldName: 'Name', type: 'text' },
            {label: 'View', type: 'button', initialWidth: 135, typeAttributes: { label: 'View Details', name: 'view_details', title: 'Click to View Details'}}

        ]);
        helper.getAccountData(component, event);

    }
})