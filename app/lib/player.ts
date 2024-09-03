export const playerTemplate = `
<html>
<head>
<style>
body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
}
</style>

<body>
  <div style="width: 100%; height: 100%; max-width: 100%;">
    <div id="game"></div>
  </div>
  <script>
    EJS_defaultOptions = {
      'save-state-location': 'keep in browser'
    };

    EJS_Buttons = {
      loadState: true,
      cheat: false,
      screenshot: false,
      cacheManager: false,
      quickSave: false,
      quickLoad: false,
    }

    EJS_player = "#game";
    EJS_core = "mgba";
    EJS_gameName = "{{ gameName }}";
    EJS_color = "#0064ff";
    EJS_startOnLoaded = true;
    EJS_pathtodata = "https://cdn.emulatorjs.org/stable/data/";
    EJS_gameUrl = "/api/rom?gameId={{ gameId }}&console={{ console }}";

    {{#if saveState}}
    EJS_loadStateURL = "/api/save/file?gameId={{ gameId }}&saveId={{ saveState }}";
    {{/if}}

    EJS_onSaveState = function(e) {window.parent.postMessage({type: "SAVE_STATE", payload: e}, "*")};

  </script>
  <script src="https://cdn.emulatorjs.org/stable/data/loader.js"></script>
  <script>
    window.addEventListener('message', async function(event) {
      if (event.data.type === 'AUTO_SAVE_STATE') {
        const gameManager = window.EJS_emulator.gameManager;

        const state = gameManager.getState();
        const screenshot = await gameManager.screenshot();

        window.parent.postMessage({ type: 'AUTO_SAVE_STATE', payload: { state, screenshot } }, '*');
      }
    });
  </script>
</body>

</html>
`;
