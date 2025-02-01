const buttons = document.querySelectorAll('.buttons');
const display = document.querySelector('#display');
const del = document.querySelector('.del');
const eq = document.querySelector('.equal');
let esc =  document.querySelector('.ESC');
let clear = document.querySelector('.Clr');
let deviceType = (window.matchMedia && window.matchMedia('(pointer:coarse)').matches);
let ptag = document.querySelector('span');
let numbers = '';

//clears the display and numbers

clear.addEventListener('touchstart',()=>{
    clear.classList.add('ClrHover');
},{passive:false})

clear.addEventListener('touchend',()=>{
    clear.classList.remove('ClrHover');
    numbers = '';
    updateDisplay(numbers);
},{passive:false})
function setButtonVisibility(){
    if(numbers)
    {
        if(deviceType)
        {
            clear.style.visibility = 'visible';
            esc.style.visibility = 'hidden';
        }
        else
        {
            esc.style.visibility = 'visible';
            clear.style.visibility = 'hidden';
        }
    }
    else
    {
        esc.style.visibility = 'hidden';
        clear.style.visibility = 'hidden';
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    setButtonVisibility();
})

//adding tapeffect for touch devices
buttons.forEach(button =>{
    tapEffect(button);
    
});
    
//the tap effect function that adds n remove the touch effect using class
function tapEffect(el) {
    el.addEventListener('touchstart',()=>{
        el.classList.add('buttonHover');
        
    },{passive:false})   
    el.addEventListener('touchend',()=>{
        el.classList.remove('buttonHover');
    },{passive:false});
}

//function to be called whenever number is changed in anyway
function updateDisplay(content){
    if(!ptag)
    {
        ptag = document.createElement('span');
        display.appendChild(ptag);
        // display.innerHTML += `<div class="ESC">Press ESC To Clear</div>`;
    }
    ptag.textContent = content;  
    setButtonVisibility();
}
//delete character used in backspace and delete button
function delLastChar(){
    numbers = numbers.slice(0,-1);
    updateDisplay(numbers || '');
}

//function for = or enter for final calculations also handles and shows errors 
function calc()
{
    
    try {
        if(numbers){
            let result = eval(numbers);
            numbers = result.toString();            
            updateDisplay(numbers);     
        }
    } catch (error) {
        if(deviceType){
            updateDisplay("Invalid Input Press Del To clear");
        }
        else
        {
            updateDisplay("Invalid Input Press ESC To clear");
        }
        numbers = '';
    }
    
}

//adding click events to all buttons
buttons.forEach(button => 
    button.addEventListener('click', (e)=> {
        const content = e.target.textContent;

        if(content === 'X')
        {
            numbers += '*';            
        }
        else
        {
            numbers += content;
        }        
        updateDisplay(numbers);
        
    })
)
//adding click events to = and del buttons
eq.addEventListener('click', calc);

del.addEventListener('click', delLastChar);

//adding touch effects for touch devices for = and del buttons 
// adds and removes class for touch effect
del.addEventListener('touchstart',()=>{
    del.classList.add('delHover');
},{passive:false})

del.addEventListener('touchend',()=>{
    del.classList.remove('delHover');
},{passive:false})

eq.addEventListener('touchstart',()=>{
    eq.classList.add('equalHover');
},{passive:false})

eq.addEventListener('touchend',()=>{
    eq.classList.remove('equalHover');
},{passive:false})

//adding keyboard events for all buttons
document.addEventListener('keyup', (event) => {

    const key = event.key;

    if(key == 'Backspace')
    {
        delLastChar();
    }
    else        
    if(event.key == 'Enter')   
    {
        calc()
    }
    else
    if(event.key == 'Escape')   
    {
        numbers = '';
        updateDisplay(numbers);
    }
    else 
    if(!isNaN(key) || key === '+' || key === '-' || key === '*' || key === '/' || key === '.')
    {
        numbers += key;
        updateDisplay(numbers);
    }
    
});
        




