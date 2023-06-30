document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  // Cordova is now initialized. Have fun!
  console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);
  document.getElementById("deviceready").classList.add("ready");

  function log(string) {
    const old_log = document.getElementById("log").innerHTML;
    document.getElementById("log").innerHTML = string + "\n" + old_log;
  }

  window.plugins.MikeyCarTrack.register(
    function (string) {
      try {
        const e = JSON.parse(string);
        switch (e.event) {
          case "register":
            window.plugins.toast.showShortBottom("Plugin Registered.");
            break;
          case "saveAuthKey":
            window.plugins.toast.showShortBottom("Auth Key Saved.");
            window.plugins.MikeyCarTrack.getAuthKey(function (string) {
              const e = JSON.parse(string);
              const authKey = JSON.parse(e.data).authKey;
              document.getElementById("authKey").value = authKey;
              log(string);
            });
            break;
          case "connect":
            window.plugins.toast.showShortBottom("Connected.");
            break;
          case "disconnect":
            window.plugins.toast.showShortBottom("Disconnected.");
            break;
          case "lock":
          case "unlock":
          case "unlockNoKey":
          case "headlight":
          case "horn":
            window.plugins.toast.showShortBottom(
              "Action Executed. " + `(${e.event})`
            );
            break;
          case "getLockState":
            window.plugins.toast.showShortBottom("Lock State Retrieved.");
            const lockState = JSON.parse(e.data).lockState;
            document.getElementById("lockState").innerHTML = lockState;
            break;
          case "getIgnitionState":
            window.plugins.toast.showShortBottom("Ignition State Retrieved.");
            const ignitionState = JSON.parse(e.data).ignitionState;
            document.getElementById("ignitionState").innerHTML = ignitionState;
            break;
          case "getVehicleStats":
            window.plugins.toast.showShortBottom("Vehicle Stats Retrieved.");
            document.getElementById("stats").innerHTML = e.data;
            break;
          case "signalUpdate":
            const strength = JSON.parse(e.data).strength;
            const rssi = JSON.parse(e.data).rssi;
            window.plugins.toast.showShortBottom(
              `Signal: ${strength} (${rssi} dBm)`
            );
            break;
          default:
            window.plugins.toast.showShortBottom(string);
        }
      } catch (e) {
        window.plugins.toast.showLongBottom(e.message);
      } finally {
        log(string);
      }
    },
    function (string) {
      log(string);
    }
  );

  document.getElementById("terminalBtn").addEventListener("click", function () {
    const terminalId = document.getElementById("terminalId").value;

    window.plugins.MikeyCarTrack.createTerminal(
      terminalId,
      function (string) {
        window.plugins.toast.showShortBottom("Terminal Created.");
        log(string);
      },
      function (string) {
        window.plugins.toast.showShortBottom("Terminal Creation Failed.");
        log(string);
      }
    );
  });

  document
    .getElementById("authKeySaveBtn")
    .addEventListener("click", function () {
      const authKey = document.getElementById("newAuthKey").value;
      window.plugins.MikeyCarTrack.saveAuthKey(
        authKey,
        function (string) {},
        function (string) {
          window.plugins.toast.showShortBottom("Auth Key Save Failed.");
          log(string);
        }
      );
    });

  document
    .getElementById("authKeyRemoveBtn")
    .addEventListener("click", function () {
      window.plugins.MikeyCarTrack.removeAuthKey(
        function (string) {
          document.getElementById("authKey").value = "";
        },
        function (string) {
          window.plugins.toast.showShortBottom("Auth Key Remove Failed.");
          log(string);
        }
      );
    });

  document.getElementById("connectBtn").addEventListener("click", function () {
    const timeout = parseInt(document.getElementById("scanTimeout").value);

    if (isNaN(timeout) || timeout < 0) {
      window.plugins.MikeyCarTrack.snackBar("Invalid timeout value");
      return;
    }

    window.plugins.MikeyCarTrack.connect(
      timeout,
      function (string) {},
      function (string) {
        window.plugins.toast.showShortBottom("Connection Failed.");
        log(string);
      }
    );
  });

  document
    .getElementById("disconnectBtn")
    .addEventListener("click", function () {
      window.plugins.MikeyCarTrack.disconnect(
        function (string) {},
        function (string) {
          window.plugins.toast.showShortBottom("Disconnection Failed.");
          log(string);
        }
      );
    });

  document
    .getElementById("getLockStateBtn")
    .addEventListener("click", function () {
      window.plugins.MikeyCarTrack.getLockState();
    });

  document
    .getElementById("getVehicleStatBtn")
    .addEventListener("click", function () {
      window.plugins.MikeyCarTrack.getVehicleStats();
    });

  document.getElementById("lockBtn").addEventListener("click", function () {
    window.plugins.MikeyCarTrack.lock();
  });

  document.getElementById("unlockBtn").addEventListener("click", function () {
    window.plugins.MikeyCarTrack.unlock();
  });

  document
    .getElementById("unlockNoKeyBtn")
    .addEventListener("click", function () {
      window.plugins.MikeyCarTrack.unlockNoKey();
    });

  document
    .getElementById("ignitionStatBtn")
    .addEventListener("click", function () {
      window.plugins.MikeyCarTrack.getIgnitionState();
    });

  document
    .getElementById("headlightBtn")
    .addEventListener("click", function () {
      window.plugins.MikeyCarTrack.headlight();
    });

  document.getElementById("hornBtn").addEventListener("click", function () {
    window.plugins.MikeyCarTrack.horn();
  });
}
