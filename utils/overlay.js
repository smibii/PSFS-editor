const overlaysDiv = document.getElementById('overlay-backdrop');
const overlaysContainerDiv = document.getElementById('overlay-container');

var options
var currentPage

class Overlay {
    /**
     * @param {object} options
     * @param {string} i | 0
     */
    constructor(_options, i) {

        i = i || 0;

        options = _options || options || [];
        currentPage = options[i] || new Error('Invalid options')

        let constructHTML = overlayTypes[0].constructor(currentPage)

        for (let content of currentPage.content) {
            if (typeof content._type !== 'string') throw new Error('Invalid content type')

            for (let overlayTypeData of overlayTypes) {
                if (overlayTypeData.name === '!') continue
                if (overlayTypeData.name === content._type) {
                    constructHTML += overlayTypeData.constructor(content)
                }
            }
        }

        loadOverlay(constructHTML)
    }
}

/**
 * @param {string} html Element
 * @alias Overlay load
 */
function loadOverlay(html) {
    overlaysContainerDiv.innerHTML = html;
    overlaysDiv.className = ''
}
/**
 * @alias Overlay exit
 */
function exitOverlay(e, id) {
    if (e && id) {
      console.log(e)
    } else {
      overlaysDiv.className = 'hidden'
    }
}

const overlayTypes = [
    {
        name: "!",
        
        /**
         * @param {object} page
         **/
        constructor: function (page) {
            return `
                <div class="overlay-title">
                    ${page.name.replace(/%n/g, '</br>')}
                </div>
            `
        }
    },
    {
        name: 'text',

        /**
         * @param {object} content
         **/
        constructor: function (content) {
            return `
                <div class="overlay-text">
                    ${content.content.replace(/%n/g, '</br>')}
                </div>
            `
        }
    },
    {
        name: 'confirm',

        /**
         * @param {function | string} content
         **/
        constructor: function (content) {
            return `
                <div class="overlay-confirm">
                    <button class="overlay-btn overlay-denie-btn" onclick="${content.onDenie}">No</button>
                    <button class="overlay-btn overlay-confirm-btn" onclick="${content.onConfirm}">Yes</button>
                </div>
            `
        }
    },
    {
        name: 'button',

        /**
         * @param {function | string} content
         **/
        constructor: function (content) {
            return `
                <button class="overlay-btn" onclick="${content.onClick}">${content.name}</button>
            `
        }
    }
]