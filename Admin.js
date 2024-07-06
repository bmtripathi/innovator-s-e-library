const fetchInfo=async(Name,Password)=>{
    try{
        const response=await fetch(`http://localhost:3000/admin/${Name}/${Password}`);
        const data= await response.json();
        if(data.mssg==="welcome admin"){
            window.location.href="Control.html";
        }else{
            console.log(data.mssg);
        }
    }catch(err){
        console.log(err);
}
};
document.querySelector('.submit').addEventListener('click',()=>{
    const Name=document.getElementById('Name').value;
    const Password=document.getElementById('password').value;
    
    if(Name && Password){
        fetchInfo(Name,Password);
    }
});
    

    