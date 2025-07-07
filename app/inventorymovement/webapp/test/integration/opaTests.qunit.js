sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'inventorymovement/test/integration/FirstJourney',
		'inventorymovement/test/integration/pages/InventoryMovementList',
		'inventorymovement/test/integration/pages/InventoryMovementObjectPage'
    ],
    function(JourneyRunner, opaJourney, InventoryMovementList, InventoryMovementObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('inventorymovement') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheInventoryMovementList: InventoryMovementList,
					onTheInventoryMovementObjectPage: InventoryMovementObjectPage
                }
            },
            opaJourney.run
        );
    }
);