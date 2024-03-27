import * as api from './api.js';

const app = document.getElementById('app');
const CE = el => document.createElement(el);

function getOnePost(data){
    const postDetailWrap = CE('div');
    const postDetailTitle = CE('h2');
    const postDetailBody = CE('p');
    const hr = CE('hr');

    postDetailTitle.textContent = data.title;
    postDetailBody.textContent = data.title;
    postDetailWrap.append(postDetailTitle,postDetailBody,hr);

    return postDetailWrap;
}

function getAllComments(data){
    const commentWrap = CE('div');
    commentWrap.classList.add('comments');
    data.forEach((com) => {
        let name = CE('h3');
        let email = CE('a')
        let body = CE('p');

        email.href = 'mailto:' + com.email;

        name.textContent = com.name;
        email.textContent = com.email;
        body.textContent = com.body;

        commentWrap.append(name,email,body);
    });

    return commentWrap;
}

function getListEl(listArr){
    
    const mediaWrapper = CE('div');
    mediaWrapper.classList.add('media-wrapper');
    
    listArr.forEach(el => {
        const media = CE('div');
        media.classList.add('media');
        const mediaBody = CE('div');
        mediaBody.classList.add('media-body');

        const mediaHeading = CE('h4');
        mediaHeading.classList.add('media-heading');
        mediaHeading.textContent = el.title;
        mediaHeading.addEventListener('click',async (elem) => {
            console.log(el);
            app.innerHTML = ''
            app.append(getOnePost(await api.getPost(el.id)), getAllComments(await api.getComments(el.id)));
        });

        const mediaText = CE('p');
        mediaText.textContent = el.body;

        mediaBody.append(mediaHeading,mediaText);
        media.append(mediaBody);
        mediaWrapper.append(media);
    });
    
    return mediaWrapper;
}

app.append(getListEl(await api.getPosts()));


