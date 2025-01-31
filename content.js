const observer = new MutationObserver(async (mutations) => {
  const y = document.getElementById("GInterface.Instances[2]_colonne_0");
  if (y) {
    async function fetchData() {
      const url =
        "https://missing-work-endpoint-68px8fq1u-ivnogoods-projects.vercel.app/get-db";
      const headers = {
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({ reference: "/" });

      try {
        console.log("Making request to", url);
        const response = await fetch(url, {
          method: "POST",
          headers: headers,
          body: body,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        /* console.log(data); */
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    const data = await fetchData();

    const container = document.createElement("section");

    container.innerHTML = `<div class="widget">
      <header>
        <h2 style="color: #ab4d70 !important">
          <span>Devoirs Manquants</span>
        </h2>
      </header>

      <div class="devoirsmanquantsDevoirs">

      </div>
    </div>`;

    y.insertBefore(container, y.firstChild);

    Object.entries(data.data).map(([key, value]) => {
      var divElement = document.getElementById(key);
      if (divElement != null) {
        console.log("Element exists");
      } else {
        console.log("Element does not exist");

        const widget = document.createElement("div");
        widget.id = key;
        widget.className = "devoirsmanquantscontainer";
        widget.innerHTML = `
      <div class="devoirsmanquantsTitre">
        <h3 class="devoirsmanquantsMatiere">${value.matiere}</h3>
        <p>&nbsp; pour le: ${value.date}</p>
      </div>
      <p class="devoirsmanquantsContenu">${value.contenu}</p>
    `;

        // Append the widget to the container
        const devoirsContainer = document.querySelector(
          ".devoirsmanquantsDevoirs"
        );

        devoirsContainer.appendChild(widget);
      }
    });

    observer.disconnect();
  }
});

observer.observe(document.body, { childList: true, subtree: true });
