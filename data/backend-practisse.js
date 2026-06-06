const xrh = new XMLHttpRequest();
xrh.addEventListener("load", () => {
  console.log(xrh.response);
});
//xrh.open("GET", "https://supersimplebackend.dev");
//xrh.open("GET", "https://supersimplebackend.dev/hello");
//xrh.open("GET", "https://supersimplebackend.dev/products/first");
//xrh.open("GET", "https://supersimplebackend.dev/products/first");
xrh.open("GET", "https://supersimplebackend.dev/documentation");
//xrh.open("GET", "https://supersimplebackend.dev/images/apple.jpg");
xrh.send();
