"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenericCom = void 0;

var _app = require("./app.js");

var _preferences = require("./preferences.js");

var _download_manager = require("./download_manager.js");

var _genericl10n = require("./genericl10n.js");

;
const GenericCom = {};
exports.GenericCom = GenericCom;

class GenericPreferences extends _preferences.BasePreferences {
  async _writeToStorage(prefObj) {
    localStorage.setItem("pdfjs.preferences", JSON.stringify(prefObj));
  }

  async _readFromStorage(prefObj) {
    return JSON.parse(localStorage.getItem("pdfjs.preferences"));
  }

}

class GenericExternalServices extends _app.DefaultExternalServices {
  static createDownloadManager(options) {
    return new _download_manager.DownloadManager(options);
  }

  static createPreferences() {
    return new GenericPreferences();
  }

  static createL10n({
    locale = "en-US"
  }) {
    return new _genericl10n.GenericL10n(locale);
  }

}

_app.PDFViewerApplication.externalServices = GenericExternalServices;