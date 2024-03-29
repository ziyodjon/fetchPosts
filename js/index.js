import * as api from './api.js';


const app = document.getElementById('app');
const CE = el => document.createElement(el);

function getOnePost(data){
    const postDetailWrap = CE('div');
    const postDetailTitle = CE('h2');
    const postDetailBody = CE('p');
    const allPostsBtn = CE('button');
    allPostsBtn.textContent = 'Back';
    allPostsBtn.addEventListener('click', async () => {
        app.innerHTML = '';
        app.append(getListEl(await api.getPosts()));
    });
    const hr = CE('hr');

    postDetailTitle.textContent = data.title;
    postDetailBody.textContent = data.title;
    postDetailWrap.append(postDetailTitle,postDetailBody,allPostsBtn,hr);

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

// async function getPagination(allData){
//     const ulPage = document.querySelector('.pagination');
    
    
//     let limit = 10;
//     let pageCount = allData.length / limit;
//     let pageStart = '';
//     let pageEnd = '';
//     let res = [];
    
//     for(let i = 1; pageCount >= i; i++){
//         const pageLi = CE('li');
//         const pageLink = CE('a');
//         pageLi.append(pageLink);
        
//         pageLink.textContent = i;
//         pageLink.addEventListener('click', async(event) => {
//             const page = event.target.innerHTML;
//             pageStart = limit * (page - 1);
//             pageEnd = limit * page;
//             res = allData.slice(pageStart,pageEnd);
//         });
        
        
        
//         ulPage.append(pageLi);
//     }
//     return ulPage;
// }


function getListEl(listArr){
    const mediaWrapper = CE('div');
    mediaWrapper.classList.add('media-wrapper');
    //limit * (page - 1), limit * page
    listArr.forEach(el => {
        const media = CE('div');
        media.classList.add('media');
        const mediaBody = CE('div');
        mediaBody.classList.add('media-body');

        const mediaHeading = CE('h4');
        mediaHeading.classList.add('media-heading');
        mediaHeading.textContent = el.title;
        mediaHeading.addEventListener('click',async (elem) => {
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


