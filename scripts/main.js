document.getElementById("openModal").addEventListener("click", function () {
  document.getElementById("modal").classList.remove("hidden");
});

document.getElementById("closeModal").addEventListener("click", function () {
  document.getElementById("modal").classList.add("hidden");
});

let pause = false;
document.getElementById("pause").addEventListener("click", function () {
  pause = !pause;
  if (pause) {
    let lineElement = document.getElementById("pause");
    lineElement.textContent = `Continuar`;
    clearInterval(intervalId);
  } else {
    let lineElement = document.getElementById("pause");
    lineElement.textContent = `Pausa`;
    timeController(speed);
  }
});



let imageUrl = null;
document.getElementById("container").addEventListener("",()=>{
  if(imageUrl == null) {
    document.body.style.backgroundImage = imageUrl;
  }
})



