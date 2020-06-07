(function () {
  if (!window) return;

  const MutationObserver =
    window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver;

  const config = {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
    // attributeFilter: ['one', 'two'],
    // attributeOldValue: false,
    // characterDataOldValue: false
  };

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      console.log(`Mutation type: ${mutation.type}`);
      console.log(mutation.target);
    });
  });

  observer.observe(document.body, config);
  // observer.disconnect();
})();
