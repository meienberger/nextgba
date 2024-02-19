export const playerTemplate = `
<html>

<body>
  <div
    style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; overflow: hidden;">
    <div id="game"></div>
  </div>
  <script>
    EJS_defaultOptions = {
      'save-state-location': 'keep in browser'
    };

    EJS_player = "#game";
    EJS_core = "gba";
    EJS_gameName = "{{ gameName }}";
    EJS_color = "#0064ff";
    EJS_startOnLoaded = true;
    EJS_pathtodata = "https://cdn.emulatorjs.org/stable/data/";
    EJS_gameUrl = "games/{{ gameName }}.gba";
    EJS_loadStateURL = "games/{{ gameName }}.state";
    EJS_onSaveState = function(e) {window.parent.postMessage({type: "SAVE_STATE", payload: e}, "*")};
  </script>
  <script src="https://cdn.emulatorjs.org/stable/data/loader.js"></script>
</body>

</html>
`;
