"use strict";
window.addEventListener("DOMContentLoaded", () => {
  // form

  function openForm() {
    form.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
  function closeForm() {
    form.style.display = "none";
    document.body.style.overflow = "";
  }

  const contactBtn = document.querySelectorAll(".contact-me"),
    form = document.querySelector(".contact-form"),
    body = document.querySelector("body"),
    close = document.querySelector(".close");

  contactBtn.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      openForm();
    });
  });

  close.addEventListener("click", () => {
    closeForm();
  });

  // Tabs
  const tabs = document.querySelectorAll(".tab-item"),
    tabParent = document.querySelector(".tab-items"),
    tabContent = document.querySelectorAll(".box");

  function hideContent() {
    tabContent.forEach((item) => {
      item.style.display = "none";
    });
    tabs.forEach((item) => {
      item.classList.remove("tab-item-active");
    });
  }
  function showContent(i = 0) {
    tabContent[i].style.display = "block";

    tabs[i].classList.add("tab-item-active");
  }
  hideContent();
  showContent();
  tabParent.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains("tab-item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideContent();
          showContent(i);
        }
      });
    }
  });
  // Slider
  const slides = document.querySelectorAll(".test-slide"),
    prev = document.querySelector(".test-slider-prev"),
    next = document.querySelector(".test-slider-next"),
    current = document.querySelector("#current"),
    total = document.querySelector("#total");

  let slideIndex = 1;
  show(slideIndex);
  function show(s) {
    if (s > slides.length) {
      slideIndex = 1;
    }
    if (s < 1) {
      slides.length = slideIndex;
    }
    slides.forEach((item) => (item.style.cssText = "display: none;"));
    slides[slideIndex - 1].style.display = "block";
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }
  function sliderPlus(s) {
    show((slideIndex += 1));
  }
  prev.addEventListener("click", () => {
    sliderPlus(-1);
  });
  next.addEventListener("click", () => {
    sliderPlus(1);
  });

  const forms = document.querySelectorAll("form");

  const message = {
    loading: "loading...",
    success: "Successfully received",
    failure: "Error",
  };

  forms.forEach((item) => {
    postData(item);
  });

  function postData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("div");
      statusMessage.textContent = message.loading;
      form.append(statusMessage);

      const formData = new FormData(form);

      const object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });

      fetch("server.php", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(object),
      })
        .then((data) => data.text())
        .then((data) => {
          console.log(data);
          statusMessage.textContent = message.success;
          form.reset();
          setTimeout(() => {
            statusMessage.remove();
          }, 2000);
        })
        .catch(() => {
          statusMessage.textContent = message.failure;
        })
        .finally(() => {
          form.reset();
        });

      // request.addEventListener("load", () => {
      //   if (request.status === 200) {
      //     console.log(request.response);
      //     statusMessage.textContent = message.success;
      //     form.reset();
      //     setTimeout(() => {
      //       statusMessage.remove();
      //     }, 2000);
      //   } else {
      //     statusMessage.textContent = message.failure;
      //   }
      // });
    });
  }
});
