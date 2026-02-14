// ==UserScript==
// @name         Uzdevumi.lv Select Unlock
// @namespace    http://tampermonkey.net/
// @version      2026-02-14
// @description  Unlock text selection on uzdevumi.lv
// @author       brul1ka
// @match        https://*.uzdevumi.lv/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=uzdevumi.lv
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // intercept addEventListener before uzdevumi
    const origAdd = EventTarget.prototype.addEventListener;

    EventTarget.prototype.addEventListener = function(type, listener, options) {
        if (["copy","contextmenu","selectstart","mousedown","selectionchange"].includes(type)) {
            return; // blocking their protective handlers
        }
        return origAdd.call(this, type, listener, options);
    };

    // and additionally intercept an existing event
    document.addEventListener(
        "selectionchange",
        e => e.stopPropagation(),
        true
    );

})();
