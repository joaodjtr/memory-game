const timingFade = 500

export function fadeIn(target){
    target.classList.remove('game--fadeOut')
    target.classList.add('game--fadeIn')
}

export function fadeOut(target){
    target.style.display = 'flex'
    target.classList.add('game--fadeOut')
    target.classList.remove('game--fadeIn')

    setTimeout(()=>target.style.display = 'none', timingFade)
}