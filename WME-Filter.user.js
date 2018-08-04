// ==UserScript==
// @name           WMEBR Filter
// @namespace      https://www.bowlman.org
// @description    Filter the PURs results on the wmebr website to only show what we can handle
// @match          https://wmebr.info/ur/purs_on_state.php*
// @version        2018.08.04.02
// @author         tunisiano187 '2018
// @license        MIT/BSD/X11
// @compatible     chrome firefox
// @supportURL      mailto:incoming+WMEScripts/WME-language-forcer@incoming.gitlab.com
// @contributionURL http://ko-fi.com/tunisiano
// @grant          none
// ==/UserScript==

(function() {
    'use strict';

    var fullpath = "https://wmebr.info/ur/purs_on_state.php";

    if(window.location.hash == ("#reset-WMEBR-editor-level")) {
        localStorage.removeItem('WME-editor-level');
        alert("Level resetted");
        if('WMEBR-last-page' in localStorage) {
            fullpath = localStorage.getItem('WMEBR-last-page');
        }
        window.location.href = fullpath;
    }
    // Adding the link to the menu
    $("#navbar ul.navbar-nav").append('<li><a href="purs_on_state.php#reset-WMEBR-editor-level">Reset editor level</a></li>');

    // Getting the last query
    fullpath = window.location.pathname+window.location.search;
    localStorage.setItem('WMEBR-last-page',fullpath);

    var WMEeditorlevel=2;

    if('WME-editor-level' in localStorage && localStorage.getItem('WME-editor-level') !=='0') {
        WMEeditorlevel = localStorage.getItem('WME-editor-level');
    } else
    {
        WMEeditorlevel=prompt("What is your editor level ?", WMEeditorlevel);
        localStorage.setItem('WME-editor-level',parseInt(WMEeditorlevel));
    }
    $('#grid tr td:nth-child(4)').each(function() {
        var $Cell = $(this);
        if(parseInt($Cell.text())>WMEeditorlevel){
            $(this).parent().hide();
        }
    });
})();
