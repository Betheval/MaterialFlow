sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'categories/test/integration/FirstJourney',
		'categories/test/integration/pages/CategoriesList',
		'categories/test/integration/pages/CategoriesObjectPage'
    ],
    function(JourneyRunner, opaJourney, CategoriesList, CategoriesObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('categories') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheCategoriesList: CategoriesList,
					onTheCategoriesObjectPage: CategoriesObjectPage
                }
            },
            opaJourney.run
        );
    }
);