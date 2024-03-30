import * as api from './api.js';


const app = document.getElementById('app');
const CE = el => document.createElement(el);
const ulPage = document.querySelector('.pagination');
let pageStart = 0;
let pageEnd = 10;

function showLoader(){
    const loader = document.querySelector('.loader');
    loader.style.display = 'block';
}

function hideLoader(){
    const loader = document.querySelector('.loader');
    loader.style.display = 'none';
}

function getOnePost(data){
    const postDetailWrap = CE('div');
    const postDetailTitle = CE('h2');
    const postDetailBody = CE('p');
    const allPostsBtn = CE('button');
    allPostsBtn.textContent = 'Back';
    allPostsBtn.addEventListener('click', async () => {
        app.innerHTML = '';
        showLoader();
        app.append(getListEl(printPagination(await api.getPosts(),pageStart,pageEnd)),await getPagination());
        hideLoader();
        //app.append(getListEl(await api.getPosts()),getPagination(await api.getPosts()));
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

async function getPagination(){
    const allData = await api.getPosts()
    
    let limit = 10;
    let pageCount = await allData.length / limit;
    ulPage.innerHTML = ''
    for(let i = 1; pageCount >= i; i++){
        const pageLi = CE('li');
        const pageLink = CE('a');
        pageLi.append(pageLink);
        
        pageLink.textContent = i;
        ulPage.append(pageLi);
        pageLink.addEventListener('click',async (event) => {
            app.innerHTML = '';
            
            const page = event.target.innerHTML;
            //console.log(page);
            pageStart = limit * (page - 1);
            pageEnd = limit * page;
            showLoader();
            app.append(getListEl(printPagination(allData,pageStart,pageEnd)),await getPagination());
            hideLoader();
        }); 
    }

    return ulPage;
}

 function printPagination(allData,from,to){
    allData = allData.slice(from,to);
    return allData;
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
            app.innerHTML = '';
            ulPage.innerHTML = '';
            showLoader();
            app.append(getOnePost(await api.getPost(el.id)), getAllComments(await api.getComments(el.id)));
            hideLoader();
        });

        const mediaText = CE('p');
        mediaText.textContent = el.body;

        mediaBody.append(mediaHeading,mediaText);
        media.append(mediaBody);
        mediaWrapper.append(media);
    });
    
    return mediaWrapper;
}
showLoader();
app.append(await getListEl(printPagination(await api.getPosts(),pageStart,pageEnd)),await getPagination());
hideLoader();


// printPagination(await api.getPosts(),pageStart,pageEnd)