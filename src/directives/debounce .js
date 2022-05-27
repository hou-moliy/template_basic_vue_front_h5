const debounce = {
  inserted: function (el, binding) {
    let timer;
    el.addEventListener('click', () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        binding.value();
      }, binding.value || 3000);
    });
  }
};
export default debounce;
