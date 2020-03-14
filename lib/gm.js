/**
 * This file is for auto completion and easier programming.
 * There is no actual working functionality (except maybe unsafeWindow).
 * This file will NOT be compiled into the build.
 *
 * Created on 13.03.2020
 */


/**
 * The unsafeWindow object provides full access to the pages javascript functions and variables.
 *
 * @type {Window}
 */
const unsafeWindow = window;

/**
 * Adds the given style to the document and returns the injected style element.
 *
 * @param css CSS style string
 */
function GM_addStyle(css) {
}

/**
 * Deletes 'name' from storage.
 *
 * @param name
 */
function GM_deleteValue(name) {
}

/**
 * List all names of the storage.
 */
function GM_listValues() {
}

/**
 * Adds a change listener to the storage and returns the listener ID.
 * The 'remote' argument of the callback function shows whether this value was modified from the instance of another
 * tab (true) or within this script instance (false). Therefore this functionality can be used by scripts of different
 * browser tabs to communicate with each other.
 *
 * @param name the name of the observed variable
 * @param listener callback function (name, old_value, new_value, remote)
 */
function GM_addValueChangeListener(name, listener) {
}

/**
 * Removes a change listener by its ID.
 * @param listener_id
 */
function GM_removeValueChangeListener(listener_id) {
}

/**
 * Set the value of 'name' to the storage.
 *
 * @param name
 * @param value
 */
function GM_setValue(name, value) {
}

/**
 * Get the value of 'name' from storage.
 *
 * @param name
 * @param defaultValue
 */
function GM_getValue(name, defaultValue) {
}

/**
 * Log a message to the console.
 *
 * @param message
 */
function GM_log(message) {
}

/**
 * Get the content of a predefined @resource tag at the script header.
 *
 * @param name
 */
function GM_getResourceText(name) {
}

/**
 * Get the base64 encoded URI of a predefined @resource tag at the script header.
 *
 * @param name
 */
function GM_getResourceURL(name) {
}

/**
 * Register a menu to be displayed at the Tampermonkey menu at pages where this script runs and returns a menu command
 * ID.
 *
 * @param name
 * @param fn
 * @param accessKey
 */
function GM_registerMenuCommand(name, fn, accessKey) {
}

/**
 * Unregister a menu command that was previously registered by GM_registerMenuCommand with the given menu command ID.
 *
 * @param menuCmdId
 */
function GM_unregisterMenuCommand(menuCmdId) {
}

/**
 * Open a new tab with this url. The options object can have the following properties:
 *
 * - active decides whether the new tab should be focused,
 * - insert that inserts the new tab after the current one,
 * - setParent makes the browser re-focus the current tab on close and
 * - incognito makes the tab being opened inside a incognito mode/private mode window.
 *
 * Otherwise the new tab is just appended. loadInBackground has the opposite meaning of active and was added to achieve
 * Greasemonkey 3.x compatibility. If neither active nor loadInBackground is given, then the tab will not be focused.
 * This function returns an object with the function close, the listener onclosed and a flag called closed.
 *
 * @param url
 * @param options_loadInBackground options object or loadInBackground
 */
function GM_openInTab(url, options_loadInBackground) {
}

