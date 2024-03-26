
const showSucces = () => {
     let success = document.getElementById("success");
     if(success.style.display === "none"){
          success.style.display = "block";
          document.getElementById("close").style.display = "block";
     }else{
          success.style.display = "none";
     }
}

const hireMe = () => {
     document.getElementById("close").style.display = "none";
     document.getElementById("success").style.display = "none"
     let display = document.getElementById("HireMe")
     console.log("You want to hire me");
     if(display.style.display === "none"){
          display.style.display = "flex";
     }else{
          display.style.display = "none";
     }
}


const handleSubmit = () => {
     showSucces();
}