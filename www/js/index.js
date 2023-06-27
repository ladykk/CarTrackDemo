document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  // Cordova is now initialized. Have fun!
  console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);
  document.getElementById("deviceready").classList.add("ready");

  window.plugins.MikeyCarTrack.initialize(true, function (e) {
    switch (e.event) {
      case "onInitialize":
        window.plugins.MikeyCarTrack.toast("onInitialize");
        break;
    }
  });

  document.getElementById("terminalBtn").addEventListener("click", function () {
    const terminalId = document.getElementById("terminalId").value;
    window.plugins.MikeyCarTrack.createTerminal(terminalId);
  });

  document
    .getElementById("authKeySaveBtn")
    .addEventListener("click", function () {
      const authKey = document.getElementById("newAuthKey").value;

      window.plugins.MikeyCarTrack.setAuthKey(authKey, function (e) {
        window.plugins.MikeyCarTrack.getAuthKey(function (e) {
          document.getElementById("authKey").value = e;
        });
      });
    });

  document
    .getElementById("authKeyRemoveBtn")
    .addEventListener("click", function () {
      window.plugins.MikeyCarTrack.removeAuthKey(function (e) {
        document.getElementById("authKey").value = "";
      });
    });

  document.getElementById("connectBtn").addEventListener("click", function () {
    const timeout = parseInt(document.getElementById("scanTimeout").value);

    if (isNaN(timeout) || timeout < 0) {
      window.plugins.MikeyCarTrack.snackBar("Invalid timeout value");
      return;
    }

    window.plugins.MikeyCarTrack.connect(timeout);
  });

  document
    .getElementById("disconnectBtn")
    .addEventListener("click", function () {
      window.plugins.MikeyCarTrack.disconnect();
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
      window.plugins.MikeyCarTrack.unlockNoKeyFOB();
    });

  document
    .getElementById("ignitionStatBtn")
    .addEventListener("click", function () {
      window.plugins.MikeyCarTrack.getVehicleStatus();
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
