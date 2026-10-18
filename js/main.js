      const root = document.documentElement,
        tbtn = document.getElementById("theme");
      function setTheme(t) {
        root.dataset.theme = t;
        tbtn.textContent = t === "dark" ? "☀️" : "🌙";
        try {
          localStorage.setItem("theme", t);
        } catch (e) {}
      }
      let saved = null;
      try {
        saved = localStorage.getItem("theme");
      } catch (e) {}
      setTheme(
        saved ||
          (matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"),
      );
      tbtn.onclick = () =>
        setTheme(root.dataset.theme === "dark" ? "light" : "dark");
      // close mobile menu + highlight active link
      const links = [...document.querySelectorAll("nav a")];
      links.forEach((a) =>
        a.addEventListener("click", () =>
          document.querySelector("nav").classList.remove("open"),
        ),
      );
      const io = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (e.isIntersecting)
              links.forEach((a) =>
                a.classList.toggle(
                  "active",
                  a.getAttribute("href") === "#" + e.target.id,
                ),
              );
          }),
        { threshold: 0.5 },
      );
      document.querySelectorAll("section").forEach((s) => io.observe(s));
      // bulb toggles theme
      document.getElementById("bulb").onclick = () => tbtn.click();