const video = JSON.parse(localStorage.video);

if(!Array.isArray(video)){
    throw Error ("З серверу передано не масив")
}

const videoEl = video.map(({ videoName, id, url, description, keywords, poster }) => {
    return `
    <div class="video">
        <h3 class="video-name">${videoName}</h3>
        <video id="${id}" controls poster="${poster}">
            ${url.startsWith("/video") ? `<source src="/video/${url}">`: `<source src="${url}">`}
        </video>
        <p class="video-description">
        ${description}
        </p>
        <div>
            <span class="badge bg-secondary">${keywords}</span>
        </div>  
    </div>
    `
})

document.querySelector(".video-box")
.insertAdjacentHTML("beforeend", videoEl.join(""));