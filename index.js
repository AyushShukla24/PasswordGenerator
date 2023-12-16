let sliderJ=document.querySelector("#slider");
let sliderV=document.querySelector("#sliderValue");
let colorC=document.querySelector("#colorChange");
let low=document.querySelector("#lower");
let up=document.querySelector("#upper");
let no=document.querySelector("#num");
let sy=document.querySelector("#symb");
let passwordC=document.querySelector("#passwordContent");
let cop=document.querySelector("#c");
let kilick=document.querySelector("#clk");
let rad=document.querySelectorAll(".radio");
let generatePass=document.querySelector("#Gbtn");



let password="";
let defalutValue=10;
let symbol="!@#$%^&*()_-+={}[]|\<>,.?/";
let cnt=1;

function changeSilderValue(){
sliderJ.value=defalutValue;
sliderV.innerHTML=defalutValue;
//background color
const min=sliderJ.min;
const max=sliderJ.max;
sliderJ.style.backgroundSize = ((defalutValue - min)*100)/(max-min) + "% 100%";
let l=((defalutValue-min)*100)/(max-min)+"% 100%";
console.log(l);
}
changeSilderValue();

function setIndicator(color){
colorC.style.backgroundColor=color;
}

function getInt(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}

function generateInt(){
    return getInt(0,9);
}
function generateLowerCase(){
    let a= getInt(97,123);
    return String.fromCharCode(a);
}
function generateUpperCase(){
    let b= getInt(65,91);
    return String.fromCharCode(b);
}

function generateSymbol(){ 
    let randNo=getInt(0,symbol.length);
    return symbol.charAt(randNo);
}

function strengthOfPassword(){
    let u=false;
    let l=false;
    let n=false;
    let s=false;
    
    if(up.checked) 
    u=true;
    if(low.checked) 
    l=true;
    if(no.checked) 
    n=true;
    if(sy.checked) 
    s=true;

    if(u && l&& s || n)
    return setIndicator("#0f0");
    else
    return setIndicator("#f00")
}

const checkBoxcount=()=>{
     let cnt=0;
    rad.forEach((checkbox)=>{
        if(checkbox.checked)
        cnt++;
    })

    //condition
    if(defalutValue<cnt){
        defalutValue=cnt;
        changeSilderValue();
        console.log("yes function");
    }
}

rad.forEach((checkbox)=>{
checkbox.addEventListener('change',checkBoxcount);
})


async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordC.value);
        cop.innerText="copied";
    }
    catch(e){
        cop.innerText="failed";
    }

    //to make copy wala visible
    cop.classList.add("active");

    setTimeout(()=>{
        cop.classList.remove("disactive");
        console.log('disactibe');
    },1000);
}

sliderJ.addEventListener('input',(event)=>{
    defalutValue=event.target.value;
    changeSilderValue();
})

kilick.addEventListener('click',()=>{
    if(passwordC.value)
    copyContent();
})

function shuffle(arr){
    for(let i=arr.length-1;i>=0;i--){
        let j=Math.floor(Math.random()*(i+1));
        let tmp=arr[i];
        arr[i]=arr[j];
        arr[j]=tmp;
    }

    let str="";
    arr.forEach((e)=>{
        str+=e;
    });

    return str;
}

function Gpass(){
    generatePass.addEventListener('click',()=>{
        if(cnt<=0){
        return
        }

        if(defalutValue<cnt){
        defalutValue=cnt;
    changeSilderValue();
    console.log("yes function");
        }

        // remove old password to make new
        password="";
        let arr=[];

        if(low.checked)
        arr.push(generateLowerCase)
        if(up.checked)
        arr.push(generateUpperCase)
        if(no.checked)
        arr.push(generateInt)
        if(sy.checked)
        arr.push(generateSymbol)

        for(let i=0;i<arr.length;i++){
            password+=arr[i]();
        }

        //add remaing letter
        for(let i=0;i<defalutValue-arr.length;i++){
            let randIndex=getInt(0,arr.length);
            password+=arr[randIndex]();
        }

        password=shuffle(Array.from(password));

        console.log(password);
        passwordC.value=password;
        strengthOfPassword();
    })
}

Gpass();