/**
 * Make an xmlHttpRequest.
 * Property of details:
 * - method one of GET, HEAD, POST
 * - url the destination URL
 * - headers ie. user-agent, referer, ... (some special headers are not supported by Safari and Android browsers)
 * - data some string to send via a POST request
 * - cookie a cookie to be patched into the sent cookie set
 * - binary send the data string in binary mode
 * - timeout a timeout in ms
 * - context a property which will be added to the response object
 * - responseType one of arraybuffer, blob, json
 * - overrideMimeType a MIME type for the request
 * - anonymous don't send cookies with the requests (please see the fetch notes)
 * - fetch (beta) use a fetch instead of a xhr request
 * - (at Chrome this causes xhr.abort, details.timeout and xhr.onprogress to not work and makes xhr.onreadystatechange
 * receive only readyState 4 events)
 * - username a username for authentication
 * - password a password
 * - onabort callback to be executed if the request was aborted
 * - onerror callback to be executed if the request ended up with an error
 * - onloadstart callback to be executed if the request started to load
 * - onprogress callback to be executed if the request made some progress
 * - onreadystatechange callback to be executed if the request's ready state changed
 * - ontimeout callback to be executed if the request failed due to a timeout
 * - onload callback to be executed if the request was loaded.
 *   - It gets one argument with the following attributes:
 *   - finalUrl - the final URL after all redirects from where the data was loaded
 *   - readyState - the ready state
 *   - status - the request status
 *   - statusText - the request status text
 *   - responseHeaders - the request response headers
 *   - response - the response data as object if details.responseType was set
 *   - responseXML - the response data as XML document
 *   - responseText - the response data as plain string
 *
 * Returns an object with the following property:
 * - abort - function to be called to cancel this request
 *
 * Note: the synchronous flag at details is not supported
 * Important: if you want to use this method then please also check the documentation about @connect.
 *
 * @param details
 */
function GM_xmlhttpRequest(details) {
}

/**
 * Downloads a given URL to the local disk.
 *
 * details can have the following attributes:
 * - url - the URL from where the data should be downloaded (required)
 * - name - the filename - for security reasons the file extension needs to be whitelisted at Tampermonkey's options
 * page (required)
 * - headers - see GM_xmlhttpRequest for more details
 * - saveAs - boolean value, show a saveAs dialog
 * - onerror callback to be executed if this download ended up with an error
 * - onload callback to be executed if this download finished
 * - onprogress callback to be executed if this download made some progress
 * - ontimeout callback to be executed if this download failed due to a timeout
 *
 * The download argument of the onerror callback can have the following attributes:
 * - error - error reason
 *   - not_enabled - the download feature isn't enabled by the user
 *   - not_whitelisted - the requested file extension is not whitelisted
 *   - not_permitted - the user enabled the download feature, but did not give the downloads permission
 *   - not_supported - the download feature isn't supported by the browser/version
 *   - not_succeeded - the download wasn't started or failed, the details attribute may provide more information
 * - details - detail about that error
 *
 * Returns an object with the following property:
 * - abort - function to be called to cancel this download
 *
 * Depending on the download mode GM_info provides a property called downloadMode which is set to one of the following
 * values: native, disabled or browser.
 *
 * @param details_url details object or url
 * @param name mame if url is given (and not details object)
 */
function GM_download(details_url, name = null) {
}

/**
 * Get a object that is persistent as long as this tab is open.
 *
 * @param callback
 */
function GM_getTab(callback) {
}

/**
 * Save the tab object to reopen it after a page unload.
 *
 * @param tab
 */
function GM_saveTab(tab) {
}

/**
 * Get all tab objects as a hash to communicate with other script instances.
 *
 * @param callback
 */
function GM_getTabs(callback) {
}

/**
 * Shows a HTML5 Desktop notification and/or highlight the current tab.
 *
 * details can have the following attributes:
 * - text - the text of the notification (required unless highlight is set)
 * - title - the notificaton title
 * - image - the image
 * - highlight - a boolean flag whether to highlight the tab that sends the notfication (required unless text is set)
 * - silent - a boolean flag whether to not play a sound
 * - timeout - the time after that the notification will be hidden (0 = disabled)
 * - ondone - called when the notification is closed (no matter if this was triggered by a timeout or a click) or the
 * tab was highlighted
 * - onclick - called in case the user clicks the notification
 *
 * All parameters do exactly the same like their corresponding details property pendant.
 *
 * @param text_details text or details object
 * @param title_ondone title or ondone function
 * @param image image if not in details object
 * @param onclick onclick function if not in details object
 * @constructor
 */
function GM_notification(text_details, title_ondone, image = null, onclick = null) {
}

/**
 * Copies data into the clipboard. The parameter 'info' can be an object like "{ type: 'text', mimetype: 'text/plain'}"
 * or just a string expressing the type ("text" or "html").
 *
 * @param data
 * @param info
 */
function GM_setClipboard(data, info) {
}

/**
 * Get some info about the script and TM. The object might look like this:
 *
 * @type {string}
 */
const GM_info = '';