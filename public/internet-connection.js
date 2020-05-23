window.addEventListener("offline", function (e) {
  say("Internet connection has been lost. But I can keep working.", {
    speed: 1.75,
  });
});

window.addEventListener("online", function (e) {
  say("Internet connection re-established.", { speed: 1.75 });
});
