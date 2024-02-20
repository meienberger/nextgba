export const playerTemplate = `
<html>

<body>
  <div id="game"></div>
  <script>
    EJS_defaultOptions = {
      'save-state-location': 'keep in browser'
    };

    EJS_Buttons = {
      loadState: false,
      cheat: false,
      screenshot: false,
      cacheManager: false,
      quickSave: false,
      quickLoad: false,
    }

    EJS_player = "#game";
    EJS_core = "gba";
    EJS_gameName = "{{ gameName }}";
    EJS_color = "#0064ff";
    EJS_startOnLoaded = true;
    EJS_pathtodata = "https://cdn.emulatorjs.org/stable/data/";
    EJS_gameUrl = "/games/{{ gameName }}/{{ gameName }}.gba";
    {{#if saveState}}
    EJS_loadStateURL = "/games/{{ gameName }}/saves/{{ saveState }}";
    {{/if}}

    EJS_onSaveState = function(e) {window.parent.postMessage({type: "SAVE_STATE", payload: e}, "*")};
  </script>
  <script src="https://cdn.emulatorjs.org/stable/data/loader.js"></script>
</body>

</html>
`;
