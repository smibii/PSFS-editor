const preview = document.getElementById('preview');
const codeEditor = document.getElementById('codeEditor');
const lineCounter = document.getElementById('lineCounter');

if (!localStorage.getItem('saves')) localStorage.setItem('saves', btoa('[]'))

const saves = JSON.parse(atob(localStorage.getItem('saves'))) || [];
const opened_files = []
var selected_file = "infos"
var files =  []
  
const saveIndex = [0]

var debug

(function () {
  
  if (typeof saves !== "array") new Error("Saves must be an array")

    if (saves.length > 0) {

        const options = [
            {
                name: `Found saved files!`,

                content: [
                    {
                        _type: 'text',
                        content: 'You still have files saved in your local storage.%nDo you want to load them?'
                    },
                    {
                        _type: 'confirm',
                        onConfirm: 'new Overlay(options, 1)',
                        onDenie: 'exitOverlay()'
                    },
                    {
                        _type: 'button',
                        name: "Delete All Saves",
                        onClick: 'deleteAllSaveFiles()',
                    }
                ]
            },
            {
                name: `Saves [${saves.length}]`,

                content: [
                    {
                        _type: 'choice',
                        choices: saves
                    },
                    {
                        _type: 'confirm',
                        enabledIf: 'saveFilesContent',
                        onConfirm: '{loadSave(saveIndex[0]);exitOverlay();}',
                        onDenie: 'exitOverlay()'
                    },
                    {
                        _type: 'button',
                        name: "Delete Selected Saves",
                        onClick: 'deleteSelectedSavesFile(saveIndex[0])',
                    }
                ]
            }
        ]

        new Overlay(options)

    } else {

        exitOverlay()

    }

})()