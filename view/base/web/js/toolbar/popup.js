define([
    'jquery',
    'domReady!'
], function ($) {
    'use strict';

    document.head.appendChild(document.createElement('style')).innerHTML = `
        .modal-mgt-toolbar-popup {
            --mgt-toolbar-popup-modal-gap: 20px;
            .breeze-theme & {
                --mgt-toolbar-popup-modal-gap: 0px;
            }

            z-index: 999999;

            .modal-inner-wrap {
                left: 0 !important;
                margin: var(--mgt-toolbar-popup-modal-gap) auto !important;
                width: calc(100% - var(--mgt-toolbar-popup-modal-gap) * 2) !important;
                height: calc(100% - var(--mgt-toolbar-popup-modal-gap) * 2) !important;
                max-width: 1600px !important;
                max-height: none !important;
            }

            .modal-content {
                flex-grow: 1;
            }

            iframe {
                border: 0;
                width: 100%;
                height: 100%;
            }
        }
    `;

    function openModal(content) {
        var iframe = $('<iframe></iframe>');

        iframe.modal({
            modalClass: 'modal-mgt-toolbar-popup',
            autoOpen: true,
            buttons: []
        });

        const iframeDocument = iframe[0].contentDocument;

        // do not use "srcdoc" or "src" for working anchor links
        iframeDocument.open();
        iframeDocument.write(content);
        iframeDocument.close();

        setTimeout(function(){
            $(iframeDocument).find('#mgt-developer-toolbar').hide();
        }, 1000);

        // const interval = setInterval(() => {
        //     const toolbar = $(iframeDocument).find('#mgt-developer-toolbar');
        //     if (toolbar.length > 0) {
        //         toolbar.hide();
        //         clearInterval(interval);
        //     }
        // }, 200);
    }

    $('.mgt-toolbar-popup').off('click').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        $.ajax({
            url: $(e.currentTarget).attr('href'),
            type: 'GET',
            success: (data) => {
                // debugger;
                openModal(data);

            }
        });

        return false;
    });
});
