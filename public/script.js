(function(){
    flipCard()
})()

function flipCard(){
    const cards = document.querySelectorAll('.trending-card')
    cards.forEach((card) => {
        card.addEventListener('click' , () => {
            const wrapper = card.firstElementChild
            if(wrapper){
                wrapper.classList.toggle('flip-card')
            }
        })
    })
}