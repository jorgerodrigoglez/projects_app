const toggle = () => {
  const d = document,
    btnBar = d.querySelector(".btn-active"),
    form = d.querySelector(".project__form");

  btnBar.addEventListener("click", e => {
    e.preventDefault();
    form.classList.toggle("is-active");
  });
};

export default toggle;
