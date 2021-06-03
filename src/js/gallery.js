function createGallery  () {
    const pathImg = './static/media/images/thumb';
    const NUM_MAX_IMGS = 12;
    const gallery = document.querySelector('.gallery');

    for (let index = 1; index <= NUM_MAX_IMGS; index++) {
       const img = document.createElement('img');

       img.src = `${pathImg}/${index}.webp`;
       img.dataset.imageId = index;
       img.onclick = maximizeImage;

       gallery.appendChild(img);
    }
}

function maximizeImage( e ) {
    const imageId = e.target.dataset.imageId;
    const pathImg = `./static/media/images/grande/${imageId}.webp`;
    const body = document.querySelector('body');
    let overlay = document.createElement('div');
    let img = document.createElement('img');
    let btnClose = document.createElement('button');

    // view image
    img.src = pathImg;

    // btn properties
    btnClose.textContent = 'X';
    btnClose.classList.add('btn-close');
    btnClose.onclick = () => {
        overlay.remove();
        body.classList.remove('fixed-body');
    }

    // overlay properties
    overlay.appendChild(img);
    overlay.appendChild(btnClose);
    overlay.classList.add('overlay');

    overlay.onclick = () => {
        overlay.remove();
        body.classList.remove('fixed-body');
    }

    body.classList.add('fixed-body');
    body.appendChild(overlay);
}
