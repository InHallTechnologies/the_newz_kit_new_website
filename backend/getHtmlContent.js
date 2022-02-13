export default (html) => {
    var d = document.createElement("div");
    d.innerHTML = html;
    return d.textContent || d.innerText;
};
