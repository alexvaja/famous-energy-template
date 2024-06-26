function jsFunction(value, path) {
  console.log("VALUE: " + value);
  
  var path = window.location.pathname;
  var page = path.split("/").pop();

  if (value == 'ro') {
      console.log("RO");
      location.replace("../ro/" + page);
  } else {
      console.log("EN");
      location.replace("../en/" + page);
  }
}

function updateContent() {
    const elements = document.getElementsByClassName("i18nelement");
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const k = element.getAttribute("data-i18n");
      element.innerHTML = i18next.t(k);
    }
  }
  
  async function i18Loader() {
    const langs = ["en", "ro"];
    const jsons = await Promise.all(
      //langs.map((l) => fetch("https://alexvaja.github.io//famous-energy-template/translation/i18/" + l + ".json").then((r) => r.json()))
      langs.map((l) => fetch("/./translation/i18/" + l + ".json").then((r) => r.json()))
    );
    const res = langs.reduce((acc, l, idx) => {
      acc[l] = { translation: jsons[idx] };
      return acc;
    }, {});
    await i18next.init({
      lng: "ro",
      debug: true,
      resources: res
    });
    updateContent();
    i18next.on("languageChanged", () => {
      updateContent();
    });
    const langSelector = document.getElementById("langSelector");
    langSelector.removeAttribute("disabled");
    langSelector.addEventListener("change", (e) => {
      i18next.changeLanguage(e.target.value);
    });
  }
  
  i18Loader();
  