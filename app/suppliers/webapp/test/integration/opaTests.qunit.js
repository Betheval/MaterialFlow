sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'suppliers/test/integration/FirstJourney',
		'suppliers/test/integration/pages/SuppliersList',
		'suppliers/test/integration/pages/SuppliersObjectPage'
    ],
    function(JourneyRunner, opaJourney, SuppliersList, SuppliersObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('suppliers') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheSuppliersList: SuppliersList,
					onTheSuppliersObjectPage: SuppliersObjectPage
                }
            },
            opaJourney.run
        );
    }
);