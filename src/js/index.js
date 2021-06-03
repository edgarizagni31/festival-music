document.addEventListener( 'DOMContentLoaded', () => {
    createGallery();

    const observer = new IntersectionObserver( fixedNavbar );
    observer.observe(document.getElementById('about'))
} );

function fixedNavbar( entries ) {
    const intersecting = entries[0].isIntersecting;
    const header = document.querySelector('.header');

    if ( intersecting ) {
       header.classList.remove('fixed'); 
       header.classList.remove('animate__fadeInDown');
    } else {
        header.classList.add('fixed');
        header.classList.add('animate__fadeInDown');
    }
}