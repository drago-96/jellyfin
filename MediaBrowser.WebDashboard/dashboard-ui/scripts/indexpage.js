﻿(function ($, document, apiClient) {

    $(document).on('pagebeforeshow', "#indexPage", function () {

        var screenWidth = $(window).width();

        var page = this;

        $('.spotlightContainer', page).empty();

        var options = {

            SortBy: "SortName",
            Fields: "PrimaryImageAspectRatio"
        };

        ApiClient.getItems(Dashboard.getCurrentUserId(), options).done(function (result) {

            $('.myLibrary', page).html(LibraryBrowser.getPosterViewHtml({
                items: result.Items,
                shape: 'smallBackdrop',
                showTitle: true,
                centerText: true

            }));

        });

        options = {

            SortBy: "DatePlayed",
            SortOrder: "Descending",
            MediaTypes: "Video",
            Filters: "IsResumable",
            Limit: screenWidth >= 1920 ? 5 : (screenWidth >= 1440 ? 4 : 3),
            Recursive: true,
            Fields: "PrimaryImageAspectRatio",
            CollapseBoxSetItems: false,
            ExcludeLocationTypes: "Virtual"
        };

        ApiClient.getItems(Dashboard.getCurrentUserId(), options).done(function (result) {

            if (result.Items.length) {
                $('#resumableSection', page).show();
            } else {
                $('#resumableSection', page).hide();
            }

            $('#resumableItems', page).html(LibraryBrowser.getPosterViewHtml({
                items: result.Items,
                preferBackdrop: true,
                shape: 'backdrop',
                overlayText: screenWidth >= 600,
                showTitle: true,
                showParentTitle: true

            })).createPosterItemMenus();

        });

        options = {

            SortBy: "DateCreated",
            SortOrder: "Descending",
            Limit: screenWidth >= 2400 ? 30 : (screenWidth >= 1920 ? 20 : (screenWidth >= 1440 ? 12 : (screenWidth >= 800 ? 12 : 8))),
            Recursive: true,
            Fields: "PrimaryImageAspectRatio",
            Filters: "IsUnplayed,IsNotFolder",
            CollapseBoxSetItems: false,
            ExcludeLocationTypes: "Virtual,Remote"
        };

        ApiClient.getItems(Dashboard.getCurrentUserId(), options).done(function (result) {

            $('#recentlyAddedItems', page).html(LibraryBrowser.getPosterViewHtml({

                items: result.Items,
                preferThumb: true,
                shape: 'backdrop',
                showTitle: true,
                centerText: true

            })).createPosterItemMenus();
        });
    });

})(jQuery, document, ApiClient);