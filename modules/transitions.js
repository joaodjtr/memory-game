const timingFade = 500

export function fadeInGame(target){
    target.classList.remove('game--fadeOut')
    target.classList.add('game--fadeIn')
}

export function fadeOutGame(target){
    target.style.display = 'flex'
    target.classList.add('game--fadeOut')
    target.classList.remove('game--fadeIn')
    setTimeout(()=>target.style.display = 'none', timingFade)
}

export function fadeInButton(button){ 
    button.classList.remove('start-button--fadeOut')
    button.classList.add('start-button--fadeIn')
}

export function fadeOutButton(button){
    button.style.display = 'block'
    button.classList.add('start-button--fadeOut')
    button.classList.remove('start-button--fadeIn')
    setTimeout(() => button.style.display = 'none', timingFade)
}

export function useWaitScreen(){
    const waitscreen =  document.getElementsByClassName('wait-screen')[0]
    waitscreen.classList.add('fade')
}

export function removeWaitScreen(){
    const waitscreen =  document.getElementsByClassName('wait-screen')[0]
    waitscreen.classList.remove('fade')
}