const buttons = document.querySelectorAll('.buttons');
const display = document.querySelector('#display');
const del = document.querySelector('.del');
const eq = document.querySelector('.equal');
const esc =  document.querySelector('.ESC');
let ptag = document.querySelector('span');
let numbers = '';

buttons.forEach(button =>{
    tapEffect(button);
});

    
function tapEffect(el) {
    el.addEventListener('touchstart', () => {
        el.classList.add('active');
    }, { passive: true });
    el.addEventListener('touchend', () => {
        el.classList.remove('active');
    }, { passive: true });
    el.addEventListener('touchcancel', () => {
        el.classList.remove('active');
    }, { passive: true });
}
//set visisbility of ESC button
function setVisibility(){
    if(numbers)
    {
        esc.style.visibility = 'visible';
    }
    else
    {
        esc.style.visibility = 'hidden';
    }
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
    setVisibility();
}
//delete character used in backspace and delete button
function delLastChar(){
    numbers = numbers.slice(0,-1);
    updateDisplay(numbers || '');
}

//function for = or enter for final calculations
function calc()
{
    
    try {
        if(numbers){
            let result = eval(numbers);
            numbers = result.toString();            
            updateDisplay(numbers);     
        }
    } catch (error) {
        updateDisplay(error);
        numbers = '';
    }
    
}

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
eq.addEventListener('click', calc);

del.addEventListener('click', delLastChar);
tapEffect(del);
tapEffect(eq);

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
    
})
        




